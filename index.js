/**
 * 说明：加载js
 * Created by wangguangkai on 2016/11/29.
 */
(function(){
  var vDate = new Date().getTime();
  var urlAys = [
    'images/app/js/common.js?v=' + vDate,
    'images/frame/js/beMarkting.js?v' + vDate,
  ];
  for(var i = 0; i < urlAys.length; i++){
    $.getScript(urlAys[i]);
  }
})();

