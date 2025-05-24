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
                @click="handleNavigation(option.path || option.route, option)"
                class="navigation-button"
              >
                <i :class="['fas', getIconForRoute(option.path || option.route)]"></i>
                <div class="navigation-info">
                  <div class="navigation-label">{{ option.label || option.text }}</div>
                  <div class="navigation-description">{{ option.description || getDescriptionForRoute(option.path || option.route) }}</div>
                </div>
              </div>
            </div>
            
            <!-- NEW: Dịch vụ buttons display -->
            <div v-if="message.serviceButtons && message.serviceButtons.length > 0" class="service-buttons-container">
              <h4 class="service-category-title">Dịch vụ của phòng khám:</h4>
              <div class="service-buttons">
                <div 
                  v-for="(button, btnIndex) in message.serviceButtons" 
                  :key="btnIndex"
                  @click="handleServiceButtonClick(button)"
                  :class="['service-button', {'service-category': button.type === 'service_category'}]"
                  v-show="!button.hidden || selectedCategory === button.category"
                >
                  <div class="service-button-content">
                    <!-- Fix: Chỉ hiển thị icon khi có và là text đơn giản -->
                    <span v-if="button.icon && button.icon.length < 3" class="service-icon">{{ button.icon }}</span>
                    <div class="service-info">
                      <div class="service-name">{{ button.text }}</div>
                      <div v-if="button.price" class="service-price">{{ button.price }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- NEW: Day selection buttons -->
            <div v-if="message.dayButtons && message.dayButtons.length > 0" class="day-buttons-container">
              <h4 class="day-selection-title">Chọn ngày khám:</h4>
              <div class="day-buttons">
                <div 
                  v-for="(day, dayIndex) in message.dayButtons" 
                  :key="dayIndex"
                  @click="selectDay(day, message.service)"
                  :class="['day-button', {'selected': selectedDate === day.date}]"
                >
                  <div class="day-button-content">
                    <div class="day-name">{{ day.dayName }}</div>
                    <div class="day-date">{{ day.displayDate }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- NEW: Time slots display -->
            <div v-if="message.timeSlots && message.timeSlots.length > 0" class="time-slots-container">
              <h4 class="time-slots-title">Khung giờ trống: {{ formatDate(message.date) }}</h4>
              <div class="time-slots">
                <div 
                  v-for="(slot, slotIndex) in message.timeSlots" 
                  :key="slotIndex"
                  @click="selectTimeSlot(slot, message.service)"
                  :class="[
                    'time-slot', 
                    { 
                      'selected': selectedTimeSlot && selectedTimeSlot.id === slot.id,
                      'past-time': isPastTime(slot.khung_gio, message.date)
                    }
                  ]"
                  :disabled="isPastTime(slot.khung_gio, message.date) || (message.slotInfo[slot.id] || 0) >= 2"
                >
                  <div class="time-slot-info">
                    <div class="time-slot-time">{{ slot.khung_gio }}</div>
                    <div class="time-slot-details">
                      <div class="time-slot-availability">
                        <span v-if="isPastTime(slot.khung_gio, message.date)" class="badge bg-secondary">Đã qua</span>
                        <span v-else-if="(message.slotInfo[slot.id] || 0) >= 2" class="badge bg-danger">Đã đầy</span>
                        <span v-else class="badge bg-success">{{ message.slotInfo[slot.id] || 0 }}/2 đã đặt</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedTimeSlot" class="time-slot-actions">
                <button class="btn btn-primary" @click="showBookingSummary()">
                  Tiếp tục đặt lịch
                </button>
              </div>
            </div>
            
            <!-- NEW: Pet selection for booking -->
            <div v-if="message.petSelection && message.pets && message.pets.length > 0" class="pet-selection-container">
              <h4 class="pet-selection-title">Chọn thú cưng cho lịch khám:</h4>
              <div class="pets-list">
                <div 
                  v-for="(pet, petIndex) in message.pets" 
                  :key="petIndex"
                  @click="selectPet(pet)"
                  :class="['pet-item', {'selected': selectedPet && selectedPet.id === pet.id}]"
                >
                  <i class="fas fa-paw"></i>
                  <div class="pet-info">
                    <div class="pet-name">{{ pet.ten_pet }}</div>
                    <div class="pet-details">{{ pet.giong }} • {{ getPetAge(pet.ngay_sinh) }}</div>
                  </div>
                </div>
              </div>
              <div class="booking-actions">
                <button @click="confirmPetSelection" class="confirm-booking-btn" :disabled="!selectedPet">Xác nhận</button>
                <button @click="cancelPetSelection" class="cancel-booking-btn">Hủy</button>
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
        </div>
      </div>
    </div>
  
  <!-- Modal xác nhận đặt lịch -->
  <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="confirmModalLabel">Xác nhận thông tin đặt lịch</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Đóng"></button>
        </div>
        <div class="modal-body">
          <p><strong>Dịch vụ:</strong> {{ selectedService ? (selectedService.ten_dv || selectedService.text) : '...' }}</p>
          <p><strong>Giá:</strong> {{ selectedService ? (selectedService.gia || 0).toLocaleString('vi-VN') : '0' }} VNĐ</p>
          <p><strong>Tiền cọc:</strong> {{ tienCoc.toLocaleString('vi-VN') }} VNĐ</p>
          <p><strong>Pet:</strong> {{ selectedPet ? selectedPet.ten_pet : '...' }}</p>
          <p><strong>Ngày:</strong> {{ selectedDate ? formatDate(selectedDate) : '...' }}</p>
          <p><strong>Giờ:</strong> {{ selectedTimeSlot ? selectedTimeSlot.khung_gio : '...' }}</p>
          <p><strong>Phương thức thanh toán:</strong> PayPal</p>
          <div class="alert alert-info mt-3">
            <small>Bạn sẽ được chuyển đến màn hình thanh toán PayPal sau khi xác nhận. Vui lòng hoàn tất thanh toán tiền cọc để xác nhận lịch hẹn.</small>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
          <button type="button" class="btn btn-success" @click="processPayment()">Tiếp tục thanh toán</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal thanh toán PayPal -->
  <div class="modal fade" id="paypalModal" tabindex="-1" aria-labelledby="paypalModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content shadow-lg border-0 rounded-4">
        <div class="modal-header bg-primary text-white py-3 px-4">
          <h4 class="modal-title fw-bold" id="paypalModalLabel">
            <i class="fa-solid fa-wallet me-2"></i>Thanh toán tiền cọc
          </h4>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body px-4 py-4">
          <div class="text-center mb-4">
            <h5 class="fw-bold text-secondary fs-4">Thông tin dịch vụ</h5>
            <p class="fs-5 mb-2"><strong>Tên dịch vụ:</strong> {{ selectedService ? (selectedService.ten_dv || selectedService.text) : '...' }}</p>
            <p class="fs-5 mb-2"><strong>Giá dịch vụ:</strong> <span class="text-success fw-bold">{{ selectedService ? (selectedService.gia || 0).toLocaleString('vi-VN') : '0' }} VNĐ</span></p>
            <p class="fs-5 mb-2"><strong>Tiền cọc (25%):</strong> <span class="text-danger fw-bold">{{ tienCoc.toLocaleString('vi-VN') }} VNĐ</span></p>
            <div class="alert alert-secondary p-3 mt-3">
              <h6 class="fw-bold">Chi tiết lịch hẹn:</h6>
              <p class="mb-1"><strong>Thú cưng:</strong> {{ selectedPet ? selectedPet.ten_pet : '...' }}</p>
              <p class="mb-1"><strong>Ngày khám:</strong> {{ selectedDate ? formatDate(selectedDate) : '...' }}</p>
              <p class="mb-1"><strong>Giờ khám:</strong> {{ selectedTimeSlot ? selectedTimeSlot.khung_gio : '...' }}</p>
            </div>
            <div class="border-top pt-3">
              <p class="text-muted fst-italic fs-6">Vui lòng thanh toán tiền cọc để hoàn tất đặt lịch.</p>
            </div>
          </div>
          <div id="paypal-button-container" class="d-flex justify-content-center"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="powered-by">
    <span>© 2024 PetCare - Trợ lý thông minh</span>
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
        // Thông tin cơ bản về phòng khám
        'Phòng khám mở cửa từ mấy giờ đến mấy giờ?',
        'Chi phí khám tổng quát cho chó/mèo là bao nhiêu?',
        'Địa chỉ chính xác của phòng khám PetCare ở đâu?',
        'Phòng khám có làm việc vào Chủ nhật không?',
        
        // Dịch vụ
        'Tôi muốn đặt lịch khám cho thú cưng',
        'Dịch vụ spa cho thú cưng bao gồm những gì?',
        'Chi phí tiêm phòng đầy đủ cho mèo con?',
        
        // Sức khỏe và khẩn cấp
        'Chó tôi bị tiêu chảy và nôn, tôi nên làm gì?',
        'Dấu hiệu khẩn cấp cần đưa thú cưng đi bác sĩ?',
        'Số điện thoại cấp cứu thú cưng 24/7?'
      ],
      projectAnalysis: null,
      currentBookingState: null,
      abortController: null,
      isLoggedIn: false, // Track login status
      sessionInfo: null,  // Store session information
      
      // NEW: Data properties for booking service
      selectedCategory: null,
      selectedService: null,
      selectedTimeSlot: null,
      selectedPet: null,
      selectedDate: null,
      bookingDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      bookingNotes: '',
      bookingState: {
        step: 0, // 0: not started, 1: service selected, 2: day selected, 3: time selected, 4: pet selected, 5: confirmed
        serviceId: null,
        timeSlotId: null,
        petId: null,
        date: null
      },
      tienCoc: 0,
      paypalLoaded: false,
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
  mounted() {
    // Add modal event listeners
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      confirmModal.addEventListener('hidden.bs.modal', () => {
        this.$forceUpdate();
      });
    }
    
    const paypalModal = document.getElementById('paypalModal');
    if (paypalModal) {
      paypalModal.addEventListener('hidden.bs.modal', () => {
        this.$forceUpdate();
      });
      
      paypalModal.addEventListener('shown.bs.modal', () => {
        this.initializePayPalButtons();
      });
    }
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
      
      const userMessage = this.userInput.trim();
      this.userInput = '';
      
      // Add user message to chat
      this.addMessage({
        role: 'user',
        content: userMessage
      });
      
      // Check if message is a booking request
      if (this.isBookingRequest(userMessage)) {
        this.handleBookingRequest();
        return;
      }
      
      // Normal message flow
      this.isProcessing = true;
      
      // Add loading message
      this.addMessage({
        role: 'assistant',
        content: 'Đang xử lý...',
        isLoading: true
      });
      
      // Create abort controller for request
      this.abortController = new AbortController();
      
      // Send message to server
      OllamaService.sendMessage(userMessage, this.userId, { signal: this.abortController.signal })
        .then(response => {
          // Remove loading message
          this.messages.pop();
          
          if (response.data && response.data.success) {
            // Add bot response
            const botMessage = {
              role: 'assistant',
              content: response.data.message,
            };
            
            // Add navigation buttons if available
            if (response.data.navigation_buttons && response.data.navigation_buttons.length > 0) {
              botMessage.navigationOptions = response.data.navigation_buttons.map(button => {
                return {
                  label: button.text,
                  path: button.route,
                  description: button.description || ''
                };
              });
            }
            
            // Handle direct navigation
            if (response.data.direct_navigation) {
              botMessage.navigationOptions = [
                {
                  label: 'Chuyển đến trang yêu cầu',
                  path: response.data.direct_navigation,
                  description: 'Chuyển đến trang bạn đã yêu cầu'
                }
              ];
            }
            
            // Add the message
            this.addMessage(botMessage);
            
            // Save interaction ID for feedback
            if (response.data.interaction_id) {
            this.lastInteractionId = response.data.interaction_id;
              this.feedbackGiven = false;
            }
          } else {
            this.addMessage({
              role: 'assistant',
              content: 'Xin lỗi, tôi đang gặp vấn đề. Vui lòng thử lại sau.'
            });
          }
          
          this.isProcessing = false;
          this.saveLocalChatHistory(); // Save history after each message
        })
        .catch(error => {
          console.error('Error sending message:', error);
          
          // Remove loading message
          this.messages.pop();
          
          // Only show error if not aborted by user
          if (error.name !== 'AbortError') {
            this.addMessage({
              role: 'assistant',
              content: 'Đã xảy ra lỗi. Vui lòng thử lại sau.'
            });
          }
          
          this.isProcessing = false;
        });
    },
    
    /**
     * Check if a message is a booking request
     */
    isBookingRequest(message) {
      const bookingKeywords = [
        'đặt lịch', 'đặt hẹn', 'đặt khám', 'book lịch', 'hẹn khám', 'đặt lịch ngay',
        'đặt dịch vụ', 'đặt spa', 'đặt tiêm', 'đặt lịch tiêm', 'đặt lịch khám', 'đặt lịch spa'
      ];
      
      message = message.toLowerCase();
      
      for (const keyword of bookingKeywords) {
        if (message.includes(keyword)) {
          return true;
        }
      }
      
      return false;
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
      // Không gọi API nếu không cần thiết vì route không tồn tại
      console.log('Connection check skipped - route not available');
      
      // Giả lập kết nối thành công
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
    
    handleNavigation(path, option = null) {
      if (!path) return;
      
      // Nếu có option đầy đủ và có action
      if (option && option.action) {
        option.action();
        return;
      }
      
      // Nếu path là '#', đây là special handler
      if (path === '#') {
        // Do nothing, path chỉ là placeholder
        return;
      }
      
      // If path is a URL, open in new tab
      if (path.startsWith('http')) {
        window.open(path, '_blank');
      } else {
        // Use router for internal links
        this.$router.push(path);
      }
    },
    
    // Update navigation options handler for time slot options
    handleNavigationClick(event) {
      // Check if clicked element is a link
      if (event.target.tagName === 'A') {
        // Link handling is done by the browser
        return;
      }
    },

    generateNavigationButtons(options) {
      // Convert options to standardized format
      return options.map(option => {
        return {
          label: option.label || option.text,
          path: option.path || option.route,
          description: option.description || '',
          action: option.action || null
        };
      });
    },
    
    checkOllamaStatus() {
      // Không gọi API nếu không cần thiết
      // Route này không tồn tại trong backend
      console.log('Ollama status check skipped - route not available');
      return Promise.resolve({ data: { success: true, status: 'mocked' } });
    },
    
    analyzeProject() {
      // Không gọi API nếu không cần thiết
      // Route này không tồn tại trong backend
      console.log('Project analysis skipped - route not available');
      
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
      
      return Promise.resolve({ data: this.projectAnalysis });
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
    },
    
    /**
     * Xử lý khi người dùng nhập "đặt lịch ngay" hoặc tương tự
     */
    handleBookingRequest() {
      // Fetch services and display as buttons
      this.fetchServices();
    },
    
    /**
     * Lấy danh sách dịch vụ từ API
     */
    fetchServices() {
      // Add loading message
      this.addMessage({
        role: 'assistant',
        content: 'Đang tải danh sách dịch vụ...',
        isLoading: true
      });
      
      // Call API to get services
      OllamaService.getServices()
        .then(response => {
          // Remove loading message
          this.messages.pop();
          
          if (response.data && response.data.success) {
            // Reset booking state
            this.bookingState = {
              step: 0,
              serviceId: null,
              timeSlotId: null,
              petId: null,
              date: this.bookingDate
            };
            
            // Add message with service buttons
            this.addMessage({
              role: 'assistant',
              content: 'Vui lòng chọn loại dịch vụ bạn muốn đặt lịch:',
              serviceButtons: response.data.service_buttons
            });
          } else {
            this.addMessage({
              role: 'assistant',
              content: 'Xin lỗi, không thể tải danh sách dịch vụ. Vui lòng thử lại sau hoặc liên hệ phòng khám trực tiếp.'
            });
          }
        })
        .catch(error => {
          console.error('Error fetching services:', error);
          this.messages.pop(); // Remove loading message
          this.addMessage({
            role: 'assistant',
            content: 'Đã xảy ra lỗi khi tải danh sách dịch vụ. Vui lòng thử lại sau.'
          });
        });
    },
    
    /**
     * Xử lý khi người dùng click vào một nút dịch vụ
     */
    handleServiceButtonClick(button) {
      if (button.type === 'service_category') {
        // Handle category click
        this.selectedCategory = button.category;
        // Show all services in this category
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].serviceButtons) {
            this.messages[i].serviceButtons.forEach(btn => {
              if (btn.category === button.category) {
                btn.hidden = false;
              } else if (btn.type === 'service') {
                btn.hidden = true;
              }
            });
          }
        }
      } else {
        // Handle service selection
        this.selectedService = button;
        this.bookingState.step = 1;
        this.bookingState.serviceId = button.service_id;
        
        // Add message to confirm service selection
        this.addMessage({
          role: 'user',
          content: `Tôi muốn đặt lịch dịch vụ: ${button.text}`
        });
        
        // Show day selection buttons
        this.showDaySelectionButtons(button.service_id);
      }
    },
    
    /**
     * Hiển thị các nút chọn ngày trong tuần
     */
    showDaySelectionButtons(serviceId) {
      // Add loading message
      this.addMessage({
        role: 'assistant',
        content: 'Đang tải ngày khám...',
        isLoading: true
      });
      
      // Sử dụng danh sách ngày cố định
      const dayButtons = this.createSpecificDays();
      
      // Remove loading message
      this.messages.pop();
      
      // Add message with day selection buttons
      this.addMessage({
        role: 'assistant',
        content: `Vui lòng chọn ngày khám cho dịch vụ "${this.selectedService.text}":`,
        dayButtons: dayButtons,
        service: this.selectedService
      });
    },
    
    /**
     * Chọn ngày khám
     */
    selectDay(day, service) {
      // Log để debug
      console.log('Đã chọn ngày:', day);
      console.log('Date string:', day.date);
      
      this.selectedDate = day.date;
      this.bookingState.step = 2;
      this.bookingState.date = day.date;
      
      // Add message to confirm day selection
      this.addMessage({
        role: 'user',
        content: `Tôi muốn đặt lịch vào ngày: ${this.formatDate(day.date)}`
      });
      
      // Hiển thị chọn thú cưng trước khi chọn giờ
      this.showPetSelection(service);
    },

    /**
     * Hiển thị chọn pet sau khi chọn ngày
     */
    async showPetSelection(service) {
      // Nếu đã chọn thú cưng rồi thì không cần hiển thị lại
      if (this.selectedPet) {
        // Nếu đã có khung giờ thì hiển thị tổng hợp thông tin đặt lịch
        if (this.selectedTimeSlot) {
          this.showBookingSummary();
          return;
        }
        
        // Nếu chưa có khung giờ thì tiếp tục hiển thị khung giờ
        if (service && this.selectedDate) {
          this.fetchTimeSlots(service.id || service.service_id, this.selectedDate);
          return;
        }
      }
      
      // Add loading message
      this.addMessage({
        role: 'assistant',
        content: 'Đang tải danh sách thú cưng của bạn...',
        isLoading: true
      });
      
      // Check if user is logged in
      const token = localStorage.getItem('token_client') || localStorage.getItem('auth_token');
      if (!token) {
        this.messages.pop(); // Remove loading
        this.addMessage({
          role: 'assistant',
          content: 'Bạn cần đăng nhập để chọn thú cưng và đặt lịch.',
          navigationOptions: [
            {
              label: 'Đăng nhập ngay',
              path: '/client/dang-nhap-dang-ky',
              description: 'Đăng nhập để đặt lịch'
            }
          ]
        });
        return;
      }
      
      try {
        // Get user pets
        const res = await OllamaService.getUserPets();
        console.log('Pet response:', res.data); // Debug log
        
        this.messages.pop(); // Remove loading
        
        if (res.data && res.data.success && res.data.pets && res.data.pets.length > 0) {
          this.addMessage({
            role: 'assistant',
            content: 'Vui lòng chọn thú cưng để đặt lịch:',
            petSelection: true,
            pets: res.data.pets,
            service: service
          });
        } else {
          this.addMessage({
            role: 'assistant',
            content: 'Bạn chưa có thú cưng nào. Vui lòng thêm thú cưng trước khi đặt lịch.',
            navigationOptions: [
              {
                label: 'Thêm thú cưng',
                path: '/client/quan-ly-pet',
                description: 'Thêm thú cưng mới'
              }
            ]
          });
        }
      } catch (err) {
        console.error('Error loading pets:', err);
        this.messages.pop();
        this.addMessage({
          role: 'assistant',
          content: 'Không thể tải danh sách thú cưng. Vui lòng đảm bảo bạn đã đăng nhập và thử lại.'
        });
      }
    },

    /**
     * Xác nhận chọn pet và chuyển sang chọn khung giờ
     */
    confirmPetSelection() {
      if (!this.selectedPet) {
        this.addMessage({
          role: 'assistant',
          content: 'Vui lòng chọn một thú cưng trước khi tiếp tục.'
        });
        return;
      }
      
      // Xóa message chọn pet
      const idx = this.messages.findIndex(m => m.petSelection);
      if (idx !== -1) {
        const service = this.messages[idx].service;
        this.messages.splice(idx, 1);
        
        // Thêm message xác nhận
        this.addMessage({
          role: 'user',
          content: `Tôi chọn thú cưng: ${this.selectedPet.ten_pet || this.selectedPet.name || 'Thú cưng đã chọn'}`
        });
        
        // Tiếp tục quy trình đặt lịch - hiển thị khung giờ
        if (service && this.selectedDate) {
          this.fetchTimeSlots(service.id || service.service_id, this.selectedDate);
        } else {
          this.addMessage({
            role: 'assistant',
            content: 'Có lỗi xảy ra. Vui lòng thử lại từ đầu.'
          });
        }
      }
    },

    /**
     * Hủy chọn pet
     */
    cancelPetSelection() {
      this.selectedPet = null;
      // Xóa message chọn pet
      const idx = this.messages.findIndex(m => m.petSelection);
      if (idx !== -1) this.messages.splice(idx, 1);
      this.$forceUpdate();
    },

    /**
     * Hủy quá trình đặt lịch
     */
    cancelBooking() {
      // Reset các giá trị đã chọn
      this.selectedService = null;
      this.selectedTimeSlot = null;
      this.selectedPet = null;
      this.selectedDate = null;
      this.bookingNotes = '';
      
      this.addMessage({
        role: 'user',
        content: 'Tôi muốn hủy đặt lịch'
      });
      
      this.addMessage({
        role: 'assistant',
        content: 'Đã hủy quá trình đặt lịch. Bạn có thể đặt lịch lại bất cứ lúc nào.'
      });
    },

    /**
     * Tiến hành đặt lịch khi đã chọn khung giờ và pet
     */
    async proceedToBooking(service) {
      if (!this.selectedTimeSlot) {
        this.addMessage({
          role: 'assistant',
          content: 'Vui lòng chọn khung giờ trước khi đặt lịch.'
        });
        return;
      }
      
      // Thêm message đang xử lý
      this.addMessage({
        role: 'user',
        content: 'Tôi xác nhận đặt lịch'
      });
      
      const userId = localStorage.getItem('id_khach_hang');
      if (!userId) {
        this.addMessage({
          role: 'assistant',
          content: 'Bạn cần đăng nhập để đặt lịch. Vui lòng đăng nhập trước khi tiếp tục.',
          navigationOptions: [
            {
              label: 'Đăng nhập ngay',
              path: '/client/dang-nhap-dang-ky',
              description: 'Đăng nhập để đặt lịch'
            }
          ]
        });
        return;
      }
      
      // Nếu chưa chọn thú cưng, hiển thị danh sách thú cưng để chọn
      if (!this.selectedPet) {
        try {
          this.addMessage({
            role: 'assistant',
            content: 'Đang tải danh sách thú cưng...',
            isLoading: true
          });
          
          const res = await OllamaService.getUserPets();
          
          // Remove loading message
          this.messages.pop();
          
          if (res.data && res.data.success && res.data.pets && res.data.pets.length > 0) {
            // Hiển thị UI chọn thú cưng
            this.addMessage({
              role: 'assistant',
              content: 'Vui lòng chọn thú cưng cho lịch khám:',
              petSelection: true,
              pets: res.data.pets,
              service: service
            });
            return;
          } else {
            this.addMessage({
              role: 'assistant',
              content: 'Bạn chưa có thú cưng nào. Vui lòng thêm thú cưng trước khi đặt lịch.',
              navigationOptions: [
                {
                  label: 'Thêm thú cưng',
                  path: '/client/quan-ly-pet',
                  description: 'Thêm thú cưng mới'
                }
              ]
            });
            return;
          }
        } catch (error) {
          console.error('Error fetching pets:', error);
          this.addMessage({
            role: 'assistant',
            content: 'Có lỗi xảy ra khi tải danh sách thú cưng. Vui lòng thử lại sau.'
          });
          return;
        }
      } else {
        // Đã có thú cưng, hiển thị tổng hợp thông tin đặt lịch
        this.showBookingSummary();
      }
    },

    /**
     * Add a message to the chat
     * @param {Object} message - The message to add
     */
    addMessage(message) {
      this.messages.push(message);
      
      // Scroll to bottom after the message is added
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      // Save chat history if not in the middle of a loading operation
      if (!message.isLoading) {
        this.saveChatHistory();
      }
    },

    /**
     * Save chat history to localStorage
     */
    saveLocalChatHistory() {
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

    /**
     * Save chat history (alias for saveLocalChatHistory)
     */
    saveChatHistory() {
      this.saveLocalChatHistory();
    },

    /**
     * Chọn khung giờ
     */
    async selectTimeSlot(slot, service) {
      // Kiểm tra nếu khung giờ đã qua hoặc đã đầy thì không cho chọn
      if (this.isPastTime(slot.khung_gio, this.selectedDate) || (service && service.slotInfo && service.slotInfo[slot.id] >= 2)) {
        return;
      }

      // Lưu thông tin về khung giờ đã chọn
      this.selectedTimeSlot = slot;
      this.selectedService = service;
      
      // Nếu đã chọn thú cưng rồi thì hiển thị tổng hợp thông tin đặt lịch
      if (this.selectedPet) {
        this.showBookingSummary();
      } else {
        // Nếu chưa chọn thú cưng thì hiển thị UI chọn thú cưng
        await this.showPetSelection();
      }
      
      // Force update để cập nhật giao diện
      this.$forceUpdate();
    },

    /**
     * Chọn pet
     */
    selectPet(pet) {
      console.log('Selected pet:', pet); // Debug log
      this.selectedPet = pet;
      this.$forceUpdate();
    },

    /**
     * Calculate and format pet age from birth date
     */
    getPetAge(birthDate) {
      if (!birthDate) return 'Không rõ tuổi';
      
      const today = new Date();
      const birth = new Date(birthDate);
      
      // Kiểm tra ngày hợp lệ
      if (isNaN(birth.getTime())) return 'Không rõ tuổi';
      
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      
      // Điều chỉnh nếu chưa tới ngày sinh trong năm hiện tại
      if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
        years--;
        months += 12;
      }
      
      // Định dạng kết quả
      if (years > 0) {
        return months > 0 ? `${years} tuổi ${months} tháng` : `${years} tuổi`;
      } else {
        return `${months} tháng`;
      }
    },

    /**
     * Get next day from a date
     */
    getNextDay(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      return date.toISOString().split('T')[0];
    },
    
    /**
     * Kiểm tra xem khung giờ đã qua hay chưa
     */
    isPastTime(khungGio, ngay) {
      if (!ngay) return false;

      // Lấy thời gian hiện tại
      const now = new Date();
      
      // Chuyển đổi ngày từ chuỗi thành đối tượng Date
      const selectedDate = new Date(ngay);
      
      // Kiểm tra nếu ngày đã qua (trước ngày hiện tại)
      const todayWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const selectedWithoutTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      
      if (selectedWithoutTime < todayWithoutTime) {
        return true;
      }
      
      // Nếu không phải ngày hôm nay, thì không có khung giờ nào đã qua
      if (selectedWithoutTime.getTime() !== todayWithoutTime.getTime()) {
        return false;
      }
      
      // Xử lý cho ngày hôm nay
      // Lấy giờ bắt đầu từ khung giờ (định dạng "HH:MM - HH:MM")
      const [startStr] = khungGio.split(" - ");
      const [hours, minutes] = startStr.split(":");
      
      // Tạo đối tượng Date cho thời gian bắt đầu của khung giờ ngày hôm nay
      const slotTime = new Date();
      slotTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // So sánh với thời gian hiện tại
      return slotTime < now;
    },
    
    /**
     * Fetch available time slots for a service
     */
    fetchTimeSlots(serviceId, date = null) {
      if (!serviceId) {
        this.addMessage({
          role: 'assistant',
          content: 'Vui lòng chọn dịch vụ trước khi xem khung giờ.'
        });
        return;
      }
      
      // Add loading message
      this.addMessage({
        role: 'assistant',
        content: 'Đang tìm kiếm khung giờ trống...',
        isLoading: true
      });
      
      // Call API to get available time slots
      OllamaService.getAvailableTimeSlots(serviceId, date)
        .then(response => {
          // Remove loading message
          this.messages.pop();
          
          const responseData = response.data;
          if (responseData && responseData.success) {
            // Danh sách khung giờ trống đã được lọc sẵn từ API
            let availableTimeSlots = responseData.time_slots;
            const nextDates = responseData.nextDates || [];

            // Lọc bỏ các khung giờ đã qua nếu là ngày hôm nay
            if (date === new Date().toISOString().split('T')[0]) {
              availableTimeSlots = availableTimeSlots.filter(slot => !this.isPastTime(slot.khung_gio, date));
            }

            if (availableTimeSlots.length > 0) {
              // Thêm lịch hẹn với các khung giờ trống và các nút điều hướng qua 7 ngày
              this.addMessage({
                role: 'assistant',
                content: `Dưới đây là các khung giờ trống cho dịch vụ "${responseData.service?.ten_dv}" vào ngày ${this.formatDate(date || new Date().toISOString().split('T')[0])}:`,
                timeSlots: availableTimeSlots,
                date: date || new Date().toISOString().split('T')[0],
                service: responseData.service,
                slotInfo: responseData.slotInfo,
                nextDates: nextDates
              });
              
              // Tạo các nút điều hướng cho các ngày trong khoảng 7 ngày
              const dateNavOptions = [];
              nextDates.forEach((nextDate, index) => {
                if (nextDate !== date) { // Không hiển thị ngày đang xem
                  dateNavOptions.push({
                    text: `${this.formatShortDate(nextDate)}`,
                    route: '#',
                    action: () => this.fetchTimeSlots(serviceId, nextDate)
                  });
                }
              });
              
              // Thêm nút điều hướng ngày vào tin nhắn
              if (dateNavOptions.length > 0) {
                this.addMessage({
                  role: 'assistant',
                  content: 'Bạn có thể xem khung giờ trống vào các ngày khác:',
                  navigationOptions: dateNavOptions
                });
              }
            } else {
              // Không có khung giờ trống
              // Tạo các nút điều hướng cho các ngày trong khoảng 7 ngày
              const dateNavOptions = [];
              nextDates.forEach((nextDate, index) => {
                if (nextDate !== date) { // Không hiển thị ngày đang xem
                  dateNavOptions.push({
                    text: `${this.formatShortDate(nextDate)}`,
                    route: '#',
                    action: () => this.fetchTimeSlots(serviceId, nextDate)
                  });
                }
              });
              
              let message = `Không có khung giờ trống cho ngày ${this.formatDate(date || new Date().toISOString().split('T')[0])}.`;
              
              if (dateNavOptions.length > 0) {
                message += " Bạn có thể kiểm tra các ngày khác:";
                this.addMessage({
                  role: 'assistant',
                  content: message,
                  navigationOptions: dateNavOptions
                });
              } else {
                this.addMessage({
                  role: 'assistant',
                  content: message + " Vui lòng thử lại sau hoặc liên hệ trực tiếp với phòng khám."
                });
              }
            }
          } else {
            // API error
            this.addMessage({
              role: 'assistant',
              content: 'Không thể tải khung giờ trống. Vui lòng thử lại sau.'
            });
          }
        })
        .catch(error => {
          // Remove loading message
          this.messages.pop();
          
          console.error('Error fetching time slots:', error);
          this.addMessage({
            role: 'assistant',
            content: 'Không thể tải khung giờ trống. Vui lòng thử lại sau.'
          });
        });
    },
    
    /**
     * Format a date for display
     */
    formatDate(dateString) {
      if (!dateString) return '';
      
      // Log để debug
      console.log('formatDate - Input:', dateString);
      
      try {
        // Phân tích chuỗi ngày theo định dạng YYYY-MM-DD
        const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
        console.log('formatDate - Parsed:', day, month, year);
        
        // Lấy ngày hiện tại để so sánh
      const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayDay = today.getDate();
        const todayMonth = today.getMonth() + 1;
        
        // Tạo ngày mai
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
        const tomorrowDay = tomorrow.getDate();
        const tomorrowMonth = tomorrow.getMonth() + 1;
        
        console.log('formatDate - Today:', todayDay, todayMonth);
        console.log('formatDate - Tomorrow:', tomorrowDay, tomorrowMonth);
        
        // Định dạng dựa vào ngày
        if (day === todayDay && month === todayMonth) {
          return `Hôm nay (${day}/${month})`;
        } else if (day === tomorrowDay && month === tomorrowMonth) {
          return `Ngày mai (${day}/${month})`;
      } else {
          return `Ngày ${day} tháng ${month}`;
        }
      } catch (error) {
        console.error('formatDate - Error:', error);
        // Trả về định dạng an toàn nếu có lỗi
        return dateString;
      }
    },
    
    /**
     * Format a date in short format (DD/MM)
     */
    formatShortDate(dateString) {
      if (!dateString) return '';
      
      // Chuyển đổi chuỗi ngày thành đối tượng Date
      const date = new Date(dateString);
      
      // Lấy ngày hiện tại và đặt giờ về 00:00:00 để so sánh chính xác
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Tạo ngày mai và đặt giờ về 00:00:00
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      
      // So sánh chỉ phần ngày tháng năm, không quan tâm đến giờ
      const dateOnly = new Date(date);
      dateOnly.setHours(0, 0, 0, 0);
      
      if (dateOnly.getTime() === today.getTime()) {
        return "Hôm nay";
      } else if (dateOnly.getTime() === tomorrow.getTime()) {
        return "Ngày mai";
      } else {
        // Lấy ngày và tháng
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}`;
      }
    },

    /**
     * Hiển thị tóm tắt thông tin đặt lịch
     */
    showBookingSummary() {
      if (!this.selectedService || !this.selectedTimeSlot || !this.selectedPet || !this.selectedDate) {
        console.log('Missing booking info:', {
          service: this.selectedService,
          timeSlot: this.selectedTimeSlot,
          pet: this.selectedPet,
          date: this.selectedDate
        });
        
        this.addMessage({
          role: 'assistant',
          content: 'Thiếu thông tin đặt lịch. Vui lòng thử lại.'
        });
        return;
      }
      
      // Tính tiền cọc
      this.calculateDeposit();
      
      // Hiển thị modal xác nhận thay vì thêm message
      try {
        // Kiểm tra xem bootstrap đã được tải chưa
        if (typeof bootstrap === 'undefined') {
          console.error('Bootstrap is not defined');
          // Tải bootstrap nếu chưa có
          const bootstrapScript = document.createElement('script');
          bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
          bootstrapScript.integrity = "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4";
          bootstrapScript.crossOrigin = "anonymous";
          bootstrapScript.onload = () => {
            // Bootstrap đã tải xong, hiển thị modal
            this.showConfirmModal();
          };
          document.head.appendChild(bootstrapScript);
        } else {
          // Bootstrap đã có sẵn, hiển thị modal
          this.showConfirmModal();
        }
      } catch (error) {
        console.error('Error showing confirmation modal:', error);
        this.addMessage({
          role: 'assistant',
          content: 'Có lỗi xảy ra khi hiển thị xác nhận đặt lịch. Vui lòng thử lại sau.'
        });
      }
    },

    /**
     * Hiển thị modal xác nhận đặt lịch
     */
    showConfirmModal() {
      const confirmModalElement = document.getElementById('confirmModal');
      if (!confirmModalElement) {
        console.error('Confirm modal element not found');
        this.addMessage({
          role: 'assistant',
          content: 'Có lỗi xảy ra khi hiển thị xác nhận đặt lịch. Vui lòng thử lại sau.'
        });
        return;
      }
      
      // Hiển thị modal xác nhận
      const confirmModal = new bootstrap.Modal(confirmModalElement);
      confirmModal.show();
    },
    
    /**
     * Xử lý việc hiển thị modal thanh toán
     */
    processPayment() {
      // Đóng modal xác nhận
      const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
      if (confirmModal) confirmModal.hide();
      
      // Hiển thị modal thanh toán
      this.showModalAndInitPayPal();
    },

    /**
     * Hiển thị modal và khởi tạo PayPal
     */
    showModalAndInitPayPal() {
      const paypalModalElement = document.getElementById('paypalModal');
      if (!paypalModalElement) {
        console.error('PayPal modal element not found');
        this.addMessage({
          role: 'assistant',
          content: 'Có lỗi xảy ra khi hiển thị thanh toán. Vui lòng thử lại sau.'
        });
        return;
      }

      // Hiển thị modal thanh toán
      const paypalModal = new bootstrap.Modal(paypalModalElement);
      paypalModal.show();
      
      // Luôn hiển thị nút thanh toán thay thế ngay từ đầu
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = `
          <div class="text-center mb-3">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Đang tải...</span>
            </div>
            <p class="mt-2">Đang tải phương thức thanh toán...</p>
          </div>
          <button id="fallback-payment-btn" class="btn btn-primary btn-lg w-100 mt-3">Thanh toán ngay</button>
          <div class="text-muted text-center mt-2">
            <small>Nếu không thể thanh toán qua PayPal, hãy sử dụng nút này</small>
        </div>
      `;

        // Thêm sự kiện cho nút thanh toán thay thế
        const fallbackBtn = document.getElementById('fallback-payment-btn');
        if (fallbackBtn) {
          fallbackBtn.addEventListener('click', () => {
            this.fallbackPayment();
          });
        }
      }
      
      // Thêm event listener cho modal để tải PayPal khi hiển thị
      paypalModalElement.addEventListener('shown.bs.modal', () => {
        // Thử tải PayPal nhưng không phụ thuộc vào nó
        try {
          this.loadPayPalScript();
        } catch (error) {
          console.error('Error loading PayPal script:', error);
          // Không làm gì, vì đã có nút thanh toán thay thế
        }
      });
    },

    /**
     * Tải script PayPal
     */
    loadPayPalScript() {
      // Load PayPal script if not already loaded
      if (!document.querySelector('script[src*="paypal"]')) {
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=Aa_Kfwz45T3UyBv2Zmb0xsyK0VhxtgY-uWbHde6JhW4YcM4LJ7VzeR89EHzqIiBqJveqD1J3h7VWZQNv&currency=USD";
        script.addEventListener('load', this.setupPayPal);
        script.addEventListener('error', (e) => {
          console.error('PayPal script failed to load:', e);
          // Hiển thị thông báo lỗi trong container
          const container = document.getElementById('paypal-button-container');
          if (container) {
            container.innerHTML = `
              <div class="alert alert-warning text-center mb-3">
                <p>Không thể tải PayPal. Vui lòng sử dụng nút bên dưới để thanh toán.</p>
              </div>
              <button id="fallback-payment-btn" class="btn btn-primary btn-lg w-100">Thanh toán ngay</button>
            `;
            
            const fallbackBtn = document.getElementById('fallback-payment-btn');
            if (fallbackBtn) {
              fallbackBtn.addEventListener('click', () => {
                this.fallbackPayment();
              });
            }
          }
        });
        document.body.appendChild(script);
      } else if (!this.paypalLoaded) {
        this.setupPayPal();
      }
    },

    /**
     * Thiết lập PayPal
     */
    setupPayPal() {
      this.paypalLoaded = true;
      // PayPal will be initialized when the modal is shown
      this.initializePayPalButtons();
    },

    /**
     * Khởi tạo nút thanh toán PayPal
     */
    initializePayPalButtons() {
      if (!window.paypal || this.isProcessing) return;

      // Clear existing buttons
      const container = document.getElementById('paypal-button-container');
      if (container) container.innerHTML = '';

      // Convert VND to USD for PayPal (approximate conversion for demo)
      const amountUSD = (this.tienCoc / 23000).toFixed(2);

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amountUSD,
                currency_code: 'USD'
              },
              description: `Đặt cọc dịch vụ: ${this.selectedService.ten_dv || this.selectedService.text}`
            }]
          });
        },
        onApprove: (data, actions) => {
          this.isProcessing = true;

          // Capture the payment
          return actions.order.capture().then(details => {
            // Đóng modal thanh toán
            const paypalModal = bootstrap.Modal.getInstance(document.getElementById('paypalModal'));
            if (paypalModal) paypalModal.hide();
            
            // Thêm thông báo đang xử lý đặt lịch
      this.addMessage({
        role: 'assistant',
              content: 'Đang xử lý đặt lịch...',
              isLoading: true
            });
            
            // Gọi API để tạo đặt lịch
            this.createBookingWithPayment(details);
          });
        },
        onCancel: () => {
        this.addMessage({
          role: 'assistant',
            content: 'Bạn đã hủy thanh toán. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.'
        });
          this.isProcessing = false;
        },
        onError: (err) => {
          console.error("Lỗi thanh toán:", err);
        this.addMessage({
          role: 'assistant',
            content: 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.'
        });
          this.isProcessing = false;
      }
      }).render('#paypal-button-container');

      // Add fallback payment button in case PayPal doesn't load properly
      setTimeout(() => {
        if (!document.querySelector('#paypal-button-container .paypal-buttons')) {
          const container = document.getElementById('paypal-button-container');
          if (container) {
            container.innerHTML = `
              <div class="alert alert-warning text-center mb-3">
                <p>Không thể tải PayPal. Vui lòng sử dụng nút bên dưới để thanh toán.</p>
              </div>
              <button id="fallback-payment-btn" class="btn btn-primary btn-lg w-100">Thanh toán ngay</button>
            `;
            
            const fallbackBtn = document.getElementById('fallback-payment-btn');
            if (fallbackBtn) {
              fallbackBtn.addEventListener('click', () => {
                this.fallbackPayment();
              });
            }
          }
        }
      }, 5000);
    },
    
    /**
     * Phương thức thanh toán thay thế khi PayPal không tải được
     */
    fallbackPayment() {
      // Đóng modal thanh toán
      const paypalModal = bootstrap.Modal.getInstance(document.getElementById('paypalModal'));
      if (paypalModal) paypalModal.hide();
      
      // Thêm thông báo đang xử lý đặt lịch
      this.addMessage({
        role: 'assistant',
        content: 'Đang xử lý đặt lịch...',
        isLoading: true
      });
      
      // Tạo thông tin thanh toán giả lập
      const mockPaymentDetails = {
        id: 'MOCK_' + Date.now(),
        status: 'COMPLETED',
        create_time: new Date().toISOString(),
        payer: {
          email_address: localStorage.getItem('email') || 'user@example.com'
        }
      };
      
      // Gọi API để tạo đặt lịch
      this.createBookingWithPayment(mockPaymentDetails);
    },
    
    /**
     * Tính tiền cọc dựa trên giá dịch vụ và cân nặng thú cưng
     */
    calculateDeposit() {
      if (!this.selectedService || !this.selectedPet) return;
      
      let gia = this.selectedService.gia || 0;
      // Điều chỉnh giá nếu là dịch vụ spa và có cân nặng
      if (this.selectedService.id_loaidv === 2 && this.selectedPet.can_nang) {
        let heSo = 1;
        if (this.selectedPet.can_nang > 30) {
          heSo = 1.6;
        } else if (this.selectedPet.can_nang > 20) {
          heSo = 1.4;
        } else if (this.selectedPet.can_nang > 10) {
          heSo = 1.2;
        }
        gia = Math.round(gia * heSo);
      }
      
      // Tính tiền cọc (25% giá dịch vụ)
      this.tienCoc = Math.round(gia * 0.25);
    },
    
    /**
     * Tạo đặt lịch sau khi thanh toán thành công
     */
    async createBookingWithPayment(paymentDetails) {
      try {
        const userId = localStorage.getItem('id_khach_hang');
        if (!userId || !this.selectedService || !this.selectedTimeSlot || !this.selectedPet) {
          console.error('Missing booking information:', {
            userId: userId,
            service: this.selectedService,
            timeSlot: this.selectedTimeSlot,
            pet: this.selectedPet
          });
          throw new Error('Thiếu thông tin đặt lịch');
        }
        
        // Log thông tin đặt lịch để debug
        console.log('Creating booking with data:', {
          service_id: this.selectedService.id || this.selectedService.service_id,
        time_slot_id: this.selectedTimeSlot.id,
        user_id: userId,
        pet_id: this.selectedPet.id,
          payment_id: paymentDetails.id
      });
      
        const res = await OllamaService.createBookingFromChatbot({
          service_id: this.selectedService.id || this.selectedService.service_id,
          time_slot_id: this.selectedTimeSlot.id,
          user_id: userId,
          pet_id: this.selectedPet.id,
          notes: this.bookingNotes || '',
          payment_id: paymentDetails.id,
          payment_method: 'paypal',
          payment_details: {
            id: paymentDetails.id,
            status: paymentDetails.status,
            create_time: paymentDetails.create_time,
            amount: this.tienCoc,
            currency: 'VND'
          }
        });
        
        // Xóa thông báo đang xử lý
        const loadingIndex = this.messages.findIndex(m => m.isLoading);
        if (loadingIndex !== -1) {
          this.messages.splice(loadingIndex, 1);
        }
        
        if (res.data && res.data.success) {
          // Hiển thị thông báo thành công
          this.addMessage({
            role: 'assistant',
            content: `
              <div class="booking-success">
                <h4><i class="fas fa-check-circle text-success"></i> Đặt lịch thành công!</h4>
                <p>Cảm ơn bạn đã đặt lịch tại PetCare. Thông tin đặt lịch đã được gửi đến email của bạn.</p>
                <div class="booking-details">
                  <p><strong>Mã đặt lịch:</strong> ${res.data.booking_id || 'N/A'}</p>
                  <p><strong>Dịch vụ:</strong> ${this.selectedService.ten_dv || this.selectedService.text}</p>
                  <p><strong>Thú cưng:</strong> ${this.selectedPet.ten_pet}</p>
                  <p><strong>Ngày khám:</strong> ${this.formatDate(this.selectedDate)}</p>
                  <p><strong>Giờ khám:</strong> ${this.selectedTimeSlot.khung_gio}</p>
                  <p><strong>Tiền cọc đã thanh toán:</strong> ${this.tienCoc.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <div class="alert alert-info mt-2">
                  <small>Vui lòng đến đúng giờ. Bạn có thể xem lịch đã đặt trong mục "Thông tin cá nhân".</small>
                </div>
              </div>
            `,
            navigationOptions: [
              {
                label: 'Xem lịch đã đặt',
                path: '/client/thong-tin-ca-nhan',
                description: 'Xem lịch đã đặt trong thông tin cá nhân'
              }
            ]
          });
          
          // Reset trạng thái đặt lịch
          this.resetBookingState();
        } else {
          console.error('Booking API error response:', res.data);
          this.addMessage({
            role: 'assistant',
            content: `
              <div class="booking-error">
                <h4><i class="fas fa-exclamation-triangle text-warning"></i> Đặt lịch không thành công</h4>
                <p>${res.data.message || 'Có lỗi xảy ra khi đặt lịch. Vui lòng liên hệ phòng khám để được hỗ trợ.'}</p>
                <p>Thanh toán của bạn đã được xử lý, nhưng đặt lịch chưa hoàn tất. Vui lòng liên hệ phòng khám để được hỗ trợ.</p>
                <p><strong>Mã thanh toán:</strong> ${paymentDetails.id}</p>
              </div>
            `,
            navigationOptions: [
              {
                label: 'Liên hệ hỗ trợ',
                path: '/client/lien-he',
                description: 'Liên hệ với phòng khám để được hỗ trợ'
              }
            ]
          });
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        
        // Xóa thông báo đang xử lý
        const loadingIndex = this.messages.findIndex(m => m.isLoading);
        if (loadingIndex !== -1) {
          this.messages.splice(loadingIndex, 1);
        }
        
        this.addMessage({
          role: 'assistant',
          content: `
            <div class="booking-error">
              <h4><i class="fas fa-exclamation-circle text-danger"></i> Lỗi đặt lịch</h4>
              <p>Có lỗi xảy ra khi đặt lịch: ${error.message || 'Lỗi không xác định'}</p>
              <p>Thanh toán của bạn đã được xử lý, nhưng đặt lịch chưa hoàn tất. Vui lòng liên hệ phòng khám để được hỗ trợ.</p>
              <p><strong>Mã thanh toán:</strong> ${paymentDetails.id}</p>
            </div>
          `,
          navigationOptions: [
            {
              label: 'Thử lại',
              path: '#retry-booking',
              description: 'Thử đặt lịch lại',
              action: () => this.retryBooking(paymentDetails)
            },
            {
              label: 'Liên hệ hỗ trợ',
              path: '/client/lien-he',
              description: 'Liên hệ với phòng khám để được hỗ trợ'
            }
          ]
        });
      } finally {
        this.isProcessing = false;
      }
    },

    /**
     * Thử lại đặt lịch với thông tin thanh toán đã có
     */
    retryBooking(paymentDetails) {
      // Thêm thông báo đang xử lý
      this.addMessage({
        role: 'assistant',
        content: 'Đang thử lại đặt lịch...',
        isLoading: true
      });
      
      // Gọi lại API đặt lịch
      this.createBookingWithPayment(paymentDetails);
    },

    /**
     * Reset trạng thái đặt lịch
     */
    resetBookingState() {
      this.selectedService = null;
      this.selectedTimeSlot = null;
      this.selectedPet = null;
      this.selectedDate = null;
      this.bookingNotes = '';
      this.tienCoc = 0;
      this.bookingState = {
        step: 0,
        serviceId: null,
        timeSlotId: null,
        petId: null,
        date: null
      };
    },

    /**
     * Tạo danh sách các ngày cụ thể từ ngày hiện tại
     */
    createSpecificDays() {
      // Mảng tên các ngày trong tuần tiếng Việt
      const dayButtons = [];
      
      // Cách 1: Sử dụng Date trực tiếp với giờ địa phương
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset giờ
      
      // In ra để debug
      console.log("Ngày hôm nay:", today.toDateString(), today.getDate());
      
      // Tạo mảng ngày cố định
      for (let i = 0; i < 7; i++) {
        // Tạo bản sao ngày mới để tránh thay đổi today
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        // Tạo chuỗi ngày YYYY-MM-DD
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // In ra để debug
        console.log(`Ngày thứ ${i+1}:`, dateString, "day:", day, "month:", month);
        
        let displayLabel;
        if (i === 0) {
          displayLabel = `Hôm nay (${day}/${month})`;
        } else if (i === 1) {
          displayLabel = `Ngày mai (${day}/${month})`;
        } else {
          displayLabel = `Ngày ${day} tháng ${month}`;
        }
        
        // Thêm vào danh sách kết quả
        dayButtons.push({
          date: dateString,
          dayName: displayLabel,
          dayNumber: day,
          month: month,
          displayDate: `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}`
        });
      }
      
      // Log lại để debug
      console.log("Danh sách ngày tạo ra:", JSON.stringify(dayButtons));
      
      return dayButtons;
    },
  }
};
</script>

<style scoped>
/* Chatbot container */
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: 'Roboto', Arial, sans-serif;
}

/* Chat logo (minimized state) */
.chat-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Back to circular */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.3s ease;
  border: 2px solid #d23819; /* Back to blue border */
}

.chat-logo:hover {
  transform: scale(1.05);
}

/* Chat window */
.chat-window {
  position: relative;
  width: 480px;
  height: 650px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
  border: none;
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


.chat-header-centered {
  height: 100px;
  width: 100%;
  padding: 15px 20px;
  background-color: #1976d2; 
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
}

.chat-logo-header {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid white;
  object-fit: cover;
}

.chat-title {
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}


.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.message {
  margin-bottom: 14px;
  animation: fadeIn 0.3s;
  overflow-wrap: break-word;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  display: inline-block;
  max-width: 85%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  line-height: 1.5;
}

.user-message {
  text-align: right;
}

.user-message .message-content {
  background-color: #1976d2; 
  color: white;
  border-bottom-right-radius: 4px;
  margin-left: auto;
}

.bot-message .message-content {
  background-color: white;
  color: #333;
  border-bottom-left-radius: 4px;
  text-align: left;
  border-left: none; 
}


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
  padding: 14px 18px;
  background-color: white;
  border-top: 1px solid #eee;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 22px;
  padding: 10px 16px;
  transition: box-shadow 0.3s;
  border: 1px solid #e0e0e0;
}

.input-wrapper:focus-within {
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
  border-color: #1976d2;
}

.input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  padding: 7px 0;
  font-size: 15px;
}

.send-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: #1976d2;
  color: white;
  margin-left: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 16px;
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
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  z-index: 3;
  transition: color 0.18s;
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
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;
}

.navigation-button {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  margin: 5px;
}

.navigation-button:hover {
  border-color: #4299e1;
  background-color: #ebf8ff;
}

.navigation-info {
  margin-left: 8px;
}

.navigation-label {
  font-weight: 600;
  font-size: 14px;
  color: #2d3748;
}

.navigation-description {
  font-size: 12px;
  color: #718096;
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
    width: 98vw;
    height: 80vh;
    bottom: 70px;
    right: 1vw;
  }
}

/* Styling for service buttons */
.service-buttons-container {
  margin: 10px 0;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.service-category-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #555;
  text-align: center;
}

.service-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.service-button {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.service-button:hover {
  background: #f0f7ff;
  border-color: #cce0ff;
}

.service-button-content {
  display: flex;
  align-items: center;
}

.service-icon {
  font-size: 18px;
  margin-right: 8px;
}

.service-info {
  flex: 1;
}

.service-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 2px;
}

.service-price {
  font-size: 12px;
  color: #888;
}

.service-category {
  background: #f0f7ff;
  border-color: #b3d7ff;
}

.service-category .service-name {
  font-weight: 600;
  font-size: 15px;
  color: #0066cc;
}

/* Time slots styling */
.time-slots-container {
  width: 100%;
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  background-color: #f9f9f9;
}

.time-slots-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #4a5568;
  text-align: center;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  justify-content: center;
}

.time-slot {
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.time-slot:hover {
  border-color: #4299e1;
  background-color: #ebf8ff;
}

.time-slot.selected {
  border-color: #3182ce;
  background-color: #ebf8ff;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
}

.time-slot-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-slot-time {
  font-weight: 600;
  font-size: 14px;
  color: #2d3748;
}

.time-slot-details {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.time-slot-availability {
  font-size: 12px;
}

.time-slot-actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  gap: 15px;
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.date-nav-btn {
  background: none;
  border: none;
  color: #3182ce;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.date-nav-btn:hover {
  background-color: #ebf8ff;
}

.selected-date {
  font-weight: 600;
  color: #2d3748;
  font-size: 15px;
}

/* Pet selection styling */
.pet-selection-container {
  margin: 10px 0;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.pet-selection-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #555;
  text-align: center;
}

.pets-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pet-item {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.pet-item:hover {
  background: #f0f7ff;
  border-color: #cce0ff;
}

.pet-item.selected {
  background: #f0f7ff;
  border-color: #0066cc;
}

.pet-item i {
  font-size: 18px;
  margin-right: 10px;
  color: #0066cc;
}

.pet-info {
  flex: 1;
}

.pet-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 2px;
}

.pet-details {
  font-size: 12px;
  color: #888;
}

.booking-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.confirm-booking-btn {
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.confirm-booking-btn:hover {
  background-color: #0055aa;
}

.confirm-booking-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cancel-booking-btn {
  background-color: #f8f9fa;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-booking-btn:hover {
  background-color: #f1f1f1;
  border-color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .time-slots {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
  
  .service-button {
    width: 100%;
  }
}

/* Day selection buttons styling */
.day-buttons-container {
  margin: 10px 0;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.day-selection-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: #555;
  text-align: center;
}

.day-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.day-button {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 110px;
  text-align: center;
  margin: 5px;
}

.day-button:hover {
  background: #f0f7ff;
  border-color: #cce0ff;
}

.day-button.selected {
  background: #f0f7ff;
  border-color: #0066cc;
}

.day-button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-name {
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
  line-height: 1.2;
}

.day-date {
  font-size: 12px;
  color: #888;
}

/* Modal PayPal */
.modal-content {
  border: none;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-weight: 600;
}

#paypal-button-container {
  min-height: 150px;
  margin-top: 15px;
}

/* Booking success and error messages */
.booking-success {
  background-color: #e7f7ed;
  border-left: 4px solid #28a745;
  border-radius: 4px;
  padding: 15px;
  margin: 10px 0;
}

.booking-success h4 {
  color: #28a745;
  margin-bottom: 10px;
  font-size: 18px;
}

.booking-details {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
}

.booking-details p {
  margin-bottom: 5px;
  font-size: 14px;
}

.booking-error {
  background-color: #fff5f5;
  border-left: 4px solid #dc3545;
  border-radius: 4px;
  padding: 15px;
  margin: 10px 0;
}

.booking-error h4 {
  color: #dc3545;
  margin-bottom: 10px;
  font-size: 18px;
}

/* Fallback payment button */
#fallback-payment-btn {
  background-color: #0066cc;
  border-color: #0055aa;
  font-weight: 500;
  transition: all 0.3s ease;
}

#fallback-payment-btn:hover {
  background-color: #0055aa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Spinner for loading */
.spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Responsive adjustments for modal */
@media (max-width: 768px) {
  .modal-dialog {
    margin: 0.5rem;
    max-width: calc(100% - 1rem);
  }
}

.time-slot.past-time {
  background-color: #f5f5f5;
  border-color: #ddd;
  color: #999;
  cursor: not-allowed;
  opacity: 0.7;
}

.time-slot.past-time:hover {
  background-color: #f5f5f5;
  border-color: #ddd;
  transform: none;
}
</style> 