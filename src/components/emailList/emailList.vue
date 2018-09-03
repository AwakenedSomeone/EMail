<template>
    <div class="out">
      <scroll class="wrapper"
          :data="emails"
          :pulldown="pulldown"
          @pulldown="getMails"
          :pullup="pullup"
          @pullup="getMails">
        <div v-if='loading'>下拉加载更多</div>
        <ul class="list">
          <li v-for="item in emails" :key="item.id" @click="send(item)">
            <div class="avatar">
              <img :src="item.avatar">
            </div>
            <div class="messages">
              <p class="name">{{item.nickname}}</p>
              <p class="mailtitle">{{item.title}}</p>
              <p class="word"><span class="text">{{item.content}}</span> <span class="time">{{item.time}}</span></p>
            </div>
          </li>
        </ul>
        <div class="loading-wrapper"></div>
      </scroll>
      <div v-if="!emails.length" class="noEmail">暂无邮件</div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import scroll from '../scroll'
import store from '../vuex/store.js'

Vue.use(Vueaxios, axios)
export default {
  props: {
    id: String
  },
  data () {
    return {
      emails: [],
      pulldown: true,
      pullup: true,
      loading: false
    }
  },
  watch: {
    id: 'getMails'
  },
  store,
  methods: {
    getMails (loaded) {
      this.laoding = true
      this.emails = []
      let LocalAPI = 'static/data.json'
      axios.get(LocalAPI).then((res) => {
        if (this.id === '0') {
          this.emails = res.data.email.recept
        } else if (this.id === '3') {
          this.emails = res.data.email.send
        } else {
          let data = res.data.email.recept
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === this.id) {
              this.emails.push(data[i])
            }
          }
        }
      }, (err) => {
        alert(err)
      })
    },
    send (item) {
      this.$emit('showDetails', item)
    }
  },
  created () {
    this.getMails()
  },
  components: {
    'scroll': scroll
  }
}
</script>

<style rel="stylesheet" scoped>
.out {
  width: 100%;
  height: 100%;
}
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;

}
.list {
  position: absolute;
  width: 100%;
}
.list li {
  border-bottom: 1px solid #dcdcdc;
}
.avatar {
  width: 10%;
  margin:5px 5px 0 5px;
  vertical-align: bottom;
}
.messages {
  width: 85%;
  font-size: 0.6rem;
  margin: 5px 0;
  line-height: 0.8rem;
  vertical-align: middle;
  overflow: hidden;
}
.messages p {
  margin-bottom: 2px;
}
.name {
  font-size: 0.7rem;
}
.word {
  color: #696969;
  overflow: hidden;
}
.text {
  display: inline-block;
  width: 75%;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.time {
  font-size: 0.6rem;
  float: right;
}
.noEmail {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 0.8rem;
}
</style>
