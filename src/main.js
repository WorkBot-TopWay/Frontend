import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
// PrimeVue Theme
import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css"
import Toolbar from "primevue/toolbar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";

const app = createApp(App)

app.use(router)

app.use(PrimeVue);

// PrimeVue used components
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toolbar", Toolbar);
app.component("DataTable", DataTable);
// eslint-disable-next-line vue/multi-word-component-names
app.component("column", Column);
app.component("InputText", InputText);


app.mount('#app')
