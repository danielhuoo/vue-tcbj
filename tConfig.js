const config = {
    appId: "wx888c0c048c5620cb",
    // openId: "o33A7uJE6UPZyYZLhEy7zss4XpYI",
    isUseWxSdk: false,
    isDebugMode: true,
    // baseURL: "http://localhost:8080/crossDomain",
    baseURL: "https://h5-test.by-health.com",
    publicPath: "https://h5-test.by-health.com/hwy/vue-tcbj/index.html",
    wxSignatureApi: "/archPocApi/getJsSdkSignature",
    wxAuthorizedApi: "/archPocApi/webDevAuthorized",
    wxDebug: true,
    wxJsApiList: [
        "closeWindow",
        "hideOptionMenu",
        "scanQRCode"
    ],
    errorCodeValue: "00",
    isCheckErrorCode: true
}

export default config