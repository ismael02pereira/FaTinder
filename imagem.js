import { http } from './config/axios'
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  upload: body => {
    return http.put(`Imagens`, body)
  }
}