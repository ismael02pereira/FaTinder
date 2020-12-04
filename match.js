import { http } from './config/axios'
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  match: id => {
    return http.get(`mathchs/${id}`)
  },
  createMatch: body => {
    return http.post(`mathchs`, body)
  },
  desfazer: id => {
    return http.delete(`mathchs/${id}`)
  }
}