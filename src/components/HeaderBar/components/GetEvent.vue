<template>
  <div>
    <el-menu-item index="7-2" @click="dialogVisible = true"
      >查看事件</el-menu-item
    >
    <el-dialog v-model="dialogVisible" title="路况信息">
      <el-form>
        <el-form-item label="搜索">
          <el-col :span="8">
            <el-select v-model="searchType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input
              placeholder="请输入查询要素"
              v-model.trim="inputValue"
              @keydown.enter="handleSearch"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-table :data="tableData()" stripe style="width: 100%">
            <el-table-column label="用户名" width="70%" prop="event_user" />
            <el-table-column label="类型" width="60%" prop="event_type" />
            <el-table-column
              show-overflow-tooltip
              width="70%"
              label="地址"
              prop="event_addr"
            />
            <el-table-column width="90%" label="附近建筑" prop="event_mark" />
            <el-table-column width="110%" label="时间" prop="event_time" />
            <el-table-column
              show-overflow-tooltip
              label="描述"
              prop="event_describe"
            />
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  v-show="scope.row.event_status != 0"
                  type="success"
                  size="small"
                  disabled
                >
                  {{ scope.row.event_status == '1' ? '已通过' : '已忽略' }}
                </el-button>
                <el-button
                  v-show="scope.row.event_status == 0"
                  @click="handleClickPass(scope.row.id)"
                  type="primary"
                  size="small"
                >
                  通过
                </el-button>
                <el-button
                  v-show="scope.row.event_status == 0"
                  type="danger"
                  size="small"
                  @click="handleClickIgnore(scope.row.id)"
                >
                  忽略
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
              :total="eventList.length"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { httpGetEvent, httpPatchEvent } from '@/api/index'
import { onMounted, ref, watch } from 'vue'

const dialogVisible = ref(false)

const eventList = ref([])
// 定义一个内容不变的数组专门来放请求来的event
const unchangeList = ref([])

// 搜索功能
const inputValue = ref('')
const searchType = ref('')
const options = [
  { label: '用户名' },
  { label: '类型' },
  { label: '地址' },
  { label: '附近建筑' },
  { label: '时间' },
  { label: '描述' },
]

// 为了实现watch监听
const isChange = ref(0)

// 分页功能
const page = ref(1)
const size = ref(5)

onMounted(async () => {
  const res = await httpGetEvent()
  eventList.value = res.data
  unchangeList.value = res.data
})

// watch实现点击button审核操作后页面重新加载
watch(isChange, (newVal, oldVal) => {
  location.reload()
})

// 审核操作
const handleClickPass = async a => {
  const data = { event_status: 1 }
  const id = a
  const res = await httpPatchEvent(id, data)
  isChange.value++
}
const handleClickIgnore = async a => {
  const data = { event_status: 2 }
  const id = a
  const res = await httpPatchEvent(id, data)
  isChange.value++
}

// 搜索操作
const handleSearch = () => {
  //  结束搜索后重新将cityList的值为初始请求来的event
  eventList.value = unchangeList.value

  if (searchType.value == '用户名') {
    var res = eventList.value.filter(event => {
      return event.event_user.includes(inputValue.value)
    })
    eventList.value = res
  } else if (searchType.value == '类型') {
    var res = eventList.value.filter(event => {
      return event.event_type.includes(inputValue.value)
    })
    eventList.value = res
  } else if (searchType.value == '地址') {
    var res = eventList.value.filter(event => {
      return event.event_addr.includes(inputValue.value)
    })
    eventList.value = res
  } else if (searchType.value == '附近建筑') {
    var res = eventList.value.filter(event => {
      return event.event_mark.includes(inputValue.value)
    })
    eventList.value = res
  } else if (searchType.value == '时间') {
    var res = eventList.value.filter(event => {
      return event.event_time.includes(inputValue.value)
    })
    eventList.value = res
  } else if (searchType.value == '描述') {
    var res = eventList.value.filter(event => {
      return event.event_describe.includes(inputValue.value)
    })
    eventList.value = res
  }
}

//翻页相关
const tableData = () => {
  return eventList.value.filter(
    (item, index) =>
      index < page.value * size.value && index >= size.value * (page.value - 1)
  )
}
const handleCurrentChange = p => {
  page.value = p
}
</script>

<style scoped></style>
