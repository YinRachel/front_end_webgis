<template>
  <div>
    <el-menu-item index="5-2" @click="dialogVisible = true"
      >发布公告</el-menu-item
    >
    <el-dialog v-model="dialogVisible">
      <el-form>
        <el-form-item label="公告标题">
          <el-input
            type="text"
            placeholder="请输入公告标题"
            v-model.trim="noticeTitle"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容">
          <el-input
            :rows="2"
            type="textarea"
            placeholder="请输入公告内容"
            v-model.trim="noticeContent"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告时间">
          <el-date-picker
            v-model="noticeTime"
            type="datetime"
            placeholder="请输入公告日期和时间"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="YYYY-MM-DD h:m:s a"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClick">发布</el-button>
        </el-form-item></el-form
      >
    </el-dialog>
  </div>
</template>

<script setup>
import { httpPostNotice } from '@/api/index'
import { onMounted, ref, watch } from 'vue'
const dialogVisible = ref(false)

const noticeContent = ref('')
const noticeTitle = ref('')
const noticeTime = ref('')

// 为了实现watch监听
const isChange = ref(0)

watch(isChange, (newVal, oldVal) => {
  location.reload()
})

const handleClick = async () => {
  if (noticeContent.value && noticeTitle.value && noticeTime.value) {
    const data = {
      notice_content: noticeContent.value,
      notice_title: noticeTitle.value,
      notice_time: noticeTime.value,
    }
    const res = await httpPostNotice(data)

    noticeContent.value = ''
    noticeTitle.value = ''
    noticeTime.value = ''

    alert('添加公告成功')
    dialogVisible.value = false
    isChange.value++
  } else {
    alert('请填写完整公告信息')
  }
}
</script>

<style scoped></style>
