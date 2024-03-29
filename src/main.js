import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Vuex from 'vuex'
// PrimeVue Theme
import "primevue/resources/themes/saga-blue/theme.css"       //theme
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'//core css
import "primeicons/primeicons.css"
import Toolbar from "primevue/toolbar";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Image from 'primevue/image';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';
import DataView from 'primevue/dataview';
import Rating from 'primevue/rating';
import Galleria from 'primevue/galleria';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import OrderList from 'primevue/orderlist';
import ScrollPanel from 'primevue/scrollpanel';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import TreeTable from 'primevue/treetable';
import Chip from 'primevue/chip';
import Steps from 'primevue/steps';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';
import Tag from 'primevue/tag';
import Toast from "primevue/toast";
import Dialog from 'primevue/dialog';


const app = createApp(App)

app.use(router)

app.use(Vuex)

app.use(PrimeVue);

app.use(ToastService)

// PrimeVue used components
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toolbar", Toolbar);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Image", Image);
app.component("DataTable", DataTable);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Column", Column);
app.component("InputText", InputText);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Button", Button);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Card", Card);

// eslint-disable-next-line vue/multi-word-component-names
app.component("Menubar", Menubar);

app.component("DataView", DataView);

// eslint-disable-next-line vue/multi-word-component-names
app.component("Rating", Rating);

// eslint-disable-next-line vue/multi-word-component-names
app.component("Galleria", Galleria);

app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);
app.component("OrderList", OrderList);
app.component("ScrollPanel", ScrollPanel);
app.component("ColumnGroup", ColumnGroup);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Row", Row);
app.component("TreeTable", TreeTable);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Chip", Chip);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Steps", Steps);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Dropdown", Dropdown);
app.component("InputNumber", InputNumber);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Password", Password);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Tag", Tag);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toast", Toast);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Dialog", Dialog);

app.mount('#app')
