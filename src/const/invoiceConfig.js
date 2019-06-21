const genStatus = (row) => {
  const { status, primaryAudit, financialAudit } = row
  if (status == 0) return '待提交'
  if (status == 1 && primaryAudit == 0) return '部门审批'
  if (status == 1 && primaryAudit == 1 && financialAudit == 0) return '财务审批'
  if (status == 2) return '已确认'
  if (status == 3) return '驳回'
}
export {genStatus}