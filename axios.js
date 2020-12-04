import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://192.168.2.132:3333',
})

// export default http