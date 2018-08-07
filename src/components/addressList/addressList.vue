<template>
  <div class="wrap">
    <el-container direction='vertical'>
      <el-header class="head">
        <div class="left"><i class="icon-user-plus" aria-hidden="true"></i></div>
        <div class="center">通讯录</div>
        <div class="right"><i class="el-icon-search" aria-hidden="true"></i></div>
      </el-header>
      <el-main>
        <div class="content">
          <div class="scrollDiv" id="content">
            <yd-cell-group  v-for="item in addresslist" :title="item.letter" :id="item.letter" :ref="item.letter" v-bind:key=item.letter  style="padding: 0;margin: 0">
              <yd-cell-item v-for="i in item.data" v-bind:key="i.id" style="padding: 10px 0 10px 5px">
                <img slot="left" :src="i.avatar" width="30" height="30" style="border-radius: 15px" v-if="i.avatar">
                <span slot="left" class="default" width="30" height="30" v-show="!i.avatar">{{!i.nickname?i.name.slice(0,1):i.nickname.slice(0,1)}}</span>
                <span slot="left" style="margin: 10px">
                  <p class="name">{{i.nickname}}</p>
                  <p class="mailtitle">{{!i.nickname?i.name:''}}</p>
                </span>
              </yd-cell-item>
            </yd-cell-group>
            <div v-if="showLetter" class="centerLetter"><strong>{{letter}}</strong></div>
            <div class="letterList" v-if="showLetterList">
              <a v-for="item in addresslist"  style="display: block;font-size: 14px;margin-top: 1px" v-bind:key="item.letter"  @click="jumper(item.letter)"><span>{{item.letter}}</span></a>
            </div>
          </div>
        </div>
      </el-main>
  </el-container>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import scroll from '../scroll'
import util from './util.js'
import {Container} from 'element-ui'
Vue.use(Vueaxios, axios)
Vue.use(Container)
export default {
  data () {
    return {
      addresslist: [],
      fullHeight: document.documentElement.clientHeight,
      showLetter: false,
      showLetterList: true,
      letter: '',
      Letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      panelShow: false
    }
  },
  created () {
    let LocalAPI = 'static/data.json'
    axios.get(LocalAPI).then((res) => {
      // this.addresslist = res.data.addresslist
      this.addresslist = util.pySort(res.data.addresslist)
      console.log(this.addresslist)
    }, (err) => {
      alert(err)
    })
  },
  methods: {
    jumper (key) {
      if (key === '#') {
        $('#content').animate({
          scrollTop: 0
        }, 100)
      } else {
        this.letter = key
        var _this = this
        // 点击侧边字母后屏幕中间的字母也显示,500毫秒隐藏
        if (this.showLetter === false) {
          this.showLetter = true
          setTimeout(function () {
            _this.showLetter = false
          }, 500)
        } else {
          this.showLetter = false
        }
        var el = document.getElementById(key)
        if (el) {
          var scrollPosition = el.offsetTop
          $('#content').animate({
            scrollTop: scrollPosition
          }, 100)
        }
      }
    }
  },
  components: {
    'scroll': scroll
  }
}
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
  flex: 1;
  padding: 10px 0;
  position: sticky;
  top:0;
  z-index: 200;
  background: #fff;
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
.head div {
  flex: 1;
  text-align: center;
  color: #696969;
  font-size: 0.8rem;
}
.head .left {
  text-align: left;
  margin-left: 10px;
}
.head .right {
  text-align: right;
  margin-right: 10px;
}
.content {
  position: absolute;
  width: 100%;
  overflow-y: auto;
  top: 42px;
  bottom: 0;
}
.scrollDiv {
  width: 100%;
}
.list li{
  padding: 10px 5px;
  position: relative;
}
.list li:not(:last-child):after {
  display: block;
  content: "";
  position: absolute;
  bottom: -1px;
  width: 86%;
  height: 0;
  right:0;
  border-bottom: 1px solid #CCC;
}
@media screen and (min-width: 410px) and (max-width: 760px){
  .list li:not(:last-child):after {
    width: 90%;
  }
 }
 @media screen and (min-width: 760px){
  .list li:not(:last-child):after {
    width: 95%;
  }
 }
.avatar {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.default {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 32px;
}
.messages {
  display: inline-block;
  vertical-align: middle;
}
.letterList {
  position: absolute;
  top: 50%;
  right: 0;
  transition: translateY(-50%);
  z-index: 999;
}
.letterList a {
  margin-top: 5px;
}
.yd-cell-item > div {
  margin: 10px;
}
.name, .mailtitle{
  font-size: 0.6rem;
}
</style>
