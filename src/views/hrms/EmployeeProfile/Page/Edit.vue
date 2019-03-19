<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="员工信息管理"></page-header>
      <el-form ref="form" :model="form" label-width="140px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 员工信息
            </template>
            <div class="baseMsg">
              <div class="littleTitle">基础信息</div>
              <el-form-item label="用户名：" class="form-half">
                <span>admin</span>
              </el-form-item>
              <el-form-item label="姓名：" class="form-half">
                <span>张三</span>
              </el-form-item>
              <el-form-item label="所属组织：" class="form-half">
                <span>舟山国脉海洋有限公司</span>
              </el-form-item>
              <el-form-item label="工号：" class="form-half">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
              <el-form-item label="头像：">
                <el-input v-model="form.avatar"></el-input>
              </el-form-item>
              <el-form-item label="角色：" class="form-half">
                <span>行政人员</span>
              </el-form-item>
              <el-form-item label="资产所属公司：" class="form-half">
                <span>浙江海洋信息技术有限公司</span>
              </el-form-item>
              <el-form-item label="岗位：" class="form-half">
                <el-select v-model="form.health">
                  <el-option label="岗位1" value="岗位1"></el-option>
                  <el-option label="岗位1" value="岗位1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="对外头衔：" class="form-half">
                <el-input v-model="form.actor"></el-input>
              </el-form-item>
              <el-form-item label="岗位职责：">
                <el-input v-model="form.task"></el-input>
              </el-form-item>
              <el-form-item label="职务：" class="form-half">
                <el-select v-model="form.position">
                  <el-option label="职务1" value="职务1"></el-option>
                  <el-option label="职务1" value="职务1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职称：" class="form-half">
                <el-select v-model="form.title">
                  <el-option label="职称1" value="职称1"></el-option>
                  <el-option label="职称1" value="职称1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入职时间：" class="form-half">
                <el-input v-model="form.goTime"></el-input>
              </el-form-item>
              <el-form-item label="转正时间：" class="form-half">
                <el-input v-model="form.time"></el-input>
              </el-form-item>
              <el-form-item label="员工状态：" class="form-half">
                <el-input v-model="form.goTime"></el-input>
              </el-form-item>
              <el-form-item label="所属部门：" class="form-half">
                <el-select v-model="form.title">
                  <el-option label="所属部门1" value="所属部门1"></el-option>
                  <el-option label="所属部门1" value="所属部门1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生年月：" class="form-half">
                <el-input v-model="form.birthday"></el-input>
              </el-form-item>
              <el-form-item label="性别：" class="form-half">
                <el-select v-model="form.sex">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="民族：" class="form-half">
                <el-input v-model="form.national"></el-input>
              </el-form-item>
              <el-form-item label="政治面貌：" class="form-half">
                <el-input v-model="form.face"></el-input>
              </el-form-item>
              <el-form-item label="婚姻状况：" class="form-half">
                <el-select v-model="form.married">
                  <el-option label="未婚" value="未婚"></el-option>
                  <el-option label="已婚" value="已婚"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生育状况：" class="form-half">
                <el-select v-model="form.fertility">
                  <el-option label="未生育" value="未生育"></el-option>
                  <el-option label="生育" value="生育"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="外语水平：" class="form-half">
                <el-select v-model="form.english">
                  <el-option label="良好" value="良好"></el-option>
                  <el-option label="一般" value="一般"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最高学历：" class="form-half">
                <el-select v-model="form.educational">
                  <el-option label="专科" value="专科"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="硕士" value="硕士"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="毕业学校：" class="form-half">
                <el-input v-model="form.school"></el-input>
              </el-form-item>
              <el-form-item label="专业：" class="form-half">
                <el-input v-model="form.professional"></el-input>
              </el-form-item>
              <el-form-item label="毕业时间：" class="form-half">
                <el-input v-model="form.professional"></el-input>
              </el-form-item>
              <el-form-item label="推荐人：" class="form-half">
                <el-input v-model="form.people"></el-input>
              </el-form-item>
              <el-form-item label="外部头衔：" class="form-half">
                <el-input v-model="form.people"></el-input>
              </el-form-item>
              <el-form-item label="添加师父：">
                <el-input v-model="form.people"></el-input>
              </el-form-item>
              <el-form-item label="卓越标签：">
                <el-input v-model="form.people"></el-input>
              </el-form-item>
              <el-form-item label="专业标签：">
                <el-input v-model="form.people"></el-input>
              </el-form-item>
              <el-form-item label="进步标签：">
                <el-input v-model="form.people"></el-input>
              </el-form-item>
              <el-form-item label="" class="form-half">
                <el-input placeholder="">
                  <template slot="append">添加</template>
                </el-input>
              </el-form-item>
              <el-form-item label="职业规划：">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="工作经历：">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="学习情况：">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="培训情况：">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="资质证书：">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </div>
            <div class="connectMsg">
              <div class="littleTitle">联系信息</div>
              <el-form-item label="户口类型：" class="form-half">
                <el-select v-model="form.type">
                  <el-option label="城镇" value="城镇"></el-option>
                  <el-option label="农村" value="农村"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="户籍地址：">
                <el-select v-model="form.type" class="inlines padding" placeholder="所在省">
                  <el-option label="城镇" value="城镇"></el-option>
                  <el-option label="农村" value="农村"></el-option>
                </el-select>
                <el-select v-model="form.type" class="inlines padding" placeholder="所在市">
                  <el-option label="城镇" value="城镇"></el-option>
                  <el-option label="农村" value="农村"></el-option>
                </el-select>
                <el-input v-model="form.desc" class="inlineblock" placeholder="请出入户籍详细地址"></el-input>
              </el-form-item>
              <el-form-item label="现住地址：">
                <el-select v-model="form.type" class="inlines padding" placeholder="所在省">
                  <el-option label="城镇" value="城镇"></el-option>
                  <el-option label="农村" value="农村"></el-option>
                </el-select>
                <el-select v-model="form.type" class="inlines padding" placeholder="所在市">
                  <el-option label="城镇" value="城镇"></el-option>
                  <el-option label="农村" value="农村"></el-option>
                </el-select>
                <el-input v-model="form.desc" class="inlineblock" placeholder="请输入住址详细地址"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码：" class="form-half">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>

              <el-form-item label="联系电话：" class="form-half">
                <el-select v-model="form.type">
                  <el-option label="111" value="111"></el-option>
                  <el-option label="222" value="222"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="微信：" class="form-half">
                <el-select v-model="form.wechat">
                  <el-option label="111" value="111"></el-option>
                  <el-option label="222" value="222"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="QQ：" class="form-half">
                <el-select v-model="form.qq">
                  <el-option label="111" value="111"></el-option>
                  <el-option label="222" value="222"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="邮箱：" class="form-half">
                <el-select v-model="form.emial">
                  <el-option label="111" value="111"></el-option>
                  <el-option label="222" value="222"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个人主页：" class="form-half">
                <el-select v-model="form.home">
                  <el-option label="111" value="111"></el-option>
                  <el-option label="222" value="222"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="应急联系人：" class="form-half">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="应急联系人电话：" class="form-half">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-button type="danger">保存</el-button>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="劳动合同" name="2">
            <el-input type="textarea"></el-input>
          </el-collapse-item>
          <el-collapse-item title="社保福利" name="3">
            <el-input type="textarea"></el-input>
          </el-collapse-item>
          <el-collapse-item title="调动情况" name="4">
            <el-input type="textarea"></el-input>
          </el-collapse-item>
          <el-collapse-item title="离职信息" name="5">
            <el-input type="textarea"></el-input>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <!-- fixed footer toolbar -->
      <footer-tool-bar>
        <iep-button @click="handleGoBack">返回</iep-button>
        <iep-button type="primary">提交</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import FooterToolBar from '@/components/FooterToolbar'
export default {
  components: { FooterToolBar },
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      form: {
        name: '',
        sex: '',
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
</style>

<style lang="scss" scoped>
.edit-wrapper {
  .form-half {
    width: 50%;
    display: inline-block;
  }

  .edit-card {
    .title {
      font-weight: 600;
    }
  }
  .inlines {
    width: 22% !important;
    box-sizing: border-box;
  }
  .padding {
    padding-right: 10px;
  }
  .inlineblock {
    width: 56%;
  }
}
.littleTitle {
  font-size: 16px;
  font-family: "微软雅黑";
  padding-bottom: 20px;
}
</style>
