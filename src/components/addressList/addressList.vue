<template>
  <div class="wrap">
    <el-container direction='vertical'>
      <el-header class="head">
        <div class="left">
        	<i class="icon-user-plus" aria-hidden="true" @click="hidefoot"></i>
        </div>
        <div class="center" >通讯录</div>
        <div class="right">
        	<i class="el-icon-search" aria-hidden="true" @click="openSearch"></i>
        </div>
      </el-header>
      <el-main>
        <div class="content" id="content">
          <div class="scrollDiv" >
            <yd-cell-group  v-for="item in addresslist" :title="item.letter" :id="item.letter" :ref="item.letter" v-bind:key=item.letter  style="padding: 0;margin: 0" >
              <yd-cell-item v-for="i in item.data" v-bind:key="i.id"  style="padding: 10px 0 10px 5px" >
                <img slot="left" :src="i.avatar" width="30" height="30" style="border-radius: 15px" v-if="i.avatar">
                <span slot="left" class="default" width="30" height="30" v-show="!i.avatar">{{!i.nickname?i.name.slice(0,1):i.nickname.slice(0,1)}}</span>
                <div slot="left" style="margin: 10px;justify-content: flex-start;width: 10rem;" @click="sendToParent(i)">
                  <p class="name">{{i.nickname}}</p>
                  <p class="mailtitle">{{!i.nickname?i.name:''}}</p>
                </div>
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
    <transition name="slide">
      <editAddress   :flag="true" ref="edit"  class="details"  @save="addList"></editAddress>
    </transition>
    <transition name="slideLeft">
      <addressDetails :item="details" v-if="showAddress" class="details"></addressDetails>
    </transition>
    <transition name="slideLeft">
    	<Search ref="search" :searchHander="toSearch">
    		<ul slot="result" class="resultList">
          <li v-for="(item, index) in target" v-bind:key="index" @click="sendToParent(item)">
    			  <p>{{item.nickname}}</p>
            <p> {{item.name}}</p>
    		  </li>
          <li v-show="noNum">无匹配联系人</li>
        </ul>
    	</Search>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import scroll from '../scroll'
import util from './util.js'
import {Container} from 'element-ui'
import Details from '../details/details'
import editAddress from '../editAddress/editAddress'
import store from '../vuex/store.js'
import addressDetails from '../addressDetails/addressDetails'
import Search from '../search/search'

Vue.use(Vueaxios, axios)
Vue.use(Container)
export default {
  data () {
    return {
      addresslist: [],
      fullHeight: document.documentElement.clientHeight,
      showLetter: false,
      showLetterList: true,
      showAddress: false,
      letter: '',
      details: {},
      Letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      panelShow: false,
      search: true,
      target: [],
      noNum: false
    }
  },
  store,
  mounted () {
    this.initData()
  },
  methods: {
    requestData () {
      let LocalAPI = 'static/data.json'
      axios.get(LocalAPI).then((res) => {
        this.$store.commit('addressList', res.data.addresslist)
        this.addresslist = util.pySort(res.data.addresslist)
      }, (err) => {
        alert(err)
      })
    },
    initData () {
      var address = this.$store.state.addressList
      if (address.length > 0) {
        this.addresslist = util.pySort(address)
      } else {
        this.requestData()
      }
    },
    jumper (key) {
      if (key === '#') {
        $('#content').animate({
          scrollTop: 0
        }, 100)
      } else {
        this.letter = key
        var el = document.getElementById(key)
        if (el) {
          var scrollPosition = el.offsetTop
          $('#content').animate({
            scrollTop: scrollPosition
          }, 100)
        }
      }
    },
    sendToParent (item) {
      this.details = item
      this.$emit('ifshow')
      this.showAddress = true
      this.$refs.search.cancel()
    },
    hidefoot () {
      this.$refs.edit.show()
      this.$emit('ifshow')
    },
    addList (item) {
      this.initData()
    },
    openSearch () {
      this.target = []
    	this.$refs.search.open()
    },
    toSearch (e) {
    	var value = this.$refs.search.value
      var list = this.$store.state.addressList
      this.target = []
      console.log(value)
    	if (value !== undefined && value != '') {
    		for (var  i= 0; i< list.length; i++) {
    			if (list[i].name != undefined && list[i].name.indexOf(value) !== -1) {
    				console.log(1)
    				this.target.push(list[i])
          }
          else if (list[i].nickname != undefined && list[i].nickname.indexOf(value) !== -1) {
    				console.log(2)
    				this.target.push(list[i])
          }
    		}
    	}
    	if (this.target.length === 0 && value != '') {
        this.noNum = true
      } else {
        this.noNum = false
      }
    }
  },
  components: {
    'scroll': scroll,
    'Details': Details,
    'editAddress': editAddress,
    'addressDetails': addressDetails,
    'Search': Search
  }
}
</script>

<style rel="stylesheet" lang="less" scoped>
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
  padding: 15px 0;
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
  top: 5px;
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
  font-size: 0.6rem;
}
.messages {
  display: inline-block;
  vertical-align: middle;
}
.letterList {
  position: fixed;
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
  font-size: 0.75rem;
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
</style>
