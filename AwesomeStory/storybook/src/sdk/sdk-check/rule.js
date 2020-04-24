/**
 * 插件方法参数校验配置
 * 配置说明
 * 1.需要与原生插件进行沟通确认，每个方法的参数的规则(是否必输,长度限制,邮箱日期格式等)
 * 2.以插件中方法名作为对象key值 
 * 3.配置参数作为key,express:支持表达式，message：当满足条件时提示错误信息
 * 4.多个参数或方法配置依次类推
 */

module.exports = {
    getMailList : {
        express: "val == 0 || val == 1",
        message: "参数只能为0或1"
    },
    addCalenderEvent : {
        title:{
            express : "val",
            message : "title参数值不能为空"
        },
        startDate : {
            express :  "(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/).test(val)",
            message: "startDate时间格式不是yyyy-mm-dd HH:ss"
        },
        endDate : {
            express :  "(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/).test(val)",
            message: "endDate时间格式不是yyyy-mm-dd HH:ss"
        },
        notes : {
            express : "val" ,
            message : "notes参数值不能为空"
        }
    },
    checkCalenderEvent : {
         startDate : {
            express :  "(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/).test(val)",
            message: "startDate时间格式不是yyyy-mm-dd HH:ss"
        },
        endDate : {
            express :  "(/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$/).test(val)",
            message: "endDate时间格式不是yyyy-mm-dd HH:ss"
        }
    },
    removeCalenderEvent : {
        eventIdentifier : {
            express : "val" ,
            message : "eventIdentifier参数不能为空"
        }
    },
    getCallPhone : {
        express : "(/^[0-9]*$/).test(val)",
        message :　"电话号码格式错误"
    },
    sendMail : {
        to : {
            express : "val && val.length > 0",
            message : "发送人不能为空",
            child :{
                express : "(/^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$/).test(val)",
                message : "邮箱格式错误",
            }
        },
        cc : {
             express : "true",
             message : "",
             child :{
                express : "(/^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$/).test(val)",
                message : "邮箱格式错误",
            }
        },
        bcc : {
             express : "true",
             message : "",
             child :{
                express : "(/^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$/).test(val)",
                message : "邮箱格式错误",
            }
        }
    },
    sendMessage : {
       phones : {
            express : "val && val.length > 0",
            message :　"电话号码不能为空",
            child :{
                express : "(/^[0-9]*$/).test(val)",
                message : "电话号码格式错误",
            }
       },
       message :　{
            express : "val",
            message : "message参数不能为空",
       }
    },
    openDefaultBrowser : {
          httpUrl : {
             express : "val" ,
             message : "httpUrl参数不能为空"
          },
          openType : {
              express: "val == 0 || val == 1",
              message: "openType参数只能为0或1"
          }
    },
    playAudio : {
        express: "val",
        message: "录音路径不能为空"
    },
    picture : {
        thumbnailWidth : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "thumbnailWidth参数只能为数字"
        },
        thumbnailHeight : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "thumbnailHeight参数只能为数字"
        },
        maxSelectCount : {
            express: "!val || (/^[0-9]*$/).test(val)",
            message: "maxSelectCount参数只能为数字"
        }
    },
    getPhoto : {
        thumbnailWidth : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "thumbnailWidth参数只能为数字"
        },
        thumbnailHeight : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "thumbnailHeight参数只能为数字"
        },
        allowsEditing : {
            express: "!val || typeof(val) == 'boolean' || val == 'true' || val == 'false'",
            message: "allowsEditing参数只能false或true"
        }
    },
    shearImage : {
        express: "val",
        message: "图片路径不能为空"
     },
     saveAlbum : {
        express: "val",
        message: "图片路径不能为空"
     },
     compressImage : {
        imagePath : {
            express: "val",
            message: "图片路径不能为空"
        },
        size : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "size参数只能为数字"
        },
        scale : {
            express: "!val || (/^([0-9]{1,}[.][0-9]+)$/).test(val) || (/^[0-9]*$/).test(val) ",
            message: "scale参数只能为数字"
        }
     },
    getMovie : {
        quality : {
            express: "!val || (/^[0-2]$/).test(val) ",
            message: "quality参数只能为数字0-2"
        },
        thumbnailWidth : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "thumbnailWidth参数只能为数字"
        },
        thumbnailWidth : {
            express: "!val || (/^[0-9]*$/).test(val) || (/^([0-9]{1,}[.][0-9]+)$/).test(val)",
            message: "thumbnailWidth参数只能为数字"
        }
    },
    mediaPlayer : {
        express: "val",
        message: "视频路径不能为空"
    },
    watermark : {
        imagePath : {
            express: "val",
            message: "图片路径不能为空"
        },
        text : {
            express: "val",
            message: "水印内容不能为空"
        },
        location : {
            express: "(/^[0-4]$/).test(val)",
            message: "水印位置只能能为0-4"
        },
        textsize : {
            express: "(/^[0-9]+$/).test(val)",
            message: "textsize参数只能为数字且不能为空"
        } 
    },
    saveFile : {
        content : {
            express: "val",
            message: "文件内容不能为空"
        },
        destinationPath : {
            express: 'val',
            message: "保存路径不能为空"
        }
    },
    fileExistsAtPath : {
        express: 'val',
        message: "文件路径不能为空"
    },
    getFileInfo : {
        express: 'val',
        message: "文件路径不能为空"
    },
    getAbsolutePath : {
        express: 'val',
        message: "文件路径不能为空"
    },
    readFile : {
        sourcePath : {
            express: 'val',
            message: "文件路径不能为空"
        }
    },
    copyFile : {
        sourcePath : {
            express: 'val',
            message: "文件路径不能为空"
        },
        destinationPath : {
            express: 'val',
            message: "目标路径不能为空"
        }
    },
    deleteFile : {
        express: 'val',
        message: "文件路径不能为空"
    },
    cutFile  : {
        sourcePath : {
            express: 'val',
            message: "文件路径不能为空"
        },
        destinationPath : {
            express: 'val',
            message: "目标路径不能为空"
        }
    },
    decompression : {
        sourcePath : {
            express: 'val',
            message: "文件路径不能为空"
        },
        destinationPath : {
            express: 'val',
            message: "目标路径不能为空"
        }
    },
    compress : {
        sourcePath : {
            express: 'val',
            message: "文件路径不能为空"
        },
        destinationPath : {
            express: 'val',
            message: "目标路径不能为空"
        }
    },
    saveDefaults : {
        key : {
            express: 'val',
            message: "key值不能为空"
        }
    },
    getDefaults : {
        key : {
            express: 'val',
            message: "key值不能为空"
        }
    },
    directoryExistsAtPath : {
        express: 'val',
        message: "文件夹路径不能为空"
    },
    createDirectory : {
        express: 'val',
        message: "文件夹路径不能为空"
    },
    deleteDirectory : {
        express: 'val',
        message: "文件夹路径不能为空"
    },
    getDirectorySubpaths : {
        sourcePath : {
            express: 'val',
            message: "文件夹路径不能为空"
        },
        locateFileType : {
            express: '!val || (/^[0-1]$/).test(val)',
            message: "locateFileType参数只能为0-1"
        }
    },
    init : {
        key : {
            express: 'val',
            message: "key参数不能为空"
        },
        url : {
            express: 'val',
            message: "url参数不能为空"
        },
        post : {
            express: '!val || (/^[1-2]$/).test(val)',
            message: "post参数只能为1-2"
        },
        postTime : {
            express: '!val || (/^[0-9]+$/).test(val)',
            message: "postTime参数只能为数字"
        },
        sessionTime : {
            express: '!val || (/^[0-9]+$/).test(val)',
            message: "sessionTime参数只能为数字"
        },
        isDebug : {
            express: " !val || typeof(val) == 'boolean' || val == 'true' || val == 'false'",
            message: "isDebug参数只能为true或者false"
        },
        isUpdate : {
            express: " !val || typeof(val) == 'boolean' || val == 'true' || val == 'false'",
            message: "isUpdate参数只能为true或者false"
        },
        isUpdateOnline : {
            express: " !val || typeof(val) == 'boolean' || val == 'true' || val == 'false'",
            message: "isUpdateOnline参数只能为true或者false"  
        },
        isUpdateOnlyWIFI : {
            express: " !val || typeof(val) == 'boolean' || val == 'true' || val == 'false'",
            message: "isUpdateOnlyWIFI参数只能为true或者false"  
        },
        isSendLocation : {
            express: " !val || typeof(val) == 'boolean' || val == 'true' || val == 'false'",
            message: "isSendLocation参数只能为true或者false"  
        }
    },
    startPage : {
        express: 'val',
        message: "页面ID不能为空"
    },
    endPage : {
        express: 'val',
        message: "页面ID不能为空"
    },
    click : {
        express: 'val',
        message: "事件描述不能为空"
    },
    uploadLog : {
        express: 'val',
        message: "上传路径不能为空"
    },
    recordJsLog : {
        express: 'val',
        message: "日志信息不能为空"
    },
    onKeyboard : {
        isUp : {
            express: '!val || (/^[0-1]$/).test(val)',
            message: "isUp参数只能为能为0-1"
        },
        isRandom : {
            express: '(/^[0-1]$/).test(val)',
            message: "isRandom参数不能为空且只能为能为0-1"
        }
    },
    initHttps : {
        initURL : {
            express: 'val',
            message: "initURL参数不能为空"
        },
        saveUpSecURL : {
            express: 'val',
            message: "saveUpSecURL参数不能为空"
        }
    },
    uploadFile : {
        url : {
            express: 'val',
            message: "url参数不能为空"
        }
    },
    filesDownload : {
        remoteUrl : {
            express: 'val',
            message: "remoteUrl参数不能为空"
        }
    },
    execSQLite: {
        express: 'val',
        message: "sql语句不能为空" ,
    },
    querySQLite : {
        sql : {
            express: 'val',
            message: "sql参数不能为空"
        }
    }
}