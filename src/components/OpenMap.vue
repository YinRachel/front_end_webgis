<template>
  <div id="map"></div>
</template>
<script setup>
import { gaode_image, gaode_vector } from '../gaode_libs/gaode'
import { app } from '../main'
onMounted(() => {
  var docLayer = new Zondy.Map.Doc('', 'guanggu', { crossOrigin: 'Anonymous' })
  const map = new ol.Map({
    target: 'map',
    layers: [gaode_image, gaode_vector, docLayer],
    view: new ol.View({
      center: [114.3, 30.5],
      zoom: 12,
      projection: 'EPSG:4326',
    }),
  })
  app.provide('$map', map)
})
</script>
<style scoped>
#map {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
