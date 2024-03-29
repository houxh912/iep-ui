import Vue from 'vue'

// TODO:容器Container 统一改为 Iep前缀
import BasicContainer from '@/components/BasicContainer/index'
import BasicAsideContainer from '@/components/BasicAsideContainer/index'
import IepLayoutDrawerContainer from '@/components/IepLayout/DrawerContainer/index'
import OperationWrapper from '@/components/Operation/Wrapper'
import OperationSearch from '@/components/Operation/Search'
import OperationContainer from '@/components/Operation/Container'
import IepPageHeader from '@/components/IepCommon/PageHeader'
import FooterToolBar from '@/components/FooterToolbar'
import IepResult from '@/components/IepResult/index'

// 富文本
// import IepEditor from '@/components/IepEditor/'
import IepFroalaEditor from '@/components/IepFroalaEditor/'
import IepHtml from '@/components/IepHtml/'

// 公共组件
import IepPagination from '@/components/IepCommon/Pagination'
import IepTabs from '@/components/IepCommon/Tabs'
import IepTabScroll from '@/components/IepTabScroll/'
import IepNoData from '@/components/IepCommon/NoData'
import IepToDev from '@/components/IepToDev/'
import IepTip from '@/components/IepCommon/Tip'
import IepIdentityMark from '@/components/IepCommon/IdentityMark'
import IepReadMarkDel from '@/components/IepCommon/ReadMarkDel'
import IepFiveKay from '@/components/IepCommon/FiveKey'
import IepKeyItem from '@/components/IepCommon/KeyItem'
import IepUserCard from '@/components/IepCommon/UserCard'
import IepCharts from '@/components/IepCommon/ECharts'
import IepStatisticsHeader from '@/components/IepCommon/StatisticsHeader'
import IepSlotCard from '@/components/IepCommon/SlotCard'
import IepIsOpen from '@/components/IepCommon/IsOpen'

// 表单组件
import IepTag from '@/components/IepTag'
import IepNewTag from '@/components/IepTag/newIndex'
import IepSelect from '@/components/IepForm/Select'
import IepSelectDetail from '@/components/IepForm/SelectDetail'
import IepDatePicker from '@/components/IepForm/DatePicker'
import IepCascader from '@/components/IepForm/Cascader'
import IepDictDetail from '@/components/IepForm/DictDetail'
import IepDictSelect from '@/components/IepForm/DictSelect'
import IepDictCascader from '@/components/IepForm/DictCascader'
import IepDictCascaderDetail from '@/components/IepForm/DictCascaderDetail'
import IepDescriptionItem from '@/components/IepForm/DescriptionItem'
import IepTagDetail from '@/components/IepForm/TagDetail'
import IepDivDetail from '@/components/IepForm/DivDetail'
import IepDivDetailSwitch from '@/components/IepForm/DivDetailSwitch'
import IepDateRangeSelect from '@/components/IepForm/DateRangeSelect'
import IepFormItem from '@/components/IepForm/FormItem'
import IepCrmsSelect from '@/components/IepForm/CrmsSelect'
import IepCrmsSelectMultiple from '@/components/IepForm/CrmsSelectMultiple'

// input
import IepInputAmount from '@/components/IepInput/InputAmount'
import IepInputNumber from '@/components/IepInput/InputNumber'
import IepInputArea from '@/components/IepInput/InputArea'
import IepAntInput from '@/components/IepInput/AntInput'

// 头像上传文件有关组件
import IepAvatar from '@/components/IepUpload/Avatar'
import IepImgAvatar from '@/components/IepImg/ImgAvatar'
import IepImg from '@/components/IepImg/index'
import IepUpload from '@/components/IepUpload/index'
import IepDownload from '@/components/IepUpload/Download'
import IepUploadSelect from '@/components/IepUpload/Select'
import IepUploadDialog from '@/components/IepUpload/Dialog'

// 弹出层相关组件
import IepDialog from '@/components/IepDialog/'
import IepADialog from '@/components/IepDialog/ADialog'
import IepDrawer from '@/components/IepDrawer/'
import IepHoverCard from '@/components/IepCommon/HoverCard'
import IepReviewConfirm from '@/components/IepCommon/ReviewConfirm'
import IepImageDialog from '@/components/IepCommon/ImageDialog'

// 投资弹框
import IepEquityDialog from '@/components/IepCommon/EquityDialog'

// 表格相关组件
import IepTable from '@/components/IepTable/'
import IepTableLink from '@/components/IepTable/Link'
import IepTableLinkImgDesc from '@/components/IepTable/LinkImgDesc'

// 通讯录组件Contact
import IepContactSelect from '@/components/IepContact/Select'
import IepContactMultiple from '@/components/IepContact/Multiple'
import IepContactMultipleUser from '@/components/IepContact/MultipleUser'

// 部门组件Contact
import IepDeptSelect from '@/components/IepDept/Select'
import IepDeptMultiple from '@/components/IepDept/Multiple'

// 合同组件Contact
import IepContractSelect from '@/components/IepContract/Select'

// 项目
import IepProjectSelect from '@/components/IepProject/Select'

//任务
import IepTaskAtmsSelect from '@/components/IepTask/atmsSelect'

// 展示页公共组件
import IepAppTabCard from '@/components/IepApp/TabCard'
import IepAppTabsCard from '@/components/IepApp/TabsCard'
import IepAppFooterBar from '@/components/IepApp/FooterBar'
import IepAppLayout from '@/components/IepApp/Layout'
import IepAppListCard from '@/components/IepApp/ListCard'
import IepAppRankingCard from '@/components/IepApp/RankingCard'
import IepAppLabelCard from '@/components/IepApp/LabelCard'
import IepAppAssortCard from '@/components/IepApp/AssortCard'
import IepAppRewardCard from '@/components/IepApp/RewardCard'
import IepAppEvaluationReview from '@/components/IepApp/EvaluationReview'
import IepAppEvaluationReviews from '@/components/IepApp/EvaluationReviews'

// 注册全局容器
Vue.component(BasicContainer.name, BasicContainer)
Vue.component(BasicAsideContainer.name, BasicAsideContainer)
Vue.component(IepLayoutDrawerContainer.name, IepLayoutDrawerContainer)
Vue.component(OperationWrapper.name, OperationWrapper)
Vue.component(OperationContainer.name, OperationContainer)
Vue.component(OperationSearch.name, OperationSearch)
Vue.component(IepPageHeader.name, IepPageHeader)
Vue.component(FooterToolBar.name, FooterToolBar)
Vue.component(IepResult.name, IepResult)

//富文本
// Vue.component(IepEditor.name, IepEditor)
Vue.component(IepFroalaEditor.name, IepFroalaEditor)
Vue.component(IepHtml.name, IepHtml)

// 公共组件
Vue.component(IepPagination.name, IepPagination)
Vue.component(IepTabs.name, IepTabs)
Vue.component(IepTabScroll.name, IepTabScroll)
Vue.component(IepNoData.name, IepNoData)
Vue.component(IepToDev.name, IepToDev)
Vue.component(IepTip.name, IepTip)
Vue.component(IepIdentityMark.name, IepIdentityMark)
Vue.component(IepReadMarkDel.name, IepReadMarkDel)
Vue.component(IepFiveKay.name, IepFiveKay)
Vue.component(IepKeyItem.name, IepKeyItem)
Vue.component(IepUserCard.name, IepUserCard)
Vue.component(IepCharts.name, IepCharts)
Vue.component(IepStatisticsHeader.name, IepStatisticsHeader)
Vue.component(IepSlotCard.name, IepSlotCard)
Vue.component(IepIsOpen.name, IepIsOpen)

// 表单组件
Vue.component(IepTag.name, IepTag)
Vue.component(IepNewTag.name, IepNewTag)
Vue.component(IepSelect.name, IepSelect)
Vue.component(IepSelectDetail.name, IepSelectDetail)
Vue.component(IepCascader.name, IepCascader)
Vue.component(IepDictDetail.name, IepDictDetail)
Vue.component(IepDictSelect.name, IepDictSelect)
Vue.component(IepDictCascader.name, IepDictCascader)
Vue.component(IepDictCascaderDetail.name, IepDictCascaderDetail)
Vue.component(IepDatePicker.name, IepDatePicker)
Vue.component(IepDescriptionItem.name, IepDescriptionItem)
Vue.component(IepTagDetail.name, IepTagDetail)
Vue.component(IepDivDetail.name, IepDivDetail)
Vue.component(IepDivDetailSwitch.name, IepDivDetailSwitch)
Vue.component(IepDateRangeSelect.name, IepDateRangeSelect)
Vue.component(IepFormItem.name, IepFormItem)
Vue.component(IepCrmsSelect.name, IepCrmsSelect)
Vue.component(IepCrmsSelectMultiple.name, IepCrmsSelectMultiple)

Vue.component(IepInputNumber.name, IepInputNumber)
Vue.component(IepInputAmount.name, IepInputAmount)
Vue.component(IepInputArea.name, IepInputArea)
Vue.component(IepAntInput.name, IepAntInput)

// 头像上传文件有关组件
Vue.component(IepImgAvatar.name, IepImgAvatar)
Vue.component(IepImg.name, IepImg)
Vue.component(IepUpload.name, IepUpload)
Vue.component(IepAvatar.name, IepAvatar)
Vue.component(IepDownload.name, IepDownload)
Vue.component(IepUploadSelect.name, IepUploadSelect)
Vue.component(IepUploadDialog.name, IepUploadDialog)

// 弹出层相关组件
Vue.component(IepDialog.name, IepDialog)
Vue.component(IepADialog.name, IepADialog)
Vue.component(IepDrawer.name, IepDrawer)
Vue.component(IepHoverCard.name, IepHoverCard)
Vue.component(IepReviewConfirm.name, IepReviewConfirm)
Vue.component(IepImageDialog.name, IepImageDialog)

//投资弹框
Vue.component(IepEquityDialog.name, IepEquityDialog)

// 表格相关组件
Vue.component(IepTable.name, IepTable)
Vue.component(IepTableLink.name, IepTableLink)
Vue.component(IepTableLinkImgDesc.name, IepTableLinkImgDesc)

// 通讯录组件Contact
Vue.component(IepContactSelect.name, IepContactSelect)
Vue.component(IepContactMultiple.name, IepContactMultiple)
Vue.component(IepContactMultipleUser.name, IepContactMultipleUser)

// 部门组件Dept
Vue.component(IepDeptSelect.name, IepDeptSelect)
Vue.component(IepDeptMultiple.name, IepDeptMultiple)

// 合同组件Contract
Vue.component(IepContractSelect.name, IepContractSelect)

// 项目
Vue.component(IepProjectSelect.name, IepProjectSelect)

//任务
Vue.component(IepTaskAtmsSelect.name, IepTaskAtmsSelect)

// 展示页公共组件
Vue.component(IepAppTabCard.name, IepAppTabCard)
Vue.component(IepAppTabsCard.name, IepAppTabsCard)
Vue.component(IepAppFooterBar.name, IepAppFooterBar)
Vue.component(IepAppLayout.name, IepAppLayout)
Vue.component(IepAppListCard.name, IepAppListCard)
Vue.component(IepAppRankingCard.name, IepAppRankingCard)
Vue.component(IepAppLabelCard.name, IepAppLabelCard)
Vue.component(IepAppAssortCard.name, IepAppAssortCard)
Vue.component(IepAppRewardCard.name, IepAppRewardCard)
Vue.component(IepAppEvaluationReview.name, IepAppEvaluationReview)
Vue.component(IepAppEvaluationReviews.name, IepAppEvaluationReviews)
