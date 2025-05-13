<template>
  <div class="payment-error">
    <div class="error-icon">
      <i class="fas fa-times-circle"></i>
    </div>
    
    <h1>Thanh toán không thành công</h1>
    
    <p class="error-message">
      {{ getErrorMessage(errorCode) }}
    </p>
    
    <div class="action-buttons">
      <button @click="goBack" class="primary-button">
        Thử lại
      </button>
      <button @click="goToHome" class="secondary-button">
        Về trang chủ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentError',
  data() {
    return {
      errorCode: this.$route.query.code || '99'
    };
  },
  methods: {
    getErrorMessage(code) {
      switch (code) {
        case '07':
          return 'Giao dịch bị nghi ngờ (liên quan đến lừa đảo, giao dịch bất thường).';
        case '09':
          return 'Thẻ/Tài khoản của bạn chưa đăng ký dịch vụ InternetBanking tại ngân hàng.';
        case '10':
          return 'Bạn đã xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.';
        case '11':
          return 'Đã hết hạn chờ thanh toán.';
        case '12':
          return 'Thẻ/Tài khoản của bạn bị khóa.';
        case '24':
          return 'Bạn đã hủy giao dịch.';
        case '51':
          return 'Tài khoản của bạn không đủ số dư để thực hiện giao dịch.';
        case '65':
          return 'Tài khoản của bạn đã vượt quá hạn mức giao dịch trong ngày.';
        case '75':
          return 'Ngân hàng thanh toán đang bảo trì.';
        case '79':
          return 'Bạn đã nhập sai mật khẩu thanh toán quá số lần quy định.';
        case '97':
          return 'Chữ ký không hợp lệ.';
        case '99':
        default:
          return 'Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.';
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.payment-error {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: white;
}

.error-icon {
  font-size: 80px;
  color: #dc3545;
  margin-bottom: 20px;
}

.error-message {
  color: #721c24;
  background-color: #f8d7da;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
  font-size: 1.1rem;
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
</style> 