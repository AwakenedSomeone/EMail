<template>
  <div>
    <div class="headIcon" :style="{ backgroundColor: color ? color : '#fff'}">
      <div class="line">
        <i class="leftIcon" @click="back"></i>
        <slot name="headright" class="headright"></slot>
      </div>
      <div class="line">
        <slot name="headTitle"></slot>
      </div>
    </div>
    <slot name="content"></slot>
    <slot name="footer" class="setFoot"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    color: String
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style rel="stylesheet">
.headIcon {
  margin-bottom: 10px;
  padding: 0 10px 0 10px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}
.line {
  flex-basis: 100%;
  display: flex;
  margin-bottom: 10px;
}
.leftIcon {
  font-size: 0.9rem;
  display: inline-block;
  position: relative;
  flex:0 0 30px;
  width: 32px;
  height: 32px;
  padding-left: 10px;
  color: #565656;
}
.leftIcon:before {
  content: '';
  position: absolute;
  top: 50%;
  width:0.6rem;
  height: 0.6rem;
  border-left: solid 1px currentColor;
  border-top: solid 1px currentColor;
  -webkit-transform: rotate(-45deg) translateY(-50%);
          transform: rotate(-45deg) translateY(-50%);
}
</style>
