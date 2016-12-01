/**
 * 说明：登录页js
 * Created by wangguangkai on 2016/11/29.
 */
var BeMarking = Class.extend({
  init: function(){
    this.openMktAccnt();
    this.initVdt();
  },
  url: {
    applyMarketAccount: Common.domainHead + '/user/applyMarketAccount',
  },
  initVdt: function(){
    var mktAccntFmVdt = new validate(
      {
        formID: 'mktAccntFm',
        onfocusout: true,
        rules: {
          department: {
            required: true,
          },
          realName: {
            required: true,
          },
          idCardNo: {
            required: true,
          },
        },
        messages: {}
      });
  },
  openMktAccnt: function(){
    layer.open({
      type: 1,
      title: false,
      fix: false,
      closeBtn: 1,
      //fixed:false,
      area: ['940px', '490px'],
      content: $('#mp-updAccount-prg-main'),
      end: function(){
        //layer.tips('Hi', '#about', {tips: 1})
      }
    });
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