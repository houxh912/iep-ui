exports.getEmployeeProfilePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"userName":"admin","signName":null,"gender":1,"province":null,"city":null,"accountLocation":"string","positionId":2,"jobId":null,"professionalTitleId":null,"externalTitle":"string","education":0,"qq":"string","email":"string","careerPlan":null,"socialRela":null,"createTime":null,"updateTime":null,"isExpert":null,"iepHrJob":null,"iepHrPosition":null,"sex":"男","position":"产品经理","job":"初级产品顾问","title":"经理助理","id":2,"name":"admin","birthday":"2019-02-27 09:08:43","nationality":"string","politicalStatus":2,"maritalStatus":0,"fertilityStatus":0,"IDCard":"33090319920604","accountTypes":0,"residenceAddress":"string","currentAddress":"string","entryTime":"2019-03-14 12:46:26","positiveTime":"2019-02-21 09:08:45","graduatedSchool":"string","profession":"string","graduationTime":"2019-02-27 09:08:43","weChat":"string","emergencyName":"string","emergencyPhone":"string","status":1,"staffId":"GB3222","professional":null},{"userName":"xzyhhhh","signName":null,"gender":2,"province":null,"city":null,"accountLocation":"string","positionId":2,"jobId":null,"professionalTitleId":null,"externalTitle":"string","education":0,"qq":"string","email":"string","careerPlan":null,"socialRela":null,"createTime":null,"updateTime":null,"isExpert":null,"iepHrJob":null,"iepHrPosition":null,"sex":"女","position":"产品经理","job":null,"title":"职业助理","id":4,"name":"string","birthday":"2019-02-27 09:08:45","nationality":"string","politicalStatus":2,"maritalStatus":0,"fertilityStatus":0,"IDCard":"33090319910712","accountTypes":0,"residenceAddress":"string","currentAddress":"string","entryTime":"2019-02-27 09:08:45","positiveTime":"2019-02-27 09:08:45","graduatedSchool":"string","profession":"string","graduationTime":"2019-02-27 09:08:45","weChat":"string","emergencyName":"string","emergencyPhone":"string","status":2,"staffId":"GB3222","professional":null},{"userName":"root","signName":null,"gender":1,"province":null,"city":null,"accountLocation":"string","positionId":2,"jobId":null,"professionalTitleId":null,"externalTitle":"string","education":0,"qq":"string","email":"string","careerPlan":null,"socialRela":null,"createTime":null,"updateTime":null,"isExpert":null,"iepHrJob":null,"iepHrPosition":null,"sex":"男","position":"产品经理","job":"初级产品顾问","title":"经理助理","id":8,"name":"张超","birthday":"2019-02-27 09:08:43","nationality":"string","politicalStatus":2,"maritalStatus":0,"fertilityStatus":0,"IDCard":"33090319861109","accountTypes":0,"residenceAddress":"string","currentAddress":"string","entryTime":"2019-02-27 09:08:43","positiveTime":"2019-02-27 09:08:43","graduatedSchool":"string","profession":"string","graduationTime":"2019-02-27 09:08:43","weChat":"string","emergencyName":"string","emergencyPhone":"string","status":6,"staffId":"GB3222","professional":null},{"userName":"zsa11230","signName":null,"gender":2,"province":null,"city":null,"accountLocation":"string","positionId":2,"jobId":null,"professionalTitleId":null,"externalTitle":"string","education":0,"qq":"string","email":"string","careerPlan":null,"socialRela":null,"createTime":null,"updateTime":null,"isExpert":null,"iepHrJob":null,"iepHrPosition":null,"sex":"女","position":"产品经理","job":null,"title":"职业助理","id":3,"name":"阮晨光","birthday":"2019-02-27 09:08:45","nationality":"string","politicalStatus":2,"maritalStatus":0,"fertilityStatus":0,"IDCard":"33090319861123","accountTypes":0,"residenceAddress":"string","currentAddress":"string","entryTime":"2019-02-22 09:08:43","positiveTime":"2019-01-22 00:00:00","graduatedSchool":"string","profession":"string","graduationTime":"2019-02-27 09:08:45","weChat":"string","emergencyName":"string","emergencyPhone":"string","status":0,"staffId":"GB31234","professional":null}],"total":4,"size":10,"current":1,"searchCount":true,"pages":1}}`
}

exports.getGrowthFileById = async function (ctx) {
  ctx.response.type = 'json'
  ctx.body = `{"code":0,"msg":"success","data":{"userId":4,"idCard":"33090319861122","positionId":2,"employeeStatus":2,"staffNo":"GH8768","position":"研发","job":"中级产品顾问","title":"经理咨询师","name":"string","timeLineList":[{"id":2,"type":1,"msg":"职称由主力咨询师变更为初级咨询师","time":"2019-03-04 22:11:28","date":"2019-03-05"},{"id":3,"type":2,"msg":"部门由平台运维部变更为产品中心","time":"2019-03-04 22:12:14","date":"2019-03-05"},{"id":4,"type":3,"msg":"获得专业员工称号","time":"2019-03-04 22:13:47","date":"2019-03-05"},{"id":5,"type":4,"msg":"被同事评价为热情敬业","time":"2019-03-04 22:14:56","date":"2019-03-05"},{"id":6,"type":5,"msg":"string","time":"2019-03-05 11:30:44","date":"2019-03-05"},{"id":7,"type":3,"msg":"string","time":"2019-03-05 14:09:07","date":"2019-03-05"},{"id":8,"type":4,"msg":"string","time":"2019-03-05 14:22:05","date":"2019-03-05"}]}}`
}

exports.getAdministrativeApprovalPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"levaeType":2,"name":"string","department":"院校农信2","leavingType":"病假","applyType":"请假申请","id":1,"applyStartTime":"2019-03-18 12:43:33","applyEndTime":"2019-03-18 12:43:33","status":0}],"total":1,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getPublishRecruitmentPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":26,"position":"数据元专员","dept":"技术部分部1","recruitsCount":2,"jobType":"全职/兼职","applicationTime":"2019-03-14 15:20:44","status":1},{"id":25,"position":"产品经理","dept":"产品部","recruitsCount":5,"jobType":"全职/兼职","applicationTime":"2019-03-14 13:51:01","status":1},{"id":22,"position":"产品助理","dept":"技术部","recruitsCount":0,"jobType":"全职","applicationTime":"2019-03-12 15:56:56","status":1},{"id":19,"position":"产品总监","dept":"产品部","recruitsCount":1,"jobType":"兼职","applicationTime":"2019-03-14 13:56:39","status":2},{"id":15,"position":"产品总监","dept":"测试添加0311部门","recruitsCount":0,"jobType":"兼职","applicationTime":"2019-03-07 15:15:15","status":1},{"id":14,"position":"产品总监","dept":"测试新增组织并绑定所创大部门","recruitsCount":1,"jobType":"兼职","applicationTime":"2019-03-07 15:39:55","status":2},{"id":8,"position":"产品经理","dept":"sasasa","recruitsCount":35,"jobType":"全职","applicationTime":"2019-03-06 14:14:22","status":2},{"id":7,"position":"产品助理","dept":"测试新增组织并绑定所创大部门","recruitsCount":52,"jobType":"全职","applicationTime":"2019-03-06 14:14:22","status":3},{"id":1,"position":"数据元专员","dept":"杜照鸿的组织","recruitsCount":14,"jobType":"全职","applicationTime":"2019-03-07 10:02:12","status":3},{"id":2,"position":"产品经理","dept":"测试添加0311部门","recruitsCount":15,"jobType":"兼职","applicationTime":"2019-03-06 14:14:22","status":3}],"total":10,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getPublishRecruitmentById = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"id":25,"positionId":1,"deptId":19,"language":"三","positionClsId":1,"position":[1,1],"parentDept":0,"dept":[19],"recruitsCount":1,"targetCount":1,"academicId":2,"jobTypeId":1,"years":1,"profession":"要求","place":"科学城","sex":1,"treatment":"面议","term":"2019-03-14T16:00:00.000Z","welfare":"三","claim":"string","duties":"string"}}`
}
exports.commonPublishRecruitment = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":true}`
}
exports.getTalentPoolPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":"1","name":"张超","sex":"男","education":"大学","age":"14","applyPosition":"14","receptionTime":"2019-01-01","source":"国脉官网","remarks":"驳回原因","birthday":"1985-06-04","blacklistArea":"1985-06-04","blacklistReason":"1985-06-04"},{"id":"1","name":"张超","sex":"男","education":"大学","age":"14","applyPosition":"14","receptionTime":"2019-01-01","source":"国脉官网","remarks":"驳回原因","birthday":"1985-06-04","blacklistArea":"1985-06-04","blacklistReason":"1985-06-04"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getAssessmentManagementPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":"1","assessor":"张超","assessName":"日常考核","assessTime":"2019-03-14 15:20:44","status":1,"assessScore":"80分"},{"id":"2","assessor":"张超","assessName":"日常考核","assessTime":"2019-03-14 15:20:44","status":1,"assessScore":"80分"},{"id":"3","assessor":"张超","assessName":"日常考核","assessTime":"2019-03-14 15:20:44","status":1,"assessScore":"80分"},{"id":"4","assessor":"张超","assessName":"日常考核","assessTime":"2019-03-14 15:20:44","status":1,"assessScore":"80分"}],"total":2,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getTrainingRecordPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":1,"type":"技能类","method":"线上QQ","teacher":"张超","name":"培训前端大型会议讲座","startTime":"2019-03-04 00:00:00","endTime":"2019-03-09 00:00:00"},{"id":4,"type":"技能类","method":"线上QQ","teacher":"张弛","name":"培训网站系统安全漏洞","startTime":"2019-03-06 16:31:07","endTime":"2019-03-06 16:31:07"},{"id":3,"type":"品牌类","method":"线下会议","teacher":"陈小明","name":"培训后端代码优化方案","startTime":"2019-03-06 15:39:29","endTime":"2019-03-06 15:39:29"},{"id":2,"type":"平台类","method":"视频教学","teacher":"天天","name":"培训数据库优化方案","startTime":"2019-03-06 15:01:46","endTime":"2019-03-08 00:00:00"}],"total":4,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getDepartmentManagePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":33,"name":"产品部不","parentId":16,"number":"565656","userName":"杜照鸿","userId":10,"orgId":5,"people":0,"establishedTime":"2019-03-14 00:00:00","children":[]},{"id":32,"name":"产品部","parentId":16,"number":"1311","userName":"杜照鸿","userId":10,"orgId":5,"people":0,"establishedTime":"2019-03-13 00:00:00","children":[]},{"id":29,"name":"技术部","parentId":16,"number":"NO1127","userName":"杜照鸿","userId":10,"orgId":5,"people":0,"establishedTime":"2019-03-20 00:00:00","children":[{"id":35,"name":"技术部分部2","parentId":29,"parentName":"技术部","number":"NO11272","userName":"杜照鸿","userId":10,"orgId":5,"people":0,"establishedTime":"2019-03-14 00:00:00"},{"id":34,"name":"技术部分部1","parentId":29,"parentName":"技术部","number":"NO11271","userName":"超级管理员","userId":1,"orgId":5,"people":0,"establishedTime":"2019-03-14 00:00:00"}]}],"total":3,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getJobPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":5,"name":"专员","priority":0,"description":"专员"},{"id":6,"name":"初级主管","priority":0,"description":"初级主管"},{"id":7,"name":"中级主管","priority":88,"description":"中级主管"},{"id":8,"name":"中级主管","priority":3,"description":"中级主管"},{"id":9,"name":"中级主管","priority":0,"description":"中级主管"},{"id":10,"name":"高级主管","priority":0,"description":"高级主管"},{"id":11,"name":"初级主管","priority":0,"description":"初级主管"},{"id":12,"name":"专员","priority":0,"description":"专员"},{"id":13,"name":"董事长","priority":0,"description":"董事长"},{"id":14,"name":"总经理","priority":0,"description":"总经理"}],"total":19,"size":10,"current":1,"searchCount":true,"pages":2}}`
}
exports.getTitlePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":1,"name":"经理助理","priority":6,"description":"助理经理"},{"id":2,"name":"职业助理","priority":9,"description":"职业助理"},{"id":10,"name":"首席咨询师","priority":0,"description":"首席咨询师"},{"id":11,"name":"资深咨询师","priority":0,"description":"资深咨询师"},{"id":12,"name":"战略咨询师","priority":0,"description":"战略咨询师"},{"id":13,"name":"高级咨询师","priority":0,"description":"高级咨询师"},{"id":14,"name":"中级咨询师","priority":0,"description":"中级咨询师"},{"id":15,"name":"初级咨询师","priority":0,"description":"初级咨询师"},{"id":16,"name":"助理咨询师","priority":0,"description":"助理咨询师"},{"id":17,"name":"数据分析员","priority":0,"description":"数据分析员"}],"total":11,"size":10,"current":1,"searchCount":true,"pages":2}}`
}
exports.getPostLibraryPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"count":0,"id":1,"typeId":1,"name":"产品总监","typeName":"产品技术类","duties":"做好产品","claim":"产品技术顶尖"},{"count":4,"id":2,"typeId":1,"name":"产品经理","typeName":"产品技术类","duties":"做好产品业务","claim":"协助产品总监"},{"count":0,"id":4,"typeId":1,"name":"产品助理","typeName":"产品技术类","duties":"帮助设计","claim":"能够帮助分担"},{"count":0,"id":5,"typeId":1,"name":"数据元专员","typeName":"产品技术类","duties":"整理数据111","claim":"整理好数据111"},{"count":0,"id":12,"typeId":8,"name":"产品经理","typeName":"研发技术类","duties":"负责产品技术","claim":"精通产品技术"}],"total":5,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getPostTypePage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"id":1,"name":"产品技术类","description":"包括各种产品和技术类的工作1"},{"id":8,"name":"研发技术类","description":"包括研发微服务开发工具"},{"id":10,"name":"行政管理类","description":"行政管理类"}],"total":3,"size":10,"current":1,"searchCount":true,"pages":1}}`
}
exports.getPostTypeList = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":[{"value":1,"label":"产品技术类","children":[{"value":1,"label":"产品总监","children":null},{"value":2,"label":"产品经理","children":null},{"value":4,"label":"产品助理","children":null},{"value":5,"label":"数据元专员","children":null}]},{"value":8,"label":"研发技术类","children":[{"value":12,"label":"产品经理","children":null}]},{"value":10,"label":"行政管理类","children":[]},{"value":13,"label":"string","children":[]},{"value":14,"label":"string","children":[]}]}`
}