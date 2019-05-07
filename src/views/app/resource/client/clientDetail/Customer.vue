<template>
  <div class="info">
    <div class="info-block line">
      <h3 class="title">基本信息</h3>
      <div class="base">
        <el-row>
          <el-col :span=12 class="item">
            <div class="label">单位网址：</div>
            <div class="value">{{formData.companyUrl}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">联系地址：</div>
            <div class="value">{{formData.contractAddress}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">业务类型：</div>
            <div class="value customer" v-for="(item,index) in formData.businessTypeKey" :key="index">{{item.commonName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">单位职能：</div>
            <div class="value">{{formData.companyFunction}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">区域类型：</div>
            <div class="value">{{formData.districtTypeName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">客户类型：</div>
            <div class="value customer" v-for="(item,index) in formData.clientTypeKey" :key="index">{{item.commonName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">客户关系：</div>
            <div class="value">{{formData.clientRelaName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">其他说明：</div>
            <div class="value">{{formData.otherDesc}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="other">
        <div class="item">
          <div class="label">合作项目：</div>
          <div class="value">
            <div class="dot" v-for="(item, index) in formData.collaborations" :key="index">{{item.name}}<span>（合同金额：{{item.money}}）</span></div>
          </div>
        </div>
        <div class="item">
          <div class="label">客户标签：</div>
          <div class="value">
            <el-tag type="info" class="tag-dot" v-for="(item,index) in formData.tags" :key="index">{{item.commonName}}</el-tag>
          </div>
        </div>
        <div class="item">
          <div class="label">相关产品：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.products" :key="index">{{item}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">相关方案：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.programs" :key="index">{{item.commonName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">相似客户：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.similarClient" :key="index">{{item.commonName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">项目合作伙伴：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.partners" :key="index">{{item}}<span>（市场经理：{{item.marketManager}}）</span></div>
          </div>
        </div>
        <div class="item">
          <div class="label">市场经理：</div>
          <div class="value">
            <div class="dot">{{formData.marketManagerName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">协作人：</div>
          <div class="value">
            <div class="dot" v-for="(item,index) in formData.collaborations" :key="index">{{item.commonName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="label">转移状态：</div>
          <div class="value">
            <div class="dot">{{formData.transferFlagName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-block">
      <h3 class="title">系统信息</h3>
      <div class="other">
        <el-row>
          <el-col :span=12 class="item">
            <div class="label">发布人：</div>
            <div class="value">{{formData.creatorName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">负责部门：</div>
            <div class="value">{{formData.deptName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前市场经理：</div>
            <div class="value">{{formData.preMarketManagerName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前所属部门：</div>
            <div class="value">{{formData.preDeptName}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">创建时间：</div>
            <div class="value">{{formData.createTime}}</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">更新于：</div>
            <div class="value">{{formData.updateTime}}</div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="info-block">
      <h3 class="title">联系人</h3>
      <el-card class="box-card" shadow="never"  v-for="(item,index) in linksList" :key="index">
        <div class="box-head">
          <span class="name">张三风</span>
          <span class="job">(市场经理)</span>
        </div>
        <div class="box-body">
          <div class="body-item">
            <span>电话：</span>
            <span>手机：</span>
            <span>传真：</span>
          </div>
          <div class="body-item">
            <span>QQ：</span>
            <span>微信：</span>
            <span>邮箱：</span>
          </div>
          <div class="body-item">
            <span>客户关注：</span>
          </div>
          <div class="body-item">
            <span>地址：</span>
          </div>
        </div>
      </el-card>
    </div>
    <visit></visit>
    <div>
      <el-collapse  v-model="activeNames">
        <el-collapse-item title="方案" name="1">
          <div class="programme">
        
          </div>
        </el-collapse-item>
        <el-collapse-item title="合同" name="2">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="咨询" name="3">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Visit from './Visit'
export default {
  components:{
    Visit,
  },
  data () {
    return {
      activeNames:['1'],
      linksList:[
        {},
        {},
        {},
      ],
      programmeList:[
        {},
        {},
      ],
      tagsList:['创业创新','浙江创业女杰','浙商'],
      formData: {},
    }
  },
}
</script>

<style lang="scss" scoped>

.info {
  .line {
    border-bottom: 1px solid #e4e7ed;
  }
  .info-block {
    .title {
      font-size: 16px;
      margin: 10px 0;
    }
    .base {
      background-color: #f9f9f9;
      padding: 10px 20px;
    }
    .other {
      padding: 10px 20px;
    }
    .item {
      margin-bottom: 15px;
      div {
        display: inline-block;
      }
      .dot {
        border-right: 1px solid #999;
        padding: 0 10px;
      }
      .tag-dot {
        margin-left: 10px;
      }
      .dot:last-child {
        border: 0;
      }
    }
    .box-card{
      margin-bottom: 15px;
    }
    .box-head{
      .name{
        margin-right: 3px;
        color:#333;
      }
      .job{
        color: #999;
      }
    }
    .box-body{
      padding: 15px;
      line-height:28px;
      color:#666;
      .body-item:nth-child(1),
      .body-item:nth-child(2){
         span{
           display: inline-block;
           width: 33.3%;
           text-align: left;
         } 
      }
    }
  }
}
.customer {
  margin-right: 10px;
}
</style>
<style scoped>
.info>>>.el-collapse-item__header{
  padding: 0 10px;
  background-color: #f8f8f8;
}
.info>>>.el-collapse-item{
  margin-bottom: 15px;
}
</style>
