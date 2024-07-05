/**
 * @param {object} service  {name,layerId}   name是igserver服务的名称,layerId是添加要素所在的图层号
 * @param {object} doclayer  地图文档的图层
 **/

function delFeature({ service, fids, docLayer }) {
  var deleteService = new Zondy.Service.EditDocFeature(
    service.name,
    service.layerId,
    {}
  )
  deleteService.deletes(fids, onPntSuccess(docLayer))
}

function onPntSuccess(docLayer) {
  return function (result) {
    if (result) {
      alert('删除要素成功！')
      docLayer.refresh()
    } else {
      alert('删除要素失败！')
    }
  }
}
