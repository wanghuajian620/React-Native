import { Alert } from 'react-native';
import Toast from 'cap4m/lib/Toast';
import Modal from 'cap4m/lib/Modal';
import ActionSheet from 'cap4m/lib/ActionSheet';


export const $Toast = {
    /**
     * 成功弹框
     * @param content
     * @param duration
     * @param onClose
     * @param mask
     */
    success(content, duration, onClose, mask) {
        Toast.success(content, duration, onClose, mask);
    },
    /**
     * 失败弹窗
     * @param content
     * @param duration
     * @param onClose
     * @param mask
     */
    fail(content, duration, onClose, mask) {
        Toast.fail(content, duration, onClose, mask);
    },
    /**
     * 详情
     * @param content
     * @param duration
     * @param onClose
     * @param mask
     */
    info(content, duration, onClose, mask) {
        Toast.info(content, duration, onClose, mask);
    },
    /**
     * loading加载
     * @param content
     * @param duration
     * @param onClose
     * @param mask
     */
    loading(content, duration, onClose, mask) {
        Toast.loading(content, duration, onClose, mask);
    },

    /**
     * 下线
     * @param content
     * @param duration
     * @param onClose
     * @param mask
     */
    offline(content, duration, onClose, mask) {
        Toast.offline(content, duration, onClose, mask);
    },

    /* 隐藏*/
    hide() {
        Toast.hide();
    }
};




export const $ActionSheet = {
    showActionSheetWithOptions: function (options, callback = () => { }) {
        ActionSheet.showActionSheetWithOptions(options, callback);
    },

    showShareActionSheetWithOptions: function (option, callback = () => { }) {
        const newOption = [];
        const message = option.message ? option.message : 'description';

        option.options.map((obj) => {
            if (obj instanceof Array) {
                obj = obj.map((data) => ({
                    icon: React.createElement('Image', {
                        source: data.url,
                        style: { width: 36 },
                    }),
                    title: data.title,
                }));
                newOption.push(obj);
            } else {
                newOption.push({
                    icon: React.createElement('Image', {
                        source: obj.url,
                        style: { width: 36 },
                    }),
                    title: obj.title,
                });
            }
        });
        option.options = newOption;
        option.message = message;

        ActionSheet.showShareActionSheetWithOptions(option, callback);
    },
};

export const $Modal = {
    // 普通提示框
    alert(title, message) {
        // 检测message类型
        if (typeof (message) === 'object' && Object.prototype.toString.call(message).toLowerCase() === '[object object]') {
            message = JSON.stringify(message);
        }
        if (title) {
            Modal.alert(title, message);
        } else {
            Modal.alert(message);
        }

        if (!message) {
            Alert.alert('参数缺失');
        }
    },
    // 确认提示框
    confirm(title, message, actions) {
        let defaultAction = [
            {
                text: '取消',
                onPress: () => { },
                style: 'default',
            },
            {
                text: '确定', onPress: () => { },
            },
        ];
        if (actions) {
            defaultAction = actions;
        }
        Modal.alert(title, message, defaultAction);
    },
    // 输入弹窗
    prompt(title, message, actions) {
        let defaultAction = [
            { text: '取消', onPress: () => console.log('标为未读被点击了') },
            { text: '确定', onPress: () => console.log('置顶聊天被点击了') },
        ];
        if (actions) {
            defaultAction = actions;
        }
        Modal.prompt(title, message, defaultAction);
    },
    // 操作弹窗
    operation(actions) {
        let defaultAction = [
            { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
            { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') },
        ];
        if (actions) {
            defaultAction = actions;
        }
        Modal.operation(defaultAction);
    },

};



