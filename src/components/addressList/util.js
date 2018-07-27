import { pinyinUtil } from '../../../lib/pinyinUtil.js'
export default {
  pySort (arr) {
    var letters = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
    var result = []
    var curr
    var others
    var obj = []
    for (var i = 0; i < letters.length; i++) {
      curr = {letter: letters[i], data: []}
      others = {letter: '#', data: []}
      for (var j = 0; j < arr.length; j++) {
        var firstLetter
        if (arr[j].nickname) {
          firstLetter = pinyinUtil.getFirstLetter(arr[j].nickname)
        } else {
          firstLetter = arr[j].name
        }
        var initial = firstLetter.charAt(0)// 截取第一个字符
        if (initial === letters[i] || initial === letters[i].toLowerCase()) {
          curr.data.push({
            name: arr[j].name,
            avatar: arr[j].avatar,
            nickname: arr[j].nickname,
            id: arr[j].id
          })
        } else if (!isNaN(initial)) {
          if (obj === undefined || !obj[arr[j].name]) {
            others.data.push({
              name: arr[j].name,
              avatar: arr[j].avatar,
              nickname: arr[j].nickname,
              id: arr[j].id
            })
            obj[arr[j].name] = 1
          }
        }
      }
      if (curr.data.length) {
        result.push(curr)
      }
      if (others.data.length) {
        result.push(others)
      }
    }
    return result
  }
}
