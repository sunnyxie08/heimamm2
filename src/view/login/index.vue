<template>
  <div class="all">
    <div class="index_left">
      <div class="title">
        <img class="title_img" src="../../assets/index_logo.png" alt />
        <span class="title_mm">黑马面面</span>
        <span class="title_line"></span>
        <span class="title_login">用户登录</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="0px">
        <el-form-item class="lineHeight" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item class="lineHeight" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="lineHeight" prop="code">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="loginCode" :src="picsrc" alt @click="changepic" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="lineHeight" prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="lineHeight">
          <el-button class="loginbtm" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item class="lineHeight">
          <el-button class="loginbtm" type="primary" @click="openRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="index_right" src="../../assets/index_right.png" alt />
    <register ref="register" />
  </div>
</template>

<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
import register from "./components/register.vue";
export default {
  data() {
    return {
      picsrc:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&ttt=" + Date.now(),
      form: {
        phone: "",
        password: "",
        code: "",
        isCheck: []
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11号数字的手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "密码在6-12位之间", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入4位验证码", trigger: "blur" }
        ],
        isCheck: [
          // isCheck 的类型应该是一个数组
          {
            type: "array",
            required: true,
            message: "请阅读并同意协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    register
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "输入正确,正在登陆!",
            type: "success"
          });
        } else {
          this.$message.error("手机号或密码错误,请重新输入!");
        }
      });
    },
    openRegister() {
      // 使用 $refs 传参的方式将注册组件中的属性进行修改
      this.$refs.register.dialogFormVisible = true;
    },
    changepic() {
      this.picsrc =
        process.env.VUE_APP_ONLINE + `/captcha?type=sendsms&ttt=` + Date.now();
    }
  }
};
</script>

<style>
.all {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.index_left {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
  padding: 48px 42px 86px;
}
.index_right {
  width: 633px;
  height: 435px;
}
.title {
  display: flex;
  align-items: center;
  margin-bottom: 36px;
}
.title_img {
  width: 22px;
  height: 17px;
}
.title_mm {
  font-size: 24px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: rgba(12, 12, 12, 1);
  margin-left: 16px;
  margin-right: 14px;
}
.title_line {
  display: block;
  width: 1px;
  height: 28px;
  background: rgba(199, 199, 199, 1);
  margin-right: 12px;
}
.title_login {
  font-size: 22px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(12, 12, 12, 1);
}
.loginbtm {
  width: 100%;
}
.lineHeight {
  line-height: 46px;
}
.loginCode {
  width: 100%;
  height: 40px;
}
</style>