<template>
  <div class="abs iep-page-form">
    <basic-container>
      <iep-page-header title="新增项目" :backOption="backOption"></iep-page-header>
      <div class="main">
        <el-form :model="formData" :rules="rules" size="small" ref="form" label-width="200px" class="form form-detail">
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目名称：" prop="projectName">
                <el-input v-model="formData.projectName" :placeholder="tipContent.projectName" maxlength="99"></el-input>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('project')">荐</iep-button>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="projectTypeBefore">
                <el-checkbox v-model="formData.projectTypeBefore">内部项目</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.projectTypeBefore == false" style="position: relative;">
              <el-form-item label="客户名称：" prop="relatedClient">
                <!-- <iep-select prefix-url="crm/customer" v-model="formData.relatedClient"></iep-select> -->
                <IepCrmsSelect v-model="formData.relatedClient" :option="[{id: formData.relatedClientList.id, name: formData.relatedClientList.name}]" prefixUrl="crm/customer/all/list">
                </IepCrmsSelect>
              </el-form-item>
              <iep-button style="position: absolute;right:-85px;top:0;" @click="addClient">新增客户</iep-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="关联外部项目：" v-if="formData.projectTypeBefore == true">
                <el-button @click="handleAddExternalProject">添加关联</el-button>
                <div class="relevance-list-after" v-if="formData.projectList.length > 0">
                  <span class="item" v-for="(t, i) in formData.projectList" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, 'projectList', 'projectIds')"></i></span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="formData.projectTypeBefore == true">
              <el-form-item label="委托组织：" prop="attendeeId">
                <iep-select v-model="formData.attendeeId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目标签：" prop="projectTagList">
                <span slot="label">
                  项目标签
                  <iep-tip :content="tipContent.projectTagList"></iep-tip>：
                </span>
                <iep-tag v-model="formData.projectTagList"></iep-tag>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目经理：" prop="projectManagerList">
                <span slot="label">
                  项目经理
                  <iep-tip :content="tipContent.projectManagerList"></iep-tip>：
                </span>
                <iep-contact-select v-model="formData.projectManagerList" :is-show-contact-btn="false" disabled></iep-contact-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目督导：" prop="projectMentorList">
                <span slot="label">
                  项目督导
                  <iep-tip :content="tipContent.projectMentorList"></iep-tip>：
                </span>
                <iep-contact-multiple-user v-model="formData.projectMentorList" :is-show-contact-btn="false"></iep-contact-multiple-user>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('projectMentor')">荐</iep-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="市场经理：" prop="mktManagerList">
                <span slot="label">
                  市场经理
                  <iep-tip :content="tipContent.mktManagerList"></iep-tip>：
                </span>
                <iep-contact-multiple-user v-model="formData.mktManagerList" :is-show-contact-btn="false"></iep-contact-multiple-user>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('mktManager')">荐</iep-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="协作负责人：" prop="projectHandlesList">
                <span slot="label">
                  协作负责人
                  <iep-tip :content="tipContent.projectHandlesList"></iep-tip>：
                </span>
                <iep-contact-multiple-user v-model="formData.projectHandlesList" :is-show-contact-btn="false"></iep-contact-multiple-user>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('projectHandles')">荐</iep-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目成员：" prop="membersList">
                <span slot="label">
                  项目成员：
                  <!-- <iep-tip :content="tipContent.membersList"></iep-tip>： -->
                </span>
                <iep-contact-multiple-user v-model="formData.membersList" :is-show-contact-btn="false"></iep-contact-multiple-user>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('members')">荐</iep-button>
            </el-col>
            <el-col :span="24">
              <el-form-item label="项目说明：" prop="projectExplain">
                <el-input v-model="formData.projectExplain" maxlength="254"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="是否开放：" prop="isOpen">
                <el-radio-group v-model="formData.isOpen">
                  <el-radio v-for="item in dictMap.is_open" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <hr>
          <el-row>
            <el-col :span="12">
              <el-form-item label="项目阶段：" prop="projectStage">
                <iep-dict-select v-model="formData.projectStage" dict-name="prms_project_stage"></iep-dict-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="项目等级：" prop="projectLevel">
                <span slot="label">
                  项目等级：
                  <!-- <iep-tip :content="tipContent.relatedClient"></iep-tip>： -->
                </span>
                <iep-dict-select v-model="formData.projectLevel" dict-name="prms_project_level" disabled></iep-dict-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="立项时间:" prop="projectTime">
                <span slot="label">
                  立项时间：
                </span>
                <iep-date-picker v-model="formData.projectTime" type="date" placeholder="立项时间"></iep-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间：" prop="endTime">
                <span slot="label">
                  结束时间：
                </span>
                <iep-date-picker v-model="formData.endTime" type="date" placeholder="结束时间"></iep-date-picker>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('endTime')">>></iep-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签订时间：" prop="estimatedSigntime">
                <IepDatePicker v-model="formData.estimatedSigntime"></IepDatePicker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="`${formData.contractList.length > 0 ? '合同' : '项目'}金额：`" prop="projectAmount">
                <el-input v-if="formData.contractList.length > 0" v-model="formData.contractAmount" disabled />
                <iep-input-number v-else v-model="formData.projectAmount" placeholder="请正确输入非负金额" :disabled="formData.projectStatus=='3'"></iep-input-number>
              </el-form-item>
              <iep-button class="recom-btn" @click="cRecommendType('contractAmount')">>></iep-button>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="项目预算：" prop="projectBudget">
                <span slot="label">
                  项目预算
                  <iep-tip :content="tipContent.projectBudget"></iep-tip>：
                </span>
                <el-input v-model="formData.projectBudget" readonly @click.native="handleBudget" placeholder="点击填写项目预算"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="外部合作：" prop="groupExternalCooperatePartner">
                <span slot="label">
                  外部合作
                  <iep-tip :content="tipContent.groupExternalCooperatePartner"></iep-tip>：
                </span>
                <IepCrmsSelect v-model="formData.groupExternalCooperatePartner" :option="[{id: formData.groupExternalCooperatePartnerList.id, name: formData.groupExternalCooperatePartnerList.name}]" prefixUrl="crm/customer/all/list">
                </IepCrmsSelect>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属组织：" prop="orgId">
                <span slot="label">
                  所属组织：
                </span>
                <iep-select v-model="formData.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="放入公海库：" prop="isClaim">
                <span style="padding: 0 5px;">否</span>
                <el-switch v-model="formData.isClaim" :active-value="2" :inactive-value="1" active-color="#13ce66"></el-switch>
                <span style="padding: 0 5px;">是</span>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-form-item label="是否关联产品：" prop="isRelevanceProduct">
            <span slot="label">
              是否关联产品
              <iep-tip :content="tipContent.isRelevanceProduct"></iep-tip>：
            </span>
            <el-radio-group v-model="formData.isRelevanceProduct">
              <el-radio v-for="item in dictMap.is_yes" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="添加关联产品：" v-if="formData.isRelevanceProduct === 1">
            <el-button @click="handleAddProduct">添加关联</el-button>
            <ul class="relevance-list" v-if="formData.productList.length > 0">
              <li class="item" v-for="(t, i) in formData.productList" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, 'productList', 'productIds')"></i></li>
            </ul>
          </el-form-item>
          <el-form-item label="未关联产品理由：" prop="notRelevanceProductReason" v-if="formData.isRelevanceProduct === 2">
            <el-input type="textarea" rows="5" v-model="formData.notRelevanceProductReason" maxlength="254"></el-input>
          </el-form-item>
          <el-form-item label="添加其他关联：">
            <el-button @click="handleAdd">添加关联</el-button>
          </el-form-item>
          <div v-for="(item, index) in relatedFormList" :key="index">
            <el-form-item :label="`${item.name}：`" v-if="formData[item.list].length > 0">
              <ul class="relevance-list">
                <li class="item" v-for="(t, i) in formData[item.list]" :key="t.id">{{t.name}} <i class="el-icon-close" @click="closeRelation(i, item.list, item.ids)"></i></li>
              </ul>
            </el-form-item>
          </div>
          <hr>
          <el-button @click="shrinkOpen()" class="show3">{{shrink}}</el-button>
          <el-collapse-transition>
            <div v-show="show3">
              <el-form-item>
              </el-form-item>
              <el-form-item label="项目成本预算：">
                <iep-button class="recom-btn" @click="cRecommendType('budget')">>></iep-button>
                <p>注：外包费用、佣金、项目总预算为必填项，<span style="color: #f00;">如不填，则不发项目提成</span></p>
                <el-table :data="tableData" style="width: 100%" class="table">
                  <el-table-column prop="artificialCost" label="人工成本" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.artificialCost" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="projectCommission" label="项目提成" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.projectCommission" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目费用" align='center'>
                    <el-table-column prop="taxes" label="税费" align='center'>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.taxes" maxlength="12" type="number" min=0></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="bidWinning" label="中标服务费" align='center'>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.bidWinning" maxlength="12" type="number" min=0></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="outsourcingCost" align='center'>
                      <template slot="header">
                        <span class="column-header">外包费用</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.outsourcingCost" maxlength="12" type="number" min=0></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="expertsFee" label="项目评审专家费" align='center' width="150">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.expertsFee" maxlength="12" type="number" min=0></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commission" align='center'>
                      <template slot="header">
                        <span class="column-header">佣金</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.commission" maxlength="12" type="number" min=0></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="otherFees" label="其他" align='center'>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.otherFees" maxlength="12" type="number" min=0></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column prop="managementFee" label="项目管理费" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.managementFee" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="invoiceFee" label="开票费用" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.invoiceFee" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="travelFee" label="差旅费" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.travelFee" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="projectBudget" align='center'>
                    <template slot="header">
                      <span class="column-header">费用总预算</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.projectBudget" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="forecastProfits" label="预估利润" align='center'>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.forecastProfits" maxlength="12" type="number" min=0></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item label="预计回款时间：" class="table">
                <el-table :data="formData.paymentRelations" style="width: 100%" border class="table">
                  <el-table-column prop="projectPaymentTime" label="回款时间" align='center'>
                    <template slot-scope="scope">
                      <el-date-picker v-model="formData.paymentRelations[scope.$index].projectPaymentTime" type="date" placeholder="选择时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm:ss" :readonly="formData.paymentRelations[scope.$index].id?true:false">
                      </el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column prop="paymentAmount" label="回款金额" align='center'>
                    <template slot-scope="scope">
                      <el-input v-if="selectIndex==scope.$index" v-model="formData.paymentRelations[scope.$index].paymentAmount" @blur="()=>{changeNumber(scope.$index);selectIndex=-1}" maxlength="10" type="number" min=0 placeholder="请正确输入非负回款金额" :readonly="formData.paymentRelations[scope.$index].id?true:false"></el-input>
                      <el-input v-else v-model="scope.row.paymentAmount" @focus="selectIndex=scope.$index" style="min-height: 20px;"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="menu" label="操作" width="200px" align='center'>
                    <template slot-scope="scope">
                      <!-- 0可以延期 -->
                      <iep-button size="small" v-if="formData.paymentRelations[scope.$index].timeStatus == 0" @click="handleDelay(scope.$index)">延期</iep-button>
                      <iep-button size="small" v-if="formData.paymentRelations[scope.$index].timeStatus == 0" @click="handleDelete(scope.$index)">删除</iep-button>
                      <div class="project-select-delay" v-if="selectDelay.index == scope.$index">
                        <el-date-picker v-model="selectDelay.value" type="date" placeholder="选择延期时间" ref="selectDelay" @change="changeDelay" @blur="selectDelay.index = -1" format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm:ss">
                        </el-date-picker>
                      </div>
                      <iep-button size="small" v-if="!formData.paymentRelations[scope.$index].id" @click="handleDelete(scope.$index)">删除</iep-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="create" @click="handleCreate"><i class="el-icon-plus"></i> 新增</div>
              </el-form-item>
            </div>
          </el-collapse-transition>
        </el-form>
        <div class="recommend-project" v-if="recommendType=='project'">
          <h4 class="recommend-title">同类项目推荐</h4>
          <div class="recommend-container" v-for="r in recommendProjectList" :key="r.id">
            <span class="name" @click="handleDetail(r.id)" style="cursor: pointer;">{{r.projectName}}</span>
            <iep-button class="recommend-container-btn" type="danger" plain @click="referenceName(r)" size="mini">参考项目</iep-button>
            <span style="display:flex;">
              <div class="grade" v-show="r.projectLevel==1">重</div>
              <div class="grade" v-show="r.projectLevel==2">中</div>
              <div class="grade" v-show="r.projectLevel==3">一</div>
              <div class="stage" v-show="r.projectStage==1">意向</div>
              <div class="stage" v-show="r.projectStage==2">方案</div>
              <div class="stage" v-show="r.projectStage==3">执行</div>
              <div class="stage" v-show="r.projectStage==4">完结</div>
              <div class="stage" v-show="r.projectStage==5">搁置</div>
              <div class="stage" v-show="r.projectStage==6">失败</div>
              项目经理：{{r.projectManagerName}}
            </span>
            <span class="sign">
              <div v-for="(s,index) in r.projectTagList" :key="index" @click="openSign(s)">{{s}}</div>
            </span>
          </div>
        </div>
        <div class="recommend-peopel" v-if="recommendType=='projectMentor'">
          <h4 class="recommend-title">优秀项目督导推荐</h4>
          <div class="recommend-container" v-for="r in recommendMentorList" :key="r.id">
            <div class="img">
              <iep-img :src="r.avatar" :alt="r.name" class="img-box"></iep-img>
            </div>
            <div class="right">
              <span class="name">{{r.name}}</span>
              <iep-button class="recommend-container-btn" type="danger" plain @click="referenceMentor(r.name,r.id)" size="mini">设为项目督导</iep-button>
              <span>负责了<span style="font-size:16px;margin:0 2px;">{{r.conscientiousCount}}</span>个项目 | 参与了<span style="font-size:16px;margin:0 2px;">{{r.participateCount}}</span>个项目</span>
              <span class="sign">
                <div v-for="(s,index) in r.projectTag" :key="index" @click="openSign(s)">{{s}}</div>
              </span>
            </div>
          </div>
        </div>
        <div class="recommend-peopel" v-if="recommendType=='projectHandles'">
          <h4 class="recommend-title">优秀项目经理推荐</h4>
          <div class="recommend-container" v-for="r in recommendHandlesList" :key="r.id">
            <div class="img">
              <iep-img :src="r.avatar" :alt="r.name" class="img-box"></iep-img>
            </div>
            <div class="right">
              <span class="name">{{r.name}}</span>
              <iep-button class="recommend-container-btn" type="danger" plain @click="referenceHandles(r.name,r.id)" size="mini">设为项目经理</iep-button>
              <span>负责了<span style="font-size:16px;margin:0 2px;">{{r.conscientiousCount}}</span>个项目 | 参与了<span style="font-size:16px;margin:0 2px;">{{r.participateCount}}</span>个项目</span>
              <span class="sign">
                <div v-for="(s,index) in r.projectTag" :key="index" @click="openSign(s)">{{s}}</div>
              </span>
            </div>
          </div>
        </div>
        <div class="recommend-peopel" v-if="recommendType=='mktManager'">
          <h4 class="recommend-title">优秀市场经理推荐</h4>
          <div class="recommend-container" v-for="r in recommendMktManagerList" :key="r.id">
            <div class="img">
              <iep-img :src="r.avatar" :alt="r.name" class="img-box"></iep-img>
            </div>
            <div class="right">
              <span class="name">{{r.name}}</span>
              <iep-button class="recommend-container-btn" type="danger" plain @click="referenceMktManager(r.name,r.id)" size="mini">设为市场经理</iep-button>
              <span>负责了<span style="font-size:16px;margin:0 2px;">{{r.conscientiousCount}}</span>个项目 | 参与了<span style="font-size:16px;margin:0 2px;">{{r.participateCount}}</span>个项目</span>
              <span class="sign">
                <div v-for="(s,index) in r.projectTag" :key="index" @click="openSign(s)">{{s}}</div>
              </span>
            </div>
          </div>
        </div>
        <div class="recommend-peopel" v-if="recommendType=='members'">
          <h4 class="recommend-title">项目成员推荐</h4>
          <div class="recommend-container" v-for="r in recommendMembersList" :key="r.id">
            <div class="img">
              <iep-img :src="r.avatar" :alt="r.name" class="img-box"></iep-img>
            </div>
            <div class="right">
              <span class="name">{{r.name}}</span>
              <iep-button class="recommend-container-btn" type="danger" plain @click="referenceMembers(r.name,r.id)" size="mini">设为项目成员</iep-button>
              <span>负责了<span style="font-size:16px;margin:0 2px;">{{r.conscientiousCount}}</span>个项目 | 参与了<span style="font-size:16px;margin:0 2px;">{{r.participateCount}}</span>个项目</span>
              <span class="sign">
                <div v-for="(s,index) in r.projectTag" :key="index" @click="openSign(s)">{{s}}</div>
              </span>
            </div>
          </div>
        </div>
        <div class="recommend-echart" v-if="recommendType=='endTime'">
          <h4 class="recommend-title">项目平均耗时<span class="number">{{chartData.timePerDataStr}}</span>天</h4>
          <div class="recommend-container">
            <ve-ring :data="chartDataRing1" :settings="chartSettingsRing" :colors="colorsRing">
            </ve-ring>
          </div>
        </div>
        <div class="recommend-echart" v-if="recommendType=='budget'">
          <h4 class="recommend-title">平均成本预算<span class="number">{{chartData.averageBudget}}</span>元</h4>
          <div class="recommend-container">
            <ve-ring :data="chartDataRing2" :settings="chartSettingsRing" :colors="colorsRing">
            </ve-ring>
          </div>
        </div>
        <div class="recommend-echart" v-if="recommendType=='contractAmount'">
          <h4 class="recommend-title">平均合同金额<span class="number">{{chartData.averageAmount}}</span>元</h4>
          <div class="recommend-container">
            <ve-ring :data="chartDataRing3" :settings="chartSettingsRing" :colors="colorsRing">
            </ve-ring>
          </div>
        </div>
      </div>

      <footer-tool-bar>
        <iep-button type="primary" @click="save('2')">保存并发布</iep-button>
        <iep-button @click="save('1')">保存为草稿</iep-button>
      </footer-tool-bar>
    </basic-container>
    <relation-dialog ref="relationDialog" @relativeSubmit="relativeSubmit"></relation-dialog>
    <product-relation-dialog ref="productRelationDialog" @relativeSubmit="relativeProductSubmit"></product-relation-dialog>
    <project-relation-dialog ref="projectRelationDialog" @relativeSubmit="relativeprojectSubmit"></project-relation-dialog>
  </div>
</template>

<script>
import { dictMap, rules, initFormData, relatedFormList, initBudgetForm } from './Total/const.js'
import { createData, updateData, getRecommendedProjectList, getRecommendedHandlesList, getRecommendedMktManagerList, generationProject, getRecommendedMemberList, getRecommendedMentortList, getTimePerRequest, getAverageCostBudget, getAverageContractAmount } from '@/api/gpms/index'
import { getCustomerPage } from '@/api/crms/customer'
// import { mapState } from 'vuex'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { tipContent } from './option'
import RelationDialog from './Total/relation'
import ProductRelationDialog from './Total/productRelation'
import projectRelationDialog from './Total/projectRelation'

export default {
  name: 'add-dialog',
  components: { RelationDialog, ProductRelationDialog, projectRelationDialog },

  data () {
    this.chartSettingsRing = {
      radius: [70, 100],
    }
    this.colorsRing = [
      (paramsA) => {
        var colorList1 = ['#93c5dc', '#efbf8f', '#e8b0b3']
        return colorList1[paramsA.dataIndex]
      },
    ]
    return {
      projectTime: '',
      endTime: '',
      tipContent,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },

      formData: initFormData(),
      rules,
      dictMap,
      type: 'create',
      typeObj: {
        create: {
          requestFn: createData,
          name: '新增',
        },
        update: {
          requestFn: updateData,
          name: '编辑',
        },
      },
      clientList: [],
      typeOptions: dictMap.typeOptions, // 项目类型菜单
      isRelevOptions: dictMap.isRelevOptions, // 是否关联菜单
      workTypeOne: dictMap.workTypeOne, // 业务类型一级菜单
      relatedFormList,
      selectIndex: -1,
      selectDelay: {
        value: '',
        index: -1,
      },
      tableData: [],
      validate: [
        {
          name: '外包费用',
          prop: 'outsourcingCost',
        },
        {
          name: '佣金',
          prop: 'commission',
        },
        {
          name: '项目总预算',
          prop: 'projectBudget',
        },
      ],
      recommendType: 'project',
      recommendProjectList: [
        // {id:1,projectName:'',projectLevel:'1',projectStage:'1',projectManagerList:{id:1,name:''},projectTagList:[]},
      ],
      recommendMentorList: [

      ],//督导推荐
      recommendHandlesList: [
      ],//经理推荐
      recommendMktManagerList: [],//市场经理推荐
      recommendMembersList: [],//推荐成员
      show3: true,
      shrink: '收缩',
      chartDataRing1: {
        columns: ['类型', '数量'],
        rows: [
          { '类型': '90天以下', '数量': 0, 'prop': '90天以下' },
          { '类型': '90天-180天', '数量': 0, 'prop': '90天-180天' },
          { '类型': '180天以上', '数量': 0, 'prop': '180天以上' },
        ],
      },//项目评价耗时
      chartDataRing2: {
        columns: ['类型', '数量'],
        rows: [
          { '类型': '10万以下', '数量': 0, 'prop': '10万以下' },
          { '类型': '10-50万', '数量': 0, 'prop': '10-50万' },
          { '类型': '50万以上', '数量': 0, 'prop': '50万以上' },
        ],
      },//平均成本预算
      chartDataRing3: {
        columns: ['类型', '数量'],
        rows: [
          { '类型': '50万以下', '数量': 0, 'prop': '50万以下' },
          { '类型': '50-100万', '数量': 0, 'prop': '50-100万' },
          { '类型': '100万以上', '数量': 0, 'prop': '100万以上' },
        ],
      },//平均成本预算
      chartData: {
        timePerDataStr: 0,
        averageBudget: 0,
        averageAmount: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['dictGroup', 'userInfo']),
    tagList () {
      return this.$route.query.allTagList
    },
    ...mapState({
      dialogShow: state => state.gpms.customerDialogShow,
    }),
  },
  created () {
    this.tableData = []
    this.formData = initFormData(this.userInfo)
    this.formData.relatedClient = this.$route.query.clientVal
    this.formData.relatedClientList.id = this.$route.query.clientVal
    this.formData.relatedClientList.name = this.$route.query.clientName
    if (typeof this.tagList == 'string') {
      this.tagList = [this.tagList]
    }
    this.formData.projectTagList = this.tagList
    let obj = Object.assign({}, initBudgetForm(), this.formData.projectBudgetList)
    this.tableData.push(obj)
    var newRelatedClient = 0
    if (this.$route.query.clientVal) {
      newRelatedClient = this.$route.query.clientVal
    }
    var newtagList = ''
    if (this.tagList) {
      newtagList = this.tagList
      if (typeof newtagList == 'string') {
        newtagList = [newtagList]
      }
    }
    generationProject({ relatedClient: newRelatedClient, tagList: newtagList }).then(({ data }) => {
      this.formData.projectName = `${this.nowTime()}${data}`
    })
    getCustomerPage({ type: 1 }).then(({ data }) => {
      this.clientList = data.data.records
    })
    getRecommendedProjectList({ tagList: newtagList }).then(({ data }) => {
      this.recommendProjectList = data
      for (let item of this.recommendProjectList) {
        if (item.projectManagerList) {
          item.projectManagerName = item.projectManagerList.name
        } else {
          item.projectManagerName = '无'
        }
      }
    })
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    save (val) {
      this.formData.projectStatus = val
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 进行数据的转换先
          let personList = [{
            name: 'mktManager',
            list: 'mktManagerList',
          }, {
            name: 'projectManager',
            list: 'projectManagerList',
          }]
          let mentorList = [
            {
              name: 'projectMentor',
              list: 'projectMentorList',
            },
          ]
          let form = { id: this.id, ...this.formData }
          form.memberList = this.formData.membersList.map(m => m.id)
          form.marketManagerList = this.formData.mktManagerList.map(m => m.id)
          form.mentorList = this.formData.projectMentorList.map(m => m.id)
          form.projectHandles = this.formData.projectHandlesList.map(m => m.id)
          form.productIds = this.formData.productList.map(m => m.id)
          for (let item of this.relatedFormList) {
            form[item.ids] = this.formData[item.list].map(m => m.id)
          }
          form.projectIds = this.formData.projectList.map(m => m.id)
          for (let item of mentorList) {
            form[item.name] = this.formData[item.list].id
          }
          if (this.formData.mktManager == '') {
            for (let item of personList) {
              form[item.name] = this.userInfo.userId
            }
          } else {
            for (let item of personList) {
              form[item.name] = this.formData[item.list].id
            }
          }
          if (this.formData.projectManager == '') {
            for (let item of personList) {
              form[item.name] = this.userInfo.userId
            }
          } else {
            for (let item of personList) {
              form[item.name] = this.formData[item.list].id
            }
          }
          // 判断签订状态 -- 是否关联合同 -- 已签-1 待签-2
          form.signatureStatus = form.contractIds.length > 0 ? 1 : 2

          // 回款表加上index
          for (let index = 0; index < form.paymentRelations.length; ++index) {
            form.paymentRelations[index].serialNumber = index + 1
          }

          form.inChargeDept = this.formData.inChargeDeptList.id
          form.coopDept = this.formData.coopDeptList.id
          delete form.productList
          delete form.summaryList
          delete form.materialList
          // delete form.contractList
          // delete form.projectList
          delete form.reportList
          for (let item of this.validate) {
            if (this.tableData[0][item.prop] === '') {
              this.$message.error(`请填写${item.name}，若无，请填写0`)
              return
            }
          }
          form.projectBudgetList = this.tableData[0]
          form.projectBudget = this.tableData[0].projectBudget
          if (form.projectTypeBefore == true) {
            form.projectType = '1'
          }
          else {
            form.projectType = '2'
          }
          this.typeObj[this.type].requestFn(form).then(res => {
            if (res.data.data === true) {
              this.$message({
                type: 'success',
                message: '新增成功!',
              })
            } else {
              this.$message({
                type: 'info',
                message: `新增失败,${res.data.msg}`,
              })
            }
            this.$router.push('/gpms/project')
          })
        } else {
          return false
        }
      })
    },
    handleAdd () {
      this.$refs['relationDialog'].dialogShow = true
      this.$refs['relationDialog'].loadData({
        summaryList: this.formData.summaryList,
        materialList: this.formData.materialList,
        // contractList: this.formData.contractList,
        // projectList: this.formData.projectList,
        reportList: this.formData.reportList,
      })
    },
    handleAddProduct () {
      this.$refs['productRelationDialog'].dialogShow = true
      this.$refs['productRelationDialog'].loadData({
        productList: this.formData.productList,
      })
    },
    handleAddExternalProject () {
      this.$refs['projectRelationDialog'].dialogShow = true
      this.$refs['projectRelationDialog'].loadData({
        projectList: this.formData.projectList,
      })
    },
    // 添加其他关联
    relativeSubmit (list) {
      this.formData = Object.assign({}, this.formData, list)
    },
    // 添加关联产品
    relativeProductSubmit (list) {
      this.formData.productList = list.productList
    },
    // 添加关联项目
    relativeprojectSubmit (list) {
      this.formData.projectList = list.projectList
    },
    // 删除关联
    closeRelation (index, list, ids) {
      this.formData[list].splice(index, 1)
      this.formData[ids].splice(index, 1)
    },
    handleCreate () {
      this.formData.paymentRelations.push({
        projectPaymentTime: '',
        paymentAmount: '',
      })
    },
    handleDelete (index) {
      this.formData.paymentRelations.splice(index, 1)
    },
    // 预计回款时间金额调整
    changeNumber (index) {
      this.$nextTick(() => {
        if (this.formData.paymentRelations[index].paymentAmount < 0) {
          this.formData.paymentRelations[index].paymentAmount = 0
        }
      })
    },
    // 延期
    handleDelay (index) {
      this.selectDelay.index = index
      this.$nextTick(() => {
        this.$refs['selectDelay'].focus()
      })
    },
    changeDelay (val) {
      this.formData.paymentRelations[this.selectDelay.index].projectPaymentTime = val
      this.selectDelay.index = -1
    },
    openSign (val) {
      this.$openTagDetail(val)
    },
    referenceName (val) {
      this.formData.projectName = val.projectName
      this.formData.projectMentorList = val.projectMentorList
      this.formData.mktManagerList = val.mktManagerList
      this.formData.projectHandlesList = val.projectHandlesList
      this.formData.membersList = val.membersList
    },
    referenceMentor (val, id) {
      const projectMentor = this.formData.projectMentorList.map(m => {
        return m['id']
      })
      if (projectMentor.includes(id) == false) {
        this.formData.projectMentorList.push({ id: id, name: val })
      }
    },
    referenceHandles (val, id) {
      const projectHandles = this.formData.projectHandlesList.map(m => {
        return m['id']
      })
      if (projectHandles.includes(id) == false) {
        this.formData.projectHandlesList.push({ id: id, name: val })
      }
    },
    referenceMktManager (val, id) {
      const mktManager = this.formData.mktManagerList.map(m => {
        return m['id']
      })
      if (mktManager.includes(id) == false) {
        this.formData.mktManagerList.push({ id: id, name: val })
      }
    },
    referenceMembers (val, id) {
      const members = this.formData.membersList.map(m => {
        return m['id']
      })
      if (members.includes(id) == false) {
        this.formData.membersList.push({ id: id, name: val })
      }
    },
    cRecommendType (val) {
      this.recommendType = val
      if (val == 'projectHandles') {
        getRecommendedHandlesList({ tagList: this.tagList }).then(({ data }) => {
          this.recommendHandlesList = data
        })
      }//推荐项目经理
      else if (val == 'mktManager') {
        getRecommendedMktManagerList({ tagList: this.tagList }).then(({ data }) => {
          this.recommendMktManagerList = data
        })
      }//推荐市场经理
      else if (val == 'projectMentor') {
        getRecommendedMentortList({ tagList: this.tagList }).then(({ data }) => {
          this.recommendMentorList = data
        })
      }//推荐项目督导
      else if (val == 'members') {
        getRecommendedMemberList({ tagList: this.tagList }).then(({ data }) => {
          this.recommendMembersList = data
        })
      }//推荐项目成员

      else if (val == 'endTime') {
        getTimePerRequest({ tagList: this.tagList }).then(({ data }) => {
          this.chartDataRing1.rows[0].数量 = data.classifiedProportion
          this.chartDataRing1.rows[1].数量 = data.classifiedProportion1
          this.chartDataRing1.rows[2].数量 = data.classifiedProportion2
          this.chartData.timePerDataStr = data.timePerDataStr
        })
      }//项目平均耗时
      else if (val == 'budget') {
        getAverageCostBudget({ tagList: this.tagList }).then(({ data }) => {
          this.chartDataRing2.rows[0].数量 = data.classifiedProportion
          this.chartDataRing2.rows[1].数量 = data.classifiedProportion1
          this.chartDataRing2.rows[2].数量 = data.classifiedProportion2
          this.chartData.averageBudget = data.averageBudget
        })
      }//平均成本预算
      else if (val == 'contractAmount') {
        getAverageContractAmount({ tagList: this.tagList }).then(({ data }) => {
          this.chartDataRing3.rows[0].数量 = data.classifiedProportion
          this.chartDataRing3.rows[1].数量 = data.classifiedProportion1
          this.chartDataRing3.rows[2].数量 = data.classifiedProportion2
          this.chartData.averageAmount = data.averageAmount
        })
      }//平均合同金额字段
    },
    nowTime () {
      var nowDate = new Date()
      var year = nowDate.getFullYear() //获取完整的年份
      var month = nowDate.getMonth() + 1 //获取当前月份
      month = (month < 10 ? '0' + month : month)
      return year.toString() + month.toString()
    },
    shrinkOpen () {
      this.show3 = !this.show3
      if (this.show3 == true) {
        this.shrink = '收缩'
      }
      else {
        this.shrink = '展开'
      }
    },
    handleDetail (id) {
      this.$router.push({
        path: `/gpms_spa/project/detail/${id}`,
      })
    },
    ...mapMutations({
      setCustomerDialogShow: 'SET_CUSTOMER_DIALOG_SHOW',
    }),
    addClient () {
      this.setCustomerDialogShow(true)
    },
  },
  watch: {
    'formData.projectAmount': {
      deep: true,
      handler: function (val) {
        if (val > 999999.99) {
          this.formData.projectLevel = '1'
        }
        else if (499999.99 < val && val < 1000000) {
          this.formData.projectLevel = '2'
        }
        else {
          this.formData.projectLevel = '3'
        }
      },

    },
    'formData.isRelevanceProduct': {
      deep: true,
      handler: function (val) {
        if (val == 2) {
          this.formData.productList = []
        }
      },
    },
  },
}
</script>

<style scoped lang="scss">
.abs {
  padding-bottom: 30px;
}
.relevance-list,
.relevance-list-after {
  padding: 0;
  .item {
    list-style: none;
    height: 28px;
    i {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
.relevance-list-after {
  display: inline-block;
  margin: 0 10px;
}
.table {
  .create {
    text-align: center;
    color: #ba1b21;
    cursor: pointer;
  }
}
.project-select-delay {
  width: 0;
  height: 0;
  input {
    width: 0;
    height: 0;
    border: 0;
  }
  span {
    display: none;
  }
}
</style>
<style scoped>
.table >>> .el-input__inner {
  padding: 0;
  border: 0;
}
.column-header {
  color: #f00;
}
.main >>> .el-col-12 {
  width: 100%;
  position: relative;
}
</style>
<style lang="scss" scoped>
.main {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 400px;
  border-top: 1px solid #eee;
  .form-detail {
    overflow: hidden;
    margin-right: 0;
    padding-right: 12%;
  }
  .recommend-peopel,
  .recommend-project,
  .recommend-echart {
    padding: 20px;
    border-left: 1px solid #eee;
    box-shadow: -2px 0px 2px #eee;
    .recommend-title {
      font-size: 16px;
      height: 36px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      .number {
        font-size: 18px;
        font-weight: bold;
        margin: 0 10px;
      }
    }
    .recommend-container {
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      position: relative;
      overflow: hidden;
      &:last-child {
        border: 0;
      }
      .recommend-container-btn {
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
  }
  .recommend-echart {
    position: fixed;
    right: 0;
    width: 400px;
    height: 100%;
  }
  .recommend-project {
    .recommend-container {
      > span {
        height: 38px;
        line-height: 38px;
      }
      .name {
        width: 260px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .grade,
      .stage {
        color: #fff;
        font-size: 12px;
        padding: 0 6px;
        height: 18px;
        line-height: 18px;
        margin-right: 4px;
        margin-top: 10px;
      }
      .grade {
        background-color: #b91b21;
      }
      .stage {
        background-color: #b5b5b5;
        margin-right: 10px;
      }
      .sign {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > div {
          color: #999;
          position: relative;
          margin-right: 12px;
          padding-right: 10px;
          display: inline-block;
          cursor: pointer;
          &:after {
            content: "/";
            position: absolute;
            right: -4px;
            top: 0;
          }
          &:last-child {
            &:after {
              content: "";
            }
          }
        }
      }
    }
  }
  .recommend-peopel {
    .img {
      width: 80px;
      height: 80px;
      float: left;
      .img-box {
        width: 80px;
      }
    }
    .right {
      width: 260px;
      float: left;
      margin-left: 10px;
      > span {
        height: 22px;
        line-height: 22px;
      }
      .name {
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        width: 120px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .sign {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        > div {
          color: #999;
          position: relative;
          margin-right: 12px;
          padding-right: 10px;
          display: inline-block;
          cursor: pointer;
          &:after {
            content: "/";
            position: absolute;
            right: -4px;
            top: 0;
          }
          &:last-child {
            &:after {
              content: "";
            }
          }
        }
      }
    }
  }
  .recom-btn {
    position: absolute;
    right: -70px;
    top: 0;
  }
}
.show3 {
  margin: -20px auto 0;
  display: block;
  border-top: 0;
  padding: 8px 20px;
}
</style>
<style scoped>
.abs >>> .el-input-number--small {
  width: 100%;
}
.abs >>> .el-input__prefix {
  display: none;
}
.abs >>> .el-input-number.is-controls-right .el-input__inner {
  text-align: left;
}
</style>
