<template>
  <div id="user-header">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-header"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div class="logo">
            <div class="logo-img">图片</div>
            <div class="logo-text">
              <h2 class="logo-title">光谷智慧交通系统</h2>
              <div class="logo-type">后台管理</div>
            </div>
          </div>
          <real-traffic></real-traffic>
          <post-event></post-event>
          <road-camera></road-camera>
          <event-management></event-management>
          <el-sub-menu index="5">
            <template #title>公告管理</template>
            <get-notice></get-notice>
            <post-notice></post-notice>
          </el-sub-menu>
          <measure-tool></measure-tool>
          <el-sub-menu index="7">
            <template #title>查看上报</template>
            <el-menu-item index="7-1">查看路况</el-menu-item>
            <get-event></get-event>
          </el-sub-menu>
          <user-management></user-management>
        </el-menu>
        <div class="info">
          <el-input
            class="info-search w-50 m-2"
            placeholder="请输入搜索关键字"
            :suffix-icon="Search"
          />
          <p class="info-name">后台管理</p>
          <el-avatar class="info-avatar" :size="40" :src="circleUrl" />
        </div>
      </el-header>
    </el-container>
  </div>
</template>
<script setup>
import UserManagement from './components/UserManagement.vue'
import RoadCamera from './components/RoadCamera.vue'
import EventManagement from './components/EventManagement/EventManagement.vue'
import RealTraffic from './components/RealTraffic.vue'
import MeasureTool from './components/MeasureTool/index.vue'
import GetNotice from './components/NoticeComponent/GetNotice.vue'
import PostNotice from './components/NoticeComponent/PostNotice.vue'
import PostEvent from './components/PostEvent.vue'
import GetEvent from './components/GetEvent.vue'
</script>
<style scoped>
#user-header {
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #fff;
  z-index: 100;
}
#user-header .el-header {
  padding: 0;
}
.logo {
  display: flex;
}
.logo .logo-img {
  margin: 0 30px;
}
.logo-text {
  margin-right: 15px;
  color: #fff;
}
.logo-text .logo-type {
  color: #ffd04b;
}
.info {
  position: fixed;
  top: 0;
  right: 10px;
  display: flex;
  text-align: center;
  align-items: center;
  height: 60px;
}
.info-search {
  margin: 0 10px;
  width: 170px;
}
.info-name {
  width: 80px;
  margin-right: 2px;
}
.info-avatar {
  margin-right: 5px;
}
</style>
