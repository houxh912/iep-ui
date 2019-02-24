exports.getOrgList = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: [
      { name: '北方区业务一部' },
      { name: '北方区业务二部' },
      { name: '北方区业务三部' },
      { name: '北方区业务一部' },
      { name: '北方区业务一部' },
      { name: '北方区业务一部' },
    ]
  }
  ctx.body = json
}
exports.getOrgPage = async function (ctx) {
  ctx.body = `{"code":0,"msg":"success","data":{"records":[{"orgId":2,"logo":"image-files-9e58c0d9048f4cbeb336ee3de57e3985.jpg","userId":1,"isNode":0,"delFlag":"0","createTime":"2019-02-23 15:13:46","updateTime":"2019-02-23 15:13:46","status":0,"deptId":0,"isOpen":1,"isApplyed":null,"name":"string","intro":"string"},{"orgId":5,"logo":"image-files-9e58c0d9048f4cbeb336ee3de57e3985.jpg","userId":1,"isNode":0,"delFlag":"0","createTime":"2019-02-23 15:13:47","updateTime":"2019-02-23 15:13:47","status":0,"deptId":16,"isOpen":0,"isApplyed":null,"name":"测试新增组织并绑定所创大部门","intro":"string"},{"orgId":7,"logo":"image-files-9e58c0d9048f4cbeb336ee3de57e3985.jpg","userId":9,"isNode":0,"delFlag":"0","createTime":"2019-02-20 09:45:27","updateTime":"2019-02-20 09:45:27","status":0,"deptId":18,"isOpen":0,"isApplyed":null,"name":"test123","intro":"1234"},{"orgId":8,"logo":"image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg","userId":10,"isNode":0,"delFlag":"0","createTime":"2019-02-23 16:42:28","updateTime":"2019-02-23 16:42:28","status":0,"deptId":19,"isOpen":0,"isApplyed":null,"name":"杜照鸿的组织","intro":"杜照鸿的组织"},{"orgId":9,"logo":"image-files-b159d54b543b4ad6848f56805b29130f.jpg","userId":11,"isNode":0,"delFlag":"0","createTime":"2019-02-23 16:50:45","updateTime":"2019-02-23 16:50:45","status":1,"deptId":20,"isOpen":0,"isApplyed":null,"name":"4324234","intro":"3333333"}],"total":5,"size":10,"current":1,"searchCount":true,"pages":1}}`
}