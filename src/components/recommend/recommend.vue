<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="(item,index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick"  @load="loadimg" :src="item.picUrl" alt />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item,index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading/>
      </div>
    </scroll>
    <transition  name="slide">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll";
import { getRecommend, getDiscList } from "api/recommend";
import { ERR_OK } from "api/config";
import Slider from "base/slider/slider";
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins:[playlistMixin],
  components: {},
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    handlePlaylist(playlist){
      const bottom = playlist.length > 0 ?'60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh();
    },
    selectItem(item){
      console.log(item)
      this.$router.push({
        path:`/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    loadimg(){
      if(!this.checkLoaded){
        this.$refs.scroll.refresh()
        this.checkLoaded = true;
      }
    },
    ...mapMutations({
      setDisc :'SET_DISC'
    })
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
};
</script>
<style lang='stylus' scoped>
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
