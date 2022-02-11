import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yomizu',
            products: {},
            temp:{}
        
        }
    },
    methods: {
        checkLogin() {
            const url = `${this.url}/api/user/check`
            axios.post(url)
                .then(() => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert('請重新登入');
                    window.location = 'mizuLogin.html'
                })
        },
        mizuLogin() {
            window.location = 'addRecord.html';
        },
        getProducts() {
            const url = `${this.url}/api/${this.path}/admin/products`
            axios.get(url)
                .then((res) => {
                    console.log(res.data.products);
                    this.products = res.data.products;
                    console.log(this.products);
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'mizuLogin.html'
                })
        },
    },
    mounted() {
        // //* 將儲存在 cookie 的 token 取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)mizuToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        //* 檢查登入
        this.checkLogin();
        // this.getDate()
        this.getProducts()
    }

})
app.mount('#app')