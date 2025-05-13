<template>
  <div class="vnpay-payment-section">
    <div class="payment-header">
      <h3><i class="fas fa-credit-card"></i> Thanh toán đặt cọc</h3>
    </div>

    <div v-if="lichHen" class="payment-details">
      <div class="card">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <p><strong>Dịch vụ:</strong> {{ lichHen.ten_dv }}</p>
              <p><strong>Ngày hẹn:</strong> {{ formatDate(lichHen.ngay_hen) }}</p>
              <p><strong>Giờ hẹn:</strong> {{ lichHen.gio_hen }}</p>
            </div>
            <div class="col-md-6">
              <p><strong>Thú cưng:</strong> {{ lichHen.ten_pet }}</p>
              <p><strong>Trạng thái thanh toán:</strong> 
                <span v-if="lichHen.da_thanh_toan" class="badge bg-success">Đã thanh toán</span>
                <span v-else class="badge bg-warning">Chưa thanh toán</span>
              </p>
              <p><strong>Số tiền đặt cọc:</strong> <span class="text-danger">{{ formatCurrency(lichHen.tien_coc) }}</span></p>
            </div>
          </div>
          
          <div class="payment-actions" v-if="!lichHen.da_thanh_toan">
            <p class="text-muted">Vui lòng thanh toán đặt cọc để xác nhận lịch hẹn.</p>
            <payment-button :id_lich_hen="lichHen.id" />
          </div>
          
          <div v-else class="payment-complete">
            <div class="alert alert-success">
              <i class="fas fa-check-circle"></i> Bạn đã thanh toán đặt cọc thành công
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="payment-loading text-center py-3">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
      <p>Đang tải thông tin thanh toán...</p>
    </div>
  </div>
</template>

<script>
import PaymentButton from '../Payment/PaymentButton.vue';

export default {
  name: 'VnpayPaymentSection',
  components: {
    PaymentButton
  },
  props: {
    lichHen: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(amount);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN');
    }
  }
};
</script>

<style scoped>
.vnpay-payment-section {
  margin-bottom: 30px;
}

.payment-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.payment-header h3 {
  color: #1a73e8;
  display: flex;
  align-items: center;
  gap: 10px;
}

.payment-details .card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: none;
}

.payment-actions {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed #ddd;
}

.payment-complete {
  margin-top: 15px;
}

.badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: normal;
}
</style> 