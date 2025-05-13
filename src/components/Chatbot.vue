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
        <div 
          v-for="(message, index) in messages" 
          :key="index" 
          :class="['message', message.type === 'user' ? 'user-message' : 'bot-message', 
                  message.isBooking ? 'booking-success' : '',
                  message.isBookingFlow ? 'booking-flow' : '',
                  message.isLoading ? 'loading-message' : '']"
          :data-timeout="message.isTimeoutError"
        >
          <div class="message-content" @click="handleLinkClick">
            <span v-if="message.type === 'user'">{{ message.content }}</span>
            <span v-else-if="message.isLoading" class="loading-dots">
              {{ message.content }} <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
            </span>
            <span v-else v-html="formatMessage(message.content)"></span>
          </div>
          
          <!-- Thêm nút điều hướng nếu có -->
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
        <!-- Nút đặt lịch ngay ở giữa - chỉ hiển thị khi cần -->
        <div v-if="showBookingButton && !isBookingInProgress" class="booking-button-container">
          <button @click="setBookingMessage" class="booking-button-centered">Đặt lịch tư vấn ngay</button>
        </div>
      </div>
      <!-- Chat input -->
      <div class="chat-input">
        <input 
          v-model="userInput" 
          @keyup.enter="sendMessage"
          placeholder="Nhập tin nhắn của bạn..."
          type="text"
        >
        <button @click="sendMessage" class="send-button">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      isSearching: false,
      doctors: [],
      selectedDoctor: null,
      availableSlots: [],
      showDoctorList: false,
      showTimeSlots: false,
      hasShownBookingButton: false,
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      
      // Khi mở chatbot, cuộn xuống tin nhắn mới nhất
      if (this.isOpen) {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    setBookingMessage() {
      this.userInput = 'đặt lịch ngay';
      this.sendMessage();
    },
    handleLinkClick(event) {
      // Kiểm tra nếu người dùng click vào một liên kết
      if (event.target && event.target.tagName === 'A') {
        const href = event.target.getAttribute('href');
        
        // Xử lý khi click vào booking
        if (href === '#booking') {
          event.preventDefault();
          this.setBookingMessage();
          return;
        }
        
        // Nếu là liên kết nội bộ, ngăn chuyển trang mặc định
        if (href.startsWith('/')) {
          event.preventDefault();
          // Thông báo cho người dùng về liên kết
          this.messages.push({
            type: 'bot',
            content: `Bạn có thể truy cập trang ${href} để xem thêm thông tin chi tiết.`
          });
          
          // Có thể mở URL trong cửa sổ mới
          // window.open(href, '_blank');
        }
      }
    },
    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:8000/api/doctors');
        if (response.data.success) {
          this.doctors = response.data.data;
          this.showDoctorList = true;
          this.messages.push({
            type: 'bot',
            content: 'Vui lòng chọn bác sĩ bạn muốn đặt lịch:',
            isDoctorList: true
          });
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        this.messages.push({
          type: 'bot',
          content: 'Xin lỗi, không thể lấy thông tin bác sĩ. Vui lòng thử lại sau.'
        });
      }
    },
    selectDoctor(doctor) {
      this.selectedDoctor = doctor;
      this.showDoctorList = false;
      this.showTimeSlots = true;
      this.messages.push({
        type: 'bot',
        content: `Bạn đã chọn bác sĩ ${doctor.ten}. Vui lòng chọn khung giờ phù hợp:`,
        isTimeSlots: true
      });
    },
    selectTimeSlot(slot) {
      this.messages.push({
        type: 'bot',
        content: `Bạn đã chọn khung giờ ${slot.gio_bat_dau} - ${slot.gio_ket_thuc} ngày ${slot.ngay}. Vui lòng xác nhận thông tin đặt lịch:`,
        isBookingConfirmation: true,
        bookingData: {
          doctor: this.selectedDoctor,
          timeSlot: slot
        }
      });
    },
    confirmBooking() {
      // Xử lý xác nhận đặt lịch
      this.messages.push({
        type: 'bot',
        content: 'Cảm ơn bạn đã đặt lịch! Chúng tôi sẽ liên hệ lại để xác nhận lịch hẹn của bạn.',
        isBookingSuccess: true
      });
      this.resetBookingState();
    },
    resetBookingState() {
      this.selectedDoctor = null;
      this.showDoctorList = false;
      this.showTimeSlots = false;
      this.isBookingInProgress = false;
    },
    formatMessage(message) {
      // Xử lý khi tin nhắn có thẻ HTML (từ server)
      if (message.includes('<br>')) {
        // Đã có thẻ HTML từ server, trả về nguyên dạng
        return message;
      }
      
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
    async sendMessage() {
      if (!this.userInput.trim()) return;

      // Add user message
      this.messages.push({
        type: 'user',
        content: this.userInput
      });

      const userMessage = this.userInput;
      this.userInput = '';
      
      // Kiểm tra nếu tin nhắn của người dùng liên quan đến đặt lịch
      const userAskingAboutBooking = /đặt.*(lịch|hẹn|khám)|lịch.*(hẹn|khám)|hẹn.*khám|đăng ký.*khám|tư vấn.*trực tiếp/i.test(userMessage);
      
      // Chỉ hiển thị nút đặt lịch nếu chưa hiển thị bao giờ và người dùng hỏi về đặt lịch
      if (userAskingAboutBooking && !this.hasShownBookingButton) {
        this.showBookingButton = true;
        this.hasShownBookingButton = true;
      } else {
        this.showBookingButton = false;
      }

      // Hiển thị loading khi đang tìm kiếm
      this.isSearching = true;
      
      // Tạo timeout ID để theo dõi quá trình gọi API
      const loadingMessageId = Date.now();
      this.messages.push({
        type: 'bot',
        content: 'Đang tìm kiếm thông tin...',
        isLoading: true,
        id: loadingMessageId
      });

      // Tạo timeout để nhắc người dùng nếu request mất quá nhiều thời gian
      const timeoutID = setTimeout(() => {
        if (this.isSearching) {
          // Cập nhật tin nhắn loading, không xóa để tránh flash UI
          const loadingIndex = this.messages.findIndex(m => m.id === loadingMessageId);
          if (loadingIndex !== -1) {
            this.messages[loadingIndex].content = 'Câu hỏi của bạn có vẻ phức tạp, tôi đang cố gắng tìm câu trả lời tốt nhất...';
          }
        }
      }, 8000); // Hiển thị thông báo sau 8 giây

      try {
        const response = await axios.post('http://localhost:8000/api/chatbot/chat', {
          message: userMessage,
          userId: localStorage.getItem('token_kh') || 'guest'
        });

        // Xóa timeout
        clearTimeout(timeoutID);

        // Xóa tin nhắn loading
        this.messages = this.messages.filter(m => m.id !== loadingMessageId);
        this.isSearching = false;

        if (response.data && response.data.success && response.data.message) {
          // Kiểm tra có phải phản hồi lỗi không
          const isErrorResponse = response.data.isError || false;
          
          // Kiểm tra phản hồi có liên quan đến đặt lịch
          const botMentionsBooking = /đặt.*(lịch|hẹn|khám)|lịch.*(hẹn|khám)|hẹn.*khám|đăng ký.*khám|tư vấn.*trực tiếp/i.test(response.data.message);
          
          // Chỉ hiển thị nút đặt lịch nếu chưa hiển thị bao giờ và bot đề cập đến đặt lịch
          if (botMentionsBooking && !this.hasShownBookingButton && !response.data.booking_flow && !response.data.booking_success) {
            this.showBookingButton = true;
            this.hasShownBookingButton = true;
          } else {
            this.showBookingButton = false;
          }
          
          // Nếu tin nhắn dài, chia nhỏ
          if (response.data.message.length > 250 && !response.data.booking_flow && !response.data.booking_success && !isErrorResponse) {
            const sentences = response.data.message.split(/(?<=[.!?])\s+|\n+/);
            let currentMessage = '';
            
            for (let i = 0; i < sentences.length; i++) {
              if (currentMessage.length + sentences[i].length > 250 || sentences[i].trim().startsWith('•') || sentences[i].trim().startsWith('-')) {
                if (currentMessage) {
                  this.messages.push({
                    type: 'bot',
                    content: currentMessage,
                    isBookingFlow: false,
                    isBooking: false
                  });
                  
                  await new Promise(resolve => setTimeout(resolve, 300));
                  this.scrollToBottom();
                }
                currentMessage = sentences[i].trim();
              } else {
                currentMessage += (currentMessage ? ' ' : '') + sentences[i].trim();
              }
            }
            
            if (currentMessage) {
              this.messages.push({
                type: 'bot',
                content: currentMessage,
                isBookingFlow: false,
                isBooking: false
              });
            }
          } else {
            // Kiểm tra nếu phản hồi là lỗi timeout hoặc tìm kiếm lâu
            const isTimeoutResponse = isErrorResponse || 
                                     response.data.message.includes("câu hỏi của bạn có vẻ cần nhiều thời gian") || 
                                     response.data.message.includes("Xin lỗi, tôi đang gặp vấn đề khi tìm kiếm thông tin");
            
            this.messages.push({
              type: 'bot',
              content: response.data.message,
              isBookingFlow: response.data.booking_flow,
              isBooking: response.data.booking_success,
              navigationButtons: response.data.navigation_buttons || [],
              isTimeoutError: isTimeoutResponse
            });
            
            // Thêm gợi ý để người dùng viết câu hỏi cụ thể hơn nếu gặp lỗi timeout
            if (isTimeoutResponse) {
              setTimeout(() => {
                this.messages.push({
                  type: 'bot',
                  content: 'Bạn có thể thử đặt câu hỏi ngắn hơn hoặc cụ thể hơn để tôi có thể tìm câu trả lời dễ dàng hơn nhé! 😊',
                  isTimeoutError: false
                });
                this.scrollToBottom();
              }, 1000);
            }
          }

          this.isBookingInProgress = response.data.booking_flow;
          
          if (response.data.booking_success) {
            this.isBookingInProgress = false;
            this.hasShownBookingButton = false; // Reset lại để có thể hiển thị nút đặt lịch trong cuộc hội thoại mới
          }
        } else {
          throw new Error('Phản hồi không hợp lệ từ máy chủ');
        }
      } catch (error) {
        // Xóa timeout
        clearTimeout(timeoutID);
      
        console.error('Lỗi khi gửi tin nhắn:', error);
        
        // Xóa tin nhắn loading
        this.messages = this.messages.filter(m => m.id !== loadingMessageId);
        this.isSearching = false;
        
        this.messages.push({
          type: 'bot',
          content: 'Xin lỗi, có lỗi xảy ra khi tìm kiếm thông tin. Vui lòng thử lại với câu hỏi ngắn hơn hoặc cụ thể hơn nhé.',
          isTimeoutError: true
        });
      }

      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    navigateTo(route) {
      // Điều hướng đến trang tương ứng
      this.$router.push(route);
    },
    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages;
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  },
  mounted() {
    // Đảm bảo cuộn xuống khi component được tạo lần đầu và chatbot đang hiển thị
    if (this.isOpen) {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  },
  updated() {
    // Đảm bảo cuộn xuống khi có cập nhật tin nhắn và chatbot đang hiển thị
    if (this.isOpen) {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
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
  max-height: 400px;
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
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
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

.doctor-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
}

.doctor-item {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.doctor-item:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.doctor-item h4 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.doctor-item p {
  margin: 5px 0;
  color: #666;
  font-size: 0.9em;
}

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin: 10px 0;
}

.time-slot {
  background: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-slot:hover {
  background: #bbdefb;
  transform: translateY(-2px);
}

.booking-confirmation {
  background: #f1f8e9;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
}

.booking-confirmation h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.booking-confirmation p {
  margin: 5px 0;
  color: #666;
}

.confirm-button {
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.confirm-button:hover {
  background: #388e3c;
}

/* Thêm animation cho các thành phần */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.doctor-item, .time-slot, .booking-confirmation {
  animation: fadeIn 0.3s ease-out;
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
</style> 