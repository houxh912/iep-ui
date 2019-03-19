  exports.getApprovalPage = async function (ctx) {
    ctx.body = `{"code":0,"msg":"success","data":{"records":[{"name":"毛泽东","applyType":"转正","applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","copyPerson":"杨冰之","result":"通过"},{"name":"毛泽东","applyType":"转正","applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","copyPerson":"杨冰之","result":"通过"},{"name":"毛泽东","applyType":"转正","applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","copyPerson":"杨冰之","result":"通过"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
  }
  exports.getApprovalInitiate = async function (ctx) {
    ctx.body = `{
      "code":0,
      "msg":"success",
      "data": {
        "records":
        [
          { 
            "applyType": "申请类型",
            "startTime": "开始时间",
            "markingTime": "批阅时间",
            "approver": '审批人',
            "approveRes": '审批结果'
          },
          { 
            "applyType": '申请类型',
            "startTime": '开始时间',
            "markingTime": '批阅时间',
            "approver": '审批人',
            "approveRes": '审批结果'
          },
          { 
            "applyType": '申请类型',
            "startTime": '开始时间',
            "markingTime": '批阅时间',
            "approver": '审批人',
            "approveRes": '审批结果'
          },
          {
             "applyType": '申请类型',
             "startTime": '开始时间',
             "markingTime": '批阅时间',
             "approver": '审批人',
             "approveRes": '审批结果'
          }
        ],
        "total":5,
        "size":20,
        "current":2,
        "searchCount":true,
        "pages":1
      }}`
  }
