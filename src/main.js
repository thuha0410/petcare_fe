import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client.vue'
import Doctor from './layout/wrapper/doctor.vue'
import dangNhap from './layout/wrapper/dangNhap.vue'
const app = createApp(App)

app.use(router)
app.component("admin-layout", Admin);
app.component("dangNhap-layout", dangNhap);
app.component("client-layout", Client);
app.component("doctor-layout", Doctor);

app.mount("#app")