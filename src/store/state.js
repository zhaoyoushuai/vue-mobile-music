import {
  playMode
} from 'common/js/config'
import {
  loadSearch,
  loadPlay,
  loadFavorite
} from 'common/js/cache'

const state = {
  //歌手
  singer: [],
  //播放状态
  playing: false,
  //是否全屏播放器
  fullScreen: false,
  //播放列表
  playlist: [],
  //顺序列表
  sequenceList: [],
  //播放模式
  mode: playMode.sequence,
  //播放歌曲index
  currentIndex: -1,
  //
  disc: {},
  //
  topList: {},
  //搜索历史
  searchHistory: loadSearch(),
  //播放历史
  playHistory: loadPlay(),
  //喜欢列表
  favoriteList: loadFavorite()
}
export default state
