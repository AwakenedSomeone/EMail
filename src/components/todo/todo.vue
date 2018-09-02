<template>
  <div class="todo">
    <mt-popup
  v-model="popupVisible"
  popup-transition="popup-fade" >
  <div class="popbox">
    <p>全部清空已完成项？</p>
    <p class="yesorno">
      <span @click="popctrl">取消</span>
      <span @click="deleteAll">清空</span>
    </p>
  </div>
</mt-popup>
    <div class="cover" v-show="!flag" @click="cancel"></div>
    <div class="header">
      <div class="default" v-show="flag" @click="newTodo">
        <i class="el-icon-plus"></i><span>新建代办事项...</span>
      </div>
      <transition >
        <div class="inputbox" v-show="!flag">
          <div class="input"> <input type="text" v-model="todo" ref="input"/></div>
          <div class="operate">
            <div class="notice"><i class="el-icon-bell"></i><span @click="openPicker">{{notice}}</span></div>
            <div class="finish_button"><span :class="{change: ifchange}" @click="saveData">完成</span></div>
          </div>
        </div>
      </transition>
    </div>
    <div class="content">
      <div class="nodata" v-if="!todoList.length">
        <p>有什么新安排？</p>
      </div>
      <div class="showdata" v-show="todoList.length">
        <ul>
          <li v-for="(item,key) in todoList" v-bind:key="key" v-if="!item.did">
            <mt-cell-swipe
            :title="item.text"
            :label="item.date"
              :right="[
                {
                    content: '<span class=vertical_span>完成</span>',
                    style: { background: '#ccc', color: '#fff' },
                    handler:() => finished(key)
                  },
                  {
                    content: '<span>删除</span>',
                    style: { background: 'red', color: '#fff' },
                    handler: () => deleted(key)
                  }
                ]">
                </mt-cell-swipe>
          </li>
        </ul>
        <div class="finish">
          <p><span class="divide">已完成</span><span class="text_right"><i class="el-icon-close delete" @click="popctrl"></i></span></p>
          <ul>
            <li v-for="(item,key) in todoList" v-bind:key="key" v-if="item.did">
              <mt-cell-swipe
              	:title="item.text"
            	:label="item.date"
                :right="[
                {
                    content: '<span>还原</span>',
                    style: { background: '#ccc', color: '#fff'},
                    handler:() => reback(key)
                  },
                  {
                    content: '删除',
                    style: { background: 'red', color: '#fff' },
                    handler: () => deleted(key)
                  }
                ]">
                </mt-cell-swipe>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mt-datetime-picker
		  type="datetime"
		  ref="picker"
		  v-model="pickerValue"
		  :startDate="startDate"
		  @confirm="handleConfirm">
	</mt-datetime-picker>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../vuex/store.js'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import {Icon} from 'element-ui'
import moment from 'moment' // 格式化时间

Vue.prototype.$moment = moment;//赋值使用
Vue.use(Vueaxios, axios, Icon)
export default {
  data () {
    return {
      flag: true,
      todo: '',
      notice: '添加提醒',
      date: '',
      focusStatus: true,
      todoList: [
        {
          did: false,
          text: '左滑改变状态'
        }
      ],
      popupVisible: false,
      pickerValue: null,
      startDate: new Date()
    }
  },
  store,
  methods: {
    requestData () {
      //todo
    },
    newTodo () {
      this.flag = false
      this.$refs.input.focus()
    },
    saveData () {
      if (this.todo.length === 0) {
        return;
      }
      this.flag = true
      this.todoList.push({
        did: false,
        text: this.todo,
        date: this.date
      })
      this.todo = ''
      this.$store.commit('saveTodoList', this.todoList)
      this.notice = '添加提醒'
    },
    cancel () {
      this.flag = true
      this.notice = '添加提醒'
    },
    deleted (index) {
       this.todoList.splice(index,1);
       this.$store.commit('saveTodoList', this.todoList)
    },
    finished (index) {
      for (let i = 0;i < this.todoList.length; i++) {
        if (i == index) {
          this.todoList[i].did = true;
        }
      }
      this.$store.commit('saveTodoList', this.todoList)
    },
    reback (index) {
      for (let i = 0;i < this.todoList.length; i++) {
        if (i == index) {
          this.todoList[i].did = false;
        }
      }
      this.$store.commit('saveTodoList', this.todoList)
    },
    deleteAll () {
      for (let i = 0;i < this.todoList.length; i++) {
        if (this.todoList[i].did) {
          this.todoList.splice(i,1);
          i = -1;
        }
      }
      this.$store.commit('saveTodoList', this.todoList)
      this.popupVisible = !this.popupVisible;
    },
    popctrl () {
      this.popupVisible = !this.popupVisible;
    },
    handleConfirm (value) {
    	var date = this.$moment(value).format('M月DD日 hh:mm')
    	this.notice = date
    	this.date = date
    },
    openPicker () {
    	this.pickerValue = new Date ()
        this.$refs.picker.open();
    }
  },
  computed: {
    ifchange () {
      return this.todo.length
    }
  },
  mounted () {
    var list = this.$store.state.todoList
    if (list.length > 0) {
      this.todoList = list
    } else {
      this.requestData()
    }
  }
}
</script>

<style rel="stylesheet" lang="less">
@color1:rgb(0, 102, 255);
.todo {
  display: flow-root;
  overflow: hidden;
}
.cover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 300;
}
.header {
  position: absolute;
  width: 100%;
  background: #eee;
  border-bottom: 1px solid #ddd;
  display: flow-root;
  overflow: hidden;
  z-index: 301;
  &>div {
    padding: 15px;
  }
  .default {
    color: @color1;
    font-size: 0.65rem;
  }
  .inputbox {
    background: #fff;
    z-index: 301;
    font-size: 0.7rem;
    .input {
      margin-bottom: 10px;
    }
    input {
      display: inline-block;
      padding: 10px;
      width: 100%;
      height: 30px;
      caret-color:@color1;
    }
    .operate {
      display: flex;
      &>div {
        flex: 1;
      }
      .notice {
        color: @color1;
      }
      .finish_button {
        text-align:right;
        color: #ccc;
        span {
          display: inline-block;
          width: 50px;
          height: 16px;
          text-align: center;
        }
      }
      .change {
        color: #000;
      }
    }
  }
}
.slideDown-enter-active, .slideDown-leave-active {
    transition: all 0.3s ease;
  }
.slideDown-enter, .slideDown-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-100%);
}
.content {
  margin-top: 45px;
  .nodata {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 0.8rem;
    transform: translate(-50%, -50%);
    color: #ccc;
  }
  .showdata {
    padding:0 10px; 
    li {
      font-size: 0.7rem;
      overflow: hidden;
    }
    .finish {
      padding-top: 6px;
      li {
        color: #777;
        text-decoration: line-through ;
      }
      p {
        margin: 15px 0 5px 0;
        display: flex;
        &>span {
          flex: 1;
        }
        .divide {
          color: @color1;
        }
      }
    }
  }
  .delete {
    display: inline-block;
    padding: 5px;
  }
}
.text_right {
  text-align: right;
  color: #666;
}
.mint-cell {
  background-color: inherit;
  padding: 15px 0;
  min-height: 0;
}
.mint-cell-wrapper {
  background-image: none;
}
.popbox {
  width: 10rem;
  height: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items:stretch;
  p {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 0.7rem;
  }
  .yesorno {
    display: flex;
    align-items: stretch;
    span {
     flex: 1;
     border-top: 1px solid #eee;
     color: @color1;
     line-height: 35px;
    }
    span:first-child {
       border-right: 1px solid #eee;
     }
  }
  .list {
  	display: flex;
  	flex-direction:column;
  }
  .vertical_span {
  	width: 100%;
  	height: 100%;
  	display: flex;
  	align-items:center;
  }
}
</style>
