<template>
  <div id="reset">
    <el-button type="primary" @click="handleReset">复位</el-button>
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
const $map = ref()
onMounted(() => {
  const map = inject('$map')
  $map.value = map
})
const handleReset = () => {
  const view = $map.value.getView()
  view.setCenter([114.3, 30.5])
  view.setZoom(12)
}
</script>
<style scoped>
#reset {
  position: fixed;
  bottom: 10px;
  left: 10px;
}
</style>
