exports.fetchList = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '客户1',
          code: ['数据基因', '智慧城市', '通知公告'],
          type: 1
        }, {
          id: 2,
          name: '客户2',
          code: ['智慧城市', '通知公告', '数据基因'],
          type: 2
        }
      ],
      total: 2,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1,
    }
  }
}

exports.fetchDetail = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      id: 1,
      name: '客户全景'
    }
  }
}

exports.create = async function (ctx) {
  ctx.body = {
    code: 0, msg: 'success', data: []
  }
}

exports.update = async function (ctx) {
  ctx.body = {
    code: 0, msg: 'success', data: []
  }
}

exports.delete = async function (ctx) {
  ctx.body = {
    code: 0, msg: 'success', data: []
  }
}

// 方案
exports.fetchProgramme = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '20180909浙江省办公室项目方案0001号文件',
          downLoadUrl: 'asdsd21323awe.xml'
        }, {
          id: 2,
          name: '20180909浙江省办公室项目方案0002号文件',
          downLoadUrl: 'asdsd21323awe.xml'
        }, {
          id: 3,
          name: '20180909浙江省办公室项目方案0003号文件',
          downLoadUrl: 'asdsd21323awe.xml'
        }
      ],
      total: 2,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1,
    }
  }
}

// 联系人
exports.fetchContartList = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '马云',
          zhiwu: '市场经理',
          duiying: '马氏集团'
        }, {
          id: 2,
          name: '丁磊',
          zhiwu: '总经理',
          duiying: '养殖场'
        }, {
          id: 3,
          name: '马化腾',
          zhiwu: '员工',
          duiying: '幼儿园'
        }
      ],
      total: 2,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1,
    }
  }
}

exports.createContact = async function (ctx) {
  ctx.body = {
    code: 0, msg: 'success', data: []
  }
}

exports.updateContact = async function (ctx) {
  ctx.body = {
    code: 0, msg: 'success', data: []
  }
}

exports.deleteContact = async function (ctx) {
  ctx.body = {
    code: 0, msg: 'success', data: []
  }
}
