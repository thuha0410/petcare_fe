<template>
    <div>
      <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h3>THÔNG TIN THÚ CƯNG</h3>
            </div>
            <div class="card-body">
              <div class="text-center">
                <img
                  style="height: 200px;"
                  :src="pet.image"
                  alt="Pet Image"
                />
                <div v-if="isEditing" class="mt-2">
                  <input type="file" @change="onImageChange" accept="image/*" />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <label class="mt-2">Tên khách hàng</label>
                  <input class="form-control" type="text" v-model="pet.ownerName" :readonly="!isEditing" />
  
                  <label class="mt-2">Tên pet</label>
                  <input class="form-control" type="text" v-model="pet.petName" :readonly="!isEditing" />
  
                  <label class="mt-2">Giới tính</label>
                  <input class="form-control" type="text" v-model="pet.gender" :readonly="!isEditing" />
                </div>
                <div class="col-lg-6">
                  <label class="mt-2">Chủng loại</label>
                  <input class="form-control" type="text" v-model="pet.type" :readonly="!isEditing" />
  
                  <label class="mt-2">Tuổi</label>
                  <input class="form-control" type="number" v-model="pet.age" :readonly="!isEditing" />
  
                  <label class="mt-2">Cân nặng</label>
                  <input class="form-control" type="number" step="0.1" v-model="pet.weight" :readonly="!isEditing" />
                </div>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
              <button class="btn btn-secondary me-2" v-if="isEditing" @click="cancelEdit">Hủy</button>
              <button class="btn btn-primary" @click="toggleEdit">
                {{ isEditing ? 'Lưu' : 'Sửa thông tin' }}
              </button>
            </div>
          </div>
        </div>
        <div class="col-lg-3"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PetInfoCard",
    data() {
      return {
        isEditing: false,
        pet: {
          ownerName: "Lee Wonhee",
          petName: "Hanni",
          type: "Chó",
          gender: "Cái",
          age: 20,
          weight: 5.2,
          image: "https://placedog.net/400/400?id=1"
        },
        originalPet: null
      };
    },
    methods: {
      toggleEdit() {
        if (this.isEditing) {
          console.log("Thông tin đã lưu:", this.pet);
          alert("Thông tin đã được lưu!");
          this.originalPet = null;
        } else {
          this.originalPet = JSON.parse(JSON.stringify(this.pet));
        }
        this.isEditing = !this.isEditing;
      },
      cancelEdit() {
        if (this.originalPet) {
          this.pet = JSON.parse(JSON.stringify(this.originalPet));
          this.originalPet = null;
        }
        this.isEditing = false;
      },
      onImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.pet.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 30px;
  }
  </style>
  