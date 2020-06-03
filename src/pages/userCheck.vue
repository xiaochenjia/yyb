<template>
  <div id="app">
    <div class="fangchan_x_body">
      <ul>
        <li>
          <p>真实姓名</p>
          <input type="text" v-model="realName" name="realName" placeholder="请输入姓名">
        </li>
        <li>
          <p>身份证号码</p>
          <input type="text" v-model="idCard" name="idCard" placeholder="请输入身份证号码">
        </li>
        <li style="height: auto;">
          <div style="padding: 5px 10px;padding-top: 0;height : 50px;line-height:50px">选择经纪人类型</div>
          <div class="li-item">
            <div class="item" @click="clickSelected('1')"><div class="name" :class="typeId === '1' ? 'typeClass' : ''">全民经纪人</div><div class="marker"></div></div>
            <div class="item" @click="clickSelected('2')"><div class="name" :class="typeId === '2' ? 'typeClass' : ''">自渠经纪人</div><div class="marker"></div></div>
            <div class="item" @click="clickSelected('3')"><div class="name" :class="typeId === '3' ? 'typeClass' : ''">分销经纪人</div><div class="marker"></div></div>
          </div>
          <div class="tips-content">
            <span v-if="typeId === '0'"><img class="image-wrapper" src="https://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/lALPDgQ9rUZ8YzMcHA_28_28.png">请选择经纪人类型</span>
            <span v-if="typeId === '1'"><img class="image-wrapper" src="https://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/lALPDgQ9rUZ8YzMcHA_28_28.png">全民经纪人：无需验证身份；为了避免您无法正常接受佣金奖励，请实名认证。</span>
            <span v-if="typeId === '2'"><img class="image-wrapper" src="https://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/lALPDgQ9rUZ8YzMcHA_28_28.png">自渠经纪人：需验证自渠经纪人身份</span>
            <span v-if="typeId === '3'"><img class="image-wrapper" src="https://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/lALPDgQ9rUZ8YzMcHA_28_28.png">分销经纪人：需验证分销经纪人身份</span>
          </div>
        </li>
        <li @click="goCompanyClick">
          <p>所属渠道</p>
          <img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"> <a :style="companyVal === '请选择所属渠道' ? '' : 'color:#333'">{{companyVal}}</a>
        </li>
        <li @click="goStoreClick">
          <p>所属渠道分管中心</p>
          <img class="arr_right" src="http://ycdc-mkc.oss-cn-hangzhou.aliyuncs.com/wechat/arrow_r.png"> <a :style="storeVal === '所属渠道分管中心' ? '' : 'color:#333'">{{storeVal}}</a>
        </li>
      </ul>
    </div>
    <div class="title">【温馨提示】请慎重选择所属渠道，经纪人审核通过之后不可以再变更渠道。</div>
    <!--固定底部按钮-->
    <div style="height: 1rem;"></div>
    <div class="ding_bot_btn" @click="Submission"> <a>提交</a> </div>
    <div v-show="isShow" class="tishi">

    </div>
    <van-toast id="van-toast" />
    <!-- <van-dialog id="van-dialog" /> -->
    <div class="dialog-wrapper" v-show="showDialog" @click="CloseDialog">
      <div class="dialog">
        <div class="title">提示 <div class="colse">×</div></div>
        <div class="content" v-if="typeId == 1">为了避免您无法正常接受佣金奖励，请完善个人信息</div>
        <div class="content" v-else>渠道设置完成，请等待管理员审核</div>
        <div class="but-wrapper" v-if="typeId == 1">
          <div class="but" @click="goSubmitClick('0',typeId)">暂不完善</div>
          <div class="but" @click="goSubmitClick('1',typeId)">立即完善</div>
        </div>
        <div class="but-wrapper" v-else @click="goSubmitClick('1',typeId)">
          <div class="but">知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Toast from '../../static/vant/toast/toast'
  export default {
    data () {
      return {
        realName: '',
        idCard: '',
        companyVal: '请选择所属渠道',
        storeVal: '所属渠道分管中心',
        companyId: '',
        storeId: '',
        userInfo: {},
        status: '',
        roleType: '',
        isShow: false,
        typeId: '0',
        showDialog: false
      }
    },
    components: {
    },
    methods: {
      clickSelected (index) {
        this.companyVal = '请选择所属渠道'
        this.storeVal = '所属渠道分管中心'
        this.typeId = index
      },
      setClass (index) {
        if (index === this.typeId) {
          return 'typeClass'
        }
      },
      CloseDialog () {
        this.showDialog = false
      },
      know () {
        this.$router.go(2)
      },
      goCompanyClick () {
        if (this.companyId !== undefined && this.companyId.length > 0 && this.roleType !== undefined && this.roleType === 'manager') {
          Toast('您已经绑定所属渠道')
        } else {
          const path = '/pages/companyList'
          const query = {
            'typeId': this.typeId
          }
          this.$router.push({ path, query, reLaunch: false })
        }
      },
      goStoreClick () {
        if (this.companyId !== undefined && this.companyId.length > 0) {
          const path = '/pages/storeList'
          const query = {
            'companyId': this.companyId,
            'type': 'set'
          }
          this.$router.push({ path, query, reLaunch: false })
        } else {
          Toast('请选择所属渠道')
        }
      },
      Authentication (userId, phone) {
        console.log('打开程序')
        /* wx.navigateToMiniProgram({
          appId: 'wx5d826cbcfe9dc948',
          path: 'pages/register/register?authUserId=4M8Q6Q1G5de274ace4b0065a7491118c&mobile=17761740028&id=c6bf68cff9a363f1f6d819848d4ed76v',
          extraData: {
            authUserId: '4M8Q6Q1G5de274ace4b0065a7491118c',
            mobile: '17761740028',
            comId: 'c6bf68cff9a363f1f6d819848d4ed76v'
          },
          envVersion: 'develop'
        }) */
        let _this = this
        console.log('pages/register/register?authUserId=' + this.userInfo.userId + '&mobile=' + this.userInfo.phone + '&comId=c6bf68cff9a363f1f6d819848d4ed76v')
        wx.navigateToMiniProgram({
          appId: 'wx5d826cbcfe9dc948',
          path: 'pages/register/register?authUserId=' + this.userInfo.userId + '&mobile=' + this.userInfo.phone + '&comId=c6bf68cff9a363f1f6d819848d4ed76v',
          envVersion: 'release',
          complete () {
            _this.$router.go(2)
          }
        })
      },
      Submission () {
        if (this.realName.length === 0) {
          Toast('请输入姓名')
          return
        }

        // if (this.idCard.length === 0) {
        //   Toast('请输入身份证号码')
        //   return
        // }
        // _this.Authentication()
        if (this.companyId.length === 0) {
          Toast('请选择所属渠道')
          return
        }

        if (this.storeId.length === 0) {
          Toast('请选择所属渠道分管中心')
          return
        }
        this.showDialog = true
      },
      goSubmitClick (index, typeId) {
        this.$iBox.http('Api.storeBindingApi', {
          'realName': this.realName,
          'idCard': this.idCard,
          'companyId': this.companyId,
          'storeId': this.storeId
        }, true)({}).then((res) => {
          Toast(res.message)
          this.getUserInfo(index, typeId)
        })
        // this.getUserInfo(index, typeId)
      },
      getUserInfo (index, typeId) {
        this.$iBox.http('Api.getUserInfoApi')({}).then(respUserInfo => {
          this.userInfo.nickName = respUserInfo.data.nickName
          this.userInfo.avatarUrl = respUserInfo.data.headImg
          this.userInfo.phone = respUserInfo.data.phone
          this.userInfo.realName = respUserInfo.data.realName
          this.userInfo.idCard = respUserInfo.data.idCard
          this.userInfo.roleType = respUserInfo.data.roleType
          this.userInfo.companyName = respUserInfo.data.companyName
          this.userInfo.storeName = respUserInfo.data.storeName
          this.userInfo.companyId = respUserInfo.data.companyId
          this.userInfo.storeId = respUserInfo.data.storeId
          this.userInfo.roleType = respUserInfo.data.roleType
          // 1:注册-未绑定 2:绑定门店申请中(绑定待审核) 3:绑定成功(在职) 4:离职
          this.userInfo.status = respUserInfo.data.status
          this.$store.isLogin = true
          this.$store.userInfo = this.userInfo
          this.userInfo.userId = respUserInfo.data.userId
          if (typeId === '1') {
            if (index === '1') {
              this.Authentication(respUserInfo.data.phone, respUserInfo.data.userId)
            } else {
              this.$router.go(2)
            }
          } else {
            this.$router.go(2)
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    created () {
    },
    onLoad () {
    },
    onUnload () {
      this.$store.companyId = undefined
      this.$store.companyName = undefined
      this.$store.storeId = undefined
      this.$store.storeName = undefined
    },
    onShow () {
      this.status = this.$root.$mp.query.status
      if (this.status === '1') {
        this.companyId = this.$store.userInfo.companyId
        this.companyVal = this.$store.userInfo.companyName
        this.storeId = this.$store.userInfo.storeId
        this.storeVal = this.$store.userInfo.storeName
        this.realName = this.$store.userInfo.realName
        this.idCard = this.$store.userInfo.idCard
        this.roleType = this.$store.userInfo.roleType
      }

      if (this.$store.companyId !== undefined) {
        this.companyId = this.$store.companyId
        this.companyVal = this.$store.companyName
        this.$store.companyId = undefined
        this.$store.companyName = undefined

        // 清空 门店选择
        this.storeId = ''
        this.storeVal = '所属渠道分管中心'
      }
      if (this.companyId !== undefined && this.companyId.length > 0 && this.$store.storeId !== undefined) {
        this.storeId = this.$store.storeId
        this.storeVal = this.$store.storeName
        this.$store.storeId = undefined
        this.$store.storeName = undefined
      }

      if (this.$store.userInfo.companyId !== undefined && this.$store.userInfo.companyId.length > 0) {
        // this.$store.companyId = this.$store.userInfo.companyId
        this.companyId = this.$store.userInfo.companyId
        this.companyVal = this.$store.userInfo.companyName
      }
    }
  }
</script>

<style scoped>
  :after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
    font-size: 16px;
  }

  .fangchan_x_body{ width:7.5rem; background:#fff;font-size: 0.28;}
  .fangchan_x_body ul li{ border-bottom:0.01rem solid #eee; display:block; margin:0 auto;height:1rem; line-height:1rem;}
  .fangchan_x_body ul li:last-child{border-bottom:none;}
  .fangchan_x_body ul li p{ float:left; margin-left: 0.2rem;}
  .fangchan_x_body ul li a{ float:right; color:#999;text-align: right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .fangchan_x_body ul li input{ float:right;text-align: right;border: none; padding-right: 0.2rem;outline:medium;height:1rem; line-height:1rem;}
  .fangchan_x_body ul li .arr_right{  width:0.35rem; height:0.35rem; float: right; margin-top: 0.32rem; }
  .image-wrapper{ width: 0.3rem;height: 0.3rem;float: left;margin-top: 0.1rem;margin-right: 0.1rem;}

  .fangchan_x_body ul li .huxingtu{  width:2rem; height:2rem; float: right; margin-top: 0.05rem; margin-right: 0.2rem;}
  /*固定底部按钮*/
  .ding_bot_btn{ width:7.5rem;  height:1rem; position:fixed; bottom:0rem; left:0rem;}
  .ding_bot_btn a{ width:7.5rem;  height:1rem; line-height:1rem; font-size:0.3rem; color:#fff; background:#2D5AD6; text-align: center; display:block;}

  .tishi {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5)}
  .li-item {display: flex !important;}
  .li-item .item{flex: 1;padding: 0 0.1rem;}
  .typeClass{background: #2D5AD6 !important;border: 1px solid #2D5AD6 !important;color: #fff !important;}
  .li-item .item .name{padding: 0.1rem 0.2rem;text-align: center;border: 1px solid #ddd;background: #ddd;color: #999;border-radius: 0.1rem;height: 0.4rem;line-height: 0.4rem}
  .tips-content{color: #999;padding: 0.2rem;font-size: 0.28rem;line-height: 25px;padding-top: 0.1rem;}
  .title {color: #f34b4b;padding:  0.2rem;font-size:  0.28rem}

  .dialog-wrapper {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.5);}
  .dialog-wrapper .dialog {position: fixed;top: 30%;width: 70%;left: 15%;background: #fff;color: #000;text-align: center}
  .dialog-wrapper .dialog .title {padding:  0.2rem;border-bottom: 1px solid #ddd;font-size: 0.32rem;color: #000;position: relative;}
  .dialog-wrapper .dialog .title .colse{position: absolute;top:  0.2rem;right: 0.2rem;color: #999}
  .dialog-wrapper .dialog .content {padding: 0.3rem;font-size: 0.28rem;}
  .dialog-wrapper .dialog .but-wrapper {border-top: 1px solid #ddd;text-align: center;display: flex;}
  .dialog-wrapper .dialog .but-wrapper .but{padding: 0.3rem;text-align: center;flex: 1}
</style>
