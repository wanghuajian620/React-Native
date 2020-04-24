 //校验码表字段长度
 function onValidationDict(e1,e2){
    if (e1.isValid) {
       if ((e1.value+"").getBytes() > e2) {
           e1.errorText = String.format(message.validation.codeTableErrorMsg,e2);
           e1.isValid = false;
       }
   }
}

//校验码表字段长度
function onValidationDictEqual(e1,e2){
    if (e1.isValid) {
        if(e1.value){
            if ((e1.value+"").getBytes() != e2) {
           e1.errorText = String.format(message.validation.codeTableNotEqualErrorMsg,e2);
           e1.isValid = false;
           }
        }
   }
}
//校验输入不能全为空格
function onBlankValidation(e){
    if(e.value != null && e.value.length > 0 && e.value.trim().length == 0){
         e.errorText = message.common.blank;
         e.isValid = false;
    }
}

//校验电话号码格式
function onPhoneValidation(e) {
   //通常电话号码分为3种格式，1区号是3为，其他是8位；2区号是4位，其他是7位；3区号是4位，其他是8位数字
      var pattern = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
   if (e.value!="" && pattern.test(e.value) == false) {
       e.errorText = message.staff.invalidPhone;
       e.isValid = false;
   }
}
//开始日期必须小于结束日期
function onBeginDateValidation(e,endDatePicker){
   var begin = e.sender.value;
   var end = endDatePicker.value;
   if(!begin||!end){
       e.isValid = true;
       endDatePicker.setIsValid(true);
       return;
   }
   if (e.isValid) {
       if (begin > end) {
           e.errorText = message.common.beginDateValidationMsg;
           e.isValid = false;
       }else{
           endDatePicker.setIsValid(true);
       }
       
   }
}
//结束日期必须大于开始日期
function onEndDateValidation(e,beginDatePicker){
   var begin = beginDatePicker.value;
   var end = e.sender.value;
   if(!begin||!end){
       e.isValid = true;
       beginDatePicker.setIsValid(true);
       return;
   }
   if (e.isValid) {
       if (begin > end) {
           e.errorText = message.common.endDateValidationMsg;
           e.isValid = false;
       }else{
           beginDatePicker.setIsValid(true);
       }
   }
}

//字符串取长度，汉字长度为2
String.prototype.getBytes = function() {    
   var cArr = this.match(/[^\x00-\xff]/ig);    
   return this.length + (cArr == null ? 0 : cArr.length); 
}

function changeButtonPosition(container){
   var okBtn = getOkBtn(container);
   var cancelBtn = getCancelBtn(container);
   var okIndex = okBtn.index();
   var cancelIndex = cancelBtn.index();
   //确定按钮右》左
   if(needChange()){
       //换样式
       changeStyle(okBtn, cancelBtn);
       //移除按钮
       okBtn = okBtn.remove();
       cancelBtn = cancelBtn.remove();
       //Ok、cancel之外是否还有其它元素，有的话插在其它元素之前
       var tmp1 = container.children().get(cancelIndex);
       if(tmp1){
           okBtn.insertBefore(tmp1);
       }else{
           container.append(okBtn);
       }
       var tmp2 = container.children().get(okIndex);
       if(tmp2){
           cancelBtn.insertBefore(tmp2);
       }else{
           container.append(cancelBtn);
       }
   }
}

function changeStyle(okBtn, cancelBtn){
   var okBtnStyle = okBtn.attr("style");
   var okBtnClass = okBtn.attr("class");
   var cancelBtnStyle = cancelBtn.attr("style");
   var cancelBtnClass = cancelBtn.attr("class");
   //清除原样式
   okBtn.removeAttr("style").removeAttr("class");
   cancelBtn.removeAttr("style").removeAttr("class");
   //添加新样式
   okBtn.attr("style",cancelBtnStyle);
   okBtn.attr("class",cancelBtnClass);
   cancelBtn.attr("style",okBtnStyle);
   cancelBtn.attr("class",okBtnClass);
   
}

function needChange() {
   return top.okBtnPosition=="left";
}

function getOkBtn(container) {
   var okBtn = container.find("[iconCls=icon-ok]");
   var saveBtn = container.find("[iconCls=icon-save]");
   if(okBtn.length > 0) {
       return okBtn;
   }else {
       return saveBtn;
   };
}

function getCancelBtn(container) {
   var closeBtn = container.find("[iconCls=icon-close]");
   var cancelBtn = container.find("[iconCls=icon-cancel]");
   if(closeBtn.length > 0) {
       return closeBtn;
   }else {
       return cancelBtn;
   }
}

//弹出DSM策略配置自定义窗口
var openSelectStaff = function(gnbm,callFunction) {
  var bizData = {
       id : gnbm
  };
   var url = appContext + "/documentEncryptGroupDetail/isShowStaff.do";
   var ajaxConf = new Cap4jAjaxConf();
   ajaxConf.setIsShowSuccMsg(false);
   ajaxConf.setIsAsync(false);
   ajaxConf.setErrorFunc(waitClick);
   ajaxConf.setSuccessFunc(function(info) {
       if (info != null && info.data == true)
       {
           
            var urlSatff = "documentEncryptGroupDetail/showStaff.do?id=" + bizData.id;
            $J.showmodaldialog(message.dsm.dsmconfig, $J.formatUrl(urlSatff), 680, '70%', null, function() {
                   callFunction();
            },false, true);
       } else {
           callFunction();
       }
   });

   $J.postByAjax(bizData, $J.formatUrl(url), ajaxConf);
};

//弹出等待窗口
function waitClick() {
   var messageid = $J.showProcessBar();
   setTimeout(function () {
       $J.closeProcessBar(messageid);
   }, 4000);
}

/*自定义vtype*/
// nui.VTypes["maxByteLengthErrorText"] = message.dsm.maxLength;
// nui.VTypes["maxByteLength"] = function (v) {
//    return v.getBytes() <= 255;
// };


//校验码获取
function jymEncrypt(str) {
   var buf = "";
   for (var i = 0; i < str.length; i++) {
          var cx = str.charCodeAt(i) + 1;
          var word =  cx.toString();
          var len =  word.length.toString();
          buf +=len;
          buf +=word;
   }
   return buf;
}

//检验密码复杂度
export function passwordLevel(password) {
   
   var modes = 0;
   for (var i = 0; i < password.length; i++) {
      modes |= charMode(password.charCodeAt(i));

   }
   
   return bitToal(modes);
   
   function charMode(iN) {
      if (iN >= 48 && iN <=57) {
       //数字
       return 1;
      }
      if (iN >=65 && iN <=90) {
        //大写字母
        return 2;
      }
      if ((iN >= 97 && iN <= 122)|| (iN >=65 && iN <=90)) {
         //大小写字母
         return 3;
      }
      else  {
        //特殊字符
        return 8;
      }
   }
   
   function bitToal(num) {
     modes = 0;
     for (var j =0; j < 4; j++) {
       if (num & 1) 
           modes++;
       num >>>=1;
     }
     
     return modes;
   }

}

/**
* 字符串替换
* @param str 待处理的字符串
* @param regexStr 正则字符串
* @param replacement 替换字符
* @returns 替换后的字符串
*/
function strFilter(str,regexStr,replacement){
   if (typeof str !== "string") return str;
   if(!regexStr) return str;
   if (typeof regexStr !== "string") return str;
   if(!replacement) replacement = '';
   if (typeof replacement !== "string") return str;
   var regex = new RegExp("["+regexStr+"]","g");
   return str.replace(regex,replacement);
}



