<template>
  <el-sub-menu index="3">
    <template #title>道路监控</template>
    <el-menu-item index="3-1" @click="handleCamera">查看监控</el-menu-item>
    <el-menu-item index="3-2" @click="handleCancel">取消查看</el-menu-item>
  </el-sub-menu>

  <!-- popup弹窗 -->
  <div id="mapCon">
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content">
      <p >摄像头编号：466546</p>
      <p >位置：南京东路与河北南路交叉口</p>
      <p><img src="../../assets/image/roadcamera.jpg" alt="" class="img" /></p>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
var $map = ref()
var city = ref({})
const dialogVisible = ref(false)
onMounted(() => {
  $map = inject('$map')
  // 将dom转换成overlay
  var container = document.getElementById('popup')
  var content = document.getElementById('popup-content')
  var closer = document.getElementById('popup-closer')
  const popup = new ol.Overlay({
    //要转换成overlay的HTML元素
    element: container,
    //当前窗口可见
    autoPan: true,
    //Popup放置的位置
    positioning: 'bottom-center',
    //是否应该停止事件传播到地图窗口
    stopEvent: true,
    autoPanAnimation: {
      //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
      duration: 250,
    },
  })
  $map.addOverlay(popup)

  /* 设置高亮图层样式 */
  const lightenStyle = new ol.style.Style({
    //填充色
    fill: new ol.style.Fill({
      color: 'skyblue',
    }),
    //边线颜色
    stroke: new ol.style.Stroke({
      color: '#393339',
      width: 3,
    }),
  })

  var source = new ol.source.Vector({})
  var lightenLayer = new ol.layer.Vector({
    source,
    style: lightenStyle,
    zIndex: 999,
  })
  $map.addLayer(lightenLayer)

  //为map添加鼠标移动事件监听,当鼠标移动到元素上的时候会显示手型
  $map.on('pointermove', function (e) {
    var pixel = $map.getEventPixel(e.originalEvent)
    var hit = $map.hasFeatureAtPixel(pixel)
    $map.getTargetElement().style.cursor = hit ? 'pointer' : ''
  })

  // 为map添加点击事件监听，渲染弹出popup
  $map.on('click', function (e) {
    console.log(e)
    source.clear()
    popup.setPosition()
    var position = e.coordinate
    popup.setPosition(position)
  })
  closer.onclick = function () {
    //未定义popup位置
    popup.setPosition(undefined)
    //失去焦点
    closer.blur()
    return false
  }
})
</script>
<style scoped>
.img {
  width: 250px;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 45px;
  width: 250px;
  left: -50px;
  z-index: 999;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: '✖';
}

#popup-content {
  font-size: 14px;
  font-family: '微软雅黑';
}

#popup-content p {
  margin-top: 8px;
}
</style>
