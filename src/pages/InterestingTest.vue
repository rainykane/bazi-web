<template>
    <div class="test-wrap">
        <v-title-header>趣味测试</v-title-header>
        <div class="content-wrap">
            <h2 class="title">{{this.$route.query.title}}</h2>
            <div class="content">
                <div class="item"
                    v-for="(item,index) in questionList"
                    :key="index"
                    v-show="index == showIndex"
                >
                    <h3>{{index+1}}-{{questionList.length}} {{item.subject}}</h3>
                    <label :for="'answer'+index+1">
                        <input type="radio" :name="'answer'+index" :id="'answer'+index+1" value="1"
                            v-model="userChoiceList[index]"
                        >
                        <i></i>
                        <div>{{item.result_a}}</div>
                    </label>
                    <label :for="'answer'+index+0">
                        <input type="radio" :name="'answer'+index" :id="'answer'+index+0" value="0"
                            v-model="userChoiceList[index]"
                        >
                        <i></i>
                        <div>{{item.result_b}}</div>
                    </label>
                </div>
                <div class="bottom">
                    <button class="pre" @click="pre">上一题</button>
                    <button class="next" @click="next">下一题</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            questionList: [],
            showIndex: 0,
            id: this.$route.query.id,
            userChoiceList: [], 
            resultNum: "", 
        }
    },
    created () {
        this.getData();
    },
    methods: {
        getData: function () {
            let params = {
                cid : '108',
                tid : this.$route.query.id,
            }
            this.$http.post('/suan/apidata',params,'cesuan',null,this.success,this.failure);
        },
        success: function (res) {
            this.questionList = res.data;
        },
        pre: function () {
            if(this.showIndex == 0) { //返回上一页
                this.$router.go(-1);
            }else { //上一题
                this.showIndex--;
            }
        },
        next: function() {
            if(this.userChoiceList[this.showIndex]) { //用户已选择当前题目的答案
                if(this.showIndex == this.questionList.length-1) { //用户已答完所有题目
                    for(let i of this.userChoiceList){
                        parseInt(i);
                    }
                    this.resultNum = this.userChoiceList.reduce((a,b) => parseInt(a)+parseInt(b)); //保存累加结果数
                    this.$router.push({
                        path: '/interestingTestResult',
                        query: {
                            id: this.id,
                            resultNum: this.resultNum,
                        }
                    })
                }else { //未答完题目，下一题。
                    this.showIndex++;
                } 
            }else { //用户未选择当前题目的答案
                this.$vux.toast.text('请选择您的答案！','top');
            }  
        },
    }
}
</script>
<style lang="less" scoped>
.test-wrap{
    .content-wrap{
        padding-top: 90/75rem;
        .border-box();
        .title{
          width: 100%;
          height: 100/75rem;
          line-height: 100/75rem;
          text-align: center;
          font-size: 36/75rem;
          border-bottom: 1px solid rgba(241,241,241,1);
        }
        .content{
            padding: 36/75rem;
            .border-box();
            h3{
                font-size: 36/75rem;
                margin-bottom: 60/75rem;
            } 
            label{
                .flex-start();
                width: 100%;
                margin-top: 50/75rem;
                font-size: 32/75rem;
                input{
                    display: none;
                }
                i{
                    display: block;
                    width: 15px;
                    height: 15px;
                    .round(50%);
                    border: 1px solid #707070;
                    .border-box();
                }
                i + div{
                    margin-left: 44/75rem;
                }
                input:checked + i{
                    background: @baseBoldColor;
                    border: none;
                }
            }
            .bottom{
                position: fixed;
                bottom: 1rem;
                left: 0;
                right: 0;
                width: 90%;
                margin: 0 auto;
                .flex-center();
                .pre,
                .next{
                    .my-button();
                    width: 300/75rem;
                    .round(10/75rem);
                    .boxshadow();
                    height: 70/75rem;
                    color: @baseBoldColor;
                    background: #fff;
                }
                .pre{
                    margin-right: 10/75rem;
                }
            }
        }
    }
}
</style>



