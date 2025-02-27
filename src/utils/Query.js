class Query {
  /* 查询元素 */
  static queryByGeom({ feature, service, callback }) {
    var geometry = feature.feature.values_.geometry
    //初始化查询结构对象，设置查询结构包含几何信息
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
    //创建一个用于查询的区
    var geomObj = new Zondy.Object.Polygon()
    geomObj.setByOL(geometry)
    //指定查询规则
    var rule = new Zondy.Service.QueryFeatureRule({
      //是否将要素的可见性计算在内
      EnableDisplayCondition: false,
      //是否完全包含
      MustInside: false,
      //是否仅比较要素的外包矩形
      CompareRectOnly: false,
      //是否相交
      Intersect: true,
    })
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
      geometry: geomObj,
      resultFormat: 'json',
      struct: queryStruct,
      rule: rule,
    })
    //设置查询分页号
    queryParam.pageIndex = 0
    //设置查询要素数目
    queryParam.recordNumber = 10000
    //实例化地图文档查询服务对象
    var queryService = new Zondy.Service.QueryDocFeature(
      queryParam,
      service.name,
      service.layerId,
      {}
    )
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(this.querySuccess(callback))
  }

  /* 单个图层查询 */
  static queryByLayer({ service, callback }) {
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
    //指定查询规则
    var rule = new Zondy.Service.QueryFeatureRule({
      //是否将要素的可见性计算在内
      EnableDisplayCondition: false,
      //是否完全包含
      MustInside: false,
      //是否仅比较要素的外包矩形
      CompareRectOnly: false,
      //是否相交
      Intersect: true,
    })
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
      resultFormat: 'json',
      struct: queryStruct,
      rule: rule,
    })
    //设置查询分页号
    queryParam.pageIndex = 0
    //设置查询要素数目
    queryParam.recordNumber = 50
    //实例化地图文档查询服务对象
    var queryService = new Zondy.Service.QueryDocFeature(
      queryParam,
      service.name,
      service.layerId,
      {}
    )

    //执行查询操作，querySuccess为查询回调函数
    queryService.query(this.querySuccess(callback))
  }

  /* 关键字查询 */
  static queryByAttr({ keyword, service, callback }) {
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
      resultFormat: 'json',
      struct: queryStruct,
    })
    //设置查询分页号
    queryParam.pageIndex = 0
    //设置查询要素数目
    queryParam.recordNumber = 20
    //设置属性条件
    /* 查询条件 */
    queryParam.where = `name like '%${keyword}%'`
    var queryService = new Zondy.Service.QueryDocFeature(
      queryParam,
      service.name,
      service.layerId,
      {}
    )
    queryService.query(this.querySuccess(callback))
  }

  /* FID查询 */
  static queryByFID({ fids, service, callback }) {
    var queryStruct = new Zondy.Service.QueryFeatureStruct()
    //是否包含几何图形信息
    queryStruct.IncludeGeometry = true
    //是否包含属性信息
    queryStruct.IncludeAttribute = true
    //是否包含图形显示参数
    queryStruct.IncludeWebGraphic = false
    //创建查询的OID编号
    var objectIds = fids
    //var objectIds = "10,104,185,238";
    //实例化查询参数对象
    var queryParam = new Zondy.Service.QueryParameter({
      objectIds: objectIds,
      resultFormat: 'json',
      struct: queryStruct,
    })
    queryParam.pageIndex = 0
    //设置查询要素数目
    queryParam.recordNumber = 20
    //实例化地图文档查询服务对象
    var queryService = new Zondy.Service.QueryDocFeature(
      queryParam,
      service.name,
      service.layerId,
      {}
    )
    //执行查询操作，querySuccess为查询回调函数
    queryService.query(this.querySuccess(callback))
  }

  static querySuccess(callback) {
    return function (result) {
      //初始化Zondy.Format.PolygonJSON类
      var format = new Zondy.Format.PolygonJSON()
      var ol_features = format.read(result)
      callback(ol_features)
    }
  }
}

export { Query }
