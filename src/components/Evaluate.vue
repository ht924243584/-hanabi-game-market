<template>
	<div class="data public">
	  <div class="content">

	    <div class="buyingNow">
			<div class="headerTop">
				<div class="headerNew">
					<el-select @change=priceSort(value)  v-model="value" placeholder="排序">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</div>
				<div class="headerBtn">
					<el-button type="primary"  id="blueBtn"  @click="dialogFormVisible = true">我要上传</el-button>
				</div>

			</div>
			<div class="userContent">
				<div v-for="(comment,index) in commentInfo">
					<div>
						<div>
							<img :src="comment.url" width="210px" height="150px"  />
						</div>
						<div class="de">
							{{comment.desc}}
						</div>
						<div align="left" class="user">
							<div style="line-height: 20px;vertical-align:middle; display: inline-block;width: 20px; height: 20px; border-radius: 50%;overflow: hidden;">
                <img width="20px" height="20px" :src="comment.buyerUrl" />
              </div>
							<span>{{comment.buyerName}}</span>
						</div>
					</div>
				</div>
			</div>

			<el-dialog title="上传玩家秀" :visible.sync="dialogFormVisible">
			  <el-form :model="form" >
				  <el-form-item label="上传图片" :label-width="formLabelWidth">
			      <el-upload
              :multiple="false"
              name="up"
			        class="avatar-uploader"
			        action="https://jsonplaceholder.typicode.com/posts/"
			        :show-file-list="false"
			        :on-success="handleAvatarSuccess"
			        :before-upload="beforeAvatarUpload">
			        <img v-if="imageUrl" :src="imageUrl" class="avatar">
			        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			      </el-upload>
			    </el-form-item>
			    <el-form-item label="添加描述" :label-width="formLabelWidth">
			      <el-input name="desc" v-model="desc" autocomplete="off" placeholder="请输入图片描述,与搭配饰品,游戏场景相关" style="width: 80%; float: left;"></el-input>
			    </el-form-item>
				<div class="tips">
					<p>1.上传的玩家秀需经过审核才会发布，请勿涉及色情、低俗、反动、广告等内容。</p>
					<p>2.玩家秀请勿上传检视图（包括BUFF检视图以及游戏检视图）。</p>
					<p>3.玩家秀图片请以展示相关皮肤为主，并且保持图片的完整和美观。</p>
				</div>

			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="file()">确 定</el-button>
			  </div>
			</el-dialog>
	    </div>


		</div>
	</div>
</template>

<script>
  export default {
    props:["allNewAttrasionId"],
	  data(){
		  return{
        desc:"",
			  options: [{
			            value: '-1',
			            label: '默认'
			          }, {
			            value: '0',
			            label: '最新 '
			          }],
			  value: '-1',
			  imageUrl: '',
			  dialogFormVisible: false,
			  form: {
			       name: '',
			       region: '',
			       date1: '',
			       date2: '',
			       delivery: false,
			       type: [],
			       resource: '',
			       desc: ''
			   },
			   formLabelWidth: '120px',
         attrId:this.$route.query.attributeId,
         commentInfo:'',
         upfile:''
		  }
	  },
    mounted() {
      this.findCommentInfo()
      $(".nav>ul>li").eq(2).find("a").css("color","white").find("i").show();
    },
	methods:{
    file(){
      this.dialogFormVisible = false
      let formdata = new FormData();
      console.log(this.upfile.raw)
      formdata.append("uid",sessionStorage.getItem("uid"));
      formdata.append("desc",this.desc);
      formdata.append("attrId",this.attrId);
      formdata.append("file",this.upfile.raw);
      this.$axios.post("http://localhost:8080/oms-comment/file",formdata,{
        'Content-Type':"multipart/form-data"
      }).then(res=>{
        let result=res.data
        if(result.code=="200"){
          this.$message({
                    message: result.message,
                    type: 'seccess',
                    duration:1500,
                    offset:200
                  });
        }
        location.reload()
      })
    }
    ,
    findCommentInfo(){
      this.$axios.get("http://localhost:8080/oms-comment/findComment",{
        params:{
          attrId:this.attrId
        }
      }).then(response=>{
        let result=response.data
        this.commentInfo=result.data

        console.log(response)
      })
    }
    ,
    handleAvatarSuccess(res, file) {
      this.upfile=file
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style >
  .de{
    min-height: 80px;
  }
  .user{
    margin-left: 40px;
    background-color: rgb(250,250,250);
    height: 40px;
  }
  .user>*{
    line-height:40px ;
  }
	* {
	  margin: 0px auto;
	  text-decoration: none;
	}
  .userContent::after{
    content: "";
    display: block;
    clear: both;
  }
	.buyingNow{
	  min-height: 600px;
	  width: 1200px;
	  background-color:white;
	}
	.headerTop{

		border-bottom: 1px solid lightgray;
	}
	.headerBtn{
		float: right;
		margin: 20px;
	}
	.headerTop:after{
		clear: both;
		content: "";
		display: block;
	}
	.headerNew{
		float: left;
		margin: 2%;
		color: white;
	}
	.userContent>div:not(:nth-child(5n+1)){
		float: left;
		margin: 10px;
	}
  .userContent>div{
    border: 1px solid rgb(228,228,228);
    box-shadow: 1px 2px 2px rgb(228,228,228);
    border-radius: 2%;
  	float: left;
  	margin: 10px 10px 10px 30px;
  }
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
		float: left;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 70px;
	    line-height: 70px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
	  .tips>p{
		  text-align: left;
		  line-height: 25px;
		  margin-left: 7%;
	  }
</style>
