<template>
  <!-- 自定义树形穿梭框组件、理论上左右均可选择是否为树形结构，目前固定为左侧树形、右侧无层级结构 -->
  <div class="tree-transfer">
    <!-- 穿梭框左侧 -->
    <div class="tree-transfer-left">
      <!-- 左侧采用element-ui的el-tree -->
      <el-tree
        ref="treeLeft"
        :data="dataLeft"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
      >
      </el-tree>
    </div>
    <!-- 穿梭框中间按钮区域 -->
    <div class="tree-transfer-middle">
      <el-button circle type="info" icon="el-icon-arrow-left" @click="remove"></el-button>
      <el-button circle type="info" icon="el-icon-arrow-right" @click="add"></el-button>
    </div>
    <!-- 穿梭框右侧 -->
    <div class="tree-transfer-right">
      <!-- 右侧直接放置结果 -->
      <!-- 这里也采用tree结构，默认是对数据进行处理使得没有树形结构，也可以选择有树形结构 -->
      <el-tree
        ref="treeRight"
        :data="dataRight"
        show-checkbox
        node-key="id"
        @check-change="rightChange"
        :props="defaultProps"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  props: ['datas', 'defaultProps'],
  data() {
    return {
      yuansiData: [],
      dataLeft: [],
      dataRight: []
    }
  },
  mounted() {
    this.dataLeft = this.datas
    this.yuansiData = JSON.parse(JSON.stringify(this.datas))
  },
  methods: {
    add() {
      // 定义一个递归过滤的方法，用来删掉父级中给的元素
      // 获取所有选中的项并且去掉父级
      let list = this.$refs.treeLeft.getCheckedNodes()
      //循环删除 左侧的节点
      list.forEach(item => {
        this.deleteNode(this.dataLeft, item.id)
        delete item.children
      })
      this.$refs.treeLeft.setCheckedNodes([])
      // 将选择的项添加到右侧
      this.dataRight.push(...list)
    },
    // 从右侧移除时的方法
    remove() {
      // 1.获取右侧选中的节点
      let list = this.$refs.treeRight.getCheckedNodes()
      if (list.length === 0) return
      const res = this.treeToList(this.dataLeft)
      res.push(...list)
      const resArr = this.listToTree(res, 0, [])
      this.dataLeft = resArr
      // 2.删除右侧的节点
      //深克隆一份 数据
      let rightlist = JSON.parse(JSON.stringify(this.dataRight))
      let resarr = []
      //删除 children
      rightlist.forEach(item => {
        delete item.children
        const index = list.findIndex(val => val.id === item.id)
        if (index === -1) {
          resarr.push(item)
        }
      })
      this.dataRight = resarr
    },
    getResult() {
      return this.dataRight
    },
    rightChange(data) {
      const list = this.$refs.treeRight.getCheckedNodes().map(item => item.id)
      this.dataRight.forEach(item => {
        if (item.id === data.pid) {
          list.push(item.id)
        }
      })
      this.$refs.treeRight.setCheckedKeys(list)
    },
    //递归删除节点
    deleteNode(arr, targetId) {
      for (let i = 0; i < arr.length; i++) {
        const node = arr[i]
        if (node.id === targetId) {
          arr.splice(i, 1)
          return
        }
        // 判断children存在并且有数据
        if (Array.isArray(node.children) && node.children.length) {
          return this.deleteNode(node.children, targetId)
        }
      }
    },
    //扁平化数组转 树状
    listToTree(list, pid, data) {
      //获取所有一级
      for (let item of list) {
        if (item.pid == pid) {
          data.push(item)
        }
      }
      //获取子级
      for (let i of data) {
        i.children = []
        this.listToTree(list, i.id, i.children) //递归调用
        if (i.children.length == 0) {
          delete i.children
        }
      }

      return data
    },
    //树状 转 扁平化
    treeToList(arr) {
      var newArr = [] //申请新数组
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          //childrens存在
          newArr.push(...this.treeToList(arr[i].children))
          //递归，调用flat方法，并将返回结果push到新数组
          delete arr[i].children //删除原有的childrens属性
        }
        newArr.push({ ...arr[i] }) //三个点，展开对象，push新对象
      }
      return newArr //返回数组
    }
  }
}
</script>

<style scoped>
.tree-transfer {
  display: flex;
  min-height: 250px;
}
.tree-transfer-left {
  min-width: 200px;
  border: 1px #e5e5e5 solid;
  border-radius: 10px;
  padding: 10px;
}
.tree-transfer-middle {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
}
.tree-transfer-right {
  min-width: 200px;
  border: 1px #e5e5e5 solid;
  border-radius: 10px;
  padding: 10px;
}
</style>

