<template>
  <div class="wrap">
    <div class="head">
      <div class="left">
        <div class="bars" @click="show = !show;send()"><i class="icon-bars icon" aria-hidden="true"></i></div>
        <div class="title"><span class="type">{{type}}</span><span class="user">{{info.user.name}}</span></div>
      </div>
      <div class="right">
        <div class="first">
          <i class="icon-filter " aria-hidden="true"></i>
          <i class="icon-search" aria-hidden="true"></i>
          <i class="icon-plus" aria-hidden="true"></i>
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
            <li @click="check($event,item.id);show = !show;send()"  v-for="(item, index) in typelist" :key="item.id" :class="checked == index? 'active':''"><i class="fa" :class="item.iconClass" ></i><span >{{item.text}}</span></li>
          </ul>
        </div>
      </transition>
      <keep-alive>
        <emailList :id="getId"></emailList>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import emailList from '../emailList/emailList'

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
      id: '0'
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
    }
  }
}
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
    padding: 8px;
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
    font-size: 0.35rem;
  }
  .title .user {
    color: #696969;
    font-size: 0.83rem;
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
    font-size: 14px;
  }
  .content {
    position: absolute;
    /*height: 100%;*/
    top:2.5rem;
    width: 100%;
    bottom: 2.5rem;
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
    top:2.5rem;
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
  }
  .items li span {
    display: inline-block;
    width: 70%;
    font-size: 14px;
  }
  .dividing {
    width: 100%;
    height: 10px;
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
</style>
