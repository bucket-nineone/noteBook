<!-- 这是一个按钮上传组件 -->
<template>
  <div class="btn">
    <!-- limit最大的个数 -->
    <el-upload
      class="upload-demo"
      action="#"
      :disabled="disabled"
      :file-list="fileList"
      :on-remove="OnRemove"
      :on-change="OnChange"
      :on-success="OnSuccess"
      :on-error="OnError"
      :http-request="uploadImage"
      :before-upload="beforeUpload"
      limit="9"
    >
      <el-button size="small" type="primary">{{ title }}</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png/jpeg/pdf/doc和docx文件
      </div>
    </el-upload>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { onloadCase } from '../../api/video'; //引用的api
export default {
  props: {
    title: { type: String }, //传入的按钮名字
  },
  data() {
    return {
      disabled:false, //是否禁用
      fileList:[]  //上传文件列表
    };
  },
  methods: {
    //文件上传成功
    OnSuccess(response, file, fileList){
    }
    //文件上传失败
    OnError(err, file, fileList){
    }
    //文件列表删除
    OnRemove(file,fileList){}
    //文件状态改变
    OnChange(file,fileList){}
    // 上传
    uploadImage(param) {
      this.$emit('fileshow'); //上传时通知父组件要做到事
      //传入的参数
      const data = {
        file: param.file,
      };
      //上传的api
      onloadCase(data)
        .then((response) => {
          this.$emit('fatherMethod'); //上传成功父组件要做的事
          Message.success('文件上传成功!');
        })
        .catch((err) => {
          console.log('文件上传失败', err);
        });
    },
    //上传前校验
    beforeUpload(file) {
      let type = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/pdf',
      ];
      if (!type.includes(file.type)) {
        console.log('类型不符合');
        Message.error('目前只支持 只能上传jpg/png/jpeg图片doc/pdf/docx文件');
        return false;
      }
      const maxSize = 10240 * 1024;
      if (file.size > maxSize) {
        console.log('大小不符合');
        Message.error('文件大小不能超过 10M');
        return false;
      }
    },
  },
};
</script>

<style lang="less">
.el-button {
  margin: 0;
  width: 250px;
  height: 40px;
  font-size: 14px;
}
</style>
