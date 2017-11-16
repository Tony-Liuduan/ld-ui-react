export default {

    password: (value, param) => ({
        validator: new RegExp('^[0-9a-zA-Z]{' + param[0] + ',' + param[1] + '}$').test(value),
        message: `请填写${param[0]}-${param[1]}位字母、数字`
    }),

    equal: (value, param) => ({
        validator: value === param[0],
        message: `两次输入${param[1]}不一致`
    }),

    age: (value, param) => {
        //根据身份证号判断年龄
        let today = new Date(),
            year = today.getFullYear(),
            month = today.getMonth() + 1,
            day = today.getDate(),

            age = year - value.substring(6, 10) - 1;

        if (value.substring(10, 12) < month || (value.substring(10, 12) == month && value.substring(12, 14) <= day)) {
            age++;
        }
        return {
            validator: 21 <= age && age <= 55,
            message: '对不起，您的年龄不符合准入要求'
        };
    },

    idNumber: (value) => ({
        validator: ((cardNum) => {
            //省份证号校验
            var aCity = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            },
                iSum = 0;

            if (!cardNum) {
                return false;
            }
            if (!cardNum.length == 18) {
                return false;
            }
            if (!/^\d{17}(\d|x)$/i.test(cardNum)) {
                return false;
            }
            cardNum = cardNum.replace(/x$/i, "a");
            if (aCity[parseInt(cardNum.substr(0, 2))] == null) {
                return false;
            }
            var sBirthday = cardNum.substr(6, 4) + "/" + Number(cardNum.substr(10, 2)) + "/" + Number(cardNum.substr(12, 2));

            var d = new Date(sBirthday);

            if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
                return false;
            }
            for (var i = 17; i >= 0; i--) {
                iSum += (Math.pow(2, i) % 11) * parseInt(cardNum.charAt(17 - i), 11);
            }
            if (iSum % 11 != 1) {
                return false;
            }
            return true;
        })(value),
        message: '请填写正确的身份证号'
    }),

    digital: (value) => ({
        validator: /^(?:[1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/.test(value),
        message: '请填写大于0数字(如：8.25)'
    }),

    // 整数范围
    intRange: (value, param) => ({
        validator: new RegExp('^[1-9]\\d*$', 'g').test(value) && parseInt(value) >= param[0] && parseInt(value) <= param[1],
        message: `请填写${param[0]}-${param[1]}的整数`
    }),

    // 数字范围
    digitalRange: (value, param) => ({
        validator: /^(?:[1-9]|[1-9]\d+)(\.\d{1,2})?$/.test(value) && parseFloat(value) <= param[1] && parseFloat(value) >= param[0],
        message: `还款金额请填写${param[0]}-${param[1]}的数字`
    }),

    // 整数位数范围
    number: (value, param) => {
        const start = param[0] <= 1 ? 0 : param[0] - 1,
            end = param[1] - 1;
        return {
            validator: new RegExp('^[1-9]\\d{' + start + ',' + end + '}$', 'g').test(value),
            message: `请填写${param[0]}-${param[1]}位正整数`
        };
    },

    // 邀请码数字范围
    inviteCode: (value, param) => {
        const start = param[0] <= 1 ? 0 : param[0] - 1,
            end = param[1] - 1;
        return {
            validator: new RegExp('^[1-9]\\d{' + start + ',' + end + '}$', 'g').test(value),
            message: `请填写${param[0]}-${param[1]}位数字`
        };
    },

    name: (value, param) => ({
        validator: new RegExp('^[\\u4e00-\\u9fa5\\u0028\\u0029\\uff08\\uff09]{' + param[0] + ',' + param[1] + '}$').test(value),
        message: `请填写${param[0]}-${param[1]}个中文`
    }),

    nameAddDot: (value, param) => ({
        validator: new RegExp('^[\\u4e00-\\u9fa5\\u0028\\u0029\\uff08\\uff09]{1}[\\u4e00-\\u9fa5\\u0028\\u0029\\uff08\\uff09·]{' + (param[0] - 2) + ',' + (param[1] - 2) + '}[\\u4e00-\\u9fa5\\u0028\\u0029\\uff08\\uff09]{1}$').test(value),
        message: `请填写${param[0]}-${param[1]}个中文`
    }),

    areacode: (value) => ({
        validator: /^(?:0\d{2}|0\d{3})$/.test(value),
        message: '请填写正确的区号'
    }),

    telephone: (value, param) => {
        let flag = undefined;
        // 区号校验通过，进行固化校验
        if (/^(?:0\d{2}|0\d{3})$/.test(param[0])) {
            const regexp = param[0].length == 3 ? (/^\d{8}$/) : /^\d{7,8}$/;

            flag = regexp.test(value);
        }
        return {
            validator: flag,
            message: typeof flag === 'undefined' ? '请填写正确的区号' : '请填写正确的固话'
        };
    },

    length: (value, param) => {
        const len = value.length;
        return {
            validator: len >= param[0] && len <= param[1],
            message: `请填写${param[0]}-${param[1]}个字符`
        };
    },

    // 银行卡检验规则，允许0开头(交通银行，修改：2017/2/7)
    bankCard: (value) => ({
        validator: /^\d{12,23}$/.test(value),
        message: '请填写正确的银行卡号'
    }),

    creditCard: (value) => ({
        validator: /^[1-9]\d{13,15}$/.test(value),
        message: '请填写正确的信用卡号'
    }),

    consistency: (value, param) => ({
        validator: value.trim() !== param[0].trim(),
        message: `${param[1]}与${param[2]}不能相同`
    }),

    idcardUnique: (value, param) => {
        let flag = true;
        const request = new XMLHttpRequest();
        request.open('POST', '/exist/identity', false);
        //发送合适的请求头信息
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        request.send(`idNumber=${value}`);
        if ((request.status >= 200 && request.status < 300) || request.status == 304) {
            const data = request.responseText;
            // 1：已注册，2:格式不对
            flag = ([1, 2].indexOf(data - 0) === -1);
        } else {
            flag = false;
        }

        return {
            validator: flag,
            message: '该身份证号已注册！'
        };
    },

    lt: (value, param) => ({
        validator: param[0] >= param[1],
        message: `可用余额${param[0]}<${param[1]}，暂不能提现！`
    }),

    // 数字范围 提示数字单位为万
    digitalRangeTwo: (value, param) => ({
        validator: /^(?:[1-9]|[1-9]\d+)(\.\d{1,2})?$/.test(value) && parseFloat(value / 10000) <= param[1] && parseFloat(value / 10000) >= param[0],
        message: `请填写${param[0]}万-${param[0]}万的数字`
    }),

    // 图形验证码
    imageCode: (value, param) => ({
        validator: new RegExp('^[0-9a-zA-Z]{' + param[0] + '}$').test(value),
        message: `请填写${param[0]}位图形验证码`
    }),

    // 短信验证码
    smsCode: (value, param) => ({
        validator: new RegExp('^[0-9]{' + param[0] + '}$').test(value),
        message: `请填写${param[0]}位短信验证码`
    }),

    // 月收入校验 特殊处理
    income: (value) => ({
        validator: /^(?:[1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/.test(value) && parseInt(value) >= 1000,
        message: '收入金额过小或格式错误(最多两位小数)'
    }),

    // 车架号验证
    VIN: (value, param) => ({
        validator: /^[A-HJ-NPR-Z0-9]{17}$/.test(value.toUpperCase()),
        message: '请输入正确的车架号'
    }),

    //车牌号验证
    carPlateNumber: (value) => ({
        validator: value.length == 7 && (/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(value)),
        message: '请输入正确的车牌号'
    })
};
