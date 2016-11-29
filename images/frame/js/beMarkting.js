/**
 * 说明：登录页js
 * Created by wangguangkai on 2016/11/29.
 */
var BeMarking = Class.extend({
  url: {
    applyMarketAccount: Common.domainHead + '/user/applyMarketAccount',
  },
  applyMarketAccount: function(){
    Common.sendFormData(this.url.applyMarketAccount,
      function(data){
        if(data.isSuccess){

        }else{
          alert(data.resultMsg);
        }
      },
      {}
    );
  }
});
var beMarking = new BeMarking();
beMarking.applyMarketAccount();