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
        <span class="chat-title">PetCare Trợ lý ảo </span>
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
            :class="['message', message.type === 'user' ? 'user-message' : 'bot-message', 
                    message.isBooking ? 'booking-success' : '',
                    message.isBookingFlow ? 'booking-flow' : '',
                    message.isLoading ? 'loading-message' : '']"
            :data-timeout="message.isTimeoutError"
          >
            <div class="message-content" @click="handleNavigationClick">
              <span v-if="message.type === 'user'">{{ message.content }}</span>
              <span v-else-if="message.isLoading" class="loading-dots">
                {{ message.content }} <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
              </span>
              <span v-else v-html="formatMessage(message.content)"></span>
            </div>
            
            <!-- Navigation buttons -->
            <div 
              v-if="message.navigationButtons && message.navigationButtons.length" 
              class="navigation-buttons"
            >
              <button 
                v-for="(button, buttonIndex) in message.navigationButtons" 
                :key="buttonIndex"
                @click="navigateTo(button.route)"
                class="nav-button"
              >
                {{ button.icon }} {{ button.text }}
              </button>
            </div>
          </div>
        </transition-group>
        
        <!-- Booking button -->
        <div v-if="showBookingButton" class="booking-button-container">
          <button @click="setBookingMessage" class="booking-button-centered">Đặt lịch tư vấn ngay</button>
        </div>
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
          >
          <button @click="sendMessage" class="send-button" :disabled="isProcessing || !userInput.trim()">
            <i class="fas" :class="isProcessing ? 'fa-spinner fa-spin' : 'fa-paper-plane'"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  name: 'Chatbot',
  data() {
    return {
      isOpen: false,
      userInput: '',
      messages: [
        {
          type: 'bot',
          content: 'Xin chào! Tôi là trợ lý ảo của PetCare. Tôi có thể giúp gì cho bạn? Nếu bạn muốn đặt lịch khám trực tiếp, hãy nhập "đặt lịch ngay"',
          showBookingButton: false
        }
      ],
      isBookingInProgress: false,
      showBookingButton: false,
      isProcessing: false,
      userId: null,
      lastInteractionId: null,
      feedbackGiven: false,
      hasShownBookingButton: false,
      reconnectAttempts: 0,
      maxReconnectAttempts: 3,
      serverBaseUrl: 'http://localhost:8000',
      isInputFocused: false,
      suggestedQuestions: [
        'Giá khám chó là bao nhiêu?',
        'Phòng khám mở cửa mấy giờ?',
        'Làm sao để đặt lịch khám?',
        'Bác sĩ nào giỏi nhất?'
      ]
    };
  },
  created() {
    // Generate or retrieve user ID
    this.userId = localStorage.getItem('chatbot_user_id') || this.generateUserId();
    localStorage.setItem('chatbot_user_id', this.userId);

    // Load chat history from localStorage if available
    this.loadChatHistory();
    
    // Fetch suggested questions from API
    this.fetchSuggestedQuestions();
    
    // Debounce scroll to bottom for performance
    this.debouncedScrollToBottom = debounce(this.scrollToBottom, 100);
  },
  mounted() {
    // Add horizontal scroll detection for touch devices
    this.$nextTick(() => {
      const container = document.querySelector('.suggested-questions-area .suggested-questions-horizontal');
      if (container) {
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
          isDown = true;
          container.style.cursor = 'grabbing';
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
          isDown = false;
          container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
          isDown = false;
          container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 2;
          container.scrollLeft = scrollLeft - walk;
        });
        
        // Add touch support
        container.addEventListener('touchstart', (e) => {
          startX = e.touches[0].pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
          if (!startX) return;
          const x = e.touches[0].pageX - container.offsetLeft;
          const walk = (x - startX) * 2;
          container.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        container.addEventListener('touchend', () => {
          startX = null;
        });
      }
    });
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      
      // Scroll to bottom when opening
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    sendMessage() {
      if (!this.userInput.trim() || this.isProcessing) return;
      
      const userMessage = this.userInput.trim();
      this.userInput = '';
      this.feedbackGiven = false;
      
      // Add user message to chat
      this.messages.push({
        type: 'user',
        content: userMessage
      });
      
      // Kiểm tra nếu tin nhắn của người dùng liên quan đến đặt lịch
      const userAskingAboutBooking = /đặt.*(lịch|hẹn|khám)|lịch.*(hẹn|khám)|hẹn.*khám|đăng ký.*khám|tư vấn.*trực tiếp/i.test(userMessage);
      
      // Chỉ hiển thị nút đặt lịch nếu chưa hiển thị bao giờ và người dùng hỏi về đặt lịch
      if (userAskingAboutBooking && !this.hasShownBookingButton) {
        this.showBookingButton = true;
        this.hasShownBookingButton = true;
      } else {
        this.showBookingButton = false;
      }
      
      // Add loading message
      const loadingMessageIndex = this.messages.length;
      this.messages.push({
        type: 'bot',
        content: 'Đang tìm kiếm thông tin...',
        isLoading: true
      });
      
      this.debouncedScrollToBottom();
      this.isProcessing = true;
      
      // Send message to API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      axios.post(`${this.serverBaseUrl}/api/chatbot/chat`, {
        message: userMessage,
        userId: this.userId
      }, {
        signal: controller.signal
      })
        .then(response => {
          clearTimeout(timeoutId);
          
          // Remove loading message
          this.messages.splice(loadingMessageIndex, 1);
          
          if (response.data.success) {
            // Check for error response
            const isErrorResponse = response.data.isError || false;
            
            // Check if response relates to booking
            const botMentionsBooking = /đặt.*(lịch|hẹn|khám)|lịch.*(hẹn|khám)|hẹn.*khám|đăng ký.*khám|tư vấn.*trực tiếp/i.test(response.data.message);
            
            // Show booking button only if it hasn't been shown before and the bot mentions booking
            if (botMentionsBooking && !this.hasShownBookingButton) {
              this.showBookingButton = true;
              this.hasShownBookingButton = true;
            }
            
            // Add response to chat
            this.messages.push({
              type: 'bot',
              content: response.data.message,
              navigationButtons: response.data.navigation_buttons || [],
              isTimeoutError: isErrorResponse
            });
            
            // Store last interaction id for feedback
            this.lastInteractionId = response.data.interaction_id;
            
            // Check for direct navigation
            if (response.data.direct_navigation) {
              this.$nextTick(() => {
                this.navigateTo(response.data.direct_navigation);
              });
            }
            
            // Save chat history to localStorage
            this.saveChatHistory();
          } else {
            this.handleError('Xin lỗi, có lỗi xảy ra khi xử lý tin nhắn của bạn.');
          }
        })
        .catch(error => {
          clearTimeout(timeoutId);
          
          // Remove loading message
          this.messages.splice(loadingMessageIndex, 1);
          
          if (error.name === 'AbortError') {
            this.handleError('Phản hồi mất quá nhiều thời gian. Vui lòng thử lại sau.');
          } else if (error.code === 'ERR_NETWORK') {
            this.handleNetworkError();
          } else {
            console.error('Error sending message:', error);
            this.handleError('Xin lỗi, tôi không thể kết nối với máy chủ. Vui lòng thử lại sau.');
          }
        })
        .finally(() => {
          this.isProcessing = false;
          this.debouncedScrollToBottom();
        });
    },
    handleError(message) {
      this.messages.push({
        type: 'bot',
        content: message,
        isTimeoutError: true
      });
    },
    handleNetworkError() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        this.handleError(`Kết nối bị gián đoạn. Đang thử kết nối lại (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        
        // Try to reconnect after a delay
        setTimeout(() => {
          this.sendMessage();
        }, 2000 * this.reconnectAttempts);
      } else {
        this.handleError('Không thể kết nối với máy chủ sau nhiều lần thử. Vui lòng kiểm tra kết nối mạng của bạn và thử lại sau.');
        this.reconnectAttempts = 0;
      }
    },
    formatMessage(message) {
      if (!message) return '';
      
      if (message.includes('<br>')) {
        // Đã có thẻ HTML từ server, trả về nguyên dạng
        return message;
      }
      
      // Convert URLs to links
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      message = message.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
      
      // Tự động chia tin nhắn dài thành các phần nhỏ hơn
      const maxLength = 500; // Độ dài tối đa cho một phần
      
      if (message.length > maxLength) {
        // Chia tin nhắn theo dấu xuống dòng
        const parts = message.split('\n');
        let result = '';
        let currentPart = '';
        let inList = false;
        
        parts.forEach((part, index) => {
          // Tạo dấu phân cách giữa các đoạn tin nhắn
          if (part.startsWith('•') || part.startsWith('-') || part.startsWith('*')) {
            // Bắt đầu danh sách nếu chưa có
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
            // Kết thúc danh sách nếu đang ở trong
            if (inList) {
              result += '</div>';
              inList = false;
            }
            
            // Xử lý tiêu đề
            if (currentPart.length > 0) {
              result += '<div class="message-paragraph">' + currentPart + '</div>';
              currentPart = '';
            }
            
            // Kiểm tra nếu phần này là phần bắt đầu của một mục mới (ví dụ: "Phần 1: Giới thiệu")
            if (part.match(/^(Phần|Mục|Chương|Bước) \d+:/i)) {
              result += '<div class="message-section">' + part + '</div>';
            } else {
              result += '<div class="message-heading">' + part + '</div>';
            }
          } else if (part.trim() === '') {
            // Kết thúc danh sách nếu đang ở trong
            if (inList) {
              result += '</div>';
              inList = false;
            }
            
            // Nếu là dòng trống, thêm dòng trống
            if (currentPart.length > 0) {
              result += '<div class="message-paragraph">' + currentPart + '</div>';
              currentPart = '';
            }
          } else {
            // Kết thúc danh sách nếu đang ở trong
            if (inList) {
              result += '</div>';
              inList = false;
            }
            
            // Nếu là đoạn văn bản thông thường
            if (currentPart.length > 0) {
              currentPart += '<br>' + part;
            } else {
              currentPart = part;
            }
            
            // Nếu đoạn hiện tại quá dài, thêm vào kết quả
            if (currentPart.length > maxLength/2) {
              result += '<div class="message-paragraph">' + currentPart + '</div>';
              currentPart = '';
            }
          }
        });
        
        // Kết thúc danh sách nếu vẫn đang ở trong
        if (inList) {
          result += '</div>';
        }
        
        // Thêm phần còn lại vào kết quả
        if (currentPart.length > 0) {
          result += '<div class="message-paragraph">' + currentPart + '</div>';
        }
        
        return result;
      }
      
      // Đối với tin nhắn ngắn, chỉ thay thế xuống dòng
      return message.replace(/\n/g, '<br>');
    },
    scrollToBottom() {
      if (this.$refs.chatMessages) {
        const container = this.$refs.chatMessages;
        container.scrollTop = container.scrollHeight;
      }
    },
    navigateTo(route) {
      if (route.startsWith('/')) {
        this.$router.push(route);
      } else {
        window.open(route, '_blank');
      }
    },
    handleNavigationClick(event) {
      // Handle link clicks
      if (event.target && event.target.tagName === 'A') {
        const href = event.target.getAttribute('href');
        
        // Handle internal links
        if (href && href.startsWith('/')) {
          event.preventDefault();
          this.navigateTo(href);
        }
      }
    },
    setBookingMessage() {
      this.userInput = 'đặt lịch ngay';
      this.sendMessage();
    },
    generateUserId() {
      return 'user_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    },
    sendFeedback(isHelpful) {
      if (!this.lastInteractionId) return;
      
      this.isProcessing = true;
      
      axios.post(`${this.serverBaseUrl}/api/chatbot/feedback`, {
        interaction_id: this.lastInteractionId,
        is_helpful: isHelpful,
        userId: this.userId
      })
        .then(() => {
          this.feedbackGiven = true;
          this.messages.push({
            type: 'bot',
            content: isHelpful ? 'Cảm ơn bạn đã đánh giá tích cực!' : 'Cảm ơn bạn đã đánh giá. Tôi sẽ cải thiện để phục vụ bạn tốt hơn!',
            isSystem: true
          });
          this.saveChatHistory();
        })
        .catch(error => {
          console.error('Error sending feedback:', error);
        })
        .finally(() => {
          this.isProcessing = false;
          this.debouncedScrollToBottom();
        });
    },
    saveChatHistory() {
      // Don't save more than 20 messages
      const historyToSave = this.messages.slice(-20);
      
      // Don't save loading messages
      const filteredHistory = historyToSave.filter(msg => !msg.isLoading);
      
      localStorage.setItem('petcare_chat_history', JSON.stringify({
        messages: filteredHistory,
        timestamp: Date.now()
      }));
    },
    loadChatHistory() {
      const savedHistory = localStorage.getItem('petcare_chat_history');
      
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          
          // Only load history if it's less than 24 hours old
          const isRecent = (Date.now() - parsedHistory.timestamp) < 24 * 60 * 60 * 1000;
          
          if (isRecent && Array.isArray(parsedHistory.messages) && parsedHistory.messages.length > 0) {
            this.messages = parsedHistory.messages;
          }
        } catch (error) {
          console.error('Error loading chat history:', error);
        }
      }
    },
    fetchSuggestedQuestions() {
      // First set default questions while loading from API
      this.suggestedQuestions = [
        'Giá khám chó là bao nhiêu?',
        'Phòng khám mở cửa mấy giờ?',
        'Làm sao để đặt lịch khám?',
        'Bác sĩ nào giỏi nhất?',
        'Thú cưng có tiêm phòng?'
      ];
      
      axios.get(`${this.serverBaseUrl}/api/chatbot/suggested-questions`)
        .then(response => {
          console.log('Fetched suggested questions:', response.data);
          if (response.data.success && response.data.data && response.data.data.length > 0) {
            this.suggestedQuestions = response.data.data;
          }
        })
        .catch(error => {
          console.error('Error fetching suggested questions:', error);
          // Already using default questions set above
        });
    },
    selectSuggestedQuestion(question) {
      this.userInput = question;
      this.sendMessage();
    },
    scrollSuggestions() {
      const container = this.$refs.suggestionsContainer;
      if (container) {
        container.scrollLeft += 200; // Adjust the scroll amount as needed
      }
    },
    scrollSuggestionsLeft() {
      const container = this.$refs.suggestionsContainer;
      if (container) {
        container.scrollLeft -= 200; // Adjust the scroll amount as needed
      }
    }
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 40px;
  z-index: 1000;
}

.chat-logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  cursor: pointer;
  border: 3px solid #fff;
  background: #fff;
  object-fit: cover;
  transition: transform 0.2s, box-shadow 0.2s;
}
.chat-logo:hover {
  transform: scale(1.08);
  box-shadow: 0 4px 16px rgba(25,118,210,0.3);
}

.chat-window {
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 16px 16px 16px 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  animation: fadeInLeft 0.3s;
  position: absolute;
  right: 0;
  left: auto;
  bottom: 0;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}

.chat-header-centered {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  background: #1976d2;
  color: #fff;
  border-radius: 16px 16px 0 0;
  min-height: 56px;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(25,118,210,0.08);
  position: relative;
  z-index: 2;
}

.chat-logo-header {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid #fff;
  background: #fff;
  cursor: default;
  transition: none;
  margin: 0;
  margin-left: 0;
}

.chat-logo-header:hover {
  transform: none;
  box-shadow: none;
}

.chat-title {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(25,118,210,0.13);
}

.chat-messages {
  flex-grow: 1;
  max-height: 320px;
  overflow-y: auto;
  padding: 15px;
  background: #f9f9f9;
  scrollbar-width: thin;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2);
  border-radius: 3px;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
}

.user-message {
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}

.bot-message {
  margin-right: auto;
  margin-left: 0;
  text-align: left;
}

.message-content {
  padding: 10px 15px;
  border-radius: 15px;
  display: inline-block;
  white-space: pre-line; /* Preserve line breaks in the text */
}

.user-message .message-content {
  background-color: #1976d2;
  color: white;
}

.bot-message .message-content {
  background-color: #f0f0f0;
  color: black;
  max-width: 100%;
  overflow-wrap: break-word;
  white-space: normal; /* Cho phép text xuống dòng tự nhiên */
  line-height: 1.5;
  font-size: 14px;
}

/* Style cho luồng đặt lịch */
.message.bot-message.booking-flow .message-content {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  font-weight: 500;
}

/* Style cho xác nhận đặt lịch thành công */
.message.bot-message.booking-success .message-content {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  font-weight: 500;
}

/* Thêm CSS cho thông báo timeout */
.message.bot-message .message-content {
  position: relative;
  overflow: hidden;
}

.bot-message[data-timeout="true"] .message-content {
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  font-weight: 500;
  padding-left: 12px;
}

.chat-input {
  padding: 15px;
  display: flex;
  background-color: #fff;
}

.input-wrapper {
  display: flex;
  width: 100%;
  gap: 10px;
}

.input-wrapper input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.input-wrapper input:focus {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
}

.send-button {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-button:hover {
  background-color: #1565c0;
}

.send-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  padding: 0;
  z-index: 3;
  transition: color 0.18s;
}
.close-btn:hover {
  color: #ffb4b4;
}

.booking-button {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
  display: inline-block;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.booking-button:hover {
  background-color: #1565c0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
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

/* Nút đặt lịch ở giữa màn hình */
.booking-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;
  animation: fadeInUp 0.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.booking-button-centered {
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.booking-button-centered:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%);
  transform: translateX(-100%);
  transition: all 0.8s ease;
}

.booking-button-centered:hover {
  background-color: #1565c0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transform: translateY(-2px);
}

.booking-button-centered:hover:before {
  transform: translateX(100%);
}

.booking-button-centered:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

.loading-message {
  background-color: #f1f3f4;
}

.loading-dots .dot {
  animation: loadingDots 1.5s infinite;
  opacity: 0;
  display: inline-block;
}

.loading-dots .dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots .dot:nth-child(2) {
  animation-delay: 0.5s;
}

.loading-dots .dot:nth-child(3) {
  animation-delay: 1s;
}

@keyframes loadingDots {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Định dạng cho liên kết trong tin nhắn */
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

.message-content a:active {
  color: #0d47a1;
}

/* Định dạng cho nội dung nhấn mạnh trong tin nhắn */
.message-content b {
  font-weight: 600;
  color: #333;
}

/* Định dạng cho cảnh báo */
.message-content b:has(+ b) {
  color: #e91e63;
}

/* Nổi bật các cảnh báo khẩn cấp */
.message-content b:contains("KHẨN CẤP"),
.message-content b:contains("CẤP CỨU") {
  color: #f44336;
  background-color: rgba(244, 67, 54, 0.1);
  padding: 0 4px;
  border-radius: 2px;
}

.navigation-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.nav-button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #e0e0e0;
}

/* Suggested questions */
.suggested-questions {
  padding: 8px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
}

.suggested-title {
  font-size: 12px;
  color: #777;
  margin-bottom: 5px;
}

.suggested-question {
  font-size: 13px;
  color: #1976d2;
  padding: 5px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.suggested-question:hover {
  background-color: #e3f2fd;
}

.suggested-question:last-child {
  border-bottom: none;
}

/* Fade animation for messages */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Thích ứng cho màn hình nhỏ */
@media (max-width: 450px) {
  .chat-window {
    width: 320px;
    height: 450px;
    right: -20px;
  }
  
  .chatbot-container {
    bottom: 15px;
    right: 30px;
  }
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
</style> 