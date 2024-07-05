import axios from 'axios'

function httpGetUser() {
  return axios({
    url: 'http://localhost:8080/gg_user',
    method: 'GET',
  })
}
function httpDelUser(id) {
  return axios({
    url: 'http://localhost:8080/gg_user/' + id,
    method: 'DELETE',
  })
}
function httpGetUserById(id) {
  return axios({
    url: 'http://localhost:8080/gg_user/' + id,
    method: 'GET',
  })
}
function httpAddUser(data) {
  return axios({
    url: 'http://localhost:8080/gg_user',
    method: 'POST',
    data,
  })
}
function httpUpdateUser(user) {
  console.log(user);
  return axios({
    url: 'http://localhost:8080/gg_user/' + user.id,
    method: 'PUT',
    data: {
      user_name: user.user_name,
      user_password: user.user_password,
      user_type: user.user_type,
      user_onlinestatus: 0,
      user_other: 1,
    },
  })
}
function httpOfflineUser(user) {
  
  return axios({
    url: 'http://localhost:8080/gg_user/' + user.id,
    method: 'PUT',
    data: {
      user_name: user.user_name,
      user_password: user.user_password,
      user_type: user.user_type,
      user_onlinestatus: 0,
      user_other: 1,
    },
  })
}

export {
  httpGetUser,
  httpDelUser,
  httpGetUserById,
  httpAddUser,
  httpUpdateUser,
  httpOfflineUser
}
