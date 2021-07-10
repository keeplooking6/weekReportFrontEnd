import request from '@/utils/request'

export default {
  //条件查询用户
  getUserList(current, limit, user) {
    return request({
      url: `/reportservice/select/${current}/${limit}`,
      method: 'post',
      data: user
    })
  },
  //删除用户
  deleteUserById(id) {
    return request({
      url: `/reportservice/delete/${id}`,
      method: 'delete'
    })
  },
  //添加用户
  addUser(user){
    return request({
      url: `/reportservice/add`,
      method: 'post',
      data: user
    })
  },
  //查找用户
  selectUserById(id){
    return request({
      url: `/reportservice/select/${id}`,
      method: 'get'
    })
  },
  //修改用户
  updateUser(user){
    return request({
      url: `/reportservice/update`,
      method: 'post',
      data: user
    })
  }
}
