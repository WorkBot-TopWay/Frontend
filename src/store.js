import Vuex from 'vuex'
export const store = new Vuex.Store({
    state: {
        id:0,
        firstName: '',
        lastName: '',
        email: '',
        password: "",
        district: '',
        address: '',
        urlPhoto: '',
        phone: '',
    }
});