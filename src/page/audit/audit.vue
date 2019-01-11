<!--  -->
<template>
    <div class="audit">
        <van-nav-bar fixed title="床柜审核"> </van-nav-bar>
        <div class="topblank"></div>
        <van-row> <van-col span="24">待审核(12条)</van-col> </van-row>
        <van-search
            placeholder="请输入医院名称"
            v-model="keyValue"
            @search="keyOnSearch"
        />
        <hospital-list
            @select="selectHospital"
            :allOrder="expertList"
        ></hospital-list>
        <router-view></router-view>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HospitalList from "base/hospitallist/hospitallist";

export default {
    //import引入的组件需要注入到对象中才能使用
    components: { HospitalList },
    data() {
        //这里存放数据

        return {
            keyValue: "",
            expertList: [
                {
                    hospitalname: "湖北省妇幼保健院",
                    entry: 4
                },
                {
                    hospitalname: "武汉市第九医院",
                    entry: 5
                },
                {
                    hospitalname: "武汉大学中南医院",
                    entry: 2
                }
            ]
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        keyOnSearch() {},
        selectHospital() {
            this.$router.push({
                path: `/audit/sdfasdf`
                // path: `/audit/${hospital.id}`
            });
            // this.setHospital(hospital);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="stylus">
@import '~common/stylus/variable';

.audit {
  .van-row {
    line-height: 40px;
    text-align: center;
    color: #4fd6bc;
    background: #fff;
    outline: 1px solid #dbdcde;
  }
}
</style>
