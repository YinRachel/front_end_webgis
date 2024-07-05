<template>
  <div class="login-wrap">
    <h1 class="title">光谷智慧交通系统</h1>
    <el-form class="login-container">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="交警" name="common"></el-tab-pane>
        <el-tab-pane label="交管部门" name="traffic"></el-tab-pane>
        <el-tab-pane label="管理员" name="admin"></el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-input
          type="text"
          placeholder="用户账号"
          v-model="username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="用户密码"
          v-model="password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" style="width: 100%"
          >登录</el-button
        >
      </el-form-item>
      <el-row style="text-align: center">
        <el-link @click="gotoRegister">注册</el-link>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import { httpGetUser } from '../api/index'
import { useRouter } from 'vue-router'
const $router = useRouter()
import { onMounted, ref } from 'vue'
import { useTokenStore } from '../stores/tokener'
const tokener = useTokenStore()

const activeName = ref('common')
const username = ref('')
const password = ref()
// 请求来的user的信息
const userList = ref([])

onMounted(async () => {
  const res = await httpGetUser()
  userList.value = res.data
  console.log(userList.value)
})

const gotoRegister = () => {
  $router.push('/register')
}

const handleLogin = () => {
  const user = userList.value.find(
    item =>
      item.user_name === username.value && item.user_password === password.value
  )
  if (user) {
    if (user.user_type == activeName.value) {
      tokener.token = user.user_password
      tokener.username = user.user_name
      tokener.usertype = user.user_type
      localStorage.setItem('traffictoken', user.user_password)
      console.log('成功')
      $router.push('/home')
    } else {
      alert('权限不匹配，请检查用户登录口')
    }
  } else {
    alert('登录失败，请检查用户名或密码')
  }
}

const handleClick = tab => {
  activeName.value = tab.props.name
  //console.log(tab)
  //console.log(activeName.value)
}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding-top: 10%;
  background-image: url('../assets/image/background.png');
  /* background-color: #112346; */
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: cover;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #2f8ef4;
}
</style>
