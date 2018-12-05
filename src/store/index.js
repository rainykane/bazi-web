import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import fortune from "./module/fortune"
import bazi from "./module/bazi"
import peach from "./module/peach"
import love from "./module/love"
import fengshuiKnowledge from "./module/fengshuiKnowledge"
import xiangshu from "./module/xiangshu"

export default new vuex.Store ({
    state : {
        loginAccount : '',
    },
    modules : {
        fortune: fortune,
        bazi : bazi,
        peach : peach,
        love : love,
        fengshuiKnowledge : fengshuiKnowledge,
        xiangshu : xiangshu,
    },
    mutations: {
        updateLoginAccount: function (state,value) {
            state.loginAccount = value;
        }
    },
    actions : {
    }
})