<template>
  <div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="drawer" :class="{inactive:!visible }">
      <slot name="drawer"></slot>
      <div class="setting-drawer-index-handle" @click="toggle">
        <a-icon type="setting" v-if="!visible" />
        <a-icon type="close" v-else />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepLayoutDrawerContainer',
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    },
  },
}
</script>
<style lang="scss" scoped>
.drawer {
  width: 300px;
  height: 100%;
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 102;
  transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  transition: all 0.5s;
  padding: 20px;
}

.inactive {
  right: -300px;
}
.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: $--color-primary;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;
  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
