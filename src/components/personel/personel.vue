<template>
  <div class="wrap">
    <div class="head">
      <div class="center">我</div>
    </div>
    <div class="content">imagenation</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style rel="stylesheet" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  }
.head {
  display: flex;
  width: 100%;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  padding: 10px 0;
  }
.head::after {
  display:block;
  position:absolute;
  left:0;
  bottom: 0;
  width:100%;
  border-top:1px solid #DCDCDC;
  content:' ';
  }
  .head .center {
    flex: 1;
    text-align: center;
  }
  .content {
    position: absolute;
    top: 50px;
  }
</style>
