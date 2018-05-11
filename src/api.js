class Api {
    constructor(t) {
        this.t = t;
    }

    getUserInfo() {

        console.log('getUserInfo')
        let tempParams = {
            // openId: this.t.getOpenId(),
            lang: "zh_CN"
        };

        let tempObj = {
            url: this.t.getBaseURL() + "/archPocApi/getUserInfo",
            method: "get",
            params: tempParams
        };

        this.t.ajax(tempObj)
            .then(data => {
                // this.t.showAlert({
                //     message: data.errorMessage,
                //     title: ""
                // });
            })
            .catch(error => {
                console.log(error);
            });

    }

    getEasCode(){
        console.log('getEasCode')
        let tempParams = {
            phoneNumber: '13524017821',
            securityCode: "0809967979617815"
        };

        let tempObj = {
            url: this.t.getBaseURL() + "/eCommerceDigitizationApi/getEasCode",
            method: "post",
            params: tempParams
        };

        this.t.ajax(tempObj)
            .then(data => {
                this.t.showAlert({
                    message: data.errorMessage,
                    title: ""
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}


export default {
    install(Vue, t) {
        Vue.prototype.api = new Api(t);
    }
};