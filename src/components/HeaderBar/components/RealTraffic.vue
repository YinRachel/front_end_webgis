<template>
  <div class="legend" v-if="legendDis">
    <div class="traffic-smooth">交通畅通</div>
    <div class="traffic-slow">交通缓慢</div>
    <div class="traffic-congestion">交通拥堵</div>
  </div>
  <el-sub-menu index="1">
    <template #title>实时路况</template>
    <el-menu-item index="1-1" @click="handleCheck">查看路况</el-menu-item>
    <el-menu-item index="1-2" @click="handleClear">清除路况</el-menu-item>
  </el-sub-menu>
</template>
<script setup>
import { onMounted } from 'vue'
import { Query } from '@/utils/Query'
const map = ref()
const source = ref()
const legendDis = ref(false)

onMounted(() => {
  map.value = inject('$map')
})

function handleCheck() {
  /* 设置图层 */
  var service = {
    name: 'guanggu',
    layerId: 1,
  }
  Query.queryByLayer({
    service,
    callback: res => {
      console.log(res)
      var trafficLines = { type: 'FeatureCollection', features: [] }
      res.forEach(item => {
        const allCoordinates = item.getGeometry().flatCoordinates
        const everyCoordinates = []
        for (let i = 0; i < allCoordinates.length; i += 2) {
          everyCoordinates.push([allCoordinates[i], allCoordinates[i + 1]])
        }
        const itemLines = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: everyCoordinates,
          },
          properties: {
            id: item.getId(),
            flow: item.values_.values_.车流量,
          },
        }
        trafficLines.features.push(itemLines)
      })
      var ol_features = new ol.format.GeoJSON().readFeatures(trafficLines)
      source.value = new ol.source.Vector({
        features: ol_features,
        wrapX: false,
      })
      var layer = new ol.layer.Vector({
        source: source.value,
        zIndex: 10,
      })
      map.value.addLayer(layer)

      source.value.forEachFeature(evt => {
        console.log(evt)
        let color = null
        var flow = evt.values_.flow
        console.log(flow)
        if (flow < 1000) {
          color = 'green'
        } else if (flow >= 1000 && flow <= 1500) {
          color = 'yellow'
        } else if (flow >= 1500) {
          color = 'red'
        }
        let stateStyle = new ol.style.Style({
          stroke: new ol.style.Stroke({
            color,
            width: 5,
          }),
        })
        evt.setStyle(stateStyle)
      })
    },
  })
  /* 设置图例 */
  legendDis.value = true
}

function handleClear() {
  legendDis.value = false
  source.value.clear()
}
</script>

<style scoped>
.legend {
  display: none;
  position: fixed;
  top: 20vh;
  left: 40vw;
  display: flex;
}
.legend .traffic-smooth {
  padding: 3px;
  margin: 0 2px;
  background-color: green;
}
.legend .traffic-slow {
  padding: 3px 4px;
  margin: 0 5px;
  background-color: yellow;
}
.legend .traffic-congestion {
  padding: 3px;
  margin: 0 2px;
  background-color: red;
}
</style>
