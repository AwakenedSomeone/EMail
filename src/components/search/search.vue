<template>
	<div class="search" v-if="show">
		<div class="head">
			<div class="search_input">
				<i class="el-icon-search"></i>
				<input type="text" placeholder="搜索" v-model="value" v-on:keyup.enter="searchHander">
			</div>
			<div class="search_buttn">
				<label @click="cancel">{{buttonLabel}}</label>
			</div>
		</div>
		<div class="content">
			<slot name="content">
				敬请期待
			</slot>
		</div>

	</div>
</template>
<script type="text/javascript">
import {Icon} from 'element-ui'

export default {
	props:['searchHander'],
	data () {
		return {
			buttonLabel: '取消',
			show: false,
			value: ''
		}
	},
	methods: {
		open () {
			this.show = true
		},
		cancel () {
			this.show = false
		}
	},
	mounted () {
		this.value = ''
	}
}
</script>

<style type="text/css" lang="less" scoped>
.search {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	z-index: 999;
	background: #fff;
	.head {
		display: flex;
		padding: 10px 0;
		font-size: 0.7rem;
		border-bottom: 1px solid #eee;
		.search_buttn {
			width: 80px;
			padding: 10px 0;
			text-align: center;
		}
		.search_input {
			flex: 1;
			margin-left: 10px;
			padding: 10px 10px;
			color: #ccc;
			background:#eee;
			border-radius: 5px;
			input {
				caret-color:rgb(0, 102, 255);
			}
		}
	}
}
</style>