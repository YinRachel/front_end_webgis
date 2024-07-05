<template>
  <el-sub-menu index="4">
    <template #title>事件管理</template>
    <el-menu-item index="4-1" @click="handleEventAdd">事件添加</el-menu-item>
    <el-menu-item index="4-2">事件更新</el-menu-item>
    <el-menu-item index="4-3">所有事件</el-menu-item>
    <el-menu-item index="4-4">事件拉框查询</el-menu-item>
  </el-sub-menu>
  <div id="event">
    <event-add
      v-if="isEventAddShow"
      @cancel="handleCancel"
      @submit="handleSubmit"
      @EventInfo="handleEventInfo"
    ></event-add>
  </div>
</template>
<script setup>
import EventAdd from './Hooks/EventAdd.vue'
import { ref, inject, onMounted } from 'vue'
import { createDraw } from '@/utils/createDraw.js'
import { Point } from '@/utils/Point.js'
const $map = ref()
const isEventAddShow = ref(true)
const EventInfo = ref()
onMounted(() => {
  const map = inject('$map')
  $map.value = map
})
const handleEventAdd = () => {
  /* 创建画布--空的图层 */
  const source = new ol.source.Vector({})
  const layer = new ol.layer.Vector({
    source,
  })
  $map.value.addLayer(layer)
  /* 添加画笔 */
  let pointDraw = createDraw({
    type: 'Point',
    source,
    callback: handleDraw,
  })
  $map.value.addInteraction(pointDraw)
  function handleDraw() {
    isEventAddShow.value = true
    $map.value.removeInteraction(pointDraw)
  }
}
const handleEventInfo = e => {
  console.log(e)
  EventInfo.value = e
}
const handleCancel = () => {
  isEventAddShow.value = false
  const source = $map.value.getLayers().getArray()[3].getSource()
  source.clear()
}
const handleSubmit = () => {
  console.log('提交了')
  const source = $map.value.getLayers().getArray()[3].getSource()
  console.log(source)
  const feature = source.getFeatures()
  console.log(feature)
  const point = feature[0].values_.geometry.flatCoordinates
  console.log(point)
  const position = Array.from(point)
  console.log(position)
  isEventAddShow.value = false
  //给ig serve添加点
  const docLayer = $map.value.getLayers().getArray()[2]
  var service = {
    name: 'guanggu',
    layerId: 3,
  }
  var PointAttValue = ['中国', '中国', 1, 2, 3]
  Point.add({
    position,
    service,
    docLayer,
    PointAttValue,
  })
  //清空source
  source.clear()
}
</script>
<style scoped></style>
