#/————————————
#-脚本类型: 苹果App打包  -
#-编写名称: 姜脉脉       -
#-编写日期: 2016/09/06   -
#-------------------------
#!/bin/bash  


#打包工程路径
PROJECT_PATH=${1}
#IPA安装包名称
IPA_NAME=${2}
#APP_ID应用唯一标识
APP_ID=${3}
#IPA版本号
VERSION=${4}
#证书密码
P12PASSWORD=${5}
#证书存放路径
P12PATH=${6}
#授权文件路径
MOBILEPROVISION_PATH=${7}
#结果目录
TARGET_PATH=${8}
#插件目录
PLUGIN_PATH=${9}
#插件
PLUGINS=${10}
#图标路径
ICON_BASE_PATH=${11}
#是否显示状态栏
STATE_BAR=${12}
#屏幕设置
SCREEN_TYPE=${13}
#生成包类型Debug、Base、Release
CONFIGURATION=${14}
#是否使用兴业加密
isUseIndustrialBankEncrypt=${15}
#客户器端证书地址
IndustrialBankClientCertificate=${16}
#是否使用https
isUseHttps=${17}
#是否通道压缩
isUseGzip=${18}
#客户器端证书地址
ClientCertificate=${19}
#客户端器端证书密码
ClientCertificatePass=${20}
#上次打包所用插件
OLD_PLUGINS=${21}
#Jre路径
ENVY_JAVA=${22}
#NODEJS路径
ENVY_NODE=${23}
#RN路径
ENVY_RN=${24}
#应用ID后端生成
APPLICATION_ID=${25}

#服务器地址
INTERFACE_URL=${26}

#http端口
HTTP_PORT=${27}

#HTTPS端口
HTTPS_PORT=${28}

#是否打开应用完整性校验
IS_CHECKINTEGRITY=${29}

#是否更换启动页
IS_CHANGELAUNCH=${30}

#更换启动页1
ICHANGE_LAUNCH1=${31}
#更换启动页2
ICHANGE_LAUNCH2=${32}
#更换启动页3
ICHANGE_LAUNCH3=${33}

#QQ
SHARE_QQ_ID=${34}
#微信
SHARE_WECHAT_ID=${35}
#新浪微博
SHARE_SINA_ID=${36}
#构建版本
BUILD_VERSION=${37}
#是否加密参数
IS_PRODUCTION=${38}

#日志地址
LOGFILE=${TARGET_PATH}/`date +%Y%m%d%T`IOS.log

export PATH=/usr/local/bin:/usr/bin:$PATH:${ENVY_NODE}:${ENVY_RN}

export JAVA_HOME=${ENVY_JAVA}

echo "配置PATH: ${PATH}">>$LOGFILE

echo "配置JAVA_HOME: ${JAVA_HOME}">>$LOGFILE

#export NODE_BINARY=${ENVY_NODE}

#脚本路径
SHELL_PATH=`dirname $0`

chmod -R 777 ${PROJECT_PATH}/*

cd ${SHELL_PATH}

#CODE_SIGN_IDENTITY
if [[ "$CONFIGURATION" = "Release" ]] || [[ "$CONFIGURATION" = "Base" ]]
	then
	CODE_SIGN_IDENTITY=$(${JAVA_HOME}/java KeyStoreUtils "${P12PATH}" "${P12PASSWORD}" "CN")>>$LOGFILE
	#开发者团队
	TEAM_ID=$(${JAVA_HOME}/java KeyStoreUtils "${P12PATH}" "${P12PASSWORD}" "OU")>>$LOGFILE

	#获取mobileprovision的UUID
	UUID=`grep UUID -A1 -a ${MOBILEPROVISION_PATH} | grep -io "[-A-Z0-9]\{36\}"`
fi
#打包服务配置文件
CONFIG_PATH=$PROJECT_PATH/iosConfig.cfg
if [[ "$CONFIGURATION" = "Base" ]]
then
CONFIG_PATH=$PROJECT_PATH/iosConfigBase.cfg

elif [[ "$CONFIGURATION" = "Release" ]] || [[ "$CONFIGURATION" = "Debug" ]]
then
CONFIG_PATH=$PROJECT_PATH/iosConfig.cfg
fi

echo "读取打包服务中配置文件: ${CONFIG_PATH}">>$LOGFILE

while read line; do

name=`echo $line|awk -F '=' '{print $1}'`
value=`echo $line|awk -F '=' '{print $2}' | awk -F ';' '{print $1}'`

case $name in
"PACKAGE_PATH")
#配置文件*-info.plist模版存放路径
PACKAGE_PATH=$value
echo "打包相对路径: ${PACKAGE_PATH}">>$LOGFILE
;;
"INFO_PLIST_PATH")
#配置文件*-info.plist模版存放路径
INFO_PLIST_PATH=$value
echo "配置文件*-info.plist模版存放路径: ${INFO_PLIST_PATH}">>$LOGFILE
;;
"PLIST_NAME")
#生成.plist文件名称
PLIST_NAME=$value
echo "生成.plist文件名称: ${PLIST_NAME}">>$LOGFILE
;;
"WORKSPACE_NAME")
#WORKSPACE名称
WORKSPACE_NAME=$value
echo "WORKSPACE名称: ${WORKSPACE_NAME}">>$LOGFILE
;;
"SCHEME_NAME")
#SCHEME名称
SCHEME_NAME=$value
echo "SCHEME名称: ${SCHEME_NAME}">>$LOGFILE
;;
"FRAMEPLIST")
#框架选型的plist位置
FRAMEPLIST=$value
echo "框架选型的plist位置: ${FRAMEPLIST}">>$LOGFILE
;;
"ICONPATH")
#应用图标文件目标地址
ICON_PATH=$value
echo "应用图标文件目标地址: ${ICON_PATH}">>$LOGFILE
;;

"LAUNCHPATH1")
#启动页1
LAUNCHPATH1=$value
echo "启动页1: ${LAUNCHPATH1}">>$LOGFILE
;;

"LAUNCHPATH2")
#启动页2
LAUNCHPATH2=$value
echo "启动页2: ${LAUNCHPATH2}">>$LOGFILE
;;

"LAUNCHPATH3")
#启动页3
LAUNCHPATH3=$value
echo "启动页3: ${LAUNCHPATH3}">>$LOGFILE
;;

"RESOURCE_PATH")
#证书文件目标地址
RESOURCE_PATH=$value
echo "证书文件目标地址: ${RESOURCE_PATH}">>$LOGFILE
;;
"RESOURCE_PATH_PREFIX")
#证书资源存放位置前缀
RESOURCE_PATH_PREFIX=$value
echo "证书资源存放位置前缀: ${RESOURCE_PATH_PREFIX}">>$LOGFILE
;;
*)
;;
esac
done < $CONFIG_PATH
#build文件夹路径
BUILD_PATH=${PROJECT_PATH}${PACKAGE_PATH}build
#plist文件路径
APP_PLIST_PATH=${PROJECT_PATH}${INFO_PLIST_PATH}${PLIST_NAME}
#ProjectSetting文件路径
PRO_PLIST_PATH=${PROJECT_PATH}${INFO_PLIST_PATH}/OtherResource/ProjectSetting.plist
#框架选型plist路径
FRAME_PLIST_PATH=${PROJECT_PATH}${FRAMEPLIST}

echo "打包工程路径: ${PROJECT_PATH}">>$LOGFILE
echo "plist文件路径: ${APP_PLIST_PATH}">>$LOGFILE
echo "IPA安装包名称: ${IPA_NAME}">>$LOGFILE
echo "APP_ID应用唯一标识: ${APP_ID}">>$LOGFILE
echo "版本号: ${VERSION}">>$LOGFILE
echo "证书密码: ${P12PASSWORD}">>$LOGFILE
echo "证书存放路径: ${P12PATH}">>$LOGFILE
echo "授权文件路径: ${MOBILEPROVISION_PATH}">>$LOGFILE
echo "需打包插件: ${PLUGINS}">>$LOGFILE
echo "需删除插件: ${OLD_PLUGINS}">>$LOGFILE
echo "脚本路径: ${SHELL_PATH}">>$LOGFILE
echo "CODE_SIGN_IDENTITY: ${CODE_SIGN_IDENTITY}">>$LOGFILE
echo "开发者团队ID：${TEAM_ID}">>$LOGFILE
echo "UUID ${UUID}">>${LOGFILE}
echo "build文件夹路径: ${BUILD_PATH}">>$LOGFILE
echo "应用图标文件源地址：${ICON_BASE_PATH}">>$LOGFILE
echo "应用图标文件目标地址：${ICON_PATH}">>$LOGFILE
echo "是否显示状态栏：${STATE_BAR}">>$LOGFILE
echo "屏幕设置：${SCREEN_TYPE}">>$LOGFILE
echo "是否使用RAS证书：${isUseIndustrialBankEncrypt}">>$LOGFILE
echo "是否使用HTTPS证书：${isUseHttps}">>$LOGFILE

echo "服务器地址：${INTERFACE_URL}">>$LOGFILE
echo "http端口：${HTTP_PORT}">>$LOGFILE
echo "https端口：${HTTPS_PORT}">>$LOGFILE
echo "是否完整性校验：${IS_CHECKINTEGRITY}">>$LOGFILE
echo "是否更换启动页：${IS_CHANGELAUNCH}">>$LOGFILE

echo "QQ分享：${SHARE_QQ_ID}">>$LOGFILE
echo "WeChat分享：${SHARE_WECHAT_ID}">>$LOGFILE
echo "Sina分享：${SHARE_SINA_ID}">>$LOGFILE

echo "构建版本：${BUILD_VERSION}">>$LOGFILE
echo "是否加密参数：${IS_PRODUCTION}">>$LOGFILE

if [[ "$CONFIGURATION" = "Release" ]] || [[ "$CONFIGURATION" = "Base" ]]
	then
	#echo "切换默认钥匙链生效">>$LOGFILE
	#security list-keychain -s "$HOME/Library/Keychains/login.keychain"

	#切换默认钥匙链
	echo "切换默认钥匙链为 login.keychain">>$LOGFILE
	security default-keychain -s "$HOME/Library/Keychains/login.keychain"

	#导入证书
	echo "导入证书 ${P12PATH}，密码 ${P12PASSWORD}">>$LOGFILE
	security import ${P12PATH}  -k login.keychain -t pub -f pkcs12 -P ${P12PASSWORD} -T /usr/bin/codesign

	#使新建钥匙串生效
	#echo "使钥匙串生效">>$LOGFILE
	#security default-keychain  -s "$HOME/Library/Keychains/login.keychain"

	SYS_MP_PATH="$HOME/Library/MobileDevice/Provisioning Profiles/"

	OUTPUT="${SYS_MP_PATH}$UUID.mobileprovision"

	echo "判断${SYS_MP_PATH}是否存在">>${LOGFILE}
	if [[ ! -x "${SYS_MP_PATH}" ]]; then
		echo "${SYS_MP_PATH}不存在，需要创建">>${LOGFILE}
		mkdir -p "${SYS_MP_PATH}"
	fi
	#系统存放mobileprovision地址
	#echo "复制 ${MOBILEPROVISION_PATH}到$OUTPUT">>${LOGFILE}

	#cp -r $MOBILEPROVISION_PATH "$OUTPUT">>${LOGFILE}
	open $MOBILEPROVISION_PATH
fi

#开始编译工程
cd ${PROJECT_PATH}
echo "进入根工程目录: ${PROJECT_PATH}">>$LOGFILE

#先移除上次插件
if [[ -n "$OLD_PLUGINS" ]]
then
	result=$(echo $OLD_PLUGINS | grep ",")
	if [[ "$result" != "" ]]
	then
	    var=${OLD_PLUGINS//,/ }    
		for element in $var 
		do
		    echo "删除插件："$element>>$LOGFILE
		    react-native unlink $element1>>$LOGFILE
		    npm run hgbuninstall $element1>>$LOGFILE
		    # npm run hgbunlink $element1>>$LOGFILE
		    #npm uninstall -s -D -O $element>>$LOGFILE
		done
	else
	    echo "删除插件："$OLD_PLUGINS>>$LOGFILE
	    react-native unlink $element1>>$LOGFILE
		npm run hgbuninstall $element1>>$LOGFILE
	    # npm run hgbunlink $OLD_PLUGINS>>$LOGFILE
	    #npm uninstall -s -D -O $OLD_PLUGINS>>$LOGFILE
	fi
else
	echo "上次打包未选任何插件："$OLD_PLUGINS>>$LOGFILE
fi

cd ${PROJECT_PATH}${PACKAGE_PATH}
echo "进入原生打包工程目录: ${PROJECT_PATH}${PACKAGE_PATH}">>$LOGFILE

echo "清理项目。。。">>$LOGFILE
xcodebuild clean -workspace "${WORKSPACE_NAME}" -scheme "${SCHEME_NAME}" -configuration "$CONFIGURATION" -UseModernBuildSystem=NO >>$LOGFILE || exit
echo "替换应用图标 ${ICON_BASE_PATH} ${PROJECT_PATH}${PACKAGE_PATH}${ICON_PATH}">>$LOGFILE
cp -r ${ICON_BASE_PATH} ${PROJECT_PATH}${PACKAGE_PATH}${ICON_PATH}

echo "删除 ${APP_PLIST_PATH} IndustrialBankHTTPChannel">>$LOGFILE
/usr/libexec/PlistBuddy -c 'Delete :IndustrialBankHTTPChannel' ${APP_PLIST_PATH}
echo "删除 ${APP_PLIST_PATH} HTTPChannel">>$LOGFILE
/usr/libexec/PlistBuddy -c 'Delete :HTTPChannel' ${APP_PLIST_PATH}

echo "判断是否更换启动页">>$LOGFILE 
if [[ $IS_CHANGELAUNCH = "true" ]]
	then
      echo "替换启动图片1 ${ICHANGE_LAUNCH1} ${PROJECT_PATH}${PACKAGE_PATH}${LAUNCHPATH1}">>$LOGFILE
      cp -r ${ICHANGE_LAUNCH1} ${PROJECT_PATH}${PACKAGE_PATH}${LAUNCHPATH1}
	  
	    echo "替换启动图片2 ${ICHANGE_LAUNCH2} ${PROJECT_PATH}${PACKAGE_PATH}${LAUNCHPATH2}">>$LOGFILE
      cp -r ${ICHANGE_LAUNCH2} ${PROJECT_PATH}${PACKAGE_PATH}${LAUNCHPATH2}
	  
	    echo "替换启动图片3 ${ICHANGE_LAUNCH3} ${PROJECT_PATH}${PACKAGE_PATH}${LAUNCHPATH3}">>$LOGFILE
      cp -r ${ICHANGE_LAUNCH3} ${PROJECT_PATH}${PACKAGE_PATH}${LAUNCHPATH3}


fi


echo "判断是否使用RAS证书">>$LOGFILE 
if [[ $isUseIndustrialBankEncrypt = "true" ]]
	then
	cp -r ${IndustrialBankClientCertificate} ${PROJECT_PATH}${PACKAGE_PATH}${RESOURCE_PATH}
	echo ${IndustrialBankClientCertificate##*/}
	RAS_NAME=${IndustrialBankClientCertificate##*/}

	echo "添加 ${PRO_PLIST_PATH} isUseIndustrialBankEncrypt 数组 值：true">>$LOGFILE
	/usr/libexec/PlistBuddy -c "Set IndustrialBankHTTPChannel:isUseIndustrialBankEncrypt true" ${PRO_PLIST_PATH}
	echo "添加 ${PRO_PLIST_PATH} IndustrialBankClientCertificate 数组 值：${RESOURCE_PATH_PREFIX}${RAS_NAME}">>$LOGFILE
	/usr/libexec/PlistBuddy -c "Set IndustrialBankHTTPChannel:IndustrialBankClientCertificate ${RESOURCE_PATH_PREFIX}${RAS_NAME}" ${PRO_PLIST_PATH}
fi
echo "判断是否使用HTTPS证书">>$LOGFILE 
if [[ $isUseHttps = "true" ]]
	then
	cp -r ${ClientCertificate} ${PROJECT_PATH}${PACKAGE_PATH}${RESOURCE_PATH}
	echo ${ClientCertificate##*/}
	HTTPS_NAME=${ClientCertificate##*/}

	echo "添加 ${PRO_PLIST_PATH} isUseGzip 数组 值：${isUseGzip}">>$LOGFILE
	/usr/libexec/PlistBuddy -c "Set HTTPChannel:isUseGzip ${isUseGzip}" ${PRO_PLIST_PATH}
	echo "添加 ${PRO_PLIST_PATH} isUseHttps 数组 值：true">>$LOGFILE
	/usr/libexec/PlistBuddy -c "Set HTTPChannel:isUseHttps true" ${PRO_PLIST_PATH}
	echo "添加 ${PRO_PLIST_PATH} ClientCertificate 数组 值：${RESOURCE_PATH_PREFIX}${HTTPS_NAME}">>$LOGFILE
	/usr/libexec/PlistBuddy -c "Set HTTPChannel:ClientCertificate ${RESOURCE_PATH_PREFIX}${HTTPS_NAME}" ${PRO_PLIST_PATH}
	echo "添加 ${PRO_PLIST_PATH} ClientCertificatePass 数组 值：${ClientCertificatePass}">>$LOGFILE
	/usr/libexec/PlistBuddy -c "Set HTTPChannel:ClientCertificatePass ${ClientCertificatePass}" ${PRO_PLIST_PATH}
fi
cd $PROJECT_PATH

#动态添加插件到项目
if [[ -n "${PLUGINS}" ]]
	then
	result1=$(echo $PLUGINS | grep ",")
	if [[ "$result1" != "" ]]
	then
	    var1=${PLUGINS//,/ }    
		for element1 in $var1 
		do
			echo "复制插件${PLUGIN_PATH}/${element1}到${PROJECT_PATH}/node_modules/${element1}下：">>$LOGFILE
			cp -r ${PLUGIN_PATH}/$element1 ${PROJECT_PATH}/node_modules/${element1}
		    echo "动态引入插件："$element1>>$LOGFILE
		    react-native link $element1>>$LOGFILE
		    npm run hgbinstall $element1>>$LOGFILE
		    # npm run hgblink $element1>>$LOGFILE
		done
	else
	    echo "复制插件${PLUGIN_PATH}/${PLUGINS}到${PROJECT_PATH}/node_modules/${PLUGINS}下：">>$LOGFILE
		cp -r ${PLUGIN_PATH}/$PLUGINS ${PROJECT_PATH}/node_modules/${PLUGINS}
	    echo "动态引入插件："$PLUGINS>>$LOGFILE
	    react-native link $PLUGINS>>$LOGFILE
	    npm run hgbinstall $element1>>$LOGFILE
	    # npm run hgblink $PLUGINS>>$LOGFILE
	fi
else
	echo "未选任何插件"$PLUGINS>>$LOGFILE
fi

#修改
echo "修改plist参数">>$LOGFILE
if [[ "$CONFIGURATION" = "Release" ]] || [[ "$CONFIGURATION" = "Base" ]]
	then
		echo "修改 ${APP_PLIST_PATH} CFBundleIdentifier 值为 ${APP_ID} ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Set CFBundleIdentifier ${APP_ID}" ${APP_PLIST_PATH}
fi

echo "修改 ${APP_PLIST_PATH} CFBundleName 值为 ${IPA_NAME}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set CFBundleName ${IPA_NAME}" ${APP_PLIST_PATH}
echo "修改 ${APP_PLIST_PATH} CFBundleDisplayName 值为 ${IPA_NAME}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set CFBundleDisplayName ${IPA_NAME}" ${APP_PLIST_PATH}
echo "修改 ${APP_PLIST_PATH} CFBundleShortVersionString 值为 ${VERSION} ">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set CFBundleShortVersionString ${VERSION}" ${APP_PLIST_PATH}
echo "修改 ${APP_PLIST_PATH} CFBundleVersion 值为 ${BUILD_VERSION} ">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set CFBundleVersion ${BUILD_VERSION}" ${APP_PLIST_PATH}

echo "删除 ${APP_PLIST_PATH} UIStatusBarHidden">>$LOGFILE
/usr/libexec/PlistBuddy -c 'Delete :UIStatusBarHidden' ${APP_PLIST_PATH}
echo "删除 ${APP_PLIST_PATH} UIRequiresFullScreen">>$LOGFILE
/usr/libexec/PlistBuddy -c 'Delete :UIRequiresFullScreen' ${APP_PLIST_PATH}
echo "删除 ${APP_PLIST_PATH} UISupportedInterfaceOrientations">>$LOGFILE
/usr/libexec/PlistBuddy -c 'Delete :UISupportedInterfaceOrientations' ${APP_PLIST_PATH}
echo "删除 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad">>$LOGFILE
/usr/libexec/PlistBuddy -c 'Delete :UISupportedInterfaceOrientations~ipad' ${APP_PLIST_PATH}

echo "修改状态栏属性">>$LOGFILE
if [[ "$STATE_BAR" = "false" ]]
	then
		echo "添加 ${APP_PLIST_PATH} UIStatusBarHidden 值为 false ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UIStatusBarHidden bool false" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UIRequiresFullScreen 值为 false ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UIRequiresFullScreen bool false" ${APP_PLIST_PATH}
	else
		echo "添加 ${APP_PLIST_PATH} UIStatusBarHidden 值为 true ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UIStatusBarHidden bool true" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UIRequiresFullScreen 值为 true ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UIRequiresFullScreen bool true" ${APP_PLIST_PATH}
fi

echo "修改屏幕属性">>$LOGFILE
if [[ "$SCREEN_TYPE" = "landscape" ]]
	then
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations array" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 值：UIInterfaceOrientationLandscapeLeft">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations: string UIInterfaceOrientationLandscapeLeft" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 值：UIInterfaceOrientationLandscapeRight">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations: string UIInterfaceOrientationLandscapeRight" ${APP_PLIST_PATH}

		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad array" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 值：UIInterfaceOrientationLandscapeLeft">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad: string UIInterfaceOrientationLandscapeLeft" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 值：UIInterfaceOrientationLandscapeRight">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad: string UIInterfaceOrientationLandscapeRight" ${APP_PLIST_PATH}

	elif [[ "$SCREEN_TYPE" = "portrait" ]]
		then
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations array" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 值：UIInterfaceOrientationPortrait">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations: string UIInterfaceOrientationPortrait" ${APP_PLIST_PATH}

		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad array" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 值：UIInterfaceOrientationPortrait">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad: string UIInterfaceOrientationPortrait" ${APP_PLIST_PATH}
	elif [[ "$SCREEN_TYPE" = "unspecified" ]]
		then
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations array" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 值：UIInterfaceOrientationPortrait">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations: string UIInterfaceOrientationPortrait" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 值：UIInterfaceOrientationLandscapeLeft">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations: string UIInterfaceOrientationLandscapeLeft" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations 数组 值：UIInterfaceOrientationLandscapeRight">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations: string UIInterfaceOrientationLandscapeRight" ${APP_PLIST_PATH}

		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 ">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad array" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 值：UIInterfaceOrientationLandscapeLeft">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad: string UIInterfaceOrientationPortrait" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 值：UIInterfaceOrientationLandscapeLeft">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad: string UIInterfaceOrientationLandscapeLeft" ${APP_PLIST_PATH}
		echo "添加 ${APP_PLIST_PATH} UISupportedInterfaceOrientations~ipad 数组 值：UIInterfaceOrientationLandscapeLeft">>$LOGFILE
		/usr/libexec/PlistBuddy -c "Add :UISupportedInterfaceOrientations~ipad: string UIInterfaceOrientationLandscapeRight" ${APP_PLIST_PATH}

fi

echo "修改 ${PRO_PLIST_PATH} channelNumber 值为 ${APPLICATION_ID}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set channelNumber ${APPLICATION_ID}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} INTERFACE_URL 值为 ${INTERFACE_URL}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set interfaceUrl ${INTERFACE_URL}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} httpPort 值为 ${HTTP_PORT}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set httpPort ${HTTP_PORT}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} httpsPort 值为 ${HTTPS_PORT}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set httpsPort ${HTTPS_PORT}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} isCheckIntegrity 值为 ${IS_CHECKINTEGRITY}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set isCheckIntegrity ${IS_CHECKINTEGRITY}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} QQShareID 值为 ${SHARE_QQ_ID}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set QQShareID ${SHARE_QQ_ID}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} WXShareID 值为 ${SHARE_WECHAT_ID}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set WXShareID ${SHARE_WECHAT_ID}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} WBShareKey 值为 ${SHARE_SINA_ID}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set WBShareKey ${SHARE_SINA_ID}" ${PRO_PLIST_PATH}

echo "修改 ${PRO_PLIST_PATH} isProduction 值为 ${IS_PRODUCTION}">>$LOGFILE
/usr/libexec/PlistBuddy -c "Set isProduction ${IS_PRODUCTION}" ${PRO_PLIST_PATH}

cd ${PROJECT_PATH}${PACKAGE_PATH}
echo "构建。。。">>$LOGFILE
if [[ "$CONFIGURATION" = "Release" ]] || [[ "$CONFIGURATION" = "Base" ]]
	then
		echo "构建Release项目。。。">>$LOGFILE
		xcodebuild -workspace "${WORKSPACE_NAME}" -scheme "${SCHEME_NAME}" -configuration "${CONFIGURATION}" CONFIGURATION_BUILD_DIR="${BUILD_PATH}" CODE_SIGN_IDENTITY="${CODE_SIGN_IDENTITY}" PROVISIONING_PROFILE="${UUID}" TEAM_ID="${TEAM_ID}" -UseModernBuildSystem=NO>>$LOGFILE 2>>$LOGFILE|| exit

elif [[ "$CONFIGURATION" = "Debug"  ]]; then
		echo "构建Debug项目。。。">>$LOGFILE
		xcodebuild -workspace "${WORKSPACE_NAME}" -scheme "${SCHEME_NAME}" -configuration "${CONFIGURATION}" CONFIGURATION_BUILD_DIR="${BUILD_PATH}" -sdk "iphonesimulator10.3" -UseModernBuildSystem=NO>>$LOGFILE 2>>$LOGFILE|| exit
fi
		#statements
echo "项目构建完成。。。">>$LOGFILE
#对编译后的项目进行打包
cd $BUILD_PATH
echo "进入构建目录: ${BUILD_PATH}">>$LOGFILE
if [ -d ./ipa ];then
echo "删除文件夹ipa">>$LOGFILE
rm -rf ipa
fi
mkdir -p ipa/Payload
echo "创建ipa临时文件夹: ipa/Payload">>$LOGFILE
cp -r *.app ./ipa/Payload/
echo "复制*.app 到/ipa/Payload/下">>$LOGFILE
cd ipa
echo "进入ipa下进行打包操作">>$LOGFILE
zip -r ${IPA_NAME}.ipa *
rm -rf Payload
cp -r *.ipa ${TARGET_PATH}
echo "删除临时目录Payload">>$LOGFILE
#打包完毕删除证书
echo "删除证书">>$LOGFILE
security delete-certificate -c "${CODE_SIGN_IDENTITY}" "$HOME/Library/Keychains/login.keychain">>$LOGFILE
echo "打包完成">>$LOGFILE
exit 0
