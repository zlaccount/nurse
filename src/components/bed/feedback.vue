<!--  -->
<template>
  <div>

    <div class="questionCon">
      <p>床柜出现故障关不上？请把情况反馈给我们</p>
      <h4 class="backQues">反馈问题</h4>
      <div class="selectQues">
        <van-checkbox-group v-model="result">
          <van-cell-group>
            <div class="checkText">
              <van-row gutter="20">
                <van-col
                  span="8"
                  v-for="(itemText, index) in selectQues"
                  clickable
                  :key="index"
                >
                  <van-button
                    size="small"
                    ref="checkboxBtn"
                    @click="toggle(index)"
                  >{{itemText.bed}}</van-button>
                </van-col>
              </van-row>
            </div>
            <div class="checkbox">
              <van-row gutter="20">
                <van-col
                  span="8"
                  v-for="(item, index) in list"
                  clickable
                  :key="index"
                >
                  <van-button size="small">
                    <van-checkbox
                      :name="item"
                      ref="checkboxes"
                    >{{ item }}</van-checkbox>
                  </van-button>
                </van-col>
              </van-row>
            </div>
          </van-cell-group>
        </van-checkbox-group>
      </div>
      <h4>其他问题</h4>
      <van-cell-group>
        <van-field
          type="textarea"
          placeholder="请简要说明在使用床柜中遇到的问题，以便工作人员进行判断和处理"
          rows="1"
        />
        <van-uploader :after-read="onRead">
          <van-icon name="photograph" />
        </van-uploader>

      </van-cell-group>
    </div>
    <div class="submitQues">
      <van-button
        type="default"
        @click="submitQues"
      >
        提交反馈
      </van-button>
      <van-popup v-model="submitStatus">
        <div class="result">
          <div class="success">
            <img
              src="../../../static/img/success.png"
              slot="right"
            />
            <p>提交成功</p>
          </div>
          <!-- <div class="failure">
            <img
              src="../../../static/img/failure.png"
              slot="right"
            />
            <p>支付失败!</p>
          </div> -->
        </div>
        <div class="bottomQues">
          <router-link to="./my">返回首页</router-link>
        </div>
      </van-popup>
    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {
      submitStatus: false,
      list: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j'],
      result: [],
      checked: true,
      selectQues: [
        { bed: '床柜损坏' },
        { bed: '床柜损坏' },
        { bed: '电池没电' },
        { bed: '床锁损坏' },
        { bed: '床柜损坏' },
        { bed: '床柜损坏' },
        { bed: '电池没电' },
        { bed: '床锁损坏' },
        { bed: '其他问题' }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    result(newVal, oldVal) {
      console.log(newVal)
    }
  },
  // 方法集合
  methods: {
    back() { },
    onRead(file) {
      console.log(file)
    },
    submitQues() {
      this.submitStatus = true
    },
    backIndex() {
      this.$router.push('/bed/index')
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
      if (!this.$refs.checkboxes[index].checked) {
        this.$refs.checkboxBtn[index].$el.style.border = '1px solid red'
        this.$refs.checkboxBtn[index].$el.style.color = 'red'
      } else {
        this.$refs.checkboxBtn[index].$el.style.border = ''
        this.$refs.checkboxBtn[index].$el.style.color = ''
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { 
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { 
     console.log(this.result)
     
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="stylus">
// @import url(); 引入公共css类
.questionCon {
  font-size: 14px;

  p {
    margin: 8px 15px;
    color: #999;
  }

  h4 {
    background: #fff;
    line-height: 40px;
    margin: 0;
    padding-left: 15px;
    font-weight: 600;
    font-size: 15px;
  }

  .selectQues {
    padding: 20px 15px;
    background: #fff;
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;

    .van-row {
      margin-bottom: 15px;

      .van-col {
        margin-top: 10px;

        .van-button {
          width: 100%;
          border-radius: 5px;
          height: 100%;
          color: #999;
          font-size: 14px;
        }
      }
    }

    .checkbox {
      .van-row {
        display: none;
      }
    }
  }

  .van-field {
    height: 120px;
  }
}

.submitQues {
  width: 94%;
  position: absolute;
  bottom: 20px;
  left: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;

  .van-button {
    width: 100%;
    background: #4fd6bc;
    color: #fff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
  }

  .van-popup {
    height: 350px;
    width: 250px;
    border-radius: 5px;

    .result {
      position: absolute;
      width: 100%;
      left: 0;
      top: 50%;
      margin-top: -45%;
      text-align: center;

      img {
        width: 70px;
        height: 70px;
      }

      .success {
        p {
          margin: 20px 0 0px;
          color: #4fd6bc;
        }
      }

      .failure {
        p {
          margin: 40px 0 0px;
          color: orange;
        }
      }
    }

    .bottomQues {
      position: absolute;
      bottom: 50px;
      text-align: center;
      width: 100%;

      a {
        color: #999;
      }
    }
  }
}
</style>
