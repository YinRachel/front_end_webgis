<template>
  <div id="mouse-position"></div>
</template>
<script setup>
import { inject, onMounted, ref } from 'vue'
const $map = ref()
onMounted(() => {
  const map = inject('$map')
  $map.value = map
  //鼠标位置控件
  var mousePositionControl = new ol.control.MousePosition({
    //坐标格式
    coordinateFormat: ol.coordinate.createStringXY(4),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: 'EPSG:4326',
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: 'custom-mouse-position',
    //显示鼠标位置信息的目标容器
    target: document.getElementById('mouse-position'),
    //未定义坐标的标记
    undefinedHTML: '&nbsp;',
  })
  $map.value.addControl(mousePositionControl)
})
</script>
<style>
#mouse-position {
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: #87b8fb;
  width: 200px;
  height: 40px;
  border-radius: 15px;
  z-index: 2000;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
</style>
