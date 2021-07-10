import request from '@/utils/request'

export default {
  //条件查询周报
  getReportList(current, limit, report) {
    return request({
      url: `/reportservice/t-report/queryPaging/${current}/${limit}`,
      method: 'post',
      data: report
    })
  },
  //删除周报
  deleteReportById(id) {
    return request({
      url: `/reportservice/t-report/deleteById/${id}`,
      method: 'delete'
    })
  },
  //添加周报
  addReport(report){
    return request({
      url: `/reportservice/t-report/addReport`,
      method: 'post',
      data: report
    })
  },
  //查找周报
  selectReportById(id){
    return request({
      url: `/reportservice/t-report/selectById/${id}`,
      method: 'get'
    })
  },
  //修改周报
  updateReport(report){
    return request({
      url: `/reportservice/t-report/update`,
      method: 'post',
      data: report
    })
  }
}
