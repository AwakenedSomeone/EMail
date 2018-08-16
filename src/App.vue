<template>
  <div id="app">
    <keep-alive><!-- 使用keep-alive可以保存组件的状态，从其他组件返回时会回到离开之前组件的状态 -->
      <router-view :info="info" @ifshow="showFoot" @showDetails="getDetails" @showAddress="getAddress"></router-view>
    </keep-alive>
    <transition name="slideDown">
      <div class="foot-bar" v-if="show">
        <div class="tab-item"  @click="change(0)">
          <router-link to="/emails">
            <i class="icon" :class="isActive[0] ? 'icon-envelope-o':'icon-envelope'" aria-hidden="true"></i>邮件
          </router-link>
        </div>
        <div class="tab-item" @click="change(1)">
          <router-link to="/calendar">
            <i class="icon" :class="isActive[1] ? 'icon-calendar':'icon-calendar'" aria-hidden="true"></i>日历
          </router-link>
        </div>
        <div class="tab-item" @click="change(2)">
          <router-link to="/addresslist">
            <i class="icon" :class="isActive[2] ? 'icon-address-book-o':'icon-address-book'" aria-hidden="true"></i>通讯录
          </router-link>
        </div>
        <div class="tab-item"  @click="change(3)">
          <router-link to="/personel">
            <i class="icon" :class="isActive[3] ? 'icon-user-o':'icon-user'" aria-hidden="true"></i>我
          </router-link>
        </div>
      </div>
    </transition>
    <transition name="slideLeft">
      <Details v-if="showDetails" class="details" @back="back" :color="color">
        <div slot="headright" class="headright">
          <i class="icon-trash-o"></i>
          <i class="el-icon-arrow-up"></i>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="title" slot="headTitle">{{mailitem.title}}</div>
        <div slot="content">
          <div class="sender">
            <img :src="mailitem.avatar" class="avatar">
            <span class=""></span>
            <div class="sendmsg"><p><span v-if="mailitem.type != 3">{{mailitem.nickname}}</span><span v-if="mailitem.type == 3">我</span> {{mailitem.time}}</p><p>发送至<span v-if="mailitem.type != 3">我</span><span v-if="mailitem.type == 3">{{mailitem.nickname}}</span></p></div></div>
          <div class="detail_msg">{{mailitem.content}}</div>
        </div>
        <div slot="footer">
          <div class="reply">
            <span class="item_left"><input type="text" name="" placeholder="回复"></span>
            <span class="item_right">转发<i class="el-icon-share"></i></span>
          </div>
        </div>
      </Details>
    </transition>
    <transition name="slideLeft">
      <Details v-if="showAddress" class="details" @back="backforaddress">
        <div slot="headright" class="headright">编辑</div>
        <div slot="content">
          <div class="addressAvatar">
            <img :src="addressitem.avatar" alt="">
            <span class="default" width="30" height="30" v-show="!addressitem.avatar">{{!addressitem.nickname?addressitem.name.slice(0,1):addressitem.nickname.slice(0,1)}}</span>
          </div>
           <div class="text_center">{{addressitem.nickname}}</div>
          <div class="sendAndReply"><p><i class="el-icon-message icon bg"></i>发邮件</p><p><i class="el-icon-sort icon bg"></i>往来邮件</p></div>
          <div class="address">{{addressitem.name}}</div>
        </div>
      </Details>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import Details from './components/details/details'
import {Icon} from 'element-ui'

Vue.use(Vueaxios, axios, Icon)
export default {
  name: 'App',
  data () {
    return {
      isActive: [false, false, false, false],
      info: {},
      show: true,
      showDetails: false,
      mailitem: {},
      color: '#DCDCDC',
      showAddress: false,
      addressitem: {}
    }
  },
  created () {
    let LocalAPI = 'static/data.json'
    axios.get(LocalAPI).then((res) => {
      // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
      this.info = res.data
    }, (err) => {
      alert(err)
    })
  },
  methods: {
    change (index) {
      this.isActive[index] = true
      for (var i = 0; i < this.isActive.length; i++) {
        if (i !== index) {
          this.isActive[i] = false
        }
      }
    },
    showFoot () {
      this.show = !this.show
    },
    getDetails (item) {
      this.mailitem = item
      this.showDetails = true
    },
    getAddress (item, letter) {
      this.addressitem = item
      this.showAddress = true
    },
    back () {
      this.showDetails = false
    },
    backforaddress () {
      this.showAddress = false
    }
  },
  components: {
    'Details': Details
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin:0 auto;
  position: relative;
}
.foot-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 46px;
  display: flex;
  z-index: 999;
  background-color: rgba(232,232,232,0.9)
}
.foot-bar::before {
  display:block;
  position:absolute;
  left:0;
  top:0;
  width:100%;
  border-top:1px solid #DCDCDC;
  content:' ';
}
.tab-item {
  flex:1;
  text-align:center;
}
.tab-item a{
  display:block;
  font-size:0.65rem;
  padding: 5px 0;
  color:#808080;
}
.icon {
  display: block;
  color: #808080;
  margin-bottom: 2px;
  font-size:0.8rem;
}
.tab-item a.active,.tab-item a.active .icon{
  color: #1E90FF;
}
.slideDown-enter-active, .slideDown-leave-active {
    transition: all 0.3s ease;
  }
.slideDown-enter, .slideDown-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(100%);
}
.details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
}
.slideLeft-enter-active, .slideLeft-leave-active {
    transition: all 0.4s ease-in-out;
  }
.slideLeft-enter, .slideLeft-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(100%);
}
.title {
  margin-left: 15px;
  font-size: 0.75rem;
}
.sender {
  margin-top: 10px;
  overflow: hidden;
  position: sticky;
}
.avatar {
  width: 24px;
  height: 24px;
  float: left;
  margin: 0 10px 0 10px;
}
.sendmsg {
  overflow: hidden;
}
.detail_msg {
  margin: 20px;
  font-size: 0.75rem;
}
.reply {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: flex-end;
  line-height: 40px;
  border-top: 1px solid #ccc;
}
.item_left {
  flex: 1;
  padding-left: 10px;
}
.item_right {
  width: 60px;
  height: 40px;
/*  margin: 5px;*/
  padding-left: 5px;
  border-left: 1px solid #ccc;
  text-align: center;
}
.headright {
/*  flex: 1;*/
  display: flex;
  padding: 10px;
  font-size: 0.7rem;
  width: 100%;
  justify-content: flex-end;
}
.headright i {
  margin-left: 20px;
}
.addressAvatar {
  text-align: center;
  margin-bottom: 10px;
}
.text_center {
  text-align: center;
  font-size: 0.8rem;
  margin-bottom: 10px;
}
.sendAndReply {
  text-align: center;
  margin-bottom: 15px;
}
.sendAndReply > p {
  display: inline-block;
  margin-right: 15px;
  margin-left: 15px;
}
.bg {
  background: #ececec;
  color: #000;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 5px;
}
.address {
  text-align: center;
  font-size: 0.7rem;
  padding: 10px;
  margin:0 15px;
  border-bottom: 1px solid #dcdcdc;
}
.default {
  display: inline-block;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 42px;
}
</style>
