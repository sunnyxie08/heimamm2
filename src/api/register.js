
import axios from 'axios'

export function apiGetCode({phone,code}){
   return axios({
        url:process.env.VUE_APP_ONLINE + "/sendsms",
        method:"post",
        data:{
                phone:phone,
                code:code
              },
    })
}