<template>
  <div class="wrap">
    <div class="head">
      <div class="left">
        <div class="bars" @click="show = !show;send()"><i class="icon-bars icon" aria-hidden="true"></i></div>
        <div class="title"><span class="type">{{type}}</span><span class="user">{{info.user.name}}</span></div>
      </div>
      <div class="right">
        <div class="first">
          <i class="icon-filter1 " aria-hidden="true" @click="filter" :class="{active: !emailListshow}"></i>
          <i class="icon-search" aria-hidden="true" @click="toSearch"></i>
          <i class="icon-plus" aria-hidden="true" @click="showWrite"></i>
          <div class="popwindow" v-if="popupVisible">
            <div class="pop">
              <ul class="editList">
                <li><i class="icon-quill"></i>写邮件</li>
                <li><i class="icon-check-circle"></i>新建待办</li>
                <li><i class="icon-maximize"></i>扫一扫</li>
              </ul>
            </div>
            <div class="popcover" @click="showWrite"></div>
          </div>
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
            <li @click="check($event,item.id);show = !show;send()"  v-for="(item, index) in typelist" :key="item.id" :class="selected == index? 'active':''"><i :class="item.iconClass" ></i><span >{{item.text}}</span></li>
          </ul>
        </div>
      </transition>
      <keep-alive>
        <emailList :emails="targetItem" v-if="emailListshow"></emailList>
      </keep-alive>
      <transition>
        <filt ref="filt"></filt>
      </transition>
    </div>
    <transition name="slideLeft">
      <Search ref="search" :searchHander="getSearch">
        <div slot="result">
          <div class="options">
            <span :class="{active: checked}" @click="changeOption(1)">所有收件</span>
            <span :class="{active: !checked}" @click="changeOption(0)">所有发件</span>
          </div>
          <ul class="resultList">
            <li v-for="(item, index) in target" v-bind:key="index" @click="showDetails(item)">
              <p>{{item.title}}</p>
              <p>{{item.content}}</p>
            </li>
            <li v-show="noNum">没有找到</li>
          </ul>
        </div>
      </Search>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import emailList from '../emailList/emailList'
import { Popup } from 'mint-ui'
import Search from '../search/search'
import store from '../vuex/store.js'
import filt from '../filter/filter'

Vue.component(Popup.name, Popup)
Vue.use(Vueaxios, axios)
export default {
  props: {
    info: Object
  },
  data () {
    return {
      show: false,
      selected: 0,
      typelist: null,
      type: '收件箱',
      id: '0',
      popupVisible: false,
      target: [],
      noNum: false,
      checked: true,
      emailListshow: true,
      targetItem: []
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
  store,
  mounted () {
    this.getMails()
  },
  computed: {
  },
  components: {
    'emailList': emailList,
    'Search': Search,
    'filt': filt
  },
  methods: {
    getMails () {
      if (this.$store.state.receptList.length === 0) {
        let LocalAPI = 'static/data.json'
        axios.get(LocalAPI).then((res) => {
          this.$store.commit('receptList', res.data.email.recept)
          this.$store.commit('sendList', res.data.email.send)
          this.getData()
        }, (err) => {
          alert(err)
        })
      } else {
         this.getData()
      }
    },
    check (e, id) {
      if (this.id === id) {
        return
      }
      var dom = e.currentTarget
      var others = dom.parentNode.getElementsByTagName('li')
      for (var i = 0; i < others.length; i++) {
        if (dom === others[i]) {
          this.selected = i
        }
        others[i].classList.remove('active')
      }
      dom.classList.add('active')
      this.type = dom.innerText
      this.id = id
      this.getMails()
    },
    getData () {
      var id = this.id
      this.targetItem = []
      if (id === '0') {
          this.targetItem = this.$store.state.receptList
        } else if (id === '3') {
          this.targetItem = this.$store.state.sendList
        } else {
          let data = this.$store.state.receptList
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === id) {
              this.targetItem.push(data[i])
            }
          }
        }
    },
    send () {
      this.$emit('ifshow')
    },
    showWrite () {
      this.popupVisible = !this.popupVisible
      this.$root.eventHub.$emit('ifshow')
    },
    toSearch () {
      this.target = []
      this.$refs.search.open()
    },
    getSearch () {
      var value = this.$refs.search.value
      var list
      if (this.checked) {
        list = this.$store.state.receptList
      }
      else {
        list = this.$store.state.sendList
      }
      this.target = []
    	if (value !== undefined && value != '') {
    		for (var  i= 0; i< list.length; i++) {
    			if (list[i].content != undefined && list[i].content.indexOf(value) !== -1) {
    				this.target.push(list[i])
          }
          else if (list[i].title != undefined && list[i].title.indexOf(value) !== -1) {
    				this.target.push(list[i])
          }
    		}
    	}
    	if (this.target.length === 0 && value != '') {
        this.noNum = true
      } else {
        this.noNum = false
      }
    },
    showDetails (item) {
      this.$root.eventHub.$emit('showDetails', item)
      this.$refs.search.cancel()
    },
    changeOption (flag) {
      if (flag == this.checked) {
        return
      }
      this.checked = !this.checked
      this.getSearch()
    },
    filter () {
      this.emailListshow = !this.emailListshow
      this.$refs.filt.open()
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
    box-sizing:  border-box;
    padding: 8px;
  }
  .right i {
    display: inline-block;
    flex: 1;
    padding: 10px;
    color: #696969;
    vertical-align: middle;
    font-size: 0.77rem;
  }
  .right i.active {
    background: #1E90FF;
    color: #fff;
    border-radius: 4px;
  }
  .content {
    position: absolute;
    /*height: 100%;*/
    top:4px;
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
.options {
  width: 100%;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  padding: 10px;
  color: #1E90FF;
  span {
    flex: 1;
    text-align: center;
    padding: 10px;
    border: 1px solid #1E90FF;
  }
  span:last-child {
    border-left: none;
  }
  span.active {
    background-color: #1E90FF;
    color: #fff;
  }
}
.resultList {
  width: 100%;
  li {
    width: 100%;
    padding: 10px 15px;
    font-size: 0.7rem;
    border-bottom: 1px solid #eee;
    color: #555;
  }
}


//自定义弹框
.popcover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  z-index: 2;
}
  .pop {
    position: absolute;
    padding: 10px;
    background: #fff;
    z-index: 3;
    right: 20px;
    border-radius: 5px;
    font-size: 0.7rem;
    .editList li {
      padding: 5px;
      border-bottom: 1px solid #eee;
    }
    .editList li:last-child {
      border-bottom: none;
    }
  }
</style>
