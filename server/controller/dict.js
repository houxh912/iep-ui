exports.getDictPage = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: {
      "total": 6, "size": 20, "current": 1, "searchCount": true, "pages": 1,
      records: [
        { "id": 1, "code": "IS_LOAD", "name": "是否登录", "system": "DIPS", "createTime": "2018-07-09 06:16:14", "updateTime": "2018-11-24 07:25:11" },
        { "id": 2, "code": "DATA_TYPE", "name": "数据类型", "system": "DIPS", "createTime": "2018-07-09 06:16:14", "updateTime": "2018-11-24 07:25:11" }
      ]
    }
  }
  ctx.body = json
}

exports.getDictChildById = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: [
      {
        "id": 1, "value": "IS_LOAD", "label": "是否登录", "sort": 1, children: [
          { "id": 3, "value": "DATA_TYPE", "label": "数据类型", "sort": 1 }
        ]
      },
      { "id": 2, "value": "DATA_TYPE", "label": "数据类型", "sort": 2 }
    ]
  }
  ctx.body = json
}
