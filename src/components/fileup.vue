<template>
  <div>

    <!-- <form action="http://localhost:8080/shop/file" method="post"
    class="fileup" enctype="multipart/form-data">
    <input type="file" id="fileExport" name="upload" >
    <button>上传</button>
    </form> -->
    <!-- <img src="http://169.254.53.221:8080/imgs/12345.png" /> -->
    <button @click="filetop()">上传</button>

    <input type="file" id="fileExport"   ref="inputer">
<p><button type="button" @click="download('123.png')">下载</button></p>
    <!-- <img src="http://localhost:8888/vue/uploads/666666.png" /> -->
    <!-- <a href="http://localhost:8888/vue/uploads/666666.png">点击</a> -->
  </div>
</template>

<script>
  export default {
      data() {
        return {
          dialogImageUrl: '',
          dialogVisible: false,
          formData:'',
          imageUrl: ''
        };
      },
      methods: {
        handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
              },
              beforeAvatarUpload(file) {
                let isJPG = file.type === 'image/jpeg';
                let isJPG1 = file.type === 'image/png';
                if(isJPG1){
                  isJPG=true
                }
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                  this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
              }
        ,
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        handleFileChange (e) {

        　　　　let inputDOM = this.$refs.inputer;
        　　　　this.file = inputDOM.files[0];// 通过DOM取文件数据
        　　　　let size = Math.floor(this.file.size / 1024);//计算文件的大小　
        　　　　this.formData=new FormData();//new一个formData事件
        　　　　this.formData.append("file",this.file); //将file属性添加到formData里
        　　　　//此时formData就是我们要向后台传的参数了

        },
        download(name){
          console.log(name,"123")
          // window.open("http://" + window.location.host + "/download?fileName=" + fileName, '_blank')
          this.$axios.post("http://localhost:8080/download",{
            params:{
              fileName:name
            }
          })
        },
        filetop(){
          // this.$axios({
          //   method: 'post',
          //   url:'http://localhost:8080/shop/file',
          //   data:this.formData
          // })
           console.log("数据:"+this.formData)
          this.$axios.post("http://localhost:8080/upload",{
            params:{
              img:this.formData
            },
            headers:{
            　'Content-Type':'multipart/form-data' //值得注意的是，这个地方一定要把请求头更改一下
            }
          }).then(response=>{
            alert(1)
          }).catch(function(error){
            console.log(error)
          })
        }
      }
    }
</script>

<style>
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
