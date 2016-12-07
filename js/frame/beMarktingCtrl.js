/**
 * 说明：页面对应的js
 * Created by wangguangkai on 2016/12/7.
 */
define(
  ['BeMarkting'],
  function(BeMarkting){
    var beMarkting = new BeMarkting();
    beMarkting.queryUser();
    beMarkting.choosePrg(2)
  }
);