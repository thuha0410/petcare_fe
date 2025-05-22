<template>
  <div class="chatbot-container">
    <!-- Chat logo button (minimized) -->
    <img
      v-if="!isOpen"
      @click="toggleChat"
      class="chat-logo"
      src="https://res.cloudinary.com/dd1p908gm/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1744797026/4c58231bb1756e49ff8d31c736b36b86_xe80lq.jpg"
      alt="PetCare Logo"
    />

    <!-- Chat window -->
    <div v-if="isOpen" class="chat-window">
      <!-- Chat header -->
      <div class="chat-header-centered">
        <img
          class="chat-logo-header"
          src="https://res.cloudinary.com/dd1p908gm/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1744797026/4c58231bb1756e49ff8d31c736b36b86_xe80lq.jpg"
          alt="PetCare Logo"
        />
        <span class="chat-title">Trợ lý ảo PetCare</span>
        <button class="close-btn" @click="toggleChat" aria-label="Đóng chatbox">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Chat messages -->
      <div class="chat-messages" ref="chatMessages">
        <transition-group name="fade">
          <div 
            v-for="(message, index) in messages" 
            :key="index" 
            :class="['message', message.role === 'user' ? 'user-message' : 'bot-message', 
                    message.isLoading ? 'loading-message' : '']"
          >
            <div class="message-content" @click="handleNavigationClick">
              <span v-if="message.role === 'user'">{{ message.content }}</span>
              <span v-else-if="message.isLoading" class="loading-dots">
                Đang tìm kiếm thông tin... <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
              </span>
              <span v-else v-html="formatMessage(message.content)"></span>
            </div>
            
            <!-- Navigation buttons display -->
            <div v-if="message.navigationOptions && message.navigationOptions.length > 0" class="navigation-buttons">
              <div 
                v-for="(option, optionIndex) in message.navigationOptions" 
                :key="optionIndex"
                @click="handleNavigation(option.path)"
                class="navigation-button"
              >
                <i :class="['fas', getIconForRoute(option.path)]"></i>
                <div class="navigation-info">
                  <div class="navigation-label">{{ option.label }}</div>
                  <div class="navigation-description">{{ option.description || getDescriptionForRoute(option.path) }}</div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      
      <!-- Suggested questions area (separate from chat input) -->
      <div class="suggested-questions-area">
        <div class="suggested-questions-horizontal-container">
          <!-- Left scroll button -->
          <button class="scroll-indicator-button scroll-left" v-if="suggestedQuestions.length > 3" @click="scrollSuggestionsLeft">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="suggested-questions-horizontal" ref="suggestionsContainer">
            <div 
              v-for="(question, index) in suggestedQuestions" 
              :key="index"
              @click="selectSuggestedQuestion(question)"
              class="suggested-question-pill"
            >
              {{ question }}
            </div>
            <!-- Add an empty spacer element to ensure last item can be scrolled fully into view -->
            <div class="pill-spacer"></div>
          </div>
          
          <!-- Right scroll button -->
          <button class="scroll-indicator-button scroll-right" v-if="suggestedQuestions.length > 3" @click="scrollSuggestions">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
      
      <!-- Chat input (separate from suggested questions) -->
      <div class="chat-input">
        <div class="input-wrapper">
          <input 
            v-model="userInput" 
            @keyup.enter="sendMessage"
            @focus="isInputFocused = true"
            @blur="isInputFocused = false"
            placeholder="Nhập tin nhắn của bạn..."
            type="text"
            :disabled="isProcessing"
          >
          <button @click="sendMessage" class="send-button" :disabled="isProcessing || !userInput.trim()">
            <i class="fas" :class="isProcessing ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
          </button>
        </div>
        <div class="powered-by">
          <span>© 2024 PetCare - Trợ lý thông minh</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import OllamaService from '../services/OllamaService.js';

export default {
  name: 'Chatbot',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [
        {
          role: 'assistant',
          content: 'Xin chào! Tôi là trợ lý ảo của PetCare được hỗ trợ bởi Ollama (Gemma 2B). Tôi có thể giúp gì cho bạn? Nếu bạn muốn đặt lịch khám trực tiếp, hãy nhập "đặt lịch ngay"',
        }
      ],
      isProcessing: false,
      userId: null,
      lastInteractionId: null,
      feedbackGiven: false,
      reconnectAttempts: 0,
      maxReconnectAttempts: 3,
      isInputFocused: false,
      suggestedQuestions: [
        'Phòng khám mở cửa mấy giờ?',
        'Làm sao để đặt lịch khám?',
        'Bác sĩ nào giỏi nhất?',
        'Cần chuẩn bị gì khi đi khám?',
        'Chi phí tiêm phòng cho mèo?',
        'Có dịch vụ spa cho thú cưng không?'
      ],
      projectAnalysis: null,
      currentBookingState: null,
      abortController: null,
      isLoggedIn: false, // Track login status
      sessionInfo: null  // Store session information
    };
  },
  created() {
    // Kiểm tra trạng thái đăng nhập trước tiên
    this.checkLoginStatus();
    
    // Tạo hoặc lấy ID người dùng
    this.userId = localStorage.getItem('chatbot_user_id') || this.generateUserId();
    localStorage.setItem('chatbot_user_id', this.userId);

    // Tải lịch sử chat từ localStorage nếu có
    // Đối với người dùng chưa đăng nhập, sẽ không tải lịch sử (luôn mới khi F5)
    this.loadChatHistory();
    
    // Fetch suggested questions from API
    this.fetchSuggestedQuestions();
    
    // Check Ollama status
    this.checkOllamaStatus();
    
    // Initialize project analysis
    this.analyzeProject();
    
    // Debounce scroll to bottom for performance
    this.debouncedScrollToBottom = debounce(this.scrollToBottom, 100);
  },
  // Add watch for login status changes
  watch: {
    isLoggedIn(newValue) {
      if (!newValue) {
        // Clear chat history when logged out
        this.resetChatHistory();
      }
    }
  },
  methods: {
    // Check user login status
    checkLoginStatus() {
      // Kiểm tra token đăng nhập từ localStorage hoặc cookies
      const token = localStorage.getItem('auth_token') || this.getCookie('auth_token');
      const userId = localStorage.getItem('user_id') || this.getCookie('user_id');
      
      // Xác định trạng thái đăng nhập dựa trên token
      this.isLoggedIn = !!(token && userId);
      
      // Nếu chưa đăng nhập, tạo phiên ẩn danh
      if (!this.isLoggedIn) {
        this.createAnonymousSession();
      } else {
        // Tạo thông tin phiên đăng nhập
        this.sessionInfo = {
          is_logged_in: true,
          user_id: userId,
          auth_token: token,
          started_at: new Date().toISOString()
        };
      }
      
      console.log(`Trạng thái đăng nhập: ${this.isLoggedIn ? 'Đã đăng nhập' : 'Ẩn danh'}`);
    },
    
    // Create anonymous session when not logged in
    createAnonymousSession() {
      // Khởi tạo thông tin phiên ẩn danh
      this.sessionInfo = {
        is_logged_in: false,
        session_id: this.generateSessionId(),
        started_at: new Date().toISOString(),
        is_anonymous: true
      };
      
      // Lưu phiên vào localStorage
      localStorage.setItem('chatbot_session', JSON.stringify(this.sessionInfo));
    },
    
    // Generate a unique session ID for anonymous users
    generateSessionId() {
      return 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    
    // Reset chat history for anonymous users
    resetChatHistory() {
      // Chỉ giữ lại tin nhắn chào mừng đầu tiên
      this.messages = [{
        role: 'assistant',
        content: 'Xin chào! Tôi là trợ lý ảo của PetCare được hỗ trợ bởi Ollama (Gemma 2B). Tôi có thể giúp gì cho bạn? Nếu bạn muốn đặt lịch khám trực tiếp, hãy nhập "đặt lịch ngay"'
      }];
      
      // Xóa lịch sử chat trong localStorage
      localStorage.removeItem('chatbot_chat_history');
      
      console.log('Đã làm mới lịch sử chat cho người dùng ẩn danh');
    },
    
    // Helper function to get cookie
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    },
    
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    sendMessage() {
      if (!this.userInput.trim() || this.isProcessing) {
        return;
      }
      
      // Store the user input and clear the input field
      const userMessage = this.userInput.trim();
      this.userInput = '';
      
      // Add the user message to the chat
      this.messages.push({
        role: 'user',
        content: userMessage
      });
      
      // Add a loading message from the bot
      this.messages.push({
        role: 'assistant',
        content: 'Đang tìm kiếm thông tin...',
        isLoading: true
      });
      
      // Set processing flag and scroll to bottom
      this.isProcessing = true;
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      // Abort any pending requests
      if (this.abortController) {
        this.abortController.abort();
      }
      
      // Create a new abort controller
      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      
      // Set a timeout to automatically cancel the request if it takes too long
      const timeoutId = setTimeout(() => {
        if (this.abortController) {
          this.abortController.abort();
        }
        
        // Find and update the loading message
        const loadingIndex = this.messages.findIndex(m => m.isLoading);
        if (loadingIndex !== -1) {
          // Replace loading message with timeout message
          this.messages[loadingIndex] = {
            role: 'assistant',
            content: 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.',
            isTimeout: true
          };
        }
        
        // Reset processing state
        this.isProcessing = false;
      }, 45000); // 45 second timeout
      
      // Send the message to the API
      OllamaService.sendMessage(
        userMessage,
        this.userId,
        this.projectAnalysis,
        this.currentBookingState,
        signal
      )
        .then(response => {
          // Clear timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          // Find and remove loading message
          const loadingIndex = this.messages.findIndex(m => m.isLoading);
          if (loadingIndex !== -1) {
            this.messages.splice(loadingIndex, 1);
          }
          
          if (response.data && response.data.success) {
            // Process response
            const botMessage = {
              role: 'assistant',
              content: response.data.message || 'Không tìm thấy thông tin.',
              interactionId: response.data.interaction_id
            };
            
            // Add navigation options if any
            if (response.data.navigation_buttons) {
              botMessage.navigationOptions = response.data.navigation_buttons.map(btn => ({
                path: btn.route,
                label: btn.text,
                description: btn.description || ''
              }));
            }
            
            // Add the bot message to chat
            this.messages.push(botMessage);
            
            // Update last interaction ID for feedback
            this.lastInteractionId = response.data.interaction_id;
            
            // Save chat history to localStorage
            this.saveChatHistory();
          } else {
            const errorMessage = response.data && response.data.message 
              ? response.data.message 
              : 'Đã xảy ra lỗi, vui lòng thử lại sau.';
            
            this.messages.push({
              role: 'assistant',
              content: errorMessage,
              isError: true
            });
          }
        })
        .catch(error => {
          // Clear timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          // Find and remove loading message
          const loadingIndex = this.messages.findIndex(m => m.isLoading);
          if (loadingIndex !== -1) {
            this.messages.splice(loadingIndex, 1);
          }
          
          if (error.name === 'AbortError') {
            this.messages.push({
              role: 'assistant',
              content: 'Yêu cầu đã bị hủy. Vui lòng thử lại.',
              isError: true,
              errorType: 'abort'
            });
          } else {
            // Network error handling
            this.handleNetworkError();
          }
        })
        .finally(() => {
          // Reset processing state
          this.isProcessing = false;
          
          // Reset abort controller
          this.abortController = null;
          
          // Scroll to bottom
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        });
    },
    
    handleNetworkError() {
      const reconnectMessage = `Kết nối bị gián đoạn. Đang thử kết nối lại (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})..`;
      
      // Update loading message to error message
      const loadingIndex = this.messages.findIndex(m => m.isLoading);
      if (loadingIndex !== -1) {
        this.messages[loadingIndex] = {
          role: 'assistant',
          content: reconnectMessage,
          isError: true,
          errorType: 'network',
          isRetrying: true
        };
      } else {
        // Add new error message if no loading message exists
        this.messages.push({
          role: 'assistant',
          content: reconnectMessage,
          isError: true,
          errorType: 'network',
          isRetrying: true
        });
      }
      
      // Increment reconnect attempts
      this.reconnectAttempts++;
      
      // Try reconnecting if under max attempts
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        // Retry connection check after delay
        setTimeout(() => {
          this.checkConnection();
        }, 2000);
      } else {
        // Max attempts reached, show permanent error
        const lastMessageIndex = this.messages.length - 1;
        this.messages[lastMessageIndex] = {
          role: 'assistant',
          content: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và tải lại trang.',
          isError: true,
          errorType: 'network_permanent'
        };
        
        // Reset reconnect attempts after a longer delay
        setTimeout(() => {
          this.reconnectAttempts = 0;
        }, 60000); // 1 minute
      }
    },
    
    // Check connection with server
    checkConnection() {
      OllamaService.checkOllamaStatus()
        .then(() => {
          // Connection restored, update message
          const retryingIndex = this.messages.findIndex(m => m.isRetrying);
          if (retryingIndex !== -1) {
            this.messages[retryingIndex] = {
              role: 'assistant',
              content: 'Kết nối đã được khôi phục. Bạn có thể tiếp tục trò chuyện.',
              isSuccess: true
            };
          }
          
          // Reset reconnect attempts
          this.reconnectAttempts = 0;
        })
        .catch(() => {
          // Still not connected, try again or show permanent error
          this.handleNetworkError();
        });
    },
    
    saveChatHistory() {
      // Don't save chat history for anonymous users
      if (!this.isLoggedIn) {
        return;
      }
      
      // Don't save more than 20 messages
      const historyToSave = this.messages.slice(-20);
      
      // Don't save loading messages
      const filteredHistory = historyToSave.filter(msg => !msg.isLoading);
      
      localStorage.setItem('chatbot_chat_history', JSON.stringify({
        messages: filteredHistory,
        timestamp: Date.now(),
        session: this.sessionInfo
      }));
    },
    
    loadChatHistory() {
      try {
        // Don't load chat history for anonymous users
        if (!this.isLoggedIn) {
          console.log('User not logged in, using new chat history');
          return;
        }
        
        const savedData = localStorage.getItem('chatbot_chat_history');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          
          // Check if session matches current login state
          const savedSession = parsedData.session || {};
          const isSessionValid = savedSession.is_logged_in === this.isLoggedIn;
          
          // Load history if logged in and session is valid
          if (isSessionValid) {
            // Set messages if they exist and have valid format
            if (parsedData.messages && Array.isArray(parsedData.messages)) {
              this.messages = parsedData.messages;
              console.log('Chat history loaded successfully');
            }
          } else {
            // Login state changed, reset history
            console.log('Login state changed, resetting chat history');
            this.resetChatHistory();
          }
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        this.resetChatHistory();
      }
    },
    
    formatMessage(text) {
      if (!text) return '';
      
      if (text.includes('<br>')) {
        // Already has HTML tags from server, return as is
        return text;
      }
      
      // Convert URLs to links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      text = text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
      
      // Format long messages
      const maxLength = 500; // Max length for a section
      
      if (text.length > maxLength) {
        // Split by line breaks
        const parts = text.split('\n');
        let result = '';
        let currentPart = '';
        let inList = false;
        
        parts.forEach(part => {
          // Create list items
          if (part.startsWith('•') || part.startsWith('-') || part.startsWith('*')) {
            // Start list if not already in one
            if (!inList) {
              if (currentPart.length > 0) {
                result += '<div class="message-paragraph">' + currentPart + '</div>';
                currentPart = '';
              }
              result += '<div class="message-list">';
              inList = true;
            }
            result += '<div class="list-item">' + part + '</div>';
          } else if (part.startsWith('#') || ((/^[A-Z]/.test(part) || /^\d/.test(part)) && part.length < 60 && (part.endsWith(':') || part.includes(':')))) {
            // End list if in one
            if (inList) {
              result += '</div>';
              inList = false;
            }
            
            // Handle headings
            if (currentPart.length > 0) {
              result += '<div class="message-paragraph">' + currentPart + '</div>';
              currentPart = '';
            }
            
            // Check if this is the start of a new section
            if (part.match(/^(Phần|Mục|Chương|Bước) \d+:/i)) {
              result += '<div class="message-section">' + part + '</div>';
            } else {
              result += '<div class="message-heading">' + part + '</div>';
            }
          } else if (part.trim() === '') {
            // End list if in one
            if (inList) {
              result += '</div>';
              inList = false;
            }
            
            // Add empty line
            if (currentPart.length > 0) {
              result += '<div class="message-paragraph">' + currentPart + '</div>';
              currentPart = '';
            }
          } else {
            // End list if in one
            if (inList) {
              result += '</div>';
              inList = false;
            }
            
            // Add to current paragraph
            if (currentPart.length > 0) {
              currentPart += '<br>' + part;
            } else {
              currentPart = part;
            }
            
            // If current part is too long, add it to result
            if (currentPart.length > maxLength/2) {
              result += '<div class="message-paragraph">' + currentPart + '</div>';
              currentPart = '';
            }
          }
        });
        
        // End list if still in one
        if (inList) {
          result += '</div>';
        }
        
        // Add remaining part
        if (currentPart.length > 0) {
          result += '<div class="message-paragraph">' + currentPart + '</div>';
        }
        
        return result;
      }
      
      // For short messages, just replace line breaks
      return text.replace(/\n/g, '<br>');
    },
    
    scrollToBottom() {
      if (this.$refs.chatMessages) {
        this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
      }
    },
    
    generateUserId() {
      return 'user_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    },
    
    sendFeedback(isHelpful, comment = null) {
      if (!this.lastInteractionId) return;
      
      OllamaService.sendFeedback(this.lastInteractionId, isHelpful, comment)
        .then(() => {
          this.feedbackGiven = true;
        })
        .catch(error => {
          console.error('Error sending feedback:', error);
        });
    },
    
    fetchSuggestedQuestions() {
      OllamaService.getPredefinedQuestions()
        .then(response => {
          if (response.data && response.data.predefined_questions) {
            this.suggestedQuestions = response.data.predefined_questions;
          }
        })
        .catch(error => {
          console.error('Error fetching suggested questions:', error);
          // Keep default questions on error
        });
    },
    
    selectSuggestedQuestion(question) {
      this.userInput = question;
      this.sendMessage();
    },
    
    scrollSuggestions() {
      if (this.$refs.suggestionsContainer) {
        this.$refs.suggestionsContainer.scrollLeft += 100;
      }
    },
    
    scrollSuggestionsLeft() {
      if (this.$refs.suggestionsContainer) {
        this.$refs.suggestionsContainer.scrollLeft -= 100;
      }
    },
    
    handleNavigationClick(event) {
      // Check if clicked element is a link
      if (event.target.tagName === 'A') {
        // Link handling is done by the browser
        return;
      }
    },
    
    handleNavigation(path) {
      if (!path) return;
      
      // If path is a URL, open in new tab
      if (path.startsWith('http')) {
        window.open(path, '_blank');
      } else {
        // Use router for internal links
        this.$router.push(path);
      }
    },
    
    checkOllamaStatus() {
      OllamaService.checkOllamaStatus()
        .then(response => {
          console.log('Ollama status:', response.data);
        })
        .catch(error => {
          console.error('Error checking Ollama status:', error);
        });
    },
    
    analyzeProject() {
      OllamaService.analyzeProject()
        .then(response => {
          if (response.data && response.data.success) {
            this.projectAnalysis = response.data;
          } else {
            // Set default analysis
            this.projectAnalysis = {
              success: true,
              analysis: 'PetCare là hệ thống quản lý phòng khám thú cưng với các chức năng đặt lịch, quản lý thú cưng và dịch vụ.',
              structure: {
                controllers: ['ChatbotController', 'BookingController', 'ServiceController'],
                models: ['DichVu', 'NhanVien', 'Pet', 'LichHen', 'LichHenPet'],
                features: ['Đặt lịch khám', 'Quản lý thú cưng', 'Tư vấn AI']
              }
            };
          }
        })
        .catch(error => {
          console.error('Error analyzing project:', error);
          // Set a default static analysis
          this.projectAnalysis = {
            success: true,
            analysis: 'PetCare là hệ thống quản lý phòng khám thú cưng với các chức năng đặt lịch, quản lý thú cưng và dịch vụ.',
            structure: {
              controllers: ['ChatbotController', 'BookingController', 'ServiceController'],
              models: ['DichVu', 'NhanVien', 'Pet', 'LichHen', 'LichHenPet'],
              features: ['Đặt lịch khám', 'Quản lý thú cưng', 'Tư vấn AI']
            }
          };
        });
    },
    
    getIconForRoute(route) {
      // Return appropriate icon based on route
      if (route.includes('dat-lich')) {
        return 'fa-calendar-plus';
      } else if (route.includes('xem-bs')) {
        return 'fa-user-md';
      } else if (route.includes('xem-dich-vu')) {
        return 'fa-list-alt';
      } else if (route.includes('dang-nhap')) {
        return 'fa-sign-in-alt';
      } else if (route === '/') {
        return 'fa-home';
      } else if (route.includes('thong-tin')) {
        return 'fa-user-circle';
      } else if (route.includes('pet')) {
        return 'fa-paw';
      } else if (route.includes('danh-gia')) {
        return 'fa-star';
      } else if (route.includes('tin-tuc')) {
        return 'fa-newspaper';
      } else if (route.includes('lien-he')) {
        return 'fa-phone';
      } else if (route.includes('gioi-thieu')) {
        return 'fa-info-circle';
      } else {
        return 'fa-link'; // Default icon
      }
    },
    
    getDescriptionForRoute(route) {
      // Return appropriate description based on route
      if (route.includes('dat-lich')) {
        return 'Đặt lịch khám cho thú cưng';
      } else if (route.includes('xem-bs')) {
        return 'Xem thông tin bác sĩ thú y';
      } else if (route.includes('xem-dich-vu')) {
        return 'Xem các dịch vụ thú y';
      } else if (route.includes('dang-nhap')) {
        return 'Đăng nhập vào hệ thống';
      } else if (route === '/') {
        return 'Quay về trang chủ';
      } else if (route.includes('thong-tin')) {
        return 'Thông tin cá nhân';
      } else if (route.includes('pet')) {
        return 'Thông tin thú cưng của bạn';
      } else if (route.includes('danh-gia')) {
        return 'Đánh giá dịch vụ của chúng tôi';
      } else if (route.includes('tin-tuc')) {
        return 'Tin tức và bài viết';
      } else if (route.includes('lien-he')) {
        return 'Liên hệ với chúng tôi';
      } else if (route.includes('gioi-thieu')) {
        return 'Giới thiệu về PetCare';
      } else {
        return '';
      }
    }
  }
};
</script>

<style scoped>
/* Chatbot container */
.chatbot-container {
  position: fixed ;
  bottom: 20px ;
  right: 20px ;
  z-index: 1000 ;
  font-family: Arial, sans-serif ;
}

/* Chat logo (minimized state) */
.chat-logo {
  width: 100px ;
  height: 100px ;
  border-radius: 50% ; /* Back to circular */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25) ;
  cursor: pointer ;
  transition: transform 0.3s ease ;
  border: 2px solid #d23819 ; /* Back to blue border */
}

.chat-logo:hover {
  transform: scale(1.05) ;
}

/* Chat window */
.chat-window {
  position: relative ;
  width: 480px ;
  height: 650px ;
  border-radius: 12px ;
  background-color: white ;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2) ;
  display: flex ;
  flex-direction: column ;
  overflow: hidden ;
  animation: slideUp 0.3s ease-out ;
  border: none ;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Chat header */
.chat-header-centered {
  height: 100px ;
  width: 100% ;
  padding: 15px 20px ;
  background-color: #1976d2 ; /* Back to blue */
  color: white ;
  display: flex ;
  align-items: center ;
  position: relative ;
  z-index: 2 ;
}

.chat-logo-header {
  width: 80px ;
  height: 80px ;
  border-radius: 50% ;
  margin-right: 12px ;
  border: 2px solid white ;
  object-fit: cover ;
}

.chat-title {
  font-size: 22px ;
  font-weight: 600 ;
  color: #ffffff ;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) ;
}

/* Chat messages area */
.chat-messages {
  flex: 1 ;
  padding: 16px ;
  overflow-y: auto ;
  background-color: #f5f5f5 ;
}

/* Message styles */
.message {
  margin-bottom: 14px ;
  animation: fadeIn 0.3s ;
  overflow-wrap: break-word ;
}

.message-content {
  padding: 12px 16px ;
  border-radius: 18px ;
  display: inline-block ;
  max-width: 85% ;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) ;
  font-size: 15px ;
  line-height: 1.5 ;
}

.user-message {
  text-align: right;
}

.user-message .message-content {
  background-color: #1976d2 ; /* Back to blue */
  color: white ;
  border-bottom-right-radius: 4px ;
  margin-left: auto ;
}

.bot-message .message-content {
  background-color: white ; /* Back to white */
  color: #333 ;
  border-bottom-left-radius: 4px ;
  text-align: left ;
  border-left: none ; /* Remove the orange border */
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Input area */
.chat-input {
  padding: 14px 18px ;
  background-color: white ;
  border-top: 1px solid #eee ;
}

.input-wrapper {
  display: flex ;
  align-items: center ;
  background-color: #f5f5f5 ;
  border-radius: 22px ;
  padding: 10px 16px ;
  transition: box-shadow 0.3s ;
  border: 1px solid #e0e0e0 ;
}

.input-wrapper:focus-within {
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  border-color: #1976d2;
}

.input-wrapper input {
  flex: 1 ;
  border: none ;
  background: transparent ;
  outline: none ;
  padding: 7px 0 ;
  font-size: 15px ;
}

.send-button {
  width: 36px ;
  height: 36px ;
  border: none ;
  border-radius: 50% ;
  background-color: #1976d2 ;
  color: white ;
  margin-left: 8px ;
  cursor: pointer ;
  transition: background-color 0.2s ;
  font-size: 16px ;
}

.send-button:hover {
  background-color: #1565c0;
}

.send-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}

.close-btn {
  position: absolute ;
  top: 12px ;
  right: 16px ;
  background: transparent ;
  border: none ;
  color: #fff ;
  font-size: 20px ;
  cursor: pointer ;
  padding: 0 ;
  z-index: 3 ;
  transition: color 0.18s ;
}
.close-btn:hover {
  color: #ffb4b4;
}

.loading-message {
  background-color: #f1f3f4;
}

.loading-dots .dot {
  animation: loadingDots 1.5s infinite;
  opacity: 0;
  display: inline-block;
}

.loading-dots .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loadingDots {
  0%, 60%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  30% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.message.bot-message.loading-message.timeout-warning {
  background-color: #fef3c7 !important;
  border-left: 4px solid #f59e0b;
}

/* Navigation buttons */
.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
  margin-left: 12px;
  max-width: 90%;
}

.navigation-button {
  display: flex;
  align-items: center;
  background-color: #f0f7ff;
  border: 1px solid #d0e2ff;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.navigation-button:hover {
  background-color: #d0e2ff;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.navigation-button:active {
  transform: translateY(0px);
}

.navigation-icon, .fas {
  color: #1976d2;
  font-size: 16px;
  margin-right: 10px;
  min-width: 20px;
  text-align: center;
}

.navigation-info {
  display: flex;
  flex-direction: column;
}

.navigation-label {
  font-weight: 500;
  color: #1976d2;
  font-size: 14px;
}

.navigation-description {
  font-size: 12px;
  color: #666;
  margin-top: 2px;
}

.message-heading {
  font-weight: 600;
  margin-top: 12px;
  margin-bottom: 6px;
  color: #1976d2;
  font-size: 16px;
}

.message-section {
  font-weight: 700;
  margin-top: 16px;
  margin-bottom: 8px;
  color: #1565c0;
  font-size: 17px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 4px;
}

.message-list {
  margin: 8px 0;
  padding-left: 6px;
  border-left: 3px solid #e0e0e0;
}

.list-item {
  margin: 5px 0;
  padding-left: 8px;
}

.message-paragraph {
  margin-top: 8px;
  margin-bottom: 8px;
  line-height: 1.4;
}

/* Suggested questions area styles */
.suggested-questions-area {
  padding: 12px 15px 5px;
  background-color: #f5f9ff;
  border-top: 1px solid #e1e8f0;
  border-bottom: 1px solid #e1e8f0;
  margin-top: 5px;
}

.suggested-questions-horizontal-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 30px; /* Make space for both left and right buttons */
  margin: 0 auto;
}

.suggested-questions-horizontal {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 5px 0;
  -ms-overflow-style: none; /* Hide scrollbar in IE and Edge */
  scrollbar-width: none; /* Hide scrollbar in Firefox */
  scroll-behavior: smooth;
  cursor: grab;
  position: relative;
  /* Add a subtle fade effect for the right edge */
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
}

.suggested-questions-horizontal::-webkit-scrollbar {
  display: none; /* Hide scrollbar in Chrome, Safari and Opera */
}

.suggested-question-pill {
  background-color: #e8f4ff;
  color: #1976d2;
  border-radius: 18px;
  padding: 8px 14px;
  margin-right: 10px;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #cce4ff;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  position: relative;
}

.suggested-question-pill:hover {
  background-color: #d0e7ff;
  border-color: #a8d1ff;
  transform: translateY(-1px);
}

.suggested-question-pill:active {
  background-color: #b8daff;
  transform: translateY(0);
}

.scroll-indicator-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background-color: #ffffff;
  color: #1976d2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 14px;
  z-index: 10;
  border: 1px solid #e1e8f0;
  transition: all 0.2s ease;
  padding: 0;
  outline: none;
}

.scroll-indicator-button.scroll-left {
  left: 0;
}

.scroll-indicator-button.scroll-right {
  right: 0;
}

.scroll-indicator-button:hover {
  background-color: #1976d2;
  color: white;
}

.pill-spacer {
  flex-shrink: 0;
  width: 10px;
}

.suggested-question-pill:first-child {
  margin-left: 5px;
}

/* Message content styling for links */
.message-content a {
  color: #1976d2;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  padding: 0 2px;
  border-bottom: 1px dashed #1976d2;
}

.message-content a:hover {
  color: #1565c0;
  border-bottom: 1px solid #1565c0;
  background-color: rgba(25, 118, 210, 0.05);
}

.powered-by {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: #757575;
  font-style: italic;
}

/* Make chatbot responsive on mobile */
@media (max-width: 440px) {
  .chat-window {
    width: 98vw ;
    height: 80vh ;
    bottom: 70px ;
    right: 1vw ;
  }
}
</style> 