import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Admin from './layout/wrapper/index.vue'
import Client from './layout/wrapper/client.vue'
import dangKy from './layout/wrapper/dangKy.vue'
import dangNhap from './layout/wrapper/dangNhap.vue'
const app = createApp(App)

app.use(router)
app.component("admin-layout", Admin);
app.component("dangKy-layout", dangKy);
app.component("dangNhap-layout", dangNhap);
app.component("client-layout", Client);

app.mount("#app")