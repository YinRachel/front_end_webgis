<template>
  <el-menu-item index="8" @click="showUsers">用户管理</el-menu-item>
  <div id="user-management">
    <el-dialog v-model="dialogVisible" title="用户信息" width="45%" draggable>
      <el-row>
        <el-col :span="14">
          <el-button type="primary" size="mini" @click="handleAdd">
            <el-icon><Plus /></el-icon>添加
          </el-button>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="请输入用户名"
            class="input-with-select"
            v-model.trim="keywords"
            @keydown.enter="onSearch"
            @input="onChange"
          >
            <template #append>
              <el-button :icon="Search" @click="onSearch" />
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData()" stripe style="width: 100%">
        <el-table-column label="用户名" width="120px" prop="user_name" />
        <el-table-column label="用户类型" width="120px" prop="user_type" />
        <!-- :prop="user_type === 'commom' ? '普通用户' : '其他'" -->
        <el-table-column
          label="登录状态"
          width="120px"
          prop="user_onlinestatus"
        />
        <el-table-column label="操作">
          <template v-slot="table">
            <div class="user-button">
              <el-button
                type="success"
                size="small"
                @click="handleEdit(table.row.id)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="handleDel(table.row.id)"
                >删除</el-button
              >
              <el-button
                type="warning"
                size="small"
                @click="handleOffline(table.row.id)"
                :disabled="table.row.user_onlinestatus === 1 ? false : true"
                >下线</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="prev, pager, next ,total"
          :total="totalUser"
        />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改和增加用户对话框 -->
    <el-dialog
      v-model="isShow"
      :title="isEdit ? '修改用户信息' : '增加用户'"
      width="40%"
      draggable
    >
      <el-form :model="user" ref="editOrAddUser" :rules="rules">
        <el-form-item label="用户名" label-width="140px" prop="user_name">
          <el-col :span="13">
            <el-input
              v-model.trim="user.user_name"
              autocomplete="off"
              placeholder="请输入用户名"
              width="100px"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="密码" label-width="140px" prop="user_password">
          <el-col :span="13">
            <el-input
              type="password"
              show-password
              v-model.trim="user.user_password"
              autocomplete="off"
              placeholder="请输入密码"
              width="100px"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="用户类型" label-width="140px" prop="user_type">
          <el-select v-model="user.user_type" placeholder="请选择用户类型">
            <el-option label="普通用户" value="common" />
            <el-option label="交管部门" value="traffic" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import {
  httpGetUser,
  httpDelUser,
  httpGetUserById,
  httpUpdateUser,
  httpAddUser,
  httpOfflineUser,
} from '@/api/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
const dialogVisible = ref(false)
const isEdit = ref()
const isShow = ref(false)
const userLists = ref([])
const userListsTransfer = ref([])
const totalUser = ref()

/* 表单校验规则 */
const rules = reactive({
  user_name: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
  user_password: [
    { required: true, message: '密码不能为空', trigger: 'change' },
  ],
  user_type: [
    { required: true, message: '用户类型不能为空', trigger: 'change' },
  ],
})
const keywords = ref('')

const user = reactive({
  id: '',
  user_name: '',
  user_onlinestatus: '',
  user_password: '',
  user_type: '',
})

onMounted(() => {
  getUser()
})
/* 显示用户信息弹窗 */
function showUsers() {
  dialogVisible.value = !dialogVisible.value
}
/* 分页 */
const state = reactive({
  page: 1,
  size: 10,
})

//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  return userLists.value.filter(
    (item, index) =>
      index < state.page * state.size && index >= state.size * (state.page - 1)
  )
}
const handleCurrentChange = e => {
  state.page = e
}
const handleSizeChange = e => {
  state.size = e
}
/* 获取用户 */
async function getUser() {
  await httpGetUser().then(res => {
    // console.log(res)
    userLists.value = res.data
    userListsTransfer.value = res.data
    totalUser.value = userLists.value.length
  })
}
/* 搜索用户 */
function onSearch() {
  console.log(keywords.value)
  var searchUsers = userLists.value.filter(evt => {
    return evt.user_name.includes(keywords.value)
  })
  userLists.value = searchUsers
}
function onChange(evt) {
  console.log(evt)
  userLists.value = userListsTransfer.value
  var searchUsers = userLists.value.filter(evt => {
    return evt.user_name.includes(keywords.value)
  })
  userLists.value = searchUsers
}

/* 编辑用户回显该用户信息 */
async function handleEdit(id) {
  isShow.value = !isShow.value
  isEdit.value = true
  await httpGetUserById(id).then(res => {
    user.id = res.data.id
    user.user_name = res.data.user_name
    user.user_password = res.data.user_password
    user.user_type = res.data.user_type
  })
}
/* 添加用户 */
function handleAdd() {
  user.user_name = ''
  user.user_password = ''
  user.user_type = ''
  isShow.value = !isShow.value
  isEdit.value = false
}
/* 删除功能 */
const handleDel = id => {
  ElMessageBox.confirm('将永久删除该用户数据，是否继续？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      //调用删除接口
      httpDelUser(id).then(
        res => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          //删除完成更新数据
          getUser()
        },
        err => {
          ElMessage({
            type: 'info',
            message: '删除失败',
          })
        }
      )
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
/* 下线功能 */
const handleOffline = async id => {
  await httpGetUserById(id).then(res => {
    user.id = res.data.id
    user.user_name = res.data.user_name
    user.user_password = res.data.user_password
    user.user_type = res.data.user_type
  })
  console.log(id)
  ElMessageBox.confirm('将使该用户处于离线状态，是否继续？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      //调用下线接口
      httpOfflineUser(user).then(
        res => {
          ElMessage({
            type: 'success',
            message: '下线成功',
          })
          getUser()
        },
        err => {
          ElMessage({
            type: 'info',
            message: '下线失败',
          })
        }
      )
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消下线',
      })
    })
}

/* 修改和增加用户 */
const onSubmit = async () => {
  isShow.value = false
  const data = {
    user_name: user.user_name,
    user_password: user.user_password,
    user_type: user.user_type,
    user_onlinestatus: 0,
    user_other: 1,
  }

  if (isEdit.value) {
    try {
      await httpUpdateUser(user),
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      getUser()
    } catch (err) {
      ElMessage({
        type: 'info',
        message: '修改失败',
      })
    }
  } else {
    try {
      await httpAddUser(data)
      ElMessage({
        type: 'success',
        message: '添加成功',
      })
      getUser()
    } catch (err) {
      ElMessage({
        type: 'info',
        message: '添加失败',
      })
    }
  }
}
</script>

<style scoped>
:deep(.el-dialog__body) {
  padding-top: 10px;
  padding-bottom: 10px;
}
:deep(.el-row) {
  margin-bottom: 8px;
}
.user-button {
  display: flex;
}
.page {
  margin-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
