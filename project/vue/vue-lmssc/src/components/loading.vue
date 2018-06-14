<template>
    <transition name="modal-transition">
        <div class="dropModal loading">
            <div class="loading-body">
                <div class="loading-icon"></div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.dropModal.loading {
    top: 0;
    width: 100%;
    height: 100%;
    .loading-body {
        position: relative;
        width: 100%;
        height: 100%;
        .loading-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 14vw;
            height: 14vw;
            margin-top: -7vw;
            margin-left: -7vw;

            border: 1.5vw solid #FF6700;
            border-right-color: transparent;
            border-radius: 50%;

            animation:rotate-forever 1s linear infinite;
            -webkit-animation:rotate-forever 1s linear infinite; /* Safari 和 Chrome */
            
        }
    }
}
@keyframes rotate-forever { 
    100% {transform: rotate(360deg);}
}
@-webkit-keyframes rotate-forever { 
    100% {-webkit-transform: rotate(360deg);}
}
</style>

