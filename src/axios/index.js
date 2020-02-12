import axios from 'axios'

let baseurl = 'http://127.0.0.1:8787'


export const RequestValue = (url, params) =>{
    return axios({
        method: 'post',
        url: baseurl+url,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: baseurl+url,
        data: params,
        headers: {
            'Authorization': window.sessionStorage.getItem('token')
          }
        
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: baseurl+url,
        data: params,
        headers: {
            'Authorization': window.sessionStorage.getItem('token')
          }
    })
}
export const getRequest = (url) => {
    return axios({
        method: 'get',
        url: baseurl+url,
        headers: {
            'Authorization': window.sessionStorage.getItem('token')
          }
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: baseurl+url,
        data: params,
        headers: {
            'Authorization': window.sessionStorage.getItem('token')
          }
    })
}

export const fileRequest = (url, params) => {
    return axios({
        method: 'post',
        url: baseurl+url,
        data: params,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': window.sessionStorage.getItem('token')
          }
    })
}

// axios.interceptors.response.use(success => {
//     if (success.status && success.status == 200 && success.data.status == 500) {
//         Message.error({message: success.data.msg})
//         return;
//     }
//     if (success.data.msg) {
//         Message.success({message: success.data.msg})
//     }
//     return success.data;
// }, error => {
//     if (error.response.status == 504 || error.response.status == 404) {
//         Message.error({message: '服务器被吃了( ╯□╰ )'})
//     } else if (error.response.status == 403) {
//         Message.error({message: '权限不足，请联系管理员'})
//     } else if (error.response.status == 401) {
//         Message.error({message: '尚未登录，请登录'})
//         router.replace('/');
//     } else {
//         if (error.response.data.msg) {
//             Message.error({message: error.response.data.msg})
//         } else {
//             Message.error({message: '未知错误!'})
//         }
//     }
//     return;
// })
