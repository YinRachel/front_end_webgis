<template>
  <layer-change></layer-change>
  <map-reset></map-reset>
  <mouse-position></mouse-position>
  <over-view></over-view>
  <layer-catalog></layer-catalog>
</template>
<script setup>
import LayerChange from './OpenControlComponents/LayerChange.vue'
import MapReset from './OpenControlComponents/MapReset.vue'
import MousePosition from './OpenControlComponents/MousePosition.vue'
import OverView from './OpenControlComponents/OverView.vue'
import LayerCatalog from './OpenControlComponents/LayerCatalog.vue'
</script>
<style>
.ol-zoom {
  top: 820px;
  left: 10px;
}
</style>
