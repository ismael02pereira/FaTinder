import { http } from './config/axios'
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  lista: () => {
    return http.get(`categorias`)
  },
  create: body => {
    return http.post(`categorias`, body)
  }
}