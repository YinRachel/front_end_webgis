<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户注册</h1>
      <el-form-item>
        <el-input
          type="text"
          placeholder="用户名"
          v-model.trim="username"
          autocomplete="off"
          @blur="handleName"
        ></el-input>
        <el-text class="mx-1" type="success" v-if="isUser"
          >用户名可用<el-icon><SuccessFilled /></el-icon
        ></el-text>
        <el-text class="mx-1" type="danger" v-else
          >用户名已存在<el-icon><WarningFilled /></el-icon
        ></el-text>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="用户密码"
          v-model.trim="password"
          autocomplete="off"
          show-password
          @blur="handlePass"
        ></el-input>
        <el-text class="mx-1" type="success" v-if="isPass"
          >密码可用<el-icon><SuccessFilled /></el-icon
        ></el-text>
        <el-text class="mx-1" type="danger" v-else
          >密码需为6位<el-icon><WarningFilled /></el-icon
        ></el-text>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="确认密码"
          v-model.trim="repeatword"
          autocomplete="off"
          show-password
          @blur="handleRepeat"
        ></el-input>
        <el-text class="mx-1" type="success" v-if="isRepeat"
          >密码可用<el-icon><SuccessFilled /></el-icon
        ></el-text>
        <el-text class="mx-1" type="danger" v-else
          >两次输入不一致<el-icon><WarningFilled /></el-icon
        ></el-text>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister()" style="width: 48%"
          >注册</el-button
        >
        <el-button @click="gotoLogin" style="width: 48%">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { httpPostUser, httpGetUser } from '../api/index'
import { useRouter } from 'vue-router'
const $router = useRouter()
import { onMounted, ref } from 'vue'

const username = ref('')
const password = ref()
const repeatword = ref()

// v-if用的
const isUser = ref()
const isPass = ref()
const isRepeat = ref()

// 把username放到一个数组中
const allNames = ref([])

onMounted(async () => {
  const res = await httpGetUser()
  console.log(res.data)
  allNames.value = res.data.map((item) => item.user_name)
})

// 检测用户名是否存在
const handleName = () => {
  if (allNames.value.includes(username.value)) {
    isUser.value = false
  } else if (username.value == '') {
    alert('不能输入为空')
  } else {
    isUser.value = true
  }
}

// 检测密码为6位
const handlePass = () => {
  if (password.value.length != 6) {
    isPass.value = false
  } else if (password.value == '') {
    alert('不能输入为空')
  } else {
    isPass.value = true
  }
}

// 检测两次密码输入值相同
const handleRepeat = () => {
  if (repeatword.value != password.value) {
    isRepeat.value = false
  } else {
    isRepeat.value = true
  }
}

// 注册功能post
const handleRegister = async () => {
  const data = {
    user_name: username.value,
    user_password: password.value,
    user_type: 'common',
    user_onlinestatus: 0,
    user_other: 1,
  }
  const res = await httpPostUser(data)

  alert('注册成功，点击返回登录进行登录')
}

// 点击返回登录进行跳转
const gotoLogin = () => {
  $router.push('/')
}

//
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
  color: #505458;
}
</style>
