<template>  
<div v-if="user.user_loader">
    <div class="page-loading">
        <!--<ui-preloader :show="true"></ui-preloader>-->
        <div class="lds-css ng-scope">
            <div style="width:100%;height:100%" class="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import { mapState } from "vuex";
export default {
    name: "Loader",
data(){
    return{

    }},
mounted:function(){

},
    computed: {
    ...mapState(["user"]),
    
  },
}
</script>
<style scoped>
        .page-loading{
            position: absolute;
            background: rgba(255, 255, 255, .8);
            width: 100%;
            height: 200%;
            z-index: 99999;
            left: 0;
            top: 0;
            transition: all 2s ease-in-out;
            overflow: hidden;
        }
        @keyframes lds-ripple {
            0% {
                top: 90px;
                left: 90px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: 15px;
                left: 15px;
                width: 150px;
                height: 150px;
                opacity: 0;
            }
        }
        @-webkit-keyframes lds-ripple {
            0% {
                top: 90px;
                left: 90px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: 15px;
                left: 15px;
                width: 150px;
                height: 150px;
                opacity: 0;
            }
        }
        .lds-ripple {
            position: relative;
            margin: 40vh auto;
            transition: all 2s ease-in-out;
        }
        .lds-ripple div {
            box-sizing: content-box;
            position: absolute;
            border-width: 10px;
            border-style: solid;
            opacity: 1;
            border-radius: 50%;
            -webkit-animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            animation: lds-ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(1) {
            border-color: (rgb(245,114,14));
        }
        .lds-ripple div:nth-child(2) {
            border-color: rgba(255, 165, 0, .8);
            -webkit-animation-delay: -0.75s;
            animation-delay: -0.75s;
        }
        .lds-ripple {
            width: 200px !important;
            height: 200px !important;
            -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
            transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
        }
</style>