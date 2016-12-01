/**
 * 说明：登录页js
 * Created by wangguangkai on 2016/11/29.
 */
var BeMarking = Class.extend({
  init: function(){
    this.openMktAccnt();
    this.initVdt();
    this.bindLis();
  },
  url: {},
  initVdt: function(){
    this.vdtObj = {};
    this.vdtObj.mktAccntFmVdt = new validate(
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
  bindLis: function(){
    /*页面绑定事件*/
    $('#mktAccntNxt').click(this, this.applyMarketAccount);
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
  applyMarketAccount: function(e){
    var _this = e.data;
    if(_this.vdtObj.mktAccntFmVdt.validateForm()){
      Common.sendFormData(mpUrlsObj.brMkt.applyMarketAccount,
        function(data){
          if(data.isSuccess){

          }else{
            alert(data.resultMsg);
          }
        },
        $('#mktAccntFm').serialize()
      );
    }
  }
});
var beMarking = new BeMarking();