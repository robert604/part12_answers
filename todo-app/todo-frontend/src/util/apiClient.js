import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})
console.log('url-----------',process.env.REACT_APP_BACKEND_URL)
export default apiClient