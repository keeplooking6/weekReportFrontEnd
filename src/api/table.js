import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/reportservice/table/list',
    method: 'get',
    params
  })
}
