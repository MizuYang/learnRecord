import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'yomizu',
            user: {
                "username": 'yomizu@gmail.com',
                "password": 'yomizu'
            }
        }
    },
    methods: {
        login() {
            // 登入帳號
            axios.post(`${this.url}/admin/signin`, this.user)
                .then((res) => {
                    // 抓出 token 和 唯一值
                    const { token, expired } = res.data;
                    // 存入 cookie
                    document.cookie = `mizuToken=${token};expires=${new Date(expired)};`
                    window.location = 'record.html'
                })
                .catch((err) => {
                    alert(err.data.message)
                    this.user.username = '';
                    this.user.password = '';
                })
        },
        backPage(){
            window.location = 'record.html';
        }
    }
})
app.mount('#app')