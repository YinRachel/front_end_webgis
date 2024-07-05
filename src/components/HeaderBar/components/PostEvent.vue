<template>
  <div>
    <el-menu-item index="2" @click="dialogVisible = true">报告路况</el-menu-item>
    <el-dialog v-model="dialogVisible" title="报告路况">
      <el-form>
        <el-form-item label="事件类型">
          <el-select v-model="eventType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件地址">
          <el-input
            v-model="eventAddr"
            placeholder="请输入路况地址，包括事故路段"
          ></el-input>
        </el-form-item>
        <el-form-item label="事件标识">
          <el-input
            v-model="eventMark"
            placeholder="请输入事故最近的建筑标识"
          ></el-input>
        </el-form-item>
        <el-form-item label="发生时间">
          <el-date-picker
            v-model="eventTime"
            type="datetime"
            placeholder="请输入日期和时间"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="YYYY-MM-DD h:m:s a"
          />
        </el-form-item>
        <el-form-item label="事件描述">
          <el-input
            type="textarea"
            v-model="eventDescribe"
            placeholder="请输入事故的具体信息"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="large" @click="handleClick"
        >提交</el-button
      >
    </el-dialog>
  </div>
</template>

<script setup>
import { httpPostEvent } from '@/api/index'
import { onMounted, ref, watch } from 'vue'

// 为了实现watch监听
const isChange = ref(0)

watch(isChange, (newVal, oldVal) => {
  location.reload()
})

const options = [
  { label: '刮擦' },
  { label: '失火' },
  { label: '碰撞' },
  { label: '碾压' },
  { label: '翻车' },
  { label: '其他' },
]
const dialogVisible = ref(false)
const eventType = ref('')
const eventAddr = ref('')
const eventMark = ref('')
const eventTime = ref('')
const eventDescribe = ref('')

const handleClick = async () => {
  if (
    eventType.value &&
    eventAddr.value &&
    eventMark.value &&
    eventTime.value &&
    eventDescribe.value
  ) {
    const data = {
      event_type: eventType.value,
      event_addr: eventAddr.value,
      event_mark: eventMark.value,
      event_time: eventTime.value,
      event_describe: eventDescribe.value,
      event_status: 0,
    }
    const res = await httpPostEvent(data)
    alert('添加路况成功')
    dialogVisible.value = false
    isChange.value++
  } else {
    alert('输入信息不得为空')
  }
}
</script>

<style scoped></style>
