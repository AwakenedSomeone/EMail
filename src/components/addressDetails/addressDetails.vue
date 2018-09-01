<template>
  <div>
    <Details  @back="backforaddress" >
      <div slot="headright" class="headright" @click="show">编辑</div>
      <div slot="content">
        <div class="addressAvatar">
          <img :src="addressitem.avatar" alt="">
          <span class="default" v-show="!addressitem.avatar">{{!addressitem.nickname?addressitem.name.slice(0,1):addressitem.nickname.slice(0,1)}}</span>
        </div>
         <div class="text_center">
           <p>{{addressitem.nickname?addressitem.nickname:addressitem.name}}</p>
           <p v-if="addressitem.company" class="othermsg">{{addressitem.company}}</p>
           <p class="othermsg">
             <span v-if="addressitem.department">{{addressitem.department}}</span>
             <span v-if="addressitem.position">{{addressitem.position}}</span>
           </p>
         </div>
        <div class="sendAndReply"><p><i class="el-icon-message icon bg"></i>发邮件</p><p><i class="el-icon-sort icon bg"></i>往来邮件</p></div>
        <div class="address">邮箱：{{addressitem.name}}</div>
        <!-- <div class="address" v-if="otherItem.company">{{otherItem.company}}</div> -->
        <div class="address" v-if="addressitem.phone">电话：{{addressitem.phone}}</div>
        <div class="address" v-if="addressitem.local">地址：{{addressitem.local}}</div>
      </div>
    </Details>
    <transition name="slide">
      <keep-alive>
        <editAddress  :item="addressitem" ref="edit" @save="showedit" class="details"></editAddress>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import {Icon} from 'element-ui'
import Details from '../details/details'
import editAddress from '../editAddress/editAddress'
import store from '../vuex/store.js'

Vue.use(Icon)
export default {
  data () {
    return {
      showEdit: false,
      addressitem: this.item,
      otherItem: {
        'company': null,
        'department': null,
        'position': null,
        'phone': null,
        'local': null
      }
    }
  },
  props: {
    item: {}
  },
  store,
  methods: {
    backforaddress () {
      this.$parent.showAddress = false
      this.$parent.initData()
      this.$root.eventHub.$emit('ifshow')
    },
    show () {
      this.$refs.edit.show()
    },
    showedit (data) {
      this.updateData()
    },
    updateData () {
      var addressitem = this.$store.state.addressList
      for (var i = 0; i < addressitem.length; i++) {
        if (addressitem[i].id == this.item.id) {
          this.addressitem = addressitem[i]
        }
      }
      if (addressitem > 0) {
        console.log(1)
      }
    }
  },
  mounted () {
    this.updateData()
  },
  components: {
    'Details': Details,
    'editAddress': editAddress
  }
}
</script>

<style rel="stylesheet" scoped>
.bg {
  background: #ececec;
  color: #000;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  line-height: 42px;
  margin-bottom: 5px;
  display: block;
}
.default {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 50px;
  font-size: 0.75rem;
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
.address {
  text-align: left;
  font-size: 0.7rem;
  padding: 10px;
  margin:0 20px;
  border-bottom: 1px solid #dcdcdc;
}
.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.othermsg {
  color: #bbb;
  font-size: 0.55rem;
  margin-top: 5px;
}
</style>
