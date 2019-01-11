<!--  -->
<template>
    <transition name="slide">
        <div class="routerViewPage">
            <van-nav-bar
                fixed
                left-arrow
                @click-left="onClickLeft"
                title="共享陪护床"
            >
            </van-nav-bar>
            <div class="topblank">
                <filter-bar
                    top="46"
                    :bar-menus="barMenus"
                    @showDialog="handleShowDialog"
                    @closeDialog="handleCloseDialog"
                    @changeTab="handleChangeTab"
                    @changeMainItem="handleChangeMainItem"
                    @changeSelect="changeData"
                >
                </filter-bar>
                <used-state :allOrder="allorder"></used-state>
            </div>
        </div>
    </transition>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FilterBar from "components/nurse/FilterBar";
import barMenus from "src/router/data";
import UsedState from "components/usedstate/usedstate";

export default {
    //import引入的组件需要注入到对象中才能使用
    components: { FilterBar, UsedState },
    data() {
        //这里存放数据
        return {
            barMenus: barMenus,
            expertList: [
                {
                    serialnumber: "5xxxxxxxxxx1",
                    finishstate: 0,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:01"
                },
                {
                    serialnumber: "5xxxxxxxxxx2",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:02"
                },
                {
                    serialnumber: "5xxxxxxxxxx3",
                    finishstate: 2,
                    hospitalname: "湖北省中西结合医院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:03"
                },
                {
                    serialnumber: "5xxxxxxxxxx4",
                    finishstate: 0,
                    hospitalname: "武汉市第九医院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:05"
                },
                {
                    serialnumber: "5xxxxxxxxxx5",
                    finishstate: 0,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:06"
                },
                {
                    serialnumber: "5xxxxxxxxxx6",
                    finishstate: 0,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:07"
                },
                {
                    serialnumber: "5xxxxxxxxxx7",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:08"
                },
                {
                    serialnumber: "5xxxxxxxxxx8",
                    finishstate: 2,
                    hospitalname: "湖北省中西结合医院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:09"
                },
                {
                    serialnumber: "5xxxxxxxxxx9",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:10"
                },
                {
                    serialnumber: "5xxxxxxxxxx10",
                    finishstate: 0,
                    hospitalname: "武汉市第九医院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:11"
                },
                {
                    serialnumber: "5xxxxxxxxxx11",
                    finishstate: 0,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:01"
                },
                {
                    serialnumber: "5xxxxxxxxxx12",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:02"
                },
                {
                    serialnumber: "5xxxxxxxxxx13",
                    finishstate: 2,
                    hospitalname: "湖北省中西结合医院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:03"
                },
                {
                    serialnumber: "5xxxxxxxxxx14",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:04"
                },
                {
                    serialnumber: "5xxxxxxxxxx15",
                    finishstate: 0,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:06"
                },
                {
                    serialnumber: "5xxxxxxxxxx16",
                    finishstate: 0,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:07"
                },
                {
                    serialnumber: "5xxxxxxxxxx17",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:08"
                },
                {
                    serialnumber: "5xxxxxxxxxx18",
                    finishstate: 2,
                    hospitalname: "湖北省中西结合医院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:09"
                },
                {
                    serialnumber: "5xxxxxxxxxx19",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:10"
                },
                {
                    serialnumber: "5xxxxxxxxxx20",
                    finishstate: 0,
                    hospitalname: "武汉市第九医院",
                    subname: "医学影像科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:11"
                },
                {
                    serialnumber: "5xxxxxxxxxx21",
                    finishstate: 0,
                    hospitalname: "武汉市第九医院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:05"
                },
                {
                    serialnumber: "5xxxxxxxxxx22",
                    finishstate: 1,
                    hospitalname: "湖北省妇幼保健院",
                    subname: "急救科",
                    begintime: "2018-12-12 15:300",
                    endtime: "2018-12-12 15:300",
                    timelong: "40:04"
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
        onClickLeft() {
            // this.$router.push({
            //   path: `/nurse`
            // })
            this.$router.back();
        },
        handleShowDialog(v) {
            // console.log(v);
        },
        handleCloseDialog(v) {
            // console.log(v);
        },
        handleChangeTab(v) {
            // console.log(v);
        },
        handleChangeMainItem(v) {
            console.log(v);
        },
        changeData(v) {
            console.log(v);
        },
        dataDeal(data) {
            var that = this;
            var arr = data;
            var listArr = [];
            arr.forEach(function(el, index) {
                for (var i = 0; i < listArr.length; i++) {
                    // 对比相同的字段key，相同放入对应的数组
                    if (listArr[i].finishstate === el.finishstate) {
                        listArr[i].listInfo.push({
                            serialnumber: el.serialnumber,
                            finishstate: el.finishstate,
                            hospitalname: el.hospitalname,
                            subname: el.subname,
                            timelong: el.timelong,
                            begintime: el.begintime,
                            endtime: el.endtime
                        });
                        return;
                    }
                }
                // 第一次对比没有参照，放入参照
                listArr.push({
                    finishstate: el.finishstate,
                    listInfo: [
                        {
                            serialnumber: el.serialnumber,
                            finishstate: el.finishstate,
                            hospitalname: el.hospitalname,
                            subname: el.subname,
                            timelong: el.timelong,
                            begintime: el.begintime,
                            endtime: el.endtime
                        }
                    ]
                });
            });
            that.allorder = this.expertList;
            that.itemFinished = listArr[0].listInfo;
            that.itemWaitPay = listArr[1].listInfo;
            that.itemAudit = listArr[2].listInfo;
            console.log("所有订单", that.allorder);
            console.log("已完成", that.itemFinished);
            console.log("未完成", that.itemWaitPay);
            console.log("待审核", that.itemAudit);
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.dataDeal(this.expertList);
    },
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
<style scoped lang="stylus"></style>
