<template>
  <div>
    <button 
      @click="handlePayment" 
      :disabled="isLoading || disabled"
      class="payment-button"
      type="button"
    >
      <span v-if="isLoading">
        <i class="fas fa-spinner fa-spin"></i>
        Đang xử lý...
      </span>
      <span v-else>
        <i class="fas fa-credit-card"></i>
        Thanh toán qua VNPay
      </span>
    </button>
    
    <div v-if="error" class="error-message mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script>
import paymentService from '@/services/paymentService';
import { createToaster } from "@meforma/vue-toaster";

export default {
  name: 'PaymentButton',
  props: {
    id_lich_hen: {
      type: [Number, String],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      error: null,
      toaster: createToaster({ position: 'top' })
    };
  },
  methods: {
    async handlePayment() {
      try {
        this.isLoading = true;
        this.error = null;
        
        // Gọi API tạo URL thanh toán VNPay
        const response = await paymentService.createVnpayPayment(this.id_lich_hen);
        
        if (response.data.status) {
          // Chuyển hướng người dùng đến trang thanh toán VNPay
          window.location.href = response.data.payment_url;
        } else {
          this.error = response.data.message || 'Không thể tạo đường dẫn thanh toán. Vui lòng thử lại sau.';
          this.toaster.error(this.error);
        }
      } catch (error) {
        console.error('Payment error:', error);
        this.error = 'Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại sau.';
        this.toaster.error(this.error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.payment-button {
  background-color: #00A1E0;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.payment-button:hover {
  background-color: #0081b3;
}

.payment-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
}
</style> 