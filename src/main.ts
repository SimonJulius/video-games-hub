import { createApp } from "vue";
import axios from "axios"
import VueAxios from "vue-axios"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Notifications from "@kyvg/vue3-notification"

import { ContentLoader } from "vue-content-loader"

import App from "./App.vue";
import router from "./router";
import CustomSelect from "./components/CustomSelect.vue"
import Input from "./components/Input.vue";

library.add(faArrowUp)


const app = createApp(App)
app.use(Notifications)
app.use(VueAxios, axios);
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('CustomSelect', CustomSelect);
app.component('Input', Input);
app.component('ContentLoader', ContentLoader)

app.mount("#app");
