/**
 * 说明：登录页js
 * Created by wangguangkai on 2016/11/29.
 */
var BeMarking = Class.extend({
  init: function(){
    this.initVdt();
    this.bindLis();
  },
  url: {},
  selfObj: {},
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
    this.selfObj.MktAccntDg = layer.open({
      type: 1,
      title: false,
      fix: false,
      closeBtn: 0,
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
  DOMId: {
    loginName: 'loginName',
    updAccountBtn: 'updAccountBtn',
  },
  queryUser: function(isOpened){
    var _this = this;
    if(!isOpened){
      _this.openMktAccnt();
    }
    Common.sendFormData(mpUrlsObj.brMkt.queryUser,
      function(data){
        if(data.isSuccess){
          var loginNameDOM = $('#' + _this.DOMId.loginName);
          loginNameDOM.html(data.data.loginName);
          var accountType = data.type;
          var updAccountBtn = $('#' + _this.DOMId.updAccountBtn);
          var updAccountBtnFn = function(type){
            updAccountBtn.html('完善账户信息成为营销账户');
            switch(type){
              case 1:
                window.open(mpUrlsObj.brMkt.bindMobile);
                break;
              case 2:
                window.open(mpUrlsObj.brMkt.bindEmail);
                break;
              case 3:
                beMarking.choosePrg(2);
            }
            //事件执行完替换事件，再次请求，判断是否完善过账户
            updAccountBtn[0].onclick = function(){
              //true代表不需要再次弹窗
              _this.queryUser(true);
            };
          };
          if(!data.mobile){
            updAccountBtn.html('去绑定手机号码');
            layer.tips('手机号没有绑定', '#' + _this.DOMId.updAccountBtn, {
              tips: [1, '#de143a'],
              time: 3000
            });
            updAccountBtn[0].onclick = function(){
              updAccountBtnFn(1);
            };
          }else if(!data.email){
            updAccountBtn.html('去绑定邮箱');
            layer.tips('邮箱没有绑定', '#' + _this.DOMId.updAccountBtn, {
              tips: [1, '#de143a'],
              time: 3000
            });
            updAccountBtn[0].onclick = function(){
              updAccountBtnFn(2);
            };
          }else{
            updAccountBtn[0].onclick = function(){
              updAccountBtnFn(3);
            };
          }
        }else{
          //错误关闭对话框
          layer.close(_this.selfObj.MktAccntDg);
          var loginUrl = data.data.loginUrl;
          var returnUrl = window.location.href;
          location.href = loginUrl + "?returnUrl=" + returnUrl;
        }
      }
    );
  }
});
var beMarking = new BeMarking();
beMarking.choosePrg(0);
beMarking.queryUser();