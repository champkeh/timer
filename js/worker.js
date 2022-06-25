import {getLatestTime, formatTime, getDiff} from './util.js'

const timeEl = document.querySelector('#time')
const diffEl = document.querySelector('#diff')
let time

// 计算时间差
document.addEventListener('visibilitychange', (evt) => {
    console.log('worker: ', document.visibilityState)
    const latestTime = getLatestTime()
    const diff = getDiff(latestTime, time)
    diffEl.textContent = `${diff.toString()}`
    if (diff > 0) {
        diffEl.classList.add('has-diff')
    } else if (diff === 0) {
        diffEl.classList.remove('has-diff')
    } else {
        console.error('worker比系统时间走的快')
    }
})

/* worker 工厂 */
function createWorker(fn) {
    const blob = new Blob(['(' + fn.toString() + ')()'])
    const url = window.URL.createObjectURL(blob)
    return new Worker(url)
}

const worker = createWorker(() => {
    let timer = null
    let time
    self.onmessage = function ({data}) {
        switch (data.cmd) {
            case 'start':
                if (timer) {
                    clearInterval(timer)
                }

                time = data.time
                timer = setInterval(() => {
                    updateTime(time)
                    postMessage(time)
                }, 1000)
                break
            case 'stop':
                clearInterval(timer)
                break
            default:
                break
        }
    }

    function updateTime(time) {
        time[2]++
        if (time[2] >= 60) {
            time[2] = 0
            time[1]++
        }
        if (time[1] >= 60) {
            time[1] = 0
            time[0]++
        }
        if (time[0] >= 24) {
            time[0] = 0
        }
    }
})

/* 接收 worker 发出的结果 */
worker.onmessage = function ({data}) {
    timeEl.textContent = formatTime(data)
    time = data
}

// 启动 worker 中的计时器
const latestTime = getLatestTime()
worker.postMessage({cmd: 'start', time: latestTime})
