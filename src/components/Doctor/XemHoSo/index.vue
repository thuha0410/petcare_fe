<template>
    <div class="container mt-5">
        <h2 class="text-center">Hồ Sơ Bệnh Án</h2>

        <!-- Bộ lọc -->
        <div class="mb-3 d-flex justify-content-between">
            <!-- Lọc theo bác sĩ -->
            <div>
                <label for="filterDoctor" class="form-label me-2">Lọc theo bác sĩ:</label>
                <select id="filterDoctor" v-model="selectedDoctor" class="form-select w-auto">
                    <option value="">Tất cả</option>
                    <option v-for="doctor in doctorIds" :key="doctor" :value="doctor">
                        Bác sĩ ID {{ doctor }}
                    </option>
                </select>
            </div>

            <!-- Lọc theo tình trạng -->
            <div>
                <label for="filterStatus" class="form-label me-2">Lọc theo tình trạng:</label>
                <select id="filterStatus" v-model="selectedStatus" class="form-select w-auto">
                    <option value="">Tất cả</option>
                    <option value="Đang điều trị">Đang điều trị</option>
                    <option value="Đã khỏi">Đã khỏi</option>
                    <option value="Đang theo dõi">Đang theo dõi</option>
                    <option value="Cần phẫu thuật">Cần phẫu thuật</option>
                </select>
            </div>
        </div>

        <!-- Bảng dữ liệu -->
        <table class="table table-bordered table-hover">
            <thead class="table-dark">
                <tr>
                    <th>ID Hồ Sơ</th>
                    <th>ID Bác Sĩ</th>
                    <th>Ngày Khám</th>
                    <th>Chẩn Đoán</th>
                    <th>ID Pet</th>
                    <th>Tình Trạng</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in filteredRecords" :key="record.id">
                    <td>{{ record.id }}</td>
                    <td>{{ record.doctorId }}</td>
                    <td>{{ record.date }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" @click="editDiagnosis(record)">
                            Xem chẩn đoán
                        </button>
                    </td>
                    <td>{{ record.petId }}</td>
                    <td>{{ record.status }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm">Chỉnh Sửa</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal chỉnh sửa chẩn đoán -->
        <div class="modal fade" id="editDiagnosisModal" tabindex="-1" aria-labelledby="editDiagnosisModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editDiagnosisModalLabel">Xem Chẩn Đoán</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Hồ Sơ ID:</strong> {{ selectedRecord.id }}</p>
                        <p><strong>Bác Sĩ:</strong> {{ selectedRecord.doctorId }}</p>
                        <p><strong>Ngày Khám:</strong> {{ selectedRecord.date }}</p>
                        <p><strong>ID Pet:</strong> {{ selectedRecord.petId }}</p>
                        <p><strong>Tình Trạng:</strong> {{ selectedRecord.status }}</p>
                        <hr>
                        <label for="diagnosisText" class="form-label"><strong>Chỉnh sửa chẩn Đoán:</strong></label>
                        <textarea id="diagnosisText" v-model="selectedRecord.diagnosis" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button class="btn btn-success" @click="saveDiagnosis">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            medicalRecords: [
                { id: 1, doctorId: 101, date: "2025-04-01", diagnosis: "Viêm da dị ứng", petId: 301, status: "Đang điều trị" },
                { id: 2, doctorId: 102, date: "2025-04-02", diagnosis: "Rối loạn tiêu hóa", petId: 302, status: "Đã khỏi" },
                { id: 3, doctorId: 101, date: "2025-04-03", diagnosis: "Nhiễm trùng tai", petId: 303, status: "Đang theo dõi" },
                { id: 4, doctorId: 103, date: "2025-04-04", diagnosis: "Gãy xương chân", petId: 304, status: "Cần phẫu thuật" },
                { id: 5, doctorId: 102, date: "2025-04-05", diagnosis: "Viêm phổi", petId: 305, status: "Đang điều trị" }
            ],
            selectedDoctor: "", // Giá trị lọc theo ID bác sĩ
            selectedStatus: "", // Giá trị lọc theo tình trạng
            selectedRecord: {} // Dữ liệu của hồ sơ đang chỉnh sửa
        };
    },
    computed: {
        doctorIds() {
            return [...new Set(this.medicalRecords.map(record => record.doctorId))];
        },
        filteredRecords() {
            return this.medicalRecords.filter(record => {
                const matchesDoctor = !this.selectedDoctor || record.doctorId == this.selectedDoctor;
                const matchesStatus = !this.selectedStatus || record.status === this.selectedStatus;
                return matchesDoctor && matchesStatus;
            });
        }
    },
    methods: {
        editDiagnosis(record) {
            this.selectedRecord = { ...record };
            let modal = new bootstrap.Modal(document.getElementById('editDiagnosisModal'));
            modal.show();
        },
        saveDiagnosis() {
            const index = this.medicalRecords.findIndex(r => r.id === this.selectedRecord.id);
            if (index !== -1) {
                this.medicalRecords[index].diagnosis = this.selectedRecord.diagnosis;
            }
            let modalElement = document.getElementById('editDiagnosisModal');
            let modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        }
    }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
</style>
