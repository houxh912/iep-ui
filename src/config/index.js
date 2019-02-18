import Vue from 'vue'
import GovLayout from '@/components/govLayout'
import GovSearchBar from '@/components/govSearchBar/index'
import GovButton from '@/components/govButton/index'
import GovDialog from '@/components/govDialog/index'
import GovFormDetail from '@/components/govFormDetail/index'
import GovAddTags from '@/components/govAddTag/index'

const components = [
  GovLayout.GovLayoutBody,
  GovLayout.GovLayoutButtonGroup,
  GovLayout.GovLayoutDialog,
  GovLayout.GovLayoutForm,
  GovLayout.GovLayoutHeader,
  GovLayout.GovLayoutMain,
  GovSearchBar,
  GovButton,
  GovDialog,
  GovFormDetail,
  GovAddTags,
]

components.forEach(component => {
  Vue.component(component.name, component)
})

export default Vue