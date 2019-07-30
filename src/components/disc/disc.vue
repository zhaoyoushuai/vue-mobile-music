<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default {
    data(){
      return {
        songs:[]
      }
    },
    computed : {
      title(){
        return this.disc.dissname

        },
      bgImage(){
        return this.disc.imgurl
        },
      ...mapGetters([
        'disc'
      ])
    },
    components: {
      MusicList
    },
    created(){
      this._getSongList()
    },
    methods:{
      _getSongList(){
        if(!this.disc.dissid){
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res)=>{
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })

      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((musicData)=>{
          if(musicData.id && musicData.album.id){
            musicData.songid = musicData.id
            musicData.albumname = musicData.album.name
            musicData.songmid = musicData.mid
            musicData.albummid = musicData.album.mid
            musicData.songname = musicData.name
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
