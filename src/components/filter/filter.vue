<template>
    <div id="filter" v-if="show">
        <div class="top">
            <div class="flex_box">
                <span :class="{active: checked}" @click="changeOption(1)">未读邮件</span>
                <span :class="{active: !checked}" @click="changeOption(0)">红旗邮件</span>
            </div>
        </div>
        <emailList :emails="items"></emailList>
    </div>
</template>
<script>
import Vue from 'vue'
import emailList from '../emailList/emailList'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import store from '../vuex/store.js'

Vue.use(Vueaxios, axios)
export default {
    data () {
        return {
            show: false,
            checked: true,
            items: [],
            defaultKey: '0',
            defaultType:'readstate'
        }
    },
    store,
    methods: {
        open () {
            this.show = !this.show
        },
        changeOption (flag) {
            if (flag == this.checked) {
                return
            }
            this.checked = !this.checked
            if (!this.checked) {
                this.defaultKey = '1'
                this.defaultType = 'type'
            } else {
                this.defaultKey = '0'
                this.defaultType = 'readstate'
            }
            this.getMails()
        },
        getMails () {
            this.items = []
            this.getData()
            
        },
        getData () {
            var result
            if (this.$store.state.receptList.length == 0) {
                let LocalAPI = 'static/data.json'
                axios.get(LocalAPI).then((res) => {
                    result = res.data.email.recept
                    result.forEach(element => {
                        if (element[this.defaultType] == this.defaultKey) {
                            this.items.push(element)
                        }
                    });
                }, (err) => {
                    alert(err)
                })
            }
            else {
                result = this.$store.state.receptList
                result.forEach(element => {
                    if (element[this.defaultType] == this.defaultKey) {
                         this.items.push(element)
                     }
                });
            }
        }
    },
    mounted () {
        this.getData()
    },
    components: {
        'emailList': emailList
    }
}
</script>

<style lang="less">
#filter {
    position: absolute;
    top: 42px;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 199;
}
.flex_box {
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
</style>

