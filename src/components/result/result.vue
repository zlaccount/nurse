<!---->
<template>
    <div class="">
        <van-nav-bar
            fixed
            title="支付结果"
            left-arrow
            @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="topblank"></div>
        <div class="wrapper result">
            <div class="resultCon">
                <!-- <div class="success">
        <img
          src="../../../static/img/success.png"
          slot="right"
        />
        <p>支付成功</p>
        <h4>22元</h4>
      </div> -->
                <div class="failure">
                    <img src="../../../static/img/failure.png" slot="right" />
                    <p>支付失败!</p>
                </div>
            </div>
            <a
                href="javascript:void(0)"
                @click="seeQuestion"
                class="seeQuestion"
            >
                <span class="bottomQues">对收费规则有疑问？</span></a
            >
        </div>
    </div>
</template>

<script>
export default {
    // import引入的组件需要注入到对象中才能使用

    components: {},
    data() {
        // 这里存放数据
        return {
            resultType: "",
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        onClickLeft() {
            this.$router.push({
                path: `/bed`
            });
        },
        seeQuestion() {
            this.directionIsShow = true;
        },
        directionBack() {
            this.directionIsShow = false;
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // 获取get传递过来的动态路由的值
        console.log("resultType", this.$route.query.id);
        this.resultType = this.$route.query.id;
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
// @import url(); 引入公共css类
.result {
  .resultCon {
    position: fixed;
    text-align: center;
    height: 200px;
    width: 200px;
    margin-left: -100px;
    left: 50%;
    margin-top: -100px;
    top: 45%;

    .success {
      p {
        margin: 40px 0 0px;
        color: #4fd6bc;
      }
    }

    .failure {
      p {
        margin: 40px 0 0px;
        color: orange;
      }
    }

    h4 {
      font-size: 24px;
      font-weight: 400;
      margin: 0;
    }
  }

  .seeQuestion {
    color: #000;

    .bottomQues {
      position: fixed;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
