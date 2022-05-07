<template>
    <div class="loader">
        <div class="inner-loading">
            <div class="text-center">
                <img src="../assets/biz.svg" class="animate__animated animate__shakeY"/>
            </div>
            <p class="h5 mt-2 text-white">{{message}}</p>
        </div>
    </div>

</template>
<script>
export default {
    name:"BlockerLoader",
    props:{
        message:{
            type:String
        }
    }

}
</script>
<style scoped>
.loader {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    width: 100%;
    background-color: rgba(26, 25, 25, 0.412);
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}

.inner-loading{
    margin-top: 30%;
}

.inner-loading img {
    width: 50px;
}
</style>