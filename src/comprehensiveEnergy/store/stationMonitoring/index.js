import { DATE } from './types'
export default {
    namespaced: true,
    state: {
        // 数据刷新时间间隔
        dataInterval: 10 * 1000,
        date: new Date()
    },
    getters: {
        isToday: state => {
            return new Date(state.date).toDateString() === new Date().toDateString()
        },
        dateStr: state => {
            return new Date(state.date).Format('yyyy-MM-dd')
        },
        dateObj: state => {
            return new Date(state.date)
        }
    },
    mutations: {
        [DATE] (state, date) {
            state.date = date
        }
    },
    actions: {
        dateChange ({commit}, date) {
            commit(DATE, date)
        }
    }
}
