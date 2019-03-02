<template>
  <div class="info">
    <div class="info-block">
      <h3 class="title">基本信息</h3>
      <div class="base">
        <el-row>
          <el-col :span=12 class="item">
            <div class="label">单位网址：</div>
            <div class="value">www.baidu.com</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">联系地址：</div>
            <div class="value">浙江舟山海洋科学城A11-1206</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">业务类型：</div>
            <div class="value">咨询</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">单位职能：</div>
            <div class="value">这里是单位职能</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">区域类型：</div>
            <div class="value">省级</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">客户类型：</div>
            <div class="value">战略合作伙伴</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">客户关系：</div>
            <div class="value">重要客户</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">其他说明：</div>
            <div class="value">这里是其他说明</div>
          </el-col>
        </el-row>
      </div>
      <div class="other">
        <div class="item">
          <div class="label">合作项目：</div>
          <div class="value">
            <div class="dot" v-for="(item, index) in formData.xiangmu" :key="index">{{item.name}}<span>（合同金额：{{item.money}}）</span></div>
          </div>
        </div>
        <div class="item">
          <div class="label">客户标签：</div>
          <div class="value">
            <el-tag type="info" class="tag-dot">大数据</el-tag>
            <el-tag type="info" class="tag-dot">政务规划</el-tag>
            <el-tag type="info" class="tag-dot">人工智能</el-tag>
          </div>
        </div>
        <div class="item">
          <div class="label">相关产品：</div>
          <div class="value">
            <div class="dot">海南省政务系统</div>
          </div>
        </div>
        <div class="item">
          <div class="label">相关方案：</div>
          <div class="value">
            <div class="dot">浙江省重大项目</div>
            <div class="dot">浙江省重大项目</div>
            <div class="dot">浙江省重大项目</div>
          </div>
        </div>
        <div class="item">
          <div class="label">相似客户：</div>
          <div class="value">
            <div class="dot">服务中心</div>
            <div class="dot">服务中心</div>
            <div class="dot">服务中心</div>
          </div>
        </div>
        <div class="item">
          <div class="label">项目合作伙伴：</div>
          <div class="value">
            <div class="dot">阿里巴巴<span>（市场经理：马云）</span></div>
            <div class="dot">腾旭<span>（市场经理：马化腾）</span></div>
            <div class="dot">网易<span>（市场经理：丁磊）</span></div>
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
            <div class="value">雷军</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">负责部门：</div>
            <div class="value">北方业务一部</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前市场经理：</div>
            <div class="value">王俊辉</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">前所属部门：</div>
            <div class="value">DIPS产品中心</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">创建时间：</div>
            <div class="value">2019-01-01  09:00</div>
          </el-col>
          <el-col :span=12 class="item">
            <div class="label">更新于：</div>
            <div class="value">2019-01-15  14:00</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      formData: {
        xiangmu: [
          { name: '浙江省重大项目建设项目', money: '20W'},
          { name: '浙江省重大项目建设项目', money: '20W'},
          { name: '浙江省重大项目建设项目', money: '20W'},
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.info {
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
        margin-right: 10px;
      }
      .dot:first-child {
        padding-left: 0;
      }
      .dot:last-child {
        border: 0;
      }
    }
  }
}
</style>
