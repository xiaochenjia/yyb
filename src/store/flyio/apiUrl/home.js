const URL = {
  // url: 'https://allinwxy.wicp.io/ycdc/mkc/'
  url: 'https://sandbox.ycdc.com/mkcapi/mkc/'
  // url: 'https://1902.ycdc.com/mkcapi/mkc/' // 生产地址
  // url: 'https://xhrise.xicp.net/admin/mkc/'
}
// API
const API = {
  // 公共服务
  // 备注
  'Api.customerDetailChangeApi': URL.url + 'customer/customerDetailChangeApi',

  'Api.groupMemberList2Api': URL.url + 'group/groupMemberList2Api',
  'Api.wxCode2SessionApi': URL.url + 'login/wxCode2SessionApi',
  'Api.getUserInfoApi': URL.url + 'user/getUserInfoApi',
  'Api.sendCodeApi': URL.url + 'login/sendCodeApi',
  'Api.registerLoginApi': URL.url + 'login/registerLoginApi',
  'Api.registerByVCodeValidateApi': URL.url + 'login/registerByVCodeValidateApi',
  'Api.registerByFinishApi': URL.url + 'login/registerByFinishApi',
  'Api.loginByPwdApi': URL.url + 'login/loginByPwdApi',
  'Api.loginByVCodeApi': URL.url + 'login/loginByVCodeApi',
  'Api.logoutApi': URL.url + 'login/logoutApi',
  'Api.homeBannerListApi': URL.url + 'basic/homeBannerListApi',
  'Api.homeCityListApi': URL.url + 'basic/homeCityListApi',
  'Api.homeCompanyListApi': URL.url + 'basic/homeCompanyListApi',
  'Api.homeDistrictListApi': URL.url + 'basic/homeDistrictListApi',
  'Api.homeStoreListApi': URL.url + 'basic/homeStoreListApi',
  'Api.projectConditionListApi': URL.url + 'project/projectConditionListApi',
  'Api.getCityByCodeApi': URL.url + 'basic/getCityByCodeApi',
  'Api.projectListApi': URL.url + 'project/projectListApi',
  'Api.projectDetailApi': URL.url + 'project/projectDetailApi',
  'Api.projectImgListApi': URL.url + 'project/projectImgListApi',
  'Api.projectHousingTypeListApi': URL.url + 'project/projectHousingTypeListApi',
  'Api.projectDynamicListApi': URL.url + 'project/projectDynamicListApi',
  'Api.projectDynamicDetailApi': URL.url + 'project/projectDynamicDetailApi',
  'Api.groupListApi': URL.url + 'group/groupListApi',
  'Api.groupMemberListApi': URL.url + 'group/groupMemberListApi',
  'Api.groupMemberCheckListApi': URL.url + 'group/groupMemberCheckListApi',
  'Api.groupMemberCheckHandleApi': URL.url + 'group/groupMemberCheckHandleApi',
  'Api.groupMemberLeaveHandleApi': URL.url + 'group/groupMemberLeaveHandleApi',
  'Api.groupMemberTransferHandleApi': URL.url + 'group/groupMemberTransferHandleApi',
  'Api.minePhoneModifyApi': URL.url + 'base/minePhoneModifyApi',
  'Api.mineStoreModifyApi': URL.url + 'user/mineStoreModifyApi',
  'Api.mineInfoModifyApi': URL.url + 'user/mineInfoModifyApi',
  'Api.messageNoReadNumApi': URL.url + 'message/messageNoReadNumApi',
  'Api.messageTypeListApi': URL.url + 'message/messageTypeListApi',
  'Api.messageListApi': URL.url + 'message/messageListApi',
  'Api.messageDetailApi': URL.url + 'message/messageDetailApi',
  'Api.customerConditionListApi': URL.url + 'customer/customerConditionListApi',
  'Api.customerListApi': URL.url + 'customer/customerListApi',
  'Api.customerDetailApi': URL.url + 'customer/customerDetailApi',
  'Api.customerChangeListApi': URL.url + 'customer/customerChangeListApi',
  'Api.customerStatisticsConditionListApi': URL.url + 'customer/customerStatisticsConditionListApi',
  'Api.customerStatisticsApi': URL.url + 'customer/customerStatisticsApi',
  'Api.reportSubmitApi': URL.url + 'customer/reportSubmitApi',
  'Api.storeBindingApi': URL.url + 'user/storeBindingApi',
  'Api.projectListForCustomerApi': URL.url + 'customer/projectListForCustomerApi'
}

export default API
