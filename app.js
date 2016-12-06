/**
 * 说明：require加载资源的js
 * Created by wangguangkai on 2016/12/6.
 */

require.config({
  baseUrl: '../',
  paths: {
    'jQuery': 'js/app/jquery-1.11.0',
    'Common': 'js/app/common',
    'layer': 'js/layer-v3.0.1/layer',
    'jquery.validate': 'js/validation/jquery.validate',
    'validate': 'js/validation/validate',
    'urls': 'js/app/urls',
    'beMarkting': 'js/frame/beMarkting',
  },
  shim: {
    'Common':{
      
    }
  }
});