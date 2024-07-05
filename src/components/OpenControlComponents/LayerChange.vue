<template>
  <div id="layer">
    <el-card v-if="isShow">
      <div>
        <el-button @click="handleToVector">标准</el-button
        ><el-button @click="handleToimage">卫星</el-button>
      </div>
      <p>地图显示</p>
      <div>
        <el-button>路况</el-button><el-button>事件</el-button
        ><el-button>热力图</el-button>
      </div>
    </el-card>
    <el-button
      type="primary"
      size="large"
      icon="ArrowLeftBold"
      @click="handleClick"
      >图层</el-button
    >
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
const isShow = ref(false)
const $map = ref()
onMounted(() => {
  const map = inject('$map')
  $map.value = map
})
const handleClick = () => {
  isShow.value = !isShow.value
}
const handleToVector = () => {
  const gaode_vector = $map.value.getLayers().getArray()[1]
  gaode_vector.setVisible(true)
}
const handleToimage = () => {
  const gaode_vector = $map.value.getLayers().getArray()[1]
  gaode_vector.setVisible(false)
}
</script>
<style scoped>
#layer {
  position: fixed;
  top: 660px;
  right: 120px;
  display: flex;
  gap: 15px;
}
p {
  font-size: 16px;
  font-weight: 700;
  margin: 15px 0px;
}
</style>
