import apiClient from './apiClient';

// Service xử lý các API liên quan đến thanh toán
const paymentService = {
  /**
   * Tạo URL thanh toán VNPay
   * @param {number} id_lich_hen - ID lịch hẹn cần thanh toán
   * @returns {Promise} - Promise chứa URL thanh toán
   */
  createVnpayPayment(id_lich_hen) {
    return apiClient.post('/api/vnpay-payment', { id_lich_hen });
  },

  /**
   * Kiểm tra trạng thái thanh toán
   * @param {string} transaction_code - Mã giao dịch
   * @returns {Promise} - Promise chứa thông tin giao dịch
   */
  checkPaymentStatus(transaction_code) {
    return apiClient.get(`/api/check-payment-status?transaction_code=${transaction_code}`);
  }
};

export default paymentService; 