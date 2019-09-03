<template>
    <div class="lnl-help-overlay">
        <template v-for="(item, index) in helpObjects">
            <div class="help-item" :style="item.itemStyle" :key="'item'+index">
                {{item.text}}
                <div :key="'span'+index" :style="item.spanStyle" class="help-span"></div>
            </div>
        </template>
    </div>
</template>
<<script>
export default {
    data(){
        return{
            helpObjects: [
                {
                    text: 'This opens menu',
                    itemStyle: {
                        top: 'calc(56px)',
                        right: 'calc(56px - 14px)',
                    },
                    spanStyle: {
                        top: '-7px',
                        right: '8px',
                    }
                }
            ]
        }
    },
    mounted(){
        document.getElementById('app').style.height = '100vh';;
    }
}
</script>
<style scoped>
.lnl-help-overlay {
    position: fixed;
    top: 0;
    background-color: #424242;
    opacity: 0.6;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
}
.help-item {
    color: black;
    position: absolute;
    background: white;
    padding: 8px 16px;
    border-radius: 4px;
}
.help-span {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
    position: absolute;
}
</style>