var $returnFun = {};
var validate = Class.extend({
	cfg: {},
	form: new Object(),
	validateObj: new Object(),
	init: function(cfg){
		this.cfg = cfg;
		this.form = $('#'+this.cfg.formID);
		var cfgObj = {
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,
			ignore: ".ignore",
			onsubmit: false,
			highlight : function(element) {
				$(element).closest('.common-group').addClass('has-error');
			},
			success : function(label) {
				label.closest('.common-group').removeClass('has-error');
				label.remove();
			},
			errorPlacement : function(error, element) {
				/*element.parent('div').append(error);
				if(element.context.id=='yanZhengMa'){
					element.closest('.col-sm-7').append(error);
				}
				if(element.context.id=='foundTime'){
					element.closest('.datepicker').append(error);
				}*/
				element.closest('.common-group').append(error);
			}
		};
		if(this.cfg.rules){
			cfgObj.rules = this.cfg.rules;
		}
		if(this.cfg.messages){
			cfgObj.messages = this.cfg.messages;
		}
		if(this.cfg.onfocusout){
			cfgObj.onfocusout = function(element) {
				var result = $(element).valid();
				if($returnFun[$(element).attr('id')]){
					$returnFun[$(element).attr('id')](element, result);
				}
			}
		}
		this.validateObj = this.form.validate(cfgObj);
	},
	validateForm: function(){
		return this.validateObj.form();
	},
	addRule: function(ruleName, rule, msg){
		$.validator.addMethod(ruleName, rule, msg);
	},
	addReturnFun: function(fieldName, returnFun){
		$returnFun[fieldName] = returnFun;
	},
	addRule4Element: function(elementID, rule){
		$('#' + elementID).rules("add", rule);
	},
	removeRule4Element: function(elementID, rule){
		$('#' + elementID).rules("remove", rule);
	},
	resetForm:function(){
		$('.help-block').remove();
		$('.has-error').toggleClass('has-error');
	},
	resetElement:function(elementID){
		var elementParent = $('#'+elementID).closest('.common-group')
		elementParent.removeClass('has-error');
		elementParent.find('.help-block').remove();
	}
});


//手机号码验证
$.validator.addMethod("isMobile",function(value, element) {
	var length = value.length;
	return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/.test(value));
}, "请正确填写您的手机号码。");

//电话号码验证
$.validator.addMethod("isPhone", function(value, element) {
	var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
	return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码。");

//联系电话(手机/电话皆可)验证
$.validator.addMethod("isTel", function(value, element) {
	var length = value.length;
	var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
	var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
	return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
}, "请正确填写您的联系方式");

//只能输入[0-9]数字
$.validator.addMethod("isDigits", function(value, element) {
	return this.optional(element) || /^\d+$/.test(value);
}, "只能输入0-9数字");

//船舶识别号验证15-12-04
$.validator.addMethod("isAllowedShipNo", function(value, element) {
	var length = value.length;
	var allowedNo = /^CN[1-9][0-9]{3}\d{7}$/;
	return this.optional(element)  || (length == 13 && allowedNo.test(value));
}, "请输入正确的船舶识别号。");

//船舶登记号验证 15-12-04
$.validator.addMethod("isAllowedShipRegNo", function(value, element) {
	var length = value.length;
	var allowedReg = /^[1-9][0-9]{3}[A-HJ-NP-Y](01|03|05|11|13|20|21|23|25|30|31|33|35|41|43|45|51|55|81|61|40|65|71|73|75|83|15)\d{5}$/;
	return this.optional(element)  || (length == 12 && allowedReg.test(value));
}, "请输入正确的船舶登记号。");


//判断数字英文字符
$.validator.addMethod("isDigitsAndEnglish", function(value, element) {
	return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
}, "只能包含数字和英文字符。");

//判断浮点型
$.validator.addMethod("isFloat", function(value, element) {
	return this.optional(element) || /^[+]?\d+(\.\d+)?$/.test(value);
}, "只能包含数字、小数点等字符");

//身份证验证
$.validator.addMethod("isIdCardNo", function(value, element) {
	return checkIdcard(value);
}, "请输入正确的身份证号码。");

//匹配密码，以字母开头，长度在6-18之间，只能包含字母、数字和下划线。
$.validator.addMethod("isPwd", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9_]{6,18}$/.test(value);
}, "长度在6-18之间，只能包含字母、数字和下划线。");

$.validator.addMethod("isSpacek", function(value, element) {
	//return value.indexOf(' ') < 0 && value.indexOf('　') < 0;
	return this.optional(element) || /^[\u4E00-\u9FA5a-zA-Z0-9_]{6,18}$/.test(value);
}, "长度在6-18之间，只能包含中文、字母、数字和下划线。");

//判断英文字符
$.validator.addMethod("isEnglish", function(value, element) {
	return this.optional(element) || /^[A-Za-z]+$/.test(value);
}, "只能包含英文字符。");

//判断中文字符
$.validator.addMethod("isChinese", function(value, element) {
	return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
}, "只能包含中文字符。");

//判断是否为合法字符(a-zA-Z0-9-_)
$.validator.addMethod("isRightfulString", function(value, element) {
	return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
}, "只能包含字母、数字、下划线等字符");

//判断是否为合法金额
$.validator.addMethod("isMoney", function(value, element) {
	return this.optional(element) || /(^[1-9]\d{0,9}(\.\d{1,2})?$)/.test(value) || /(^0\.([1-9]\d{0,1}|0[1-9])$)/.test(value);
}, "金额不符合要求");

//字符验证，只能包含中文、英文、数字、下划线等字符。
$.validator.addMethod("stringCheck", function(value, element) {
	return this.optional(element)
			|| /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
}, "只能包含中文、英文、数字、下划线等字符");

//非零数字
$.validator.addMethod("noZero", function(value, element) {
	return this.optional(element)
			|| /^(?:[1-9]\d{0,8}(?:\.\d{1,8})?|0\.\d{1,8})$/.test(value);
}, "只能包含非零数字");

//判断不能多于1位小数
$.validator.addMethod("checkDecimal1", function(value, element) {
	var result=true;
	if(value.indexOf(".")>=0){
		value=value.substring(value.indexOf(".")+1);
		if(value.length>1){
			result= false;
		}
	}
	return result;
}, "小数位最多1位。");

//判断不能多于2位小数
$.validator.addMethod("checkDecimal2", function(value, element) {
	var result=true;
	if(value.indexOf(".")>=0){
		value=value.substring(value.indexOf(".")+1);
		if(value.length>2){
			result= false;
		}
	}
	return result;
}, "小数位最多2位。");

//判断不能多于几位小数，验证消息最好按需要重写
$.validator.addMethod("checkDecN", function(value, element, param) {
	var result=true;
	var decLength=param[0];
	if(value.indexOf(".")>=0){
		value=value.substring(value.indexOf(".")+1);
		if(value.length>decLength){
			result= false;
		}
	}
	return result;
}, "小数位数超限。");

//数字上限值的验证，参数依次为整数位位数，小数位位数
$.validator.addMethod("checkMaxNumber", function(value, element,param) {
	var intCount=param[0];//整数位数
	var maxVal=1;
	for(var i=0;i<intCount;i++){		
		maxVal+='0';
	}
	maxVal=Number(maxVal);
	//当有小数位数的时候
	if(param.length>1){
		var decCount=param[1];//小数位数
		var decVal=1;
		for(var i=0;i<decCount;i++){		
			decVal*=0.1;
		}
		maxVal-=decVal;
	}
	var result=true;
	if(value>maxVal){
		result=false;
	}
	return result;
}, "数字超过上限。");

//判断不能小于0
$.validator.addMethod("checkLessZero", function(value, element) {
	var result = false;
	value=value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	!/\d+/.test(value)?result=true:value>0?result=true:null;
	return result;   
},'必须大于零');
function checkIdcard(idcard){
	if(null == idcard || undefined == idcard || "" == idcard){
		return true;
	}
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",
			37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
			63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
	var idcard,Y,JYM; 
	var S,M; 
	var idcard_array = new Array(); 
	idcard_array = idcard.split(""); 
	
	//地区检验 
	if(area[parseInt(idcard.substr(0,2))]==null){
		return false; 
	}
	//身份号码位数及格式检验 
	switch(idcard.length){ 
		case 15: 
			if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){ 
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
				//测试出生日期的合法性 
			} else { 
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
				//测试出生日期的合法性 
			} 
	
			if(ereg.test(idcard)){ 
				return true; 
			}else{ 
				return false;
			}
			break; 
		case 18: 
			//18位身份号码检测 
			//出生日期的合法性检查 
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9])) 
			//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
			if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){ 
				ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
				//闰年出生日期的合法性正则表达式 
			} else { 
				ereg=/^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
				//平年出生日期的合法性正则表达式 
			} 
			if(ereg.test(idcard)){//测试出生日期的合法性 
				//计算校验位 
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 
				+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 
				+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 
				+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 
				+ parseInt(idcard_array[9]) * 3 ; 
				Y = S % 11; 
				M = "F"; 
				JYM = "10X98765432"; 
				M = JYM.substr(Y,1);//判断校验位 
				if(M == idcard_array[17].toUpperCase()) {
					return true; //检测ID的校验位 
				}else{
					return false;
				}
			}else{
				return false;
			}
			break; 
		default: 
			return false; 
			break; 
	} 
}
//判断是否为合法营业执照注册号
$.validator.addMethod("isBusinessLicenseNum", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "只能包含大写字母、数字等字符");
