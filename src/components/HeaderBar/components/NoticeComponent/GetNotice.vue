<template>
  <div>
    <el-menu-item index="5-1" @click="dialogVisible = true"
      >查看公告</el-menu-item
    >

    <el-dialog v-model="dialogVisible" title="公告信息" width="50%">
      <el-table :data="tableData()" style="width: 100%">
        <el-table-column
          label="编号"
          width="60%"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="公告标题"
          prop="notice_title"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="公告内容"
          prop="notice_content"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="公告详情" align="center">
          <template v-slot="scope">
            <el-button
              text
              @click="
                handleClick(
                  scope.row.notice_title,
                  scope.row.notice_time,
                  scope.row.notice_content
                )
              "
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page-box">
        <el-pagination
          :page-size="5"
          :current-page="page"
          layout="total, prev, pager, next"
          :total="noticeList.length"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <!-- 内部dialog -->
      <el-dialog v-model="innerVisible" title="公告详情" width="50%">
        <h2>标题：{{ noticeItem.notice_title }}</h2>
        <h3>公告时间：{{ noticeItem.notice_time }}</h3>
        <h4>具体内容：{{ noticeItem.notice_content }}</h4>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script setup>
import { httpGetNotice } from '@/api/index'
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

// 定义数组来接收数据库的公告
const noticeList = ref([])

// 定义item来实现查看详情
const noticeItem = ref({
  notice_title: '',
  notice_time: '',
  notice_content: '',
})

// 分页功能
const page = ref(1)
const size = ref(5)

const dialogVisible = ref(false)
const innerVisible = ref(false)

onMounted(async () => {
  const res = await httpGetNotice()
  noticeList.value = res.data
})
const handleClick = (a, b, c) => {
  console.log(a, b, c)
  innerVisible.value = true
  noticeItem.value.notice_title = a
  noticeItem.value.notice_time = b
  noticeItem.value.notice_content = c
}

//翻页相关
const tableData = () => {
  return noticeList.value.filter(
    (item, index) =>
      index < page.value * size.value && index >= size.value * (page.value - 1)
  )
}
const handleCurrentChange = p => {
  page.value = p
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
