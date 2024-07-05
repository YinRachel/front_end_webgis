import request from './request'
// user接口
const httpGetUser = () => {
  return request({
    url: 'http://localhost:8080/gg_user',
    method: 'GET',
  })
}
const httpPostUser = (data) => {
  return request({
    url: 'http://localhost:8080/gg_user',
    method: 'POST',
    data,
  })
}
// 公告接口
const httpGetNotice = () => {
  return request({
    url: 'http://localhost:8080/gg_notice',
    method: 'GET',
  })
}
const httpPostNotice = (data) => {
  return request({
    url: 'http://localhost:8080/gg_notice',
    method: 'POST',
    data,
  })
}
// 路况信息接口
const httpGetEvent = () => {
  return request({
    url: 'http://localhost:8080/gg_event',
    method: 'GET',
  })
}
const httpPostEvent = (data) => {
  return request({
    url: 'http://localhost:8080/gg_event',
    method: 'POST',
    data,
  })
}
const httpPatchEvent = (id,data) => {
  return request({
    url: `http://localhost:8080/gg_event/${id}`,
    method: 'PATCH',
    data,
  })
}

export { httpGetUser, httpPostUser, httpGetNotice, httpPostNotice, httpGetEvent, httpPostEvent, httpPatchEvent }
