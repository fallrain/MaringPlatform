/**
 * 说明：登录页js
 * Created by wangguangkai on 2016/11/29.
 */
var BeMarking = Class.extend({
  init: function(){
    this.openMktAccnt();
    this.initVdt();
    this.bindLis();
    var gotoLogin = function(){
      var returnUrl = window.location.href;
      location.href = "http://tuser.haier.com/ids/cn/haier_login.jsp?returnUrl=" + returnUrl;
    };
    //gotoLogin();
  },
  url: {},
  initVdt: function(){
    /*验证信息*/
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
  choosePrg: function(num, par){
    /*控制进度条的进度*/
    var lis;
    if(par){
      lis = $('#' + par).find('.mp-updAccount-prg-itm');
    }else{
      lis = $('.mp-updAccount-prg-itm');
    }
    lis.removeClass('mp-updAccount-prg-itm-active');
    $(lis[num - 1]).addClass('mp-updAccount-prg-itm-active');
    $('.js-prg').hide();
    //本层的显示
    $('.js-prg-' + num).show();
    //低层+的也都显示
    for(var i = 0; i <= num; i++){
      $('.js-prg-' + i + 'more').show();
    }
  },
  openMktAccnt: function(){
    /*打开弹出层*/
    layer.open({
      type: 1,
      title: false,
      fix: false,
      closeBtn: 1,
      skin: 'beMkt',
      resize: false,
      area: ['940px', '490px'],
      content: $('#mp-updAccount-prg-main'),
      end: function(){
        //layer.tips('Hi', '#about', {tips: 1})
      }
    });
  },
  applyMarketAccount: function(e){
    /*提交完善账户信息*/
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
  },
  queryUser: function(){
    Common.sendFormData(mpUrlsObj.brMkt.queryUser,
      function(data){
        if(data.isSuccess){

        }else{
          alert(data.resultMsg);
        }
      }
    );
  }
});
var beMarking = new BeMarking();
beMarking.choosePrg(2);
beMarking.queryUser();