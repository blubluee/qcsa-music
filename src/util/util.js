import * as dayjs from 'dayjs'

export default {
  // 将毫秒转成00:00形式
  formatSecond(time) {
    time = time / 1000
    let second = parseInt(time / 60)
    let minute = parseInt(time % 60)
    second = second < 10 ? '0' + second : '' + second
    minute = minute < 10 ? '0' + minute : '' + minute
    const result = second + ":" + minute
    return result
  },

  // 转换时间戳 格式为：DD MM YYYY
  formatTime(time) {
    const date = dayjs(time).format('DD/MM/YYYY')
    return date.slice(-2)
  },

  // 转换时间戳 格式为：YYYY MM DD
  formatTime_Y(time) {
    const data = dayjs(time).format('YYYY-MM-DD')
    return data
  },
  // 转换时间戳, 只要日
  formatTime_D(time) {
    const date = dayjs(time).format('DD/MM/YYYY')
    return date.slice(0, 2)
  },

}