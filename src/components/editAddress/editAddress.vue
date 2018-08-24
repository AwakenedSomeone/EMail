<template>
  <div class="edit" v-show="showFlag">
    <div class="head">
      <div class="item" @click="back">取消</div>
      <div class="item enable" @click="save">保存</div>
    </div>
    <div class="table">
      <el-form :label-position="labelPosition"  :inline='true' :model="formLabelAlign">
        <el-form-item label="联系人名称">
          <el-input v-model="formLabelAlign.nickname" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="formLabelAlign.company" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="formLabelAlign.department" clearable></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="formLabelAlign.position" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formLabelAlign.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formLabelAlign.local" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Form, FormItem, Input, Icon} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input, Icon)
export default {
  props: {
    item: {},
    flag: false
  },
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: Object.assign({}, this.item),
      oldItem: Object.assign({}, this.item),
      showFlag: false
    }
  },
  created () {
    this.showFlag = false
  },
  methods: {
    back () {
      if (this.flag) {
        this.$emit('ifshow')
      }
      this.formLabelAlign = this.oldItem
      this.showFlag = false
    },
    save () {
      this.showFlag = false
      if (this.flag) {
        this.$emit('ifshow')
      }
      this.$emit('save', this.formLabelAlign)
    },
    show () {
      console.log('show')
      this.showFlag = true
      this.formLabelAlign = Object.assign({}, this.item)
      this.oldItem = Object.assign({}, this.item)
    }
  }
}
</script>

<style rel="stylesheet" scoped>
.edit {
  color: #000;
  height: 100%;
  background: #fff;
  z-index: 9999;
}
.head {
  width: 100%;
  padding: 5px 0;
  display: flex;
  flex: 1;
  justify-content: space-between;
  background-color: #efefef;
  position: relative;
  box-sizing: border-box;
}
.head:after {
  position: absolute;
  content: '';
  width: 100%;
  height: 1px;
  bottom: 0;
  border-bottom: 1px solid #ccc;
  color: #ccc;
  transform: scale(1,0.5);
}
.item {
  font-size: 0.65rem;
  margin: 8px 10px;
}
.disable {
  color:#ccc;
}
.enable {
  color: #4169E1;
}
.table {
  padding: 10px;
}
</style>
