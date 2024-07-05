let key = 'a850e8b2dd72fce9b3157984a911dd08'

var gaode_vector = new ol.layer.Tile({
  title: '高德矢量地图',
  source: new ol.source.XYZ({
    url:
      'http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' +
      key +
      '',
    wrapX: false,
    crossOrigin: 'Anonymous',
  }),
})

var gaode_image = new ol.layer.Tile({
  title: '高德影像地图',
  source: new ol.source.XYZ({
    url:
      'http://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' +
      key +
      '',
    wrapX: false,
    crossOrigin: 'Anonymous',
  }),
})

export { gaode_vector, gaode_image }
