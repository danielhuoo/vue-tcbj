<template>
    <div id="app">
        <wv-button type="primary" @click="getOpenId">显示openId</wv-button>
        <wv-button type="primary" @click="getVersion">显示版本号</wv-button>
        <wv-button type="primary" @click="showLoader">显示loader</wv-button>
        <wv-button type="primary" @click="showAlert">显示提示框</wv-button>
        <wv-button type="primary" @click="showConfirm">显示对话框</wv-button>
        <wv-button type="primary" @click="fetchData">调用ajax</wv-button>
        <wv-button type="primary" @click="getLocationHashValue">从Hash获取给定名称的值</wv-button>
        <wv-button type="primary" @click="updateLocationHashKey">更改Hash的name值</wv-button>
        <wv-button type="primary" @click="getQueryString">获取网址问号后面特定参数对应的值</wv-button>
        <wv-button type="primary" @click="setLocalStorage">设置localStorage的name值为tcbj</wv-button>
        <wv-button type="primary" @click="getLocalStorage">获取localStorage的name值</wv-button>
        <wv-button type="primary" @click="setCookie">设置cookie的myName的值</wv-button>
        <wv-button type="primary" @click="getCookie">获取cookie的myName的值</wv-button>
    </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    this.t.getOpenIdFromWx();
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
          console.log('confirmed');
        })
        .catch(() => {
            console.log('canceled');
        });
    },

    fetchData() {
      console.log("fetchData");

      let tempParams = {
        openId: this.t.getOpenId(),
        lang: "zh_CN"
      };

      const API = this.t.getBaseURL() + "/archPocApi/getUserInfo";

      let tempObj = {
        url: API,
        method: "get",
        params: tempParams
      };

      this.t
        .ajax(tempObj)
        .then(data => {
          this.t.showAlert({
            message: data.errorMessage,
            title: ""
          });
        })
        .catch(error => {
          console.log(error);
        });
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