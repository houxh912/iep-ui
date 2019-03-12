<template>
  <div class="inbox">
    <div class="head">
      <page-header title="收件箱" class="title"></page-header>
      <iep-button size="small" @click="back">返回</iep-button>
    </div>
    <div class="info">
      <div class="title">关于近期国策数据库存量数据清洗的二期工作进度汇报</div>
      <el-tag type="info" class="tags">项目管理</el-tag>
      <el-tag type="info" class="tags">营商环境</el-tag>
      <el-tag type="info" class="tags">智慧城市</el-tag>
      <div class="msg">发件人：毛莹莹</div>
      <div class="msg">收件人：<span>何益挺</span>；<span>钟乙桥</span></div>
      <div class="msg">时 间：2019年2月22日 10：02</div>
    </div>
    <div class="content">
      <pre>
        2019年2月如何如何，这般这般

        一、群英会
    按时的按时的按时的按时
      </pre>
    </div>
    <div class="appendix">
      <h3>附件（3）</h3>
      <ul class="list">
        <li>
          <i class="icon-fujian"></i>DIPS产品工作进度说明（1）.xlsl <iep-button type="text">下载</iep-button><iep-button type="text">转存</iep-button>
        </li>
        <li>
          <i class="icon-fujian"></i>DIPS产品工作进度说明（2）.xlsl <iep-button type="text">下载</iep-button><iep-button type="text">转存</iep-button>
        </li>
      </ul>
      <iep-button type="text"><i class="icon-download1"></i> 全部下载</iep-button>
    </div>
    <div class="relation">
      <h3>关联（3）</h3>
      <div class="item">
        <div class="title">关联纪要：</div>
        <ul class="list">
          <li>2019一号工程-内网  20190107启动会</li>
          <li>2019一号工程-内网  20190107启动会</li>
        </ul>
      </div>
      <div class="item">
        <div class="title">关联报表：</div>
        <ul class="list">
          <li>
            <h5>报表1：研发中心项目进度表</h5>
            <el-table :data="tableData" border style="width: 80%">
              <el-table-column 
                v-for="(item, index) in reportTableOption"
                :key="index"
                :prop="item.prop"
                :label="item.label">
              </el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <iep-button type="danger" @click="back">返回</iep-button>
      <iep-button>回复</iep-button>
      <iep-button>回复全部</iep-button>
      <iep-button>转发</iep-button>
      <iep-button>删除</iep-button>
    </div>
    
  </div>
</template>

<script>
import { initFormData, reportTableOption } from './option'
import PageHeader from '@/components/Page/Header'

export default {
  components: { PageHeader },
  data () {
    return {
      formData: initFormData(),
      reportTableOption,
      tableData: [
        { name: '任务A', shuoming: '内网2.0前端页面制作', jindu: '60%', fuzeren: '张超', beizhu: '以人为本，数据赋能' },
      ],
    }
  },
  methods: {
    back () {
      this.$emit('backWeb', true)
    },
  },
}
</script>

<style lang="scss" scoped>
.inbox {
  .head {
    display: flex;
    .title {
      flex: 1;
      margin: 0;
    }
  }
  .info {
    background-color: #f6f6f6;
    padding: 25px 30px;
    margin-top: 20px;
    .title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .tags {
      margin-right: 10px;
      background-color: #fbfbfb;
      margin-bottom: 15px;
    }
    .msg {
      color: #666;
      margin-bottom: 15px;
    }
  }
  .content {
    line-height: 20px;
    border-bottom: 1px solid #eee;
    padding: 25px 30px;
  }
  .appendix {
    padding: 15px 30px;
    border-bottom: 1px solid #eee;
    h3 {
      font-size: 16px;
    }
    .list {
      li {
        font-size: 14px;
        i {
          margin-right: 10px;
        }
      }
    }
  }
  .relation {
    padding: 15px 30px;
    h3 {
      font-size: 16px;
    }
    .item {
      font-size: 14px;
      display: flex;
      .title {
        width: 80px;
      }
      .list {
        flex: 1;
        margin-bottom: 10px;
        li {
          line-height: 22px;
          h5 {
            margin: 0 0 5px;
            font-weight: 500;
            font-size: 14px;
          }
        }
      }
    }
  }
  .footer {
    padding: 25px 30px;
  }
}
</style>
