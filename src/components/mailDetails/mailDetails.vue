<template>
  <div>
    <Details class="details" @back="back" :color="color">
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
  </div>
</template>

<script>
import Vue from 'vue'
import Details from '../details/details'
import {Icon} from 'element-ui'
Vue.use(Icon)

export default {
  data () {
    return {
      color: '#DCDCDC'
    }
  },
  props: {
    mailitem: {}
  },
  methods: {
    back () {
      this.$emit('back')
    }
  },
  created () {
    console.log(this.mailitem)
  },
  components: {
    'Details': Details
  }
}
</script>

<style rel="stylesheet" scoped>
.headright i {
  margin-left: 20px;
  font-size: 0.8rem;
}
.sender {
  margin-top: 10px;
  overflow: hidden;
  position: sticky;
}
.avatar {
  width: 32px;
  height: 32px;
  float: left;
  margin: 0 10px 0 10px;
}
.sendmsg {
  overflow: hidden;
  font-size: 0.65rem;
}
.sendmsg > p {
  margin-bottom: 5px;
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
  font-size: 0.65rem;
}
.title {
  font-size: 0.75rem;
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
</style>
