<template>
  <div id="layer-catalog">
    <el-card v-show="isCatalogShow"
      ><h4>图层目录</h4>
      <div class="catalog">
        <div class="catalog-level1">
          <el-icon
            ><component
              :is="isLayerShow ? 'ArrowDownBold' : 'ArrowRightBold'"
              @click="handleLayerShow"
            ></component
          ></el-icon>
          <el-checkbox label="地图文档" size="large" disabled />
        </div>
        <div class="catalog-level2">
          <el-icon v-if="isLayerShow"
            ><component
              :is="isFeatureShow ? 'ArrowDownBold' : 'ArrowRightBold'"
              @click="handleFeatureShow"
            ></component
          ></el-icon>
          <el-checkbox
            label="新地图1"
            size="large"
            v-if="isLayerShow"
            disabled
          />
        </div>
        <div class="catalog-level3" v-show="isLayerShow && isFeatureShow">
          <ul class="catalog-item"></ul>
        </div></div
    ></el-card>
    <button
      :class="isCatalogShow ? 'btn' : 'btn btn-moving'"
      @click="handleFold"
    >
      <el-icon>
        <component
          :is="isCatalogShow ? 'ArrowLeftBold' : 'ArrowRightBold'"
        ></component>
      </el-icon>
    </button>
  </div>
</template>
<script setup>
import { onMounted, inject, ref } from 'vue'
const $map = ref()
const childrens = ref([])
const isCatalogShow = ref(false)
const isLayerShow = ref(true)
const isFeatureShow = ref(true)
onMounted(() => {
  const map = inject('$map')
  $map.value = map
  const docCatalog = new Zondy.Catalog.MapDoc({
    docName: 'guanggu',
  })
  const docLayer = $map.value.getLayers().getArray()[2]
  /* 获取图层目录树的信息 */
  /* http请求 */
  docCatalog.getLayersInfo((data) => {
    data.value.forEach((item) => {
      childrens.value.push({
        id: item.LayerIndex,
        name: item.Name,
      })
    })
    childrens.value.forEach((item) => {
      let tempale = `
              <li style='margin:5px 0'><input type="checkbox" checked id="${item.id}">${item.name}</li>
                `
      $('.catalog-item').append(tempale)
    })
  })
  setTimeout(() => {
    $('.catalog-item li').change(function (evt) {
      console.log(evt.target)
      var checked = evt.target.checked
      console.log(checked)
      var index = $(this).index()
      docLayer.setLayerStatus(index, checked ? 'include' : 'exclude')
    })
  }, 500)
})
const handleFold = () => {
  isCatalogShow.value = !isCatalogShow.value
}
const handleLayerShow = () => {
  isLayerShow.value = !isLayerShow.value
}
const handleFeatureShow = () => {
  isFeatureShow.value = !isFeatureShow.value
}
</script>
<style scoped>
#layer-catalog {
  position: fixed;
  top: 150px;
  left: 10px;
}
ul,
li {
  list-style: none;
}
ul {
  margin: -10px 0;
  margin-left: 50px;
  font-size: 14px;
}
.catalog-hide {
  display: none;
}
.btn-moving {
  transition-duration: 0.05s;
  transform: translateX(-180px);
}
.catalog .el-icon {
  font-size: 12px;
}
.el-card {
  position: relative;
  width: 200px;
  height: 300px;
  text-align: left;
  border: 1px solid black;
  border-radius: 10px;
}
.btn {
  width: 30px;
  height: 80px;
  position: absolute;
  left: 171px;
  top: 115px;
  border: 1px solid black;
  background-color: #5890e3;
}
.btn:hover {
  background-color: #87b8fb;
}
.btn .el-icon {
  font-size: 25px;
  color: #fff;
}
.catalog-level1 {
  margin-bottom: -15px;
}
.catalog-level2 {
  margin-left: 15px;
  margin-bottom: 5px;
}
</style>
