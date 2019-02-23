
exports.getTokenLogout = async function (ctx) {
  const data = {
    "code": 0, "msg": "success", "data": {
      "records": [
        {
          姓名: '李寅',
          性别: '女',
          部门: '国脉先锋队',
          入职时间: '2015-10-10',
          员工状态: '正式',
          岗位: '总经理',
          身份证号码: '33090219960103761X'
        }
      ], "total": 1, "size": 20, "current": 1, "searchCount": true, "pages": 1
    }
  }
  ctx.body = data;
}