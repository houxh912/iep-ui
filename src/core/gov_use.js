
import Vue from 'vue'

import GovButton from '@/views/wenjuan/components/govButton/index'
import GovSearchBar from '@/views/wenjuan/components/govSearchBar/index'
import GovDialog from '@/views/wenjuan/components/govDialog/index'
import GovLayout from '@/views/wenjuan/components/govLayout'
import GovDialogImport from '@/views/wenjuan/components/govDialogImport'
import GovDialogExport from '@/views/wenjuan/components/govDialogExport'
import GovDetailForm from '@/views/wenjuan/components/govDetailForm'
import GovSmartTag from '@/views/wenjuan/components/govSmartTag'

const components = [
  GovButton,
  GovSearchBar,
  GovDialog,
  GovLayout.GovLayoutBody,
  GovLayout.GovLayoutButtonGroup,
  GovLayout.GovLayoutDialog,
  GovLayout.GovLayoutForm,
  GovLayout.GovLayoutHeader,
  GovLayout.GovLayoutMain,
  GovDialogImport,
  GovDialogExport,
  GovDetailForm,
  GovSmartTag,
]

components.forEach(component => {
  Vue.component(component.name, component)
})