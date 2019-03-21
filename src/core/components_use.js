import Vue from 'vue'

import BasicContainer from '@/components/BasicContainer/index'

import IepButton from '@/components/IepCommon/Button'
import IepTabs from '@/components/IepCommon/Tabs'
import IepSelect from '@/components/IepCommon/Select'
import IepDatePicker from '@/components/IepCommon/DatePicker'
import IepCascader from '@/components/IepCommon/Cascader'
import IepDictDetail from '@/components/IepCommon/DictDetail'
import IepDictSelect from '@/components/IepCommon/DictSelect'
import IepAvatar from '@/components/IepCommon/Avatar'
import IepImg from '@/components/IepCommon/Img'
import IepInputNumber from '@/components/IepCommon/InputNumber'
import OperationContainer from '@/components/Operation/Container'
import PageHeader from '@/components/Page/Header'
import OperationSearch from '@/components/Operation/Search'
import IepTable from '@/components/IepTable/'
import IepTableLink from '@/components/IepTable/Link'
import OperationWrapper from '@/components/Operation/Wrapper'

// 注册全局容器
Vue.component(BasicContainer.name, BasicContainer)
// 注册全局组件
Vue.component(OperationContainer.name, OperationContainer)
Vue.component(OperationSearch.name, OperationSearch)
Vue.component(PageHeader.name, PageHeader)
Vue.component(IepTable.name, IepTable)
Vue.component(IepTableLink.name, IepTableLink)
Vue.component(OperationWrapper.name, OperationWrapper)
Vue.component(IepButton.name, IepButton)
Vue.component(IepTabs.name, IepTabs)
Vue.component(IepDatePicker.name, IepDatePicker)
Vue.component(IepSelect.name, IepSelect)
Vue.component(IepCascader.name, IepCascader)
Vue.component(IepDictDetail.name, IepDictDetail)
Vue.component(IepDictSelect.name, IepDictSelect)
Vue.component(IepAvatar.name, IepAvatar)
Vue.component(IepImg.name, IepImg)
Vue.component(IepInputNumber.name, IepInputNumber)