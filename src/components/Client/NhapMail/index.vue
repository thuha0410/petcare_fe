<template>
  <div class="container-fluid" style="height: 100vh">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-4 text-center">

        <div v-if="activated" class="alert alert-success">
          Tài khoản của bạn đã được kích hoạt!
        </div>

        <div v-if="waitingForVerify" class="alert alert-info">
          Vui lòng kiểm tra email để xác thực tài khoản của bạn...
        </div>

        <h1
          style="font-size: 50px; font-weight: bold; font-family: 'Fredoka', sans-serif;"
        >
          Vui lòng nhập email của bạn
        </h1>

        <div class="input-group flex-nowrap mt-3">
          <span class="input-group-text" id="addon-wrapping">
            <i class="fa-solid fa-square-envelope"></i>
          </span>
          <input
            v-model="mail.email"
            type="email"
            class="form-control"
            placeholder="Nhập email của bạn"
            aria-label="Email"
          />
        </div>

        <button
          style="font-size: 18px; font-weight: bold; font-family: 'Fredoka', sans-serif; color: white;"
          class="button mt-4"
          v-on:click="sendMail()"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mail: {
        email: "",
      },
      activated: false,
      waitingForVerify: false,
    };
  },
  mounted() {
    const isActivated = this.$route.query.activated;
    if (isActivated === "true") {
      this.activated = true;
    }
  },
  methods: {
    sendMail() {
      axios
        .post("http://127.0.0.1:8000/api/khach-hang/send-mail", this.mail)
        .then((res) => {
          toaster.success(res.data.message);

          this.waitingForVerify = true;

        })
    },
  },
};
</script>
<style >
</style>