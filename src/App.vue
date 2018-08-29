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
      <mailDetails :mailitem="mailitem" v-if="showDetails" class="details" @back="back"></mailDetails>
    </transition>
    <transition name="slideLeft">
      <addressDetails :item="addressitem" v-if="showAddress" class="details" @back="backforaddress"></addressDetails>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import {Icon} from 'element-ui'
import mailDetails from './components/mailDetails/mailDetails'
import addressDetails from './components/addressDetails/addressDetails'

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
    'mailDetails': mailDetails,
    'addressDetails': addressDetails
  }
}
</script>

<style lang="less" rel="stylesheet/less">
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
  background-color: rgba(232,232,232,0.9);
  &::before {
    display:block;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    border-top:1px solid #DCDCDC;
    content:' ';
  }
}
.tab-item {
  flex:1;
  text-align:center;
  a {
    display:block;
    font-size:0.65rem;
    padding: 5px 0;
    color:#808080;
  }
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
  overflow: hidden;
}
.slideLeft-enter-active, .slideLeft-leave-active {
    transition: all 0.4s ease-in-out;
  }
.slideLeft-enter, .slideLeft-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(100%);
}
.avatar {
  width: 24px;
  height: 24px;
  float: left;
  margin: 0 10px 0 10px;
}
</style>
