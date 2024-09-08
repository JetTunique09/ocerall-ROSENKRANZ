import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    //par défaut du JSON
    'Content-Type': 'application/json'
  }
})

export default {
  install: (app) => {
    // configure the $axios global property
    app.config.globalProperties.$http = { ...axiosInstance }
    // on pourra utiliser this.$http.get(...)
  }
}
