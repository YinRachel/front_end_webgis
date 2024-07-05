<template></template>
<script setup>
import { inject, onMounted, ref } from 'vue'
const $map = ref()
onMounted(() => {
  const map = inject('$map')
  $map.value = map
  const gaode_image = $map.value.getLayers().getArray()[0]
  const gaode_vector = $map.value.getLayers().getArray()[1]
  //鹰眼控件
  const overviewMapControl = new ol.control.OverviewMap({
    /* 鹰眼控件样式  */
    className: 'ol-overviewmap ol-custom-overviewmap',
    layers: [gaode_image, gaode_vector],
    /* 鹰眼控件展开时功能按钮上的标识(网页的JS的字符编码) */
    collapseLabel: '\u00BB',
    /* 鹰眼控件折叠时功能按钮上的标识(网页的JS的字符编码) */
    label: '\u00AB',
    /* 初始为展开显示方式 */
    collapsed: false,
    view: new ol.View({
      projection: 'EPSG:4326',
      minZoom: 8,
      maxZoom: 18,
    }),
  })
  $map.value.addControl(overviewMapControl)
})
</script>
<style>
/*=S 自定义鹰眼样式 */
.ol-custom-overviewmap,
.ol-custom-overviewmap.ol-uncollapsible {
  bottom: auto;
  left: auto;
  /* 右侧显示 */
  right: 10px;
  /* 顶部显示 */
  bottom: 60px;
}
/* 鹰眼控件展开时控件外框的样式 */
.ol-custom-overviewmap:not(.ol-collapsed) {
  border: 1px solid black;
}
/* 鹰眼控件中地图容器样式 */
.ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 200px;
  height: 150px;
}
/* 鹰眼控件中显示当前窗口中主图区域的边框 */
.ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid red;
}
/* 鹰眼控件展开时其控件按钮图标的样式 */
.ol-custom-overviewmap:not(.ol-collapsed) button {
  bottom: auto;
  left: auto;
  right: 1px;
  top: 1px;
}
</style>
