import { SWITCH_STATION_LIST, STATION_INFO } from './types'
import {
    api＿baseSearchConditionGetStByRoleAndComIds
    , api＿userAuthHandleGetCurrentInfoNew
} from '@comprehensiveEnergy/request/api'
import { isProduction } from '@comm/tools/env'
import router from '@comprehensiveEnergy/router'

export default {
    state: {
        // 综合能源电站id
        energyStations: isProduction ? [4177, 4639, 4638] : [4177, 4629, 4630],
        // 电站切换列表
        switchStationList: [],
        // 当前电站基本信息
        currentStationInfo: {}
    },
    getters: {
        isEnergyStation: state => id => {
            return state.energyStations.includes(id || state.currentStationInfo.currentSTID)
        }
    },
    mutations: {
        [SWITCH_STATION_LIST] (state, newList = []) {
            state.switchStationList = newList
        },
        [STATION_INFO] (state, newStationInfo) {
            state.currentStationInfo = newStationInfo
        }
    },
    actions: {
        async switchStationList ({ commit }) {
            const res = await api＿baseSearchConditionGetStByRoleAndComIds({
                data: { stClass: '01' }
            }).promise
            if (Array.isArray(res.body)) commit(SWITCH_STATION_LIST, res.body)
        },
        async stationInfo ({ commit }) {
            const res = await api＿userAuthHandleGetCurrentInfoNew().promise
            if (res.result) commit(STATION_INFO, res)
            if (!res.currentSTID) {
                router.push({name: 'Home'})
            }
        }
    }
}
