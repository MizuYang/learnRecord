import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';
// import { pagination } from './pagination';

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yomizu',
            temp: {},
            data: {
                title: '1',
                category: '1',
                unit: '1',
                origin_price: 1,
                price: 1,
                learnTime: '',
                learnItem: [],
                today: '',
                images:[],
                todoContent: [],
            },
            products: [],
            disabled:true,
            password:'',
            todoContent: '',
        }
    },
    // components:{
    //     pagination
    // },
    methods: {
        //* 回去紀錄頁面
        backPage() {
            window.location = 'record.html';
        },
        //* 新增學習紀錄
        addLearnRecord() {
            this.getDate();
            let url = `${this.url}/api/${this.path}/admin/product`;
            axios.post(url, { data: this.data })
                .then((res) => {
                    console.log(res);
                    this.getProducts()
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        //* 檢查登入狀態
        checkLogin() {
            const url = `${this.url}/api/user/check`
            axios.post(url)
                .then(() => {
                    this.getProducts();
                })
                .catch((err) => {
                    alert(err.data.message);
                    console.dir(err);
                    window.location = 'record.html'
                })
        },
        // //* 取得產品資訊
        getProducts() {
            const url = `${this.url}/api/${this.path}/admin/products`
            axios.get(url)
                .then((res) => {
                    console.log(res.data);
                    this.products = res.data.products;
                    // this.todoContent = res.data.products.todoContent;
                    // console.log(this.disabled);
                })
                .catch((err) => {
                    alert(err.data.message);
                    window.location = 'record.html'
                })
        },
        // //* 刪除產品
        delProduct(id) {
            const url = `${this.url}/api/${this.path}/admin/product/${id}`
            axios.delete(url)
            .then((res) => {
                // alert(res.data.message);
                this.getProducts();
                this.temp = {}; //* 刪除資料的同時，將查看產品細節清空
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        //* 日期
        getDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            let weekDay = date.getDay();
            if(weekDay === 0){
                weekDay = '日'
            }else if(weekDay === 1){
                weekDay = '一'
            }else if(weekDay === 2){
                weekDay = '二'
            }else if(weekDay === 3){
                weekDay = '三'
            }else if(weekDay === 4){
                weekDay = '四'
            }else if(weekDay === 5){
                weekDay = '五'
            }else if(weekDay === 6){
                weekDay = '六'
            }
            const today = `${year}/${month}/${day}(${weekDay})　　　${hour}點${minute}分${second}秒`
            this.data.today = today;
        },
        key(){
            if(this.password === 'pk24') {
                this.disabled = false
            }else{
                this.disabled = true
            }
        },
        //* 新增學習內容
        add_todo(){
            this.data.todoContent.push(this.$refs.todoContent.value);
            this.$refs.todoContent.value = '';
        },
    },
    mounted() {
        // //* 將儲存在 cookie 的 token 取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)mizuToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        //* 檢查登入
        this.checkLogin();
        this.getDate()
    }
})
app.mount('#app')

