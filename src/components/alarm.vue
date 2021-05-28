<template>
  <div class="fullScreen">
    <!-- mask遮罩层 -->
    <div
      class="mask"
      :class="levelFirst > 0 ? 'blingRed' : 'blingYellow'"
    ></div>
    <div class="alarm_container">
      <div class="alarmTitle">
        <audio controls="controls" autoplay="autoplay" hidden="true" loop>
          <source src="../assets/images/alarm.mp3" type="audio/mpeg" />
        </audio>
        <div
          :class="
            isMute ? 'alarmSpeak alarmSpeakYes' : 'alarmSpeak alarmSpeakNo'
          "
          @click="speakHandle"
        ></div>
        <div class="alarmIcon">
          <img v-if="levelFirst > 0" src="@/assets/images/alarm1.gif" alt />
          <img v-else src="@/assets/images/alarmYellow.gif" alt />
        </div>
        <div class="alarmNumber">
          <div class="levelFirst">一级警报数量：{{ levelFirst }}</div>
          <div class="levelSecond">二级警报数量：{{ levelSecond }}</div>
        </div>
      </div>
      <div class="alarmBody">
        <ul class="alarm_box">
          <template>
            <li
              class="alarm_item"
              v-for="(item, index) in dataList"
              :key="index"
            >
              <div
                class="index"
                :style="
                  item.level === '1' ? 'color: #E63636;' : 'color: #e7970b;'
                "
              >
                {{ Number(dataList.length) - index }}
              </div>
              <div
                :class="hasHousePhone ? 'title' : 'titleFlex1'"
                :style="
                  item.level === '1' ? 'color: #E63636;' : 'color: #e7970b;'
                "
              >
                {{ item.flag }}
              </div>
              <div v-if="hasHousePhone" class="address">
                {{ item.houseName }}
              </div>
              <div v-if="hasHousePhone" class="phone">
                业主联系方式：{{ item.phone }}
              </div>
            </li>
          </template>
        </ul>
      </div>
      <div
        class="closeBtn"
        @click="closeModalDailog"
        :style="
          levelFirst > 0 ? 'background: #E63636;' : 'background: #e7970b;'
        "
      >
        我知道了
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
    levelFirst: {
      type: Number,
      required: true,
      default: 0,
    },
    levelSecond: {
      type: Number,
      required: true,
      default: 0,
    },
    hasHousePhone: {
      type: Boolean,
      required: true,
      default: true,
    },
    // speakInfo: {
    //   type: String,
    //   required: true,
    //   default: () => {
    //     return ''
    //   }
    // }
  },
  data() {
    return {
      isMute: true,
    }
  },
  watch: {
    dataList() {
      this.dataSpeak()
    },
  },
  created() {
    this.dataSpeak()
  },
  computed: {},
  methods: {
    closeModalDailog() {
      this.$emit('closeModalDailog')
      this.speakHandle()
    },
    dataSpeak() {
      let speakInfo = ''
      this.dataList.forEach((item) => {
        speakInfo = speakInfo + item.flag + ',' + item.houseName + ';'
      })
      this.speakText(speakInfo)
    },
    speakText(text) {
      // 开始朗读
      var speaker = new window.SpeechSynthesisUtterance()
      speaker.text = text
      speaker.voice = speechSynthesis.getVoices().filter(function(voice) {
        return voice.name === 'Google 普通话（中国大陆）'
      })[0]
      window.speechSynthesis.speak(speaker)
    },
    // cancelVoice() {
    //   this.isMute = false
    //   window.speechSynthesis.cancel()
    // },
    // openVoice() {
    //   this.isMute = true
    // },
    speakHandle() {
      this.isMute = !this.isMute
      if (!this.isMute) {
        // 静音
        window.speechSynthesis.cancel()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fullScreen {
  font-family: 'PingFangSC-Regular';
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  // 红色闪烁
  .blingRed {
    box-sizing: border-box;
    box-shadow: inset 0 0 450px -50px #e63636;
    animation: borderBlingRed 1s infinite;
    -webkit-animation: borderBlingRed 1s infinite;
  }
  @keyframes borderBlingRed {
    0% {
      -webkit-box-shadow: inset 0 0 450px -50px #e63636;
      -moz-box-shadow: inset 0 0 450px -50px #e63636;
      box-shadow: inset 0 0 450px -50px #e63636;
    }
    50% {
      -webkit-box-shadow: inset 0 0 0px #e63636;
      -moz-box-shadow: inset 0 0 0px #e63636;
      box-shadow: inset 0 0 0px #e63636;
    }
    100% {
      -webkit-box-shadow: inset 0 0 450px -50px #e63636;
      -moz-box-shadow: inset 0 0 450px -50px #e63636;
      box-shadow: inset 0 0 450px -50px #e63636;
    }
  }
  @-webkit-keyframes borderBlingRed {
    0% {
      -webkit-box-shadow: inset 0 0 450px -50px #e63636;
      -moz-box-shadow: inset 0 0 450px -50px #e63636;
      box-shadow: inset 0 0 450px -50px #e63636;
    }
    50% {
      -webkit-box-shadow: inset 0 0 0px #e63636;
      -moz-box-shadow: inset 0 0 0px #e63636;
      box-shadow: inset 0 0 0px #e63636;
    }
    100% {
      -webkit-box-shadow: inset 0 0 450px -50px #e63636;
      -moz-box-shadow: inset 0 0 450px -50px #e63636;
      box-shadow: inset 0 0 450px -50px #e63636;
    }
  }
  // 黄色闪烁
  .blingYellow {
    box-sizing: border-box;
    box-shadow: inset 0 0 450px -50px #f7970b;
    animation: borderBlingYellow 1s infinite;
    -webkit-animation: borderBlingYellow 1s infinite;
  }
  @keyframes borderBlingYellow {
    0% {
      -webkit-box-shadow: inset 0 0 450px -50px #f7970b;
      -moz-box-shadow: inset 0 0 450px -50px #f7970b;
      box-shadow: inset 0 0 450px -50px #f7970b;
    }
    50% {
      -webkit-box-shadow: inset 0 0 0px #f7970b;
      -moz-box-shadow: inset 0 0 0px #f7970b;
      box-shadow: inset 0 0 0px #f7970b;
    }
    100% {
      -webkit-box-shadow: inset 0 0 450px -50px #f7970b;
      -moz-box-shadow: inset 0 0 450px -50px #f7970b;
      box-shadow: inset 0 0 450px -50px #f7970b;
    }
  }
  @-webkit-keyframes borderBlingYellow {
    0% {
      -webkit-box-shadow: inset 0 0 450px -50px #f7970b;
      -moz-box-shadow: inset 0 0 450px -50px #f7970b;
      box-shadow: inset 0 0 450px -50px #f7970b;
    }
    50% {
      -webkit-box-shadow: inset 0 0 0px #f7970b;
      -moz-box-shadow: inset 0 0 0px #f7970b;
      box-shadow: inset 0 0 0px #f7970b;
    }
    100% {
      -webkit-box-shadow: inset 0 0 450px -50px #f7970b;
      -moz-box-shadow: inset 0 0 450px -50px #f7970b;
      box-shadow: inset 0 0 450px -50px #f7970b;
    }
  }
  .alarm_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 580px;
    box-sizing: border-box;
    background-color: #fff;
    border: 5px solid #b1b3b6;
    border-radius: 20px;
    // overflow: hidden;
    .alarmTitle {
      width: 100%;
      height: 150px;
      display: flex;
      position: relative;
      .alarmSpeak {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        // background-image: url('../assets/images/voiceYes.png');
      }
      .alarmSpeakYes {
        background-image: url('../assets/images/voiceYes.png');
      }
      .alarmSpeakNo {
        background-image: url('../assets/images/voiceNo.png');
      }
      .alarmIcon {
        display: inline-block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 10px;
      }
      .alarmNumber {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 30px;
        .levelFirst {
          color: #e63636;
        }
        .levelSecond {
          color: #e7970b;
        }
      }
    }
    .alarmBody {
      position: absolute;
      top: 140px;
      bottom: 30px;
      width: 96%;
      box-sizing: border-box;
      padding-left: 40px;
      margin-right: 40px;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-button {
        display: none !important;
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        // background: #EDEDED;
      }
      .alarm_box {
        margin: 0 10px 0 0;
        padding: 0;
        list-style: none;
        .alarm_item {
          display: flex;
          justify-content: center;
          align-items: center;
          // height: 80px;
          // line-height: 40px;
          width: 100%;
          margin: 20px 0;
          box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.07);
          .index {
            font-size: 30px;
            font-family: 'PingFangSC-Regular';
            opacity: 0.28;
            color: #e63636;
            margin-left: 5px;
            text-align: center;
          }
          .title {
            width: 250px;
            margin-left: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #e63636;
            text-align: center;
          }
          .titleFlex1 {
            // width: 250px;
            flex: 1;
            margin-left: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #e63636;
            text-align: center;
          }
          .address {
            width: 170px;
            color: #444;
            font-size: 16px;
            margin-left: 35px;
            font-weight: normal;
          }
          .phone {
            flex: 1;
            color: #444;
            font-size: 16px;
            text-align: center;
            font-weight: normal;
          }
        }
      }
    }
  }
  .closeBtn {
    position: absolute;
    bottom: -24px;
    left: 50%;
    margin-left: -100px;
    width: 200px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: #e63636;
    text-align: center;
    border-radius: 37px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
