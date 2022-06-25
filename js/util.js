/**
 * 获取系统最新时间
 * @return {number[]}
 */
export function getLatestTime() {
    const now = new Date()
    const h = now.getHours()
    const m = now.getMinutes()
    const s = now.getSeconds()
    return [h, m, s]
}

/**
 * 更新时间，+1s
 * @param time
 */
export function updateTime(time) {
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

/**
 * 格式化时间
 * @param time
 * @return {string}
 */
export function formatTime(time) {
    const hh = String(time[0]).padStart(2, '0')
    const mm = String(time[1]).padStart(2, '0')
    const ss = String(time[2]).padStart(2, '0')
    return `${hh}:${mm}:${ss}`
}

/**
 * 获取时间差，time1 - time2
 * @param time1
 * @param time2
 * @return {number}
 */
export function getDiff(time1, time2) {
    const t1 = time1[2] + time1[1] * 60 + time1[0] * 60 * 60
    const t2 = time2[2] + time2[1] * 60 + time2[0] * 60 * 60
    return t1 - t2
}
