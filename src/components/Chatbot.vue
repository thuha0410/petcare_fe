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
      <div class="chat-messages" ref="messageContainer">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.type === 'user' ? 'user-message' : 'bot-message', message.isBooking ? 'booking-success' : '']">
          <div class="message-content">
            <span v-if="message.type === 'user'">{{ message.content }}</span>
            <span v-else v-html="formatMessage(message.content)"></span>
          </div>
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
          content: 'Xin chào! Tôi là trợ lý ảo của PetCare. Tôi có thể giúp gì cho bạn?'
        }
      ]
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    formatMessage(message) {
      // Replace newlines with <br> tags for proper line breaks
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

      try {
        const response = await axios.post('http://localhost:8000/api/chatbot/chat', {
          message: userMessage,
          userId: 'guest' // hoặc lấy từ localStorage nếu có đăng nhập
        });

        // Thêm phản hồi của bot
        this.messages.push({
          type: 'bot',
          content: response.data.message
        });

        // Kiểm tra xem đây có phải thông báo đặt lịch thành công không
        if (response.data.message.includes('đặt lịch hẹn thành công')) {
          // Thêm class đặc biệt cho tin nhắn này
          this.messages[this.messages.length - 1].isBooking = true;
        }

      } catch (error) {
        console.error('Error:', error);
        this.messages.push({
          type: 'bot',
          content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.'
        });
      }

      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) container.scrollTop = container.scrollHeight;
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
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
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

/* Thêm style cho tin nhắn đặt lịch thành công */
.message.bot-message.booking-success {
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
}
</style> 