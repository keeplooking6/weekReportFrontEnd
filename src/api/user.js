import request from '@/utils/request'

export function login(username,password) {
  return request({
    url: '/reportservice/login',
    method: 'post',
    data:{
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/reportservice/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/reportservice/logout',
    method: 'post'
  })

// export function selectUser(name){
//     return request({
//       url: `/reportservice/add/${name}`,
//       method: 'get',
//       params: name
//     })
// }
}
