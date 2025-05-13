<template>
  <div class="payment-success">
    <div class="success-icon">
      <i class="fas fa-check-circle"></i>
    </div>
    
    <h1>Thanh toán thành công!</h1>
    
    <div v-if="isLoading" class="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
      <p>Đang tải thông tin giao dịch...</p>
    </div>
    
    <div v-else-if="transaction" class="transaction-details">
      <p><strong>Mã giao dịch:</strong> {{ transaction.transaction_code }}</p>
      <p><strong>Số tiền:</strong> {{ formatCurrency(transaction.amount) }}</p>
      <p><strong>Thời gian:</strong> {{ formatDate(transaction.updated_at) }}</p>
    </div>
    
    <p class="success-message">
      Bạn đã hoàn tất thanh toán đặt cọc. Lịch hẹn của bạn đã được xác nhận.
    </p>
    
    <div class="action-buttons">
      <button @click="goToAppointments" class="primary-button">
        Xem lịch hẹn
      </button>
      <button @click="goToHome" class="secondary-button">
        Về trang chủ
      </button>
    </div>
  </div>
</template>

<script>
import paymentService from '@/services/paymentService';
import { createToaster } from "@meforma/vue-toaster";

export default {
  name: 'PaymentSuccess',
  data() {
    return {
      transaction: null,
      isLoading: true,
      toaster: createToaster({ position: 'top' })
    };
  },
  mounted() {
    this.fetchTransactionDetails();
  },
  methods: {
    async fetchTransactionDetails() {
      try {
        const code = this.$route.query.code;
        
        if (!code) {
          this.$router.push('/');
          return;
        }
        
        const response = await paymentService.checkPaymentStatus(code);
        
        if (response.data.status) {
          this.transaction = response.data.data;
        } else {
          this.toaster.error('Không tìm thấy thông tin giao dịch');
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Error fetching transaction:', error);
        this.toaster.error('Đã xảy ra lỗi khi tải thông tin giao dịch');
      } finally {
        this.isLoading = false;
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(amount);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleString('vi-VN');
    },
    goToAppointments() {
      this.$router.push('/client/lich-hen');
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.payment-success {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: white;
}

.success-icon {
  font-size: 80px;
  color: #28a745;
  margin-bottom: 20px;
}

.transaction-details {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  text-align: left;
}

.success-message {
  font-size: 1.1rem;
  margin: 20px 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.primary-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.secondary-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}
</style> 