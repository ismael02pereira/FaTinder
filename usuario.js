import { http } from './config/axios'
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  login: (usuario, senha) => {
    return http.post(`usuarios/login`, {}, {
      headers: {
        usuario: usuario,
        senha: senha,
      }
    })
  },
  cadastrar: body => {
    return http.post(`usuarios`, body)
  },
  perfil: id => {
    return http.get(`usuarios/${id}`)
  },
  lista: () => {
    return http.get(`usuarios/pessoas`)
  },
  busca: param => {
    return http.get(`usuarios/pessoas/${param}`)
  },
  altera: body => {
    return http.put(`usuarios`, body)
  }
}