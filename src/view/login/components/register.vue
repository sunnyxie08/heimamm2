<template>
    <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="图形码" :label-width="formLabelWidth" prop="pic">
    <el-row>
  <el-col :span="16"><el-input v-model="form.pic" autocomplete="off"></el-input></el-col>
  <el-col class="imgbox" :span="7" :offset="1"> <img @click="changepic" class="imgcode" :src="picsrc"/> </el-col>
</el-row> 
      
    </el-form-item>
    <el-form-item label="验证码" :label-width="formLabelWidth" prop="code">
        <el-row>
  <el-col :span="16"><el-input v-model="form.code" autocomplete="off"></el-input></el-col>
  <el-col class="imgbox" :span="7" :offset="1"> <el-button @click="getcode" class="reg_bnt" :disabled="time !== 0">{{time === 0 ? '获取用户验证码' : time }}</el-button></el-col>
</el-row> 
      
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="gotrue">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import {apiGetCode} from '../../../api/register.js'
var checkemail = function (rule,value,callback) {
    // 定义一个邮箱的正则
    var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    // 验证参数的合汉
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('邮箱不合法'))
    }
} 
var checkphone = function (rule,value,callback) {
    // 定义一个邮箱的正则
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    // 验证参数的合汉
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('手机号不正确'))
    }
} 
export default {
    data() {   
        return{
          picsrc:process.env.VUE_APP_URL + "/captcha?type=sendsms&ttt=" + Date.now(),
         time:0,
         timer:null,   
        formLabelWidth: '67px',
        dialogFormVisible: false,
        form:{
          name:'',
          email:'',
          phone:'',
          password:'',
          pic:'',
          code:''
        },
        rules: {
          name: [
            { required: true, message: '请输入昵称',trigger: 'blur' },
            { min: 2,max: 5,message: '长度在2 到 5 个字符',trigger: 'blur' }
          ],
          email: [
            { required: true,message: '请输入邮箱',trigger: 'blur' },
            { validator: checkemail,trigger: 'blur' }
          ],
          phone: [
            { required: true,message: '请输入手机号',trigger: 'blur' },
            { validator: checkphone,trigger: 'blur' }
          ],
          password: [
            { required: true,message: '密码不能为空',trigger: 'blur' },
            { min: 6,max: 12,message: '长度在6 到 12 个字符',trigger: 'blur' }
          ],
          pic: [
            { required: true,message: '请输入图形验证码',trigger: 'blur' },
            { min: 4,max: 4,message: '验证码为4个字符',trigger: 'blur' }
          ],
          code: [
            { required: true,message: '请输入手机验证码',trigger: 'blur' },
            { min: 6,max: 6,message: '验证码为6位数字',trigger: 'blur' }
          ],
     }
        }
},
methods: {
    gotrue(){
        this.$refs.ruleForm.validate(valid=>{
            if(valid){
                this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
            }else{
                this.$message.error('错了哦，这是一条错误消息');
            }
        })
    },
     changepic(){
      this.picsrc=process.env.VUE_APP_ONLINE +`/captcha?type=sendsms&ttt=` + Date.now()
    },
    getcode(){
      this.time=60
      this.timer=setInterval(()=>{
       if(this.time>0){
         this.time--
       }
       if(this.time===0){
         clearInterval(this.timer )
       }
      },100)
      
      apiGetCode({
        phone:this.form.phone,
          code:this.form.pic
      }).then(res=>{
          window.console.log(res)
        }).catch(()=>{
          window.console.log('错了')
        })
      // axios({
      //   url:process.env.VUE_APP_ONLINE + "/sendsms",
      //   method:"post",
      //   data:{
      //     phone:this.form.phone,
      //     code:this.form.pic
      //   },
      //   withCredentials: true,
      //   }).then(res=>{
      //     window.console.log(res)
      //   }).catch(()=>{
      //     window.console.log('错了')
      //   })
      }
    }
}

</script>

<style lang="less">
.reg_dialog{
  .el-dialog__header{
    text-align: center;
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    padding:0;
    .el-dialog__title{
        height:53px;
    line-height:53px;
       color:#fff;
       }
    }
  .imgbox{
      height: 41px;
        // text-align: right;
        .imgcode{
            height: 41px;
            // width:143px;
        }
  }  
  .dialog-footer{
      text-align:center
  }
}
</style>