<template>
  <div>
    <basic-container>
      <page-header title="我的定位">
        <template>
          <el-button class="modify" size="small" @click="handleClicks">PK对比</el-button>
        </template>
      </page-header>
      <div class="box">
        <!-- 定位分析 -->
        <el-row>
          <el-col class="borders">
            <el-col class="bolds">定位分析</el-col>
            <el-col class="fontname">张三，你好！</el-col>
            <el-col class="fontcontent">
              <p v-show="evaluate">感谢你为公司创造了财富价值，基于项目数据来看，你是一个擅长{{objects.projects}}的国脉人，具备{{objects.Labels.join('、')}}相关知识。继续加油！</p>
              <p v-show="!evaluate">鉴于你当前未参与任何项目，因此无法开展定位分析。</p>
            </el-col>
          </el-col>
        </el-row>
        <!-- 项目分析 -->
        <el-row>
          <el-col class="borders">
            <el-col class="bolds">
              项目分析
              <el-tooltip placement="right">
                <div slot="content" class="Blackwindow">
                  参与项目总数（个）：{{TotalNumProjects.objectsnum.Total}}<br />
                  项目合同总金额（万元）：{{TotalNumProjects.TotalContractAmount.TCA}}<br />
                  担任项目经理次数（次）：{{TotalNumProjects.projectManager.frequency}}<br />
                  担任项目成员次数（次）：{{TotalNumProjects.ProjectMembers.frequency}}<br />
                  分享项目材料总数（个）：{{TotalNumProjects.SharingProjects.frequency}}<br />
                  平均水平：国脉人的平均数据<br />
                  同期水平：与当前用户入司时间相近的国脉人的平均数据
                </div>
                <i class='el-icon-picture-outline Explain'>统计说明</i>
              </el-tooltip>
            </el-col>
            <el-col :span="10">
              <div class="leftBox">
                <div class="leftBoxone">
                  <div class="ones">
                    <div class="onesSmallTop">
                      <p class="centers"><strong>参与项目总数（个）</strong></p>
                      <p class="centers cle">{{TotalNumProjects.objectsnum.Total}}</p>
                      <div class="twoFonts">
                        平均水平：{{TotalNumProjects.objectsnum.Average}}
                      </div>
                      <div class="twoFonts">
                        同期水平：{{TotalNumProjects.objectsnum.Contemporaneous}}
                      </div>
                    </div>
                    <div class="onesSmallDown">
                      <div class="twoFonts">
                        咨询类项目：{{TotalNumProjects.objectsnum.Consultation}}
                      </div>
                      <div class="twoFonts">
                        产品类项目：{{TotalNumProjects.objectsnum.product}}
                      </div><br />
                      <div class="twoFonts">
                        数据类项目：{{TotalNumProjects.objectsnum.datas}}
                      </div>
                      <div class="twoFonts">
                        外包类项目：{{TotalNumProjects.objectsnum.outsource}}
                      </div>
                      <div class="twoFonts">
                        会议培训类项目：{{TotalNumProjects.objectsnum.Meeting}}
                      </div>
                      <div class="twoFonts">
                        平台类项目：{{TotalNumProjects.objectsnum.platform}}
                      </div>
                      <div class="twoFonts">
                        技术服务类项目：{{TotalNumProjects.objectsnum.technology}}
                      </div>
                      <div class="twoFonts">
                        其它类项目：{{TotalNumProjects.objectsnum.Others}}
                      </div>
                      <br /><br />
                    </div>
                  </div>
                  <div class="twos">
                    <div class="twosSmallUp">
                      <p class="centers"><strong>项目合同总金额（万元）</strong></p>
                      <p class="centers cle">{{TotalNumProjects.TotalContractAmount.TCA}}</p>
                      <div class="twoFonts">
                        平均水平：{{TotalNumProjects.TotalContractAmount.Average}}
                      </div>
                      <div class="twoFonts">
                        同期水平：{{TotalNumProjects.TotalContractAmount.Contemporaneous}}
                      </div>
                    </div>
                    <div class="twosSmallDown">
                      <div class="money">
                        50万以下项目：{{TotalNumProjects.TotalContractAmount.FiftyDown}}
                      </div>
                      <div class="money">
                        50万(含)-100万(不含)项目：{{TotalNumProjects.TotalContractAmount.FiftyUp}}
                      </div>
                      <div class="money">
                        100万(含)-500万(不含)项目：{{TotalNumProjects.TotalContractAmount.OnehundredUp}}
                      </div>
                      <div class="money">
                        500万(含)-1000万(不含)项目：{{TotalNumProjects.TotalContractAmount.FivehundredUp}}
                      </div>
                      <div class="money">
                        1000万以上(含)项目：{{TotalNumProjects.TotalContractAmount.OnethousandUp}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="leftBoxtwo">
                  <div class="firsts">
                    <p class="centers"><strong>分享项目材料总数（个）</strong></p>
                    <p class="centers cle">{{TotalNumProjects.SharingProjects.frequency}}</p>
                    <div class="twoFonts">
                      平均水平：{{TotalNumProjects.SharingProjects.Average}}
                    </div>
                    <div class="twoFonts">
                      同期水平：{{TotalNumProjects.SharingProjects.Contemporaneous}}
                    </div>
                  </div>
                  <div class="seconds">
                    <div class="secondsTop">
                      <div class="twoFonts">
                        咨询类项目：{{TotalNumProjects.SharingProjects.Consultation}}
                      </div>
                      <div class="twoFonts">
                        产品类项目：{{TotalNumProjects.SharingProjects.product}}
                      </div>
                      <div class="twoFonts">
                        数据类项目：{{TotalNumProjects.SharingProjects.datas}}
                      </div>
                      <div class="twoFonts">
                        外包类项目：{{TotalNumProjects.SharingProjects.outsource}}
                      </div>
                      <div class="twoFonts">
                        会议培训类项目：{{TotalNumProjects.SharingProjects.Meeting}}
                      </div>
                      <div class="twoFonts">
                        平台类项目：{{TotalNumProjects.SharingProjects.platform}}
                      </div>
                      <div class="twoFonts">
                        技术服务类项目：{{TotalNumProjects.SharingProjects.technology}}
                      </div>
                      <div class="twoFonts">
                        其它类项目：{{TotalNumProjects.SharingProjects.Others}}
                      </div>
                    </div>
                    <div class="secondsDown">
                      <div class="twoFonts twoFontsbut">
                        技术服务类项目：{{TotalNumProjects.SharingProjects.Downloads}}
                      </div>
                      <div class="twoFonts twoFontsbut">
                        其它类项目：{{TotalNumProjects.SharingProjects.browses}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="rightBox">
                <el-col :span='12'>
                  <div class="rightBoxone">
                    <div class="solids">
                      <p class="centers"><strong>担任项目经理次数（次）</strong></p>
                      <p class="centers cle">{{TotalNumProjects.projectManager.frequency}}</p>
                      <div class="twoFonts">
                        平均水平：{{TotalNumProjects.projectManager.Average}}
                      </div>
                      <div class="twoFonts">
                        同期水平：{{TotalNumProjects.projectManager.Contemporaneous}}
                      </div>
                    </div>
                    <div class="dashed">
                      <div class="money mright">
                        50万以下项目：{{TotalNumProjects.projectManager.FiftyDown}}
                      </div>
                      <div class="money mright">
                        50万(含)-100万(不含)项目：{{TotalNumProjects.projectManager.FiftyUp}}
                      </div>
                      <div class="money mright">
                        100万(含)-500万(不含)项目：{{TotalNumProjects.projectManager.OnehundredUp}}
                      </div>
                      <div class="money mright">
                        500万(含)-1000万(不含)项目：{{TotalNumProjects.projectManager.FivehundredUp}}
                      </div>
                      <div class="money mright">
                        1000万以上(含)项目：{{TotalNumProjects.projectManager.OnethousandUp}}
                      </div>
                    </div>
                    <div>
                      <div class="twoFonts marbFonts">
                        咨询类项目：{{TotalNumProjects.projectManager.Consultation}}
                      </div>
                      <div class="twoFonts marbFonts">
                        产品类项目：{{TotalNumProjects.projectManager.product}}
                      </div>
                      <div class="twoFonts marbFonts">
                        数据类项目：{{TotalNumProjects.projectManager.datas}}
                      </div>
                      <div class="twoFonts marbFonts">
                        外包类项目：{{TotalNumProjects.projectManager.outsource}}
                      </div>
                      <div class="twoFonts marbFonts">
                        会议培训类项目：{{TotalNumProjects.projectManager.Meeting}}
                      </div>
                      <div class="twoFonts marbFonts">
                        平台类项目：{{TotalNumProjects.projectManager.platform}}
                      </div>
                      <div class="twoFonts marbFonts">
                        技术服务类项目：{{TotalNumProjects.projectManager.technology}}
                      </div>
                      <div class="twoFonts marbFonts">
                        其它类项目：{{TotalNumProjects.projectManager.Others}}
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span='12'>
                  <div class="rightBoxtwo">
                    <div class="solids">
                      <p class="centers"><strong>担任项目成员次数（次）</strong></p>
                      <p class="centers cle">{{TotalNumProjects.ProjectMembers.frequency}}</p>
                      <div class="twoFonts">
                        平均水平：{{TotalNumProjects.ProjectMembers.Average}}
                      </div>
                      <div class="twoFonts">
                        同期水平：{{TotalNumProjects.ProjectMembers.Contemporaneous}}
                      </div>
                    </div>
                    <div class="dashed">
                      <div class="money mright">
                        50万以下项目：{{TotalNumProjects.ProjectMembers.FiftyDown}}
                      </div>
                      <div class="money mright">
                        50万(含)-100万(不含)项目：{{TotalNumProjects.ProjectMembers.FiftyUp}}
                      </div>
                      <div class="money mright">
                        100万(含)-500万(不含)项目：{{TotalNumProjects.ProjectMembers.OnehundredUp}}
                      </div>
                      <div class="money mright">
                        500万(含)-1000万(不含)项目：{{TotalNumProjects.ProjectMembers.FivehundredUp}}
                      </div>
                      <div class="money mright">
                        1000万以上(含)项目：{{TotalNumProjects.ProjectMembers.OnethousandUp}}
                      </div>
                    </div>
                    <div>
                      <div class="twoFonts marbFonts">
                        咨询类项目：{{TotalNumProjects.ProjectMembers.Consultation}}
                      </div>
                      <div class="twoFonts marbFonts">
                        产品类项目：{{TotalNumProjects.ProjectMembers.product}}
                      </div>
                      <div class="twoFonts marbFonts">
                        数据类项目：{{TotalNumProjects.ProjectMembers.datas}}
                      </div>
                      <div class="twoFonts marbFonts">
                        外包类项目：{{TotalNumProjects.ProjectMembers.outsource}}
                      </div>
                      <div class="twoFonts marbFonts">
                        会议培训类项目：{{TotalNumProjects.ProjectMembers.Meeting}}
                      </div>
                      <div class="twoFonts marbFonts">
                        平台类项目：{{TotalNumProjects.ProjectMembers.platform}}
                      </div>
                      <div class="twoFonts marbFonts">
                        技术服务类项目：{{TotalNumProjects.ProjectMembers.technology}}
                      </div>
                      <div class="twoFonts marbFonts">
                        其它类项目：{{TotalNumProjects.ProjectMembers.Others}}
                      </div>
                    </div>
                  </div>
                </el-col>
              </div>
            </el-col>
          </el-col>
        </el-row>
        <!-- 弹窗 -->
        <el-dialog title="PK对比" :visible.sync="dialogTableVisible">
          <el-row class="Labelesname">
            <el-col :span='24'>
              <!-- 标签组件 -->
              <span>对比人：</span>
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="13" :offset="6">
              <div class="grid-content">
                <div class="gridBox">
                  <a href="javascript:;">
                    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=622258600,2063348875&fm=26&gp=0.jpg" alt="未加载">
                    张三
                  </a>
                </div>
                <div class="gridBox pkbox">
                  PK
                </div>
                <div class="gridBox">
                  <a href="javascript:;">
                    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=622258600,2063348875&fm=26&gp=0.jpg" alt="未加载">
                    李四
                  </a>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='24'>
              <table border="1">
                <tr>
                  <th>对比项</th>
                  <th>张三</th>
                </tr>
                <tr>
                  <td colspan="2" class="titl">基础信息</td>
                </tr>
                <tr>
                  <td class="Fields">岗位</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">职务</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">职称</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">卓越标签</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">专业标签</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">进步标签</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="2" class="titl">项目信息-概要</td>
                </tr>
                <tr>
                  <td class="Fields">参与项目总数（个）</td>
                  <td>{{TotalNumProjects.objectsnum.Consultation}}</td>
                </tr>
                <tr>
                  <td class="Fields">项目合同总金额（万元）</td>
                  <td>{{TotalNumProjects.TotalContractAmount.TCA}}</td>
                </tr>
                <tr>
                  <td class="Fields">担任项目经理次数（次）</td>
                  <td>{{TotalNumProjects.projectManager.frequency}}</td>
                </tr>
                <tr>
                  <td class="Fields">担任项目成员次数（次）</td>
                  <td>{{TotalNumProjects.ProjectMembers.frequency}}</td>
                </tr>
                <tr>
                  <td class="Fields">分享项目材料总数（个）</td>
                  <td>{{TotalNumProjects.SharingProjects.frequency}}</td>
                </tr>
                <tr>
                  <td colspan="2" class="titl">项目信息-详细【参与项目总数（个）】</td>
                </tr>
                <tr>
                  <td class="Fields">咨询类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">产品类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">数据类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">外包类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">会议培训类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">平台类类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">技术服务类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">其他类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="2" class="titl">项目信息-详细【项目合同总金额（万元）】</td>
                </tr>
                <tr>
                  <td class="Fields">50万以下项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">50万(含)-100万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">100万(含)-500万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">500万(含)-1000万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">1000万以上(含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="2" class="titl">项目信息-详细【担任项目经理次数（次）】</td>
                </tr>
                <tr>
                  <td class="Fields">50万以下项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">50万(含)-100万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">100万(含)-500万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">500万(含)-1000万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">1000万以上(含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">咨询类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">产品类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">数据类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">外包类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">会议培训类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">平台类类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">技术服务类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">其它类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="2" class="titl">项目信息-详细【担任项目成员次数（次）】</td>
                </tr>
                <tr>
                  <td class="Fields">50万以下项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">50万(含)-100万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">100万(含)-500万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">500万(含)-1000万(不含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">1000万以上(含)项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">咨询类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">产品类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">数据类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">外包类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">会议培训类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">平台类类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">技术服务类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">其它类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td colspan="2" class="titl">项目信息-详细【分享项目材料总数（个）】</td>
                </tr>
                <tr>
                  <td class="Fields">咨询类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">产品类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">数据类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">外包类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">会议培训类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">平台类类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">技术服务类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">其它类项目</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">被下载总量</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="Fields">被浏览总量</td>
                  <td></td>
                </tr>
              </table>
              <el-row :gutter="20">
                <el-col :span="6" :offset="9">
                  <el-button class="calls" @click='handleClicks'>返回</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

        </el-dialog>
      </div>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      // 标签组件
      dynamicTags: ['张三'],
      inputVisible: false,
      inputValue: '',
      // 评价标语
      evaluate: true,
      objects: {
        'projects': '产品类项目',
        'Labels': ['数据基因', '营商环境', '产品设计'],
      },
      TotalNumProjects: {
        // 参与项目data
        objectsnum: {
          'Total': '40',
          'Average': '8.1',
          'Contemporaneous': '13.2',
          'Consultation': '3',
          'product': '15',
          'datas': '15',
          'outsource': '2',
          'Meeting': '2',
          'platform': '1',
          'technology': '2',
          'Others': '0',
        },
        // 合同总金额
        TotalContractAmount: {
          'TCA': '500.6',
          'Average': '23.5',
          'Contemporaneous': '12.5',
          'FiftyDown': '30',
          'FiftyUp': '7',
          'OnehundredUp': '2',
          'FivehundredUp': '1',
          'OnethousandUp': '0',
        },
        // 担任项目经理次数
        projectManager: {
          'frequency': '15',
          'Average': '10.2',
          'Contemporaneous': '6.1',
          'FiftyDown': '10',
          'FiftyUp': '3',
          'OnehundredUp': '1',
          'FivehundredUp': '1',
          'OnethousandUp': '0',
          'Consultation': '2',
          'product': '10',
          'datas': '7',
          'outsource': '1',
          'Meeting': '1',
          'platform': '0',
          'technology': '2',
          'Others': '0',
        },
        // 担任项目成员次数
        ProjectMembers: {
          'frequency': '25',
          'Average': '34.2',
          'Contemporaneous': '180.8',
          'FiftyDown': '20',
          'FiftyUp': '4',
          'OnehundredUp': '1',
          'FivehundredUp': '0',
          'OnethousandUp': '0',
          'Consultation': '1',
          'product': '5',
          'datas': '8',
          'outsource': '1',
          'Meeting': '1',
          'platform': '1',
          'technology': '0',
          'Others': '0',
        },
        // 分享项目材料
        SharingProjects: {
          'frequency': '105',
          'Average': '34.2',
          'Contemporaneous': '180.4',
          'Consultation': '10',
          'product': '30',
          'datas': '40',
          'outsource': '10',
          'Meeting': '5',
          'platform': '5',
          'technology': '5',
          'Others': '0',
          'Downloads': '430',
          'browses': '561',
        },
      },
      dialogTableVisible: false,
    }
  },
  methods: {
    handleClicks () {
      this.dialogTableVisible = !this.dialogTableVisible
    },
    // 标签组件
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  position: relative;
  .clearmagin {
    margin: auto 0;
    box-sizing: border-box;
    padding: 0 20px;
    p {
      font-size: 18px;
      font-weight: bold;
    }
    .pk {
      margin-top: 11px;
    }
  }
  .el-row {
    padding-top: 10px;
  }
  .borders {
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 10px 15px 20px 15px;
    .bolds {
      font-weight: bold;
      font-size: 14px;
      color: #666666;
      .Explain {
        cursor: pointer;
        font-size: 13px;
        color: gray;
        padding-left: 5px;
      }
      .Blackwindow {
        line-height: 2px;
      }
    }
    .leftBox {
      margin-right: 8px;
      .leftBoxone {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        .ones {
          width: 50%;
          display: inline-block;
          .onesSmallTop {
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
          }
        }
        .twos {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          border-left: 1px dashed #ccc;
          .twosSmallUp {
            box-sizing: border-box;
            border-bottom: 1px solid #ccc;
          }
        }
      }
      .leftBoxtwo {
        border: 1px solid #ccc;
        .firsts {
          width: 50%;
          display: inline-block;
        }
        .seconds {
          width: 50%;
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          border-left: 1px solid #ccc;
          .secondsTop {
            border-bottom: 1px dashed #ccc;
          }
        }
      }
    }
    .rightBox {
      background-color: goldenrod;
      .rightBoxone {
        width: 98%;
        border: 1px solid #ccc;
        display: inline-block;
        .solids {
          border-bottom: 1px solid #ccc;
        }
        .dashed {
          border-bottom: 1px dashed #ccc;
        }
      }
      .rightBoxtwo {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        display: inline-block;
        .solids {
          border-bottom: 1px solid #ccc;
        }
        .dashed {
          border-bottom: 1px dashed #ccc;
        }
      }
    }
    .fontname {
      font-size: 13px;
      margin-top: 10px;
      padding-left: 40px;
    }
    .fontcontent {
      font-size: 13px;
      padding-left: 40px;
      margin-bottom: 0;
      p {
        margin: 0;
      }
    }
  }
}
.centers {
  text-align: center;
  color: #666666;
}
.cle {
  margin: 0 0 20px 0;
  font-size: 35px;
}
.twoFonts {
  width: 50%;
  display: inline-block;
  font-size: 11px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-bottom: 9px;
}
.money {
  font-size: 13px;
  padding: 5px 0 5px 10px;
}
.twoFontsbut {
  padding-bottom: 11px;
}
.mright {
  padding-top: 5px;
  padding-bottom: 10px;
}
.marbFonts {
  margin-bottom: 5px;
}
.twoFontsBox {
  padding-top: 1px;
}
table {
  width: 100%;
  text-align: center;
  border-color: gray;
}
.titl {
  text-align: left;
  padding-left: 10px;
  font-weight: bold;
}
td,
th {
  padding: 10px 0;
}
.Fields {
  text-align: left;
  padding-left: 10px;
}
.calls {
  margin-top: 25px;
  padding-left: 45px;
  padding-right: 45px;
}
// 标签组件
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.Labelesname {
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
}
.gridBox {
  width: 110px;
  height: 140px;
  // background-color: yellow;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  img {
    width: 110px;
    height: 110px;
    display: block;
  }
}
.pkbox {
  font-size: 40px;
  line-height: 110px;
}
.titles {
  color: #666666;
}
</style>


