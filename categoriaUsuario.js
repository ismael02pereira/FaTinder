import { http } from './config/axios'
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  lista: id => {
    return http.get(`categorias/usuarios/${id}`)
  }, 
  create: body => {
    return http.post(`categorias/usuarios`, body)
  }
}