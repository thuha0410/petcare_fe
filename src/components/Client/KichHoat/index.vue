<template >
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: 'top-left' });
export default {
    props: ['id_khach_hang'],
    mounted() {
        this.kichHoat()
    },
    methods: {
        kichHoat(){
            var payload={
                id_khach_hang: this.$route.params.id_khach_hang
            }
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/kich-hoat', payload)
                .then((res) => {                  
                    if (res.data.status == 1) {
                        toaster.success(res.data.message)
                        this.$router.replalace('/client/dang-nhap-dang-ky')
                    } else if (res.data.status == 2) {
                        toaster.success(res.data.message)
                        this.$router.replalace('/client/dang-nhap-dang-ky')
                    } else {
                        toaster.error(res.data.message)
                        this.$router.replalace('/')
                    }
                })
        }
    },
}
</script>
<style >
    
</style>