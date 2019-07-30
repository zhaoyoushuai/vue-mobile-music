<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" 
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressMove"
          @touchend.prevent="progressEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props:{
      // 进度条参数
      percent:{
        type:Number,
        default:0
      }
    },
    watch:{
      //监听父级传递的percent值,percent值改变的时候渲染进度条.
      percent(newPercent){
        if(newPercent >=0 && !this.touch.initiated){
          //判断是否在滑动中，滑动中不改变。
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth  = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    },
    created(){
      this.touch = {}
    },
    methods:{
      //点击进度条的事件
      progressClick(e){
        // getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。 
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      //进度条btn触摸开始事件
      progressTouchStart(e){
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left =this.$refs.progress.clientWidth;
      },
      //进度条btn触摸移动事件
      progressMove(e){
        if(!this.touch.initiated){
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth =Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth ,Math.max(0,this.touch.left+deltaX))
        this._offset(offsetWidth)
      },
      //进度条btn触摸结束事件
      progressEnd(e){
        this.touch.initiated = false
        this._triggerPercent()
      },
      //通过加载条的长度来计算进度百分比
      _triggerPercent(){
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const percent =  this.$refs.progress.clientWidth / barWidth
          // 触发父级组件的进度条改变的事件，并且把百分比传递过去
          this.$emit('percentChange',percent)
      },
      // 修改加载条的长度
      _offset(offsetWidth){
          this.$refs.progress.style.width = `${offsetWidth}px`
          this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>