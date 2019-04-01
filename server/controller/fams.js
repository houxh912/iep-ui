exports.getControllerPage = async function (ctx) {
    ctx.body = `{"code":0,"msg":"success","data":{"records":[
      {"id":"1","ruler":"张超","action":"提交","attribute":"傲娇","govValue":6,"govUpper":"无","accumulatedApply":"1222"},
      {"id":"2","ruler":"张超","action":"提交","attribute":"傲娇","govValue":77,"govUpper":"无","accumulatedApply":"2322"},
      {"id":"3","ruler":"张超","action":"提交","attribute":"傲娇","govValue":88,"govUpper":"无","accumulatedApply":"2222"},
      {"id":"4","ruler":"张超","action":"提交","attribute":"傲娇","govValue":99,"govUpper":"无","accumulatedApply":"2222"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
  }

exports.getPersonalAccountManagementPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[
    {"ranking":"1","name":"张超","departments":"提交","income":"傲娇","expenditure":6,"balance":"无","status":"1"},
    {"ranking":"2","name":"张超","departments":"提交","income":"傲娇","expenditure":77,"balance":"无","status":"1"},
    {"ranking":"3","name":"张超","departments":"提交","income":"傲娇","expenditure":88,"balance":"无","status":"1"},
    {"ranking":"4","name":"张超","departments":"提交","income":"傲娇","expenditure":99,"balance":"无","status":"1"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}