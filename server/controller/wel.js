  exports.getApprovalPage = async function (ctx) {
    ctx.body = `{"code":0,"msg":"success","data":{"records":[{"name":"毛泽东","applyType":"转正","applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","copyPerson":"杨冰之","result":"通过"},{"name":"毛泽东","applyType":"转正","applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","copyPerson":"杨冰之","result":"通过"},{"name":"毛泽东","applyType":"转正","applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","copyPerson":"杨冰之","result":"通过"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
  }
  exports.getApprovalInitiate = async function (ctx) {
    ctx.body = `{"code":0,"msg":"success","data":{"records":[
      {
        "name":"毛泽东",
        "applyType":"转正",
        "startTime":"2019-03-18 12:43:33",
        "markingTime":"2019-03-18 12:43:33",
        "approver":"杨冰之",
        "approveRes":"通过"
      },
      {
        "name":"毛泽东",
        "applyType":"转正",
        "startTime":"2019-03-18 12:43:33",
        "markingTime":"2019-03-18 12:43:33",
        "approver":"杨冰之",
        "approveRes":"通过"
      },
      {
        "name":"毛泽东",
        "applyType":"转正",
        "startTime":"2019-03-18 12:43:33",
        "markingTime":"2019-03-18 12:43:33",
        "approver":"杨冰之",
        "approveRes":"通过"
      }],
      "total":2,
      "size":9,
      "current":1,
      "searchCount":true,
      "pages":1
    }}`
  }
