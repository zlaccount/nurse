<!---->
<template>
    <div class="payed">
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell
                    title="微信支付"
                    title-class="radioIcon"
                    icon="shop"
                    clickable
                    @click="radio = '1'"
                >
                    <van-radio name="1" />
                </van-cell>
                <van-cell
                    title="余额支付"
                    title-class="radioIcon"
                    icon="location"
                    clickable
                    @click="radio = '2'"
                >
                    <van-radio name="2" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <div class="payBtn">
            <a
                href="javascript:void(0)"
                @click="seeQuestion"
                class="seeQuestion"
            >
                对押金规则不清楚？</a
            >
            <van-button type="default" @click="payBtn">
                <span>充值押金</span> <span>支付</span>
            </van-button>
        </div>
        <!--对押金规则不清楚？  -->
        <div class="directions">
            <van-popup
                v-model="directionIsShow"
                position="right"
                :overlay="false"
            >
                <van-nav-bar
                    fixed
                    title="使用说明"
                    left-arrow
                    @click-left="directionBack"
                >
                </van-nav-bar>
                <div class="topblank"></div>
                <direction_comp></direction_comp>
            </van-popup>
        </div>
        <!-- 余额支付弹框 -->

        <div class="balancePayPop">
            <van-dialog
                v-model="balancePayPop"
                confirm-button-text="确定支付"
                :before-close="payBeforeClose"
            >
                <div class="confirmCon">
                    <h4>验证支付</h4>
                    <p>
                        付款验证：<span
                            >本次交易需要短信确认，验证码将发送至您的手机151xxxxx94</span
                        >
                    </p>
                    <van-cell-group>
                        <van-field
                            v-model="sms"
                            clearable
                            placeholder="请输入短信验证码"
                        >
                            <van-button
                                slot="button"
                                :class="{ disabled: !this.canClick }"
                                @click="countDown"
                                size="small"
                                >{{ content }}</van-button
                            >
                        </van-field>
                    </van-cell-group>
                </div>
            </van-dialog>
        </div>
    </div>
</template>

<script>
// 公共js
import common from "common/js/common.js";

import { ERR_OK } from "api/config";

import { getcode, checkcode } from "api/islogin";

export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        // 这里存放数据
        return {
            // 开关
            balancePayPop: false, // 是否开启余额支付
            payresultIsShow: false, // 支付结果
            directionIsShow: false, // 使用说明是否打开
            radio: "1",
            payActive: 0,
            sms: "",
            content: "发送验证码",
            totalTime: 60,
            canClick: true // 添加canClick
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        countDown() {
            let phone = this.phone;
            let that = this;
            if (phone === "") {
                if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
                    that.$toast("手机号码有误，请重填");
                    return false;
                }
            }
            if (!that.canClick) return;
            that.canClick = false;
            that.content = that.totalTime + "s后重新发送";
            let clock = window.setInterval(() => {
                that.totalTime--;
                that.content = that.totalTime + "s后重新发送";
                if (that.totalTime < 0) {
                    window.clearInterval(clock);
                    that.content = "重新发送验证码";
                    that.totalTime = 60;
                    that.canClick = true; // 这里重新开启
                }
            }, 1000);
            // 获取验证码
            getcode(localStorage.getItem("mobileNo")).then(res => {
                if (res.returns === "success") {
                    that.$toast("验证码已发至您手机，请注意查收");
                }
            });
        },

        seeQuestion() {
            this.directionIsShow = true;
        },
        directionBack() {
            this.directionIsShow = false;
        },
        payBtn() {
            if (this.radio === "2") {
                this.balancePayPop = true;
            }
        },
        payBeforeClose(action, done) {
            if (action === "confirm") {
                this.confirPay();
                setTimeout(done, 1000);
            } else {
                done();
            }
        },
        // 支付结果
        confirPay() {
            if (this.sms === "666666") {
                this.balancePayPop = false;
                this.payresultIsShow = true;
                this.sms = "";
            }
        },
        payresultBack() {
            this.payresultIsShow = false;
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        common.$on("payType", data => {
            console.log("payType", data);
        });
    },
    beforeCreate() {}, // 生命周期 - 创建之前
    beforeMount() {}, // 生命周期 - 挂载之前
    beforeUpdate() {}, // 生命周期 - 更新之前
    updated() {}, // 生命周期 - 更新之后
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}, // 生命周期 - 销毁完成
    activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="stylus">
//@import url(); 引入公共css类
.payed {
    .van-radio-group {
        margin-top: 20px;
        text-align: left;
        .van-cell {
            background: #f5f3f4;
        }
    }

    // 余额支付弹框
    .balancePayPop {
        .van-dialog {
            border-radius: 5px;
            .confirmCon {
                width: 90%;
                margin: 0 auto;
                font-size: 14px;
                text-align: left;
                h4 {
                    font-weight: 400;
                    text-align: center;
                    font-size: 18px;
                    margin: 0;
                    padding-top: 35px;
                }
                .van-cell-group {
                    margin: 25px 0;
                    .van-field {
                        padding: 0;
                    }
                    .van-button {
                        font-size: 12px;
                        background: #ccc;
                        border-radius: 5px;
                        color: #000;
                        height: 36px;
                        line-height: 36px;
                    }
                }
                .confirPay {
                    .van-button {
                        background: #4fd6bc;
                        color: #fff;
                        font-size: 16px;
                        width: 90%;
                        height: 36px;
                        line-height: 36px;
                        border-radius: 5px;
                        position: absolute;
                        bottom: 25px;
                        left: 0px;
                        right: 0px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            }
        }
    }
}
</style>
