import Vue from 'vue'

// TODO:容器Container 统一改为 Iep前缀
import BasicContainer from '@/components/BasicContainer/index'
import BasicAsideContainer from '@/components/BasicAsideContainer/index'
import OperationWrapper from '@/components/Operation/Wrapper'
import OperationSearch from '@/components/Operation/Search'
import OperationContainer from '@/components/Operation/Container'
import PageHeader from '@/components/Page/Header'
import FooterToolBar from '@/components/FooterToolbar'

// 公共组件
import IepButton from '@/components/IepCommon/Button'
import IepPagination from '@/components/IepCommon/Pagination'
import IepTabs from '@/components/IepCommon/Tabs'

// 表单组件
import IepTag from '@/components/IepTag'
import IepSelect from '@/components/IepCommon/Select'
import IepDatePicker from '@/components/IepCommon/DatePicker'
import IepCascader from '@/components/IepCommon/Cascader'
import IepDictDetail from '@/components/IepCommon/DictDetail'
import IepDictSelect from '@/components/IepCommon/DictSelect'
import IepIepDescriptionItem from '@/components/IepCommon/IepDescriptionItem'
import IepInputNumber from '@/components/IepCommon/InputNumber'

// 头像上传文件有关组件
import IepAvatar from '@/components/IepCommon/Avatar'
import IepImgAvatar from '@/components/IepCommon/ImgAvatar'
import IepImg from '@/components/IepCommon/Img'
import IepUpload from '@/components/IepCommon/Upload'

// 弹出层相关组件
import IepDialog from '@/components/IepDialog/'
import IepDrawer from '@/components/IepDrawer/'

// 表格相关组件
import IepTable from '@/components/IepTable/'
import IepTableLink from '@/components/IepTable/Link'

// 通讯录组件Contact
import IepContactSelect from '@/components/IepContact/Select'
import IepContactMultiple from '@/components/IepContact/Multiple'
import IepContactMultipleUser from '@/components/IepContact/MultipleUser'
// 部门组件Contact
import IepDeptSelect from '@/components/IepDept/Select'
import IepDeptMultiple from '@/components/IepDept/Multiple'

// 注册全局容器
Vue.component(BasicContainer.name, BasicContainer)
Vue.component(BasicAsideContainer.name, BasicAsideContainer)
Vue.component(OperationWrapper.name, OperationWrapper)
Vue.component(OperationContainer.name, OperationContainer)
Vue.component(OperationSearch.name, OperationSearch)
Vue.component(PageHeader.name, PageHeader)
Vue.component(FooterToolBar.name, FooterToolBar)

// 公共组件
Vue.component(IepButton.name, IepButton)
Vue.component(IepPagination.name, IepPagination)
Vue.component(IepTabs.name, IepTabs)

// 表单组件
Vue.component(IepTag.name, IepTag)
Vue.component(IepSelect.name, IepSelect)
Vue.component(IepCascader.name, IepCascader)
Vue.component(IepDictDetail.name, IepDictDetail)
Vue.component(IepDictSelect.name, IepDictSelect)
Vue.component(IepInputNumber.name, IepInputNumber)
Vue.component(IepDatePicker.name, IepDatePicker)
Vue.component(IepIepDescriptionItem.name, IepIepDescriptionItem)

// 头像上传文件有关组件
Vue.component(IepImgAvatar.name, IepImgAvatar)
Vue.component(IepImg.name, IepImg)
Vue.component(IepUpload.name, IepUpload)
Vue.component(IepAvatar.name, IepAvatar)

// 弹出层相关组件
Vue.component(IepDialog.name, IepDialog)
Vue.component(IepDrawer.name, IepDrawer)

// 表格相关组件
Vue.component(IepTable.name, IepTable)
Vue.component(IepTableLink.name, IepTableLink)

// 通讯录组件Contact
Vue.component(IepContactSelect.name, IepContactSelect)
Vue.component(IepContactMultiple.name, IepContactMultiple)
Vue.component(IepContactMultipleUser.name, IepContactMultipleUser)

// 部门组件Contact
Vue.component(IepDeptSelect.name, IepDeptSelect)
console.log(IepDeptSelect.name, IepDeptMultiple.name)
Vue.component('IepDeptMultiple', IepDeptMultiple)
