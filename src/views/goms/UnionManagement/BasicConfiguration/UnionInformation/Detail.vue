<template>
  <div>
    <basic-container>
      <page-header title="组织基本信息">
        <template>
          <el-button class="modify" size="small" @click="handleEdit">修改</el-button>
        </template>
      </page-header>
      <div class="org-detail-wrapper">
        <div class="content">
          <div class="top">
            <div class="img-wrapper">
              <iep-img :src="form.logo" slot="cover"></iep-img>
            </div>
            <div class="info-wrapper">
              <div class="title">国脉互联</div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">创建人：</label>
                  <span class="value">{{form.creator}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">成立时间：</label>
                  <span class="value">{{form.establishTime}}</span>
                </div>
              </div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">联系方式：</label>
                  <span class="value">{{form.contactMethod}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">官网：</label>
                  <span class="value">http://www.abidu.cim</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">官微：</label>
                  <span class="value">@国脉集团</span>
                </div>
              </div>
            </div>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              组织简介
            </div>
            <p>{{form.intro}}</p>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              组织架构
            </div>
            <p>{{form.orgStructure}}</p>
          </div>
          <a-divider dashed />
          <div class="bottom">
            <div class="title">
              核心优势
            </div>
            <p>{{form.coreAdvantage}}</p>
          </div>
        </div>
        <a-divider />
        <div class="content"></div>
        <div class="content"></div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getOrgById, putOrg } from '@/api/goms/org'
import { initOrgForm } from './options'
import { mergeByFirst } from '@/util/util'
export default {
  data () {
    return {
      form: initOrgForm(),
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit () {
      this.$emit('onEdit', {
        formRequestFn: putOrg,
        row: this.form,
      })
    },
    loadPage () {
      getOrgById(this.orgId).then(({ data }) => {
        this.form = mergeByFirst(initOrgForm(), data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.org-detail-wrapper {
  margin: 0 20px;
  .content {
    margin-bottom: 20px;
    .top {
      display: flex;
      .img-wrapper {
        width: 250px;
        height: 150px;
        border: 1px solid #eee;
        padding: 5px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .info-wrapper {
        margin-left: 20px;
        padding: 10px;
        .title {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .col {
          display: flex;
          font-size: 16px;
          .form-item-wrapper {
            padding: 10px 0;
            margin-right: 10px;
          }
        }
      }
    }
    .bottom {
      padding: 20px;
      .title {
        font-size: 20px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
