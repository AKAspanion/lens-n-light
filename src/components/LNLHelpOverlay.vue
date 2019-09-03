<template>
    <div class="lnl-help-overlay">
        <div class="help-item">
            Hello
        </div>
    </div>
</template>
<<script>
export default {
    data(){
        return{
            
        }
    },
    mounted(){
        document.getElementById('app').style.height = '100vh';;
    }
}
</script>
<style scoped>
.lnl-help-overlay{
    position: fixed;
    top: 0;
    background-color: #424242;
    opacity: 0.95;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
}
.help-item{
    color: white;
    position: absolute;
    right: 0;
}
</style>