<template>
    <div >
      <scroll class="wrapper"
          :data="emails"
          :pulldown="pulldown"
          @pulldown="getMails"
          :pullup="pullup"
          @pullup="getMails">
        <ul class="list">
          <li v-for="item in emails" :key="item.id" @click="showDetail(item)">
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

Vue.use(Vueaxios, axios)
export default {
  props: {
    id: String
  },
  data () {
    return {
      emails: [],
      pulldown: true,
      pullup: true
    }
  },
  watch: {
    id: 'getMails'
  },
  methods: {
    getMails (loaded) {
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
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.list {
  position: absolute;
  z-index: -1;
  width: 100%;
}
.list li {
  border-bottom: 1px solid #dcdcdc;
}
li > div {
  display: inline-block;
}
.avatar {
  width: 10%;
  margin:0 5px;
  vertical-align: middle;
}
.messages {
  width: 85%;
  font-size: 0.6rem;
  margin: 5px 0;
  line-height: 0.8rem;
  vertical-align: middle;
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
  display: inline-block;
  float: right;
}
.noEmail {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
