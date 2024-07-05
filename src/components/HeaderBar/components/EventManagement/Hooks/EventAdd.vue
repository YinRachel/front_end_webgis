<template>
  <el-card shadow="always">
    <h5>添加事件</h5>
    <el-form :model="form" label-width="80px">
      <el-form-item label="事件编号" prop="eventSeries">
        <el-input disabled v-model="EventNum"></el-input>
      </el-form-item>
      <el-form-item label="事件类型" prop="eventType">
        <el-select placeholder="选择事件类型">
          <el-option label="碰撞" value="碰撞" />
          <el-option label="刮擦" value="刮擦" />
          <el-option label="翻车" value="翻车" />
          <el-option label="碾压" value="碾压" />
          <el-option label="失火" value="失火" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="事件等级" prop="eventLevel">
        <el-select placeholder="轻微事故">
          <el-option label="轻微事故" value="1" />
          <el-option label="一般事故" value="2" />
          <el-option label="重大事故" value="3" />
          <el-option label="特大事故" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="发生时间" prop="eventTime">
        <el-date-picker
          type="datetime"
          placeholder="年/月/日 --:--"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm"
        />
      </el-form-item>
      <el-form-item label="发生地点" prop="eventAddress">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="车牌号" prop="plateNumber">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="驾驶员" prop="driver">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="处理状态" prop="eventStatus">
        <el-select placeholder="未处理">
          <el-option label="待处理" value="0" />
          <el-option label="已忽略" value="1" />
          <el-option label="已归档" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button type="warning" @click="handleCancel">取消</el-button>
      </el-form-item></el-form
    >
  </el-card>
</template>
<script setup>
import { ref, inject, onMounted, defineProps } from 'vue'
import { createDraw } from '@/utils/createDraw.js'
import { getCurrentInstance } from 'vue'
const $map = ref()
const isShow = ref(true)
const $emit = defineEmits(['cancel'])
const EventNum = ref()
const handleCancel = () => {
  $emit('cancel')
}
const handleSubmit = () => {
  console.log('提交了')
  $emit('submit')
  $emit('EventInfo', '666')
}
</script>
<style scoped>
.el-card {
  position: fixed;
  top: 200px;
  left: 500px;
  z-index: 200;
  background-color: #fff;
}
</style>
