<template>
  <div class="span">
    <el-button type="success" @click="dialogVisible = true">成功按钮</el-button>
    <el-button type="success" @click="handleClick">lodash</el-button>
    大屏1
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
export default {
  name: 'screenOne',
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleClick() {
      let obj = {
        name: 'shine',
        age: 18,
      }

      console.log(_.pick(obj, ['age']))
      console.log($)
    },
  },
}
</script>

<style lang="scss" scoped></style>
