import {getLatestTime, updateTime, formatTime, getDiff} from './util.js'

const timeEl = document.querySelector('#time')
const diffEl = document.querySelector('#diff')

// 采用 setInterval 更新时间
const time = getLatestTime()
setInterval(() => {
    updateTime(time)
    timeEl.textContent = formatTime(time)
}, 1000)

// 计算时间差
document.addEventListener('visibilitychange', (evt) => {
    console.log('setInterval: ', document.visibilityState)
    const latestTime = getLatestTime()
    const diff = getDiff(latestTime, time)
    diffEl.textContent = `${diff.toString()}`
    if (diff > 0) {
        diffEl.classList.add('has-diff')
    } else if (diff === 0) {
        diffEl.classList.remove('has-diff')
    } else {
        console.error('setInterval比系统时间走的快')
    }
})
