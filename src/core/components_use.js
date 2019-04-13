import Vue from 'vue'

// TODO:容器Container 统一改为 Iep前缀
import BasicContainer from '@/components/BasicContainer/index'
import BasicAsideContainer from '@/components/BasicAsideContainer/index'
import OperationWrapper from '@/components/Operation/Wrapper'
import OperationSearch from '@/components/Operation/Search'
import OperationContainer from '@/components/Operation/Container'
import PageHeader from '@/components/Page/Header'
import IepPageHeader from '@/components/IepCommon/PageHeader'
import FooterToolBar from '@/components/FooterToolbar'

// 公共组件
import IepButton from '@/components/IepCommon/Button'
import IepPagination from '@/components/IepCommon/Pagination'
import IepTabs from '@/components/IepCommon/Tabs'
import IepTabScroll from '@/components/IepTabScroll/'
import IepNoData from '@/components/IepCommon/NoData'

// 表单组件
import IepTag from '@/components/IepTag'
import IepSelect from '@/components/IepCommon/Select'
import IepDatePicker from '@/components/IepCommon/DatePicker'
import IepCascader from '@/components/IepCommon/Cascader'
import IepDictDetail from '@/components/IepCommon/DictDetail'
import IepDictSelect from '@/components/IepCommon/DictSelect'
import IepDescriptionItem from '@/components/IepCommon/DescriptionItem'
import IepDetailTag from '@/components/IepCommon/DetailTag'
import IepInputNumber from '@/components/IepCommon/InputNumber'
import IepEditor from '@/components/IepEditor'
import IepInputArea from '@/components/IepCommon/InputArea'

// 头像上传文件有关组件
import IepAvatar from '@/components/IepCommon/Avatar'
import IepImgAvatar from '@/components/IepCommon/ImgAvatar'
import IepImg from '@/components/IepCommon/Img'
import IepUpload from '@/components/IepCommon/Upload'
import IepDownload from '@/components/IepCommon/Download'

// 弹出层相关组件
import IepDialog from '@/components/IepDialog/'
import IepDrawer from '@/components/IepDrawer/'
import IepHoverCard from '@/components/IepCommon/HoverCard'
import IepReviewConfirm from '@/components/IepCommon/ReviewConfirm'

// 表格相关组件
import IepTable from '@/components/IepTable/'
import IepTableLink from '@/components/IepTable/Link'
import IepTableLinkImgDesc from '@/components/IepTable/LinkImgDesc'

// 通讯录组件Contact
import IepContactSelect from '@/components/IepContact/Select'
import IepContactOneSelect from '@/components/IepContact/OneSelect'
import IepContactMultiple from '@/components/IepContact/Multiple'
import IepContactOneMultiple from '@/components/IepContact/OneMultiple'
import IepContactMultipleUser from '@/components/IepContact/MultipleUser'
import IepContactOneMultipleUser from '@/components/IepContact/OneMultipleUser'

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
Vue.component(IepPageHeader.name, IepPageHeader)
Vue.component(FooterToolBar.name, FooterToolBar)

// 公共组件
Vue.component(IepButton.name, IepButton)
Vue.component(IepPagination.name, IepPagination)
Vue.component(IepTabs.name, IepTabs)
Vue.component(IepTabScroll.name, IepTabScroll)
Vue.component(IepNoData.name, IepNoData)

// 表单组件
Vue.component(IepTag.name, IepTag)
Vue.component(IepSelect.name, IepSelect)
Vue.component(IepCascader.name, IepCascader)
Vue.component(IepDictDetail.name, IepDictDetail)
Vue.component(IepDictSelect.name, IepDictSelect)
Vue.component(IepInputNumber.name, IepInputNumber)
Vue.component(IepDatePicker.name, IepDatePicker)
Vue.component(IepDescriptionItem.name, IepDescriptionItem)
Vue.component(IepDetailTag.name, IepDetailTag)
Vue.component(IepEditor.name, IepEditor)
Vue.component(IepInputArea.name, IepInputArea)

// 头像上传文件有关组件
Vue.component(IepImgAvatar.name, IepImgAvatar)
Vue.component(IepImg.name, IepImg)
Vue.component(IepUpload.name, IepUpload)
Vue.component(IepAvatar.name, IepAvatar)
Vue.component(IepDownload.name, IepDownload)

// 弹出层相关组件
Vue.component(IepDialog.name, IepDialog)
Vue.component(IepDrawer.name, IepDrawer)
Vue.component(IepHoverCard.name, IepHoverCard)
Vue.component(IepReviewConfirm.name, IepReviewConfirm)


// 表格相关组件
Vue.component(IepTable.name, IepTable)
Vue.component(IepTableLink.name, IepTableLink)
Vue.component(IepTableLinkImgDesc.name, IepTableLinkImgDesc)

// 通讯录组件Contact
// Vue.component(IepContactSelect.name, IepContactSelect)
Vue.component(IepContactSelect.name, IepContactOneSelect)
// Vue.component(IepContactMultiple.name, IepContactMultiple)
Vue.component(IepContactMultiple.name, IepContactOneMultiple)
// Vue.component(IepContactMultipleUser.name, IepContactMultipleUser)
Vue.component(IepContactMultipleUser.name, IepContactOneMultipleUser)

// 部门组件Contact
Vue.component(IepDeptSelect.name, IepDeptSelect)
Vue.component('IepDeptMultiple', IepDeptMultiple)
