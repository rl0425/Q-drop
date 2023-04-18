const {get} = require("axios");

class KakaoLogin {
    //카카오 로그인 생성자 생성시 : SDK 초기화
    constructor() {
        this._jsKey = "882f6e4a0dd4ba4f81f7170ef898d9a8";

        if (!window.Kakao.isInitialized()) {
            // JavaScript key를 인자로 주고 SDK 초기화
            window.Kakao.init(this.jsKey);
            // SDK 초기화 여부를 확인하자.
            console.log(window.Kakao.isInitialized());
        }
    }
    get jsKey() {
        return this._jsKey;
    }
    set jsKey(value) {
        this._jsKey = value;
    }

    get getInitialized() {
        return window.Kakao.isInitialized();
    }
    set setInitialized(jsKey) {
        window.Kakao.init(jsKey);
    }

    loginWithKakao() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://explorer-cat-api.p-e.kr:3000/login/auth/code',
            state: 'userme',
        });
    }
    logOutWithKakao() {

    }
}

module.exports = {KakaoLogin}
