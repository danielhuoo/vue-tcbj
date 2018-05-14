<template>
    <div id="app">
        <wv-button type="primary" @click="getOpenId">显示openId</wv-button>
        <wv-button type="primary" @click="getVersion">显示版本号</wv-button>
        <wv-button type="primary" @click="showLoader">显示loader</wv-button>
        <wv-button type="primary" @click="showAlert">显示提示框</wv-button>
        <wv-button type="primary" @click="showConfirm">显示对话框</wv-button>
        <wv-button type="primary" @click="getUserInfo">调用getUserInfo</wv-button>
        <wv-button type="primary" @click="getEasCode">调用getEasCode</wv-button>
        <wv-button type="primary" @click="getLocationHashValue">从Hash获取给定名称的值</wv-button>
        <wv-button type="primary" @click="updateLocationHashKey">更改Hash的name值</wv-button>
        <wv-button type="primary" @click="getQueryString">获取网址问号后面特定参数对应的值</wv-button>
        <wv-button type="primary" @click="setLocalStorage">设置localStorage的name值为tcbj</wv-button>
        <wv-button type="primary" @click="getLocalStorage">获取localStorage的name值</wv-button>
        <wv-button type="primary" @click="setCookie">设置cookie的myName的值</wv-button>
        <wv-button type="primary" @click="getCookie">获取cookie的myName的值</wv-button>
        <wv-button type="primary" @click="qrCode">扫一扫</wv-button>
    </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    this.t.getOpenIdFromWx("securityCode,123456");

    this.t.showAlert({
      message: this.t.getQueryString("securityCode")
    });
  },
  methods: {
    getOpenId() {
      this.t.showAlert({
        message: this.t.getOpenId()
      });
    },

    getVersion() {
      this.t.showAlert({
        message: this.t.version
      });
    },
    showLoader() {
      this.t.showLoader();
    },

    showAlert() {
      this.t.showAlert({
        message: "你最近还好吗"
      });
    },

    showConfirm() {
      this.t
        .showConfirm({
          title: "你最近还好吗",
          message: "欢迎使用 we-vue!",
          showCancelButton: true
        })
        .then(() => {
          console.log("confirmed");
        })
        .catch(() => {
          console.log("canceled");
        });
    },

    getUserInfo() {
      console.log("fetchData");

      this.api.getUserInfo();
    },

    getEasCode() {
      this.api.getEasCode();
    },

    getLocationHashValue() {
      this.t.showAlert({
        message: this.t.getLocationHashValue("name")
      });
    },

    getQueryString() {
      this.t.showAlert({
        message: this.t.getQueryString("name")
      });
    },

    setLocalStorage() {
      this.t.localStorage("name", "tcbj");
    },

    getLocalStorage() {
      this.t.showAlert({
        message: this.t.localStorage("name")
      });
    },

    updateLocationHashKey() {
      let value = "baiyue";
      this.t.updateLocationHashKey("name", value);
      console.log("locationHashKey 更改为===" + value);
    },

    setCookie() {
      this.t.cookie("myName", "huohuohuo");
    },

    getCookie() {
      this.t.showAlert({
        message: this.t.cookie("myName")
      });
    },

    qrCode() {
      wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {},
          complete: function() {
            wx.closeWindow();
          }
        });
      });
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 20px 10px;
}
</style>