import { getLyric } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return new Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK && res.lyric !== "WzAwOjAwOjAwXeatpOatjOabsuS4uuayoeacieWhq+ivjeeahOe6r+mfs+S5kO+8jOivt+aCqOaso+i1jw==") {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject("no lyric")
        }
      })
    })

  }

}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=1715398998&vkey=A9C6D780FDFD845CA0DB2501F7ADF7D4D9CFE632330CEBCC4F3EC10A642E447A2435E3C9C56ABBE36EE65B3F272697947150FD2CF2C6B5BA&uin=0&fromtag=38`
  })
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
