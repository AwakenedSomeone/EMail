<template>
  <div class="wrap">
    <div class="head">
      <div class="center">我</div>
    </div>
    <div class="content">
      <div class="section">
        <ul class="item">
          <li><i class="el-icon-message"></i><span>邮箱管理</span><i class="el-icon-arrow-right right"></i></li>
        </ul>
      </div>
      <div class="dividing"></div>
      <div class="section">
        <ul class="item">
          <li><i class="icon-user-circle-o"></i><span>发件人头像</span><i class="el-icon-arrow-right right"></i></li>
          <li><i class="el-icon-tickets"></i><span>发件人名称</span><i class="el-icon-arrow-right right"></i></li>
          <li><i class="el-icon-edit"></i><span>邮件签名</span><i class="el-icon-arrow-right right"></i></li>
        </ul>
      </div>
      <div class="dividing"></div>
      <div class="section">
        <ul class="item">
          <li><i class="el-icon-setting"></i><span>设置</span><i class="el-icon-arrow-right right"></i></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Icon} from 'element-ui'
Vue.use(Icon)

export default {}
</script>

<style rel="stylesheet" scoped>
.wrap {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 46px;
  }
.head {
  display: flex;
  width: 100%;
  position: fixed;
  height: 42px;
  line-height: 42px;
  background-color: #fff;
  z-index: 999;
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
    font-size: 0.8rem;
  }
  .content {
    position: absolute;
    top: 42px;
    width: 100%;
    bottom: 0;
  }
  .dividing {
    width: 100%;
    height: 0.43rem;
    background-color: #EAEAEA;
  }
  .item li {
    position: relative;
    padding:15px  10px;
    font-size: 0.7rem;
  }
  .item li i {
    color: #595959;
    display: inline-block;
    margin-right: 10px;
  }
  .item li:not(:last-child):after {
    display: block;
    content: "";
    position: absolute;
    bottom: -1px;
    width: 90%;
    height: 0;
    right:0;
    border-bottom: 1px solid #CCC;
  }
  .right {
    position: absolute;
    right: 0;
  }
</style>
