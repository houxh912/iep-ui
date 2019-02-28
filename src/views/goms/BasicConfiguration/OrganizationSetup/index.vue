<template>
  <div>
    <basic-container>
      <page-header title="组织设置"></page-header>
      <operation-container>
        <template slot="right">
          <el-button size="small">组织变更记录</el-button>
        </template>
      </operation-container>
      <div>
        <div>
          <el-button circle><i class="icon-diannaodenglu"></i><br>创建组织</el-button>
        </div>
        <div>
          <el-button circle><i class="icon-organ"></i><br>创建联盟</el-button>
        </div>
        <div>
          <el-button circle><i class="icon-chuangxinfuwu"></i><br>创建特殊组织</el-button>
        </div>
      </div>
      <div>
        <div>
          <div slot="header" class="clearfix">
            <span>组织升级</span>
          </div>
          <div class="text item">
            组织创建者可将组织下属的一个部门分离为独立组织，默认子组织仍属于此创建人；转让后，该组织与母组织自动形成联盟，且通用母组织的各功能模块的标准配置。
          </div>
          <el-button type="warning" plain>升级</el-button>
      </div>
      <div>
        <div slot="header" class="clearfix">
          <span>组织合并</span>
        </div>
        <div class="text item">
          联盟状态下，组织创建者可定向邀请联盟的兄弟组织进行合并；合并后的组织各项模块配置和文档均以发起组织为主，被合并组织的部分内容将被吞并。
        </div>
        <el-button type="warning" plain>合并</el-button>
      </div>
      <div>
        <div slot="header" class="clearfix">
          <span>组织转让</span>
        </div>
        <div class="text item">
          组织创建者可将组织装让给组织现有的管理员之一；转让后，创建者自动退出组织管理。
        </div>
        <el-button type="warning" plain>转让</el-button>
      </div>
      <div>
        <div slot="header" class="clearfix">
          <span>组织解散</span>
        </div>
        <div class="text item">
          组织创建者可解散组织；解散后，组织内的所有消息记录和成员信息都会删除，成员将无法进入，请谨慎操作。
        </div>
        <el-button type="warning" plain>解散</el-button>
      </div>
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

    }
  },
}
</script>
<style lang="scss" scoped>
</style>
