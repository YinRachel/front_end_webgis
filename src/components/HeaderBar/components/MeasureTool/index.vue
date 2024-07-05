<template>
  <el-sub-menu index="6">
    <template #title>工具箱</template>
    <el-menu-item index="6-1" @click="handleMarker">标记</el-menu-item>
    <el-menu-item index="6-2" @click="handleDistance">测量距离</el-menu-item>
    <el-menu-item index="6-3" @click="handleArea">测量面积</el-menu-item>
    <el-menu-item index="6-4" @click="handleClear">清除测量及标记</el-menu-item>
    <el-menu-item index="6-5" @click="handleDownPicture">导出图片</el-menu-item>
  </el-sub-menu>
</template>
<script setup>
import { onMounted } from 'vue'
import { measureTool, clearDrawContent } from './Hooks/measureTool'
const map = ref()
const source = ref()

onMounted(() => {
  map.value = inject('$map')
  source.value = new ol.source.Vector({})
  const layer = new ol.layer.Vector({
    source: source.value,
    style: new ol.style.Style({
      /* 标记样式 */
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorOrigin: 'top-right',
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        offsetOrigin: 'top-right',
        scale: 0.5,
        opacity: 0.75,
        src: 'public/images/location.png',
      }),
    }),
  })
  map.value.addLayer(layer)
})

/* 打标记 */
function handleMarker() {
  map.value.remove
  map.value.on('click', handleMarket)
}
function handleMarket(evt) {
  var position = evt.coordinate
  //console.log(position);
  var marker = new ol.Feature({
    geometry: new ol.geom.Point(position),
  })
  //marker.setStyle(icon_style)
  source.value.addFeature(marker)
}

/* 距离测量 */
function handleDistance() {
  map.value.un('click', handleMarket)
  measureTool(map.value, 'line')
}

/* 面积测量 */
function handleArea() {
  map.value.un('click', handleMarket)
  measureTool(map.value, 'area')
}

/* 清除测量及标记 */
function handleClear() {
  map.value.un('click', handleMarket)
  source.value.clear()
  clearDrawContent(map.value)
}

/* 导出图片 */
function handleDownPicture() {
  console.log(1)
  map.value.once('postcompose', function (event) {
    const canvas = event.context.canvas
    canvas.toBlob(function (blob) {
      saveAs(blob, 'map.png')
    })
  })
  map.value.renderSync()
}

/* 测量提示信息栏 */
var pointerMoveHandler = function (evt) {
  if (evt.dragging) {
    return
  }
  var helpMsg = 'Click to start drawing' //当前默认提示信息
  helpTooltipElement.innerHTML = helpMsg //将提示信息设置到对话框中显示
  helpTooltip.value.setPosition(evt.coordinate) //设置帮助提示框的位置
  $(helpTooltipElement.value).removeClass('hidden') //移除帮助提示框的隐藏样式进行显示
}
</script>
<style scoped></style>
