<template>
  <div class="wrap">
    <div class="head">
      <div class="left">
        <div class="bars" @click="show = !show;send()"><i class="icon-bars icon" aria-hidden="true"></i></div>
        <div class="title"><span class="type">{{type}}</span><span class="user">{{info.user.name}}</span></div>
      </div>
      <div class="right">
        <div class="first">
          <!-- <i class="icon-filter " aria-hidden="true"></i> -->
          <i class="icon-search" aria-hidden="true"></i>
          <i class="icon-plus" aria-hidden="true" ></i>
          <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
            <div class="popbox">
              <ul>
                <li>写邮件</li>
                <li>新建代办</li>
                <li>扫一扫</li>
              </ul>
            </div>
          </mt-popup>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="left-wrap" v-if="show" @click="show = !show;send()">
        <div class="cover"></div>
      </div>
    </transition>
    <div class="content">
      <transition name="slide">
        <div class="left-bars" v-if="show">
          <ul class="items">
            <li><i class="icon-user-circle-o" aria-hidden="true"></i><span>1q1502316689@163.com</span></li>
            <li><i class="icon-plus" aria-hidden="true"></i><span>添加邮箱</span></li>
          </ul>
          <div class="dividing"></div>
          <ul class="items" id="typelist">
            <li @click="check($event,item.id);show = !show;send()"  v-for="(item, index) in typelist" :key="item.id" :class="checked == index? 'active':''"><i :class="item.iconClass" ></i><span >{{item.text}}</span></li>
          </ul>
        </div>
      </transition>
      <keep-alive>
        <emailList :id="getId" @showDetails="get"></emailList>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import emailList from '../emailList/emailList'
import { Popup } from 'mint-ui'

Vue.component(Popup.name, Popup)
Vue.use(Vueaxios, axios)
export default {
  props: {
    info: Object
  },
  data () {
    return {
      show: false,
      checked: 0,
      typelist: null,
      type: '收件箱',
      id: '0',
      popupVisible: false
    }
  },
  created () {
    let LocalAPI = 'static/type.json'
    axios.get(LocalAPI).then((res) => {
      // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
      this.typelist = res.data.type
    }, (err) => {
      alert(err)
    })
  },
  computed: {
    getId () {
      return this.id
    }
  },
  components: {
    'emailList': emailList
  },
  methods: {
    check (e, id) {
      if (this.id === id) {
        return
      }
      var dom = e.currentTarget
      var others = dom.parentNode.getElementsByTagName('li')
      for (var i = 0; i < others.length; i++) {
        if (dom === others[i]) {
          this.checked = i
        }
        others[i].classList.remove('active')
      }
      dom.classList.add('active')
      this.type = dom.innerText
      this.id = id
    },
    send () {
      this.$emit('ifshow')
    },
    get (item) {
      this.$emit('showDetails', item)
    },
    showWrite () {
      this.popupVisible = true
      this.$root.eventHub.$emit('showcover')
    }
  }
}
</script>

<style rel="stylesheet" lang="less" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 46px;
  }
  .head {
    display: flex;
    width: 100%;
    position: fixed;
    height: 52px;
    background-color: #fff;
    z-index: 200;
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
  .left {
    flex: 1;
    padding: 10px;
  }
  .bars {
    margin-right: 5px;
    vertical-align: middle;
  }
  .icon {
   display: block;
  }
  .left > div {
   display: inline-block;
  }
  .title {
    vertical-align: middle;
  }
  .title span {
   display: block;
  }
  .title .type {
    color: #000;
    font-size: 0.7rem;
  }
  .title .user {
    color: #696969;
    font-size: 0.6rem;
  }
  .right {
    display: flex;
  }
  .right i {
    display: inline-block;
    flex: 1;
    padding: 10px;
    color: #696969;
    vertical-align: middle;
    font-size: 0.77rem;
  }
  .content {
    position: absolute;
    /*height: 100%;*/
    top:52px;
    width: 100%;
    bottom: 46px;
  }
  .left-wrap {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .cover {
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
  }
  .left-bars {
    position: fixed;
    top:41px;
    left: 0;
    width: 80%;
    height: 100%;
    z-index: 106;
    background-color: #fff;
    box-shadow: 10px 0 5px 0 rgba(0,0,0,0.3);
  }
  .items li {
    padding: 15px;
    /*border-bottom: 1px solid #696969;*/
    position: relative;
  }
  .items li.active {
    background-color: #1E90FF;
    color: #fff;
  }
  .items li.active i {
    color: #fff;
  }
  .items li:not(:last-child):after {
    display: block;
    content: "";
    position: absolute;
    bottom: -1px;
    width: 85%;
    height: 0;
    right:0;
    border-bottom: 1px solid #CCC;
  }
  @media screen and (min-width: 420px) {
    .items li:after {
    width: 90%;
   }
  }
  .items i {
    display: inline-block;
    margin-right: 5%;
    margin-left: 2%;
    color: #696969;
    font-size: 0.6rem;
  }
  .items li span {
    display: inline-block;
    width: 70%;
    font-size: 0.6rem;
  }
  .dividing {
    width: 100%;
    height: 0.43rem;
    background-color: #EAEAEA;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }
  .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-100%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .popbox {
    padding: 10px;
    width: 100px;
    background: #fff;
    z-index: 1000;
    li {
      padding: 5px;
    }
  }
</style>
