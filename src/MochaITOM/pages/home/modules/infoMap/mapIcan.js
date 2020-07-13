
import BMap from 'BMap'
import BMapLib from 'BMapLib'
import { independent } from '@comm/tools/env'
const staticSrc = independent ? `/static/static-MochaITOM` : `/module/MochaITOM/static`

export let Maps = function (that) {
    let map = new BMap.Map('containers', {enableMapClick: false}) // 创建地图
    // let map = new BMap.Map('containers', { enableMapClick: false, mapType: BMAP_HYBRID_MAP}) // 创建地图
    let point = new BMap.Point(that.mapDatas.mapPoint.x, that.mapDatas.mapPoint.y, 11) // 创建点坐标
    console.log(getZoom(that.lngs, that.lats, map))

    let isUnde = true
    if (typeof (getZoom(that.lngs, that.lats, map)) === 'undefined') {
        isUnde = false
    }
    map.centerAndZoom(point, isUnde ? getZoom(that.lngs, that.lats, map) : 5)// 显示的位置（一直处在中间位置）
    map.enableScrollWheelZoom(true)// 是否滚动放大
    // map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}))
    // map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP] }))
    // 设置样式Id。通过样式Id自定义地图
    map.setMapStyle({
        styleId: 'b14ce9852169462b41ffc352b52e370a'
    })
    // 通过json的形式去修改地图的样式
    let styleJson = [{
        'featureType': 'educationlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'educationlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'scenicspotslabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'scenicspotslabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on',
            'color': '#4a90e2ff'
        }
    }, {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'green',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'building',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'transportation',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'transportation',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'airportlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'airportlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'provincialwaysign',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'provincialwaysign',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'nationalwaysign',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'nationalwaysign',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'nationalway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'provincialway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'cityhighway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'tertiaryway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'tertiaryway',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'fourlevelway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'fourlevelway',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'local',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'local',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'scenicspotsway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'universityway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'railway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subway',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subway',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highwaysign',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'highwaysign',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'tertiarywaysign',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'tertiarywaysign',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'subwaylabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subwaylabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'roadarrow',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'footbridge',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'crosswalk',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'underpass',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'parkingspace',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'laneline',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'village',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'town',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'town',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'district',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'city',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'city',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'medicallabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'medicallabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'entertainmentlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'entertainmentlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'estatelabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'estatelabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'businesstowerlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'businesstowerlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'companylabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'companylabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'governmentlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'governmentlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'restaurantlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'restaurantlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'hotellabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'shoppinglabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'shoppinglabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'lifeservicelabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'lifeservicelabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'carservicelabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'carservicelabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'transportationlabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'transportationlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'financelabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'financelabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'parkinglot',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'playground',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'shopping',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'entertainment',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'scenicspots',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'scenicspots',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'medical',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'medical',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'education',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'education',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'subwaystation',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'hotellabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'land',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on',
            'color': '#0a2458ff'
        }
    }, {
        'featureType': 'road',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'nationalway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'provincialway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'tertiaryway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'fourlevelway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'vacationway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'cityhighway',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'districtlabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'on'
        }
    }, {
        'featureType': 'poilabel',
        'elementType': 'labels',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'manmade',
        'elementType': 'geometry',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'provincialway',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'provincialway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'tertiaryway',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'tertiaryway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'fourlevelway',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'fourlevelway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'local',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'local',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'scenicspotsway',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'scenicspotsway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'universityway',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'universityway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'vacationway',
        'elementType': 'geometry.fill',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'vacationway',
        'elementType': 'geometry.stroke',
        'stylers': {
            'color': '#4b4b4bff'
        }
    }, {
        'featureType': 'district',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#ffffff00'
        }
    }, {
        'featureType': 'village',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#ffffff00'
        }
    }, {
        'featureType': 'town',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#ffffff00'
        }
    }, {
        'featureType': 'city',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#ffffff00'
        }
    }, {
        'featureType': 'city',
        'elementType': 'labels.text.fill',
        'stylers': {
            'color': '#e0d6d6ff'
        }
    }, {
        'featureType': 'poilabel',
        'elementType': 'labels.icon',
        'stylers': {
            'visibility': 'off'
        }
    }, {
        'featureType': 'manmade',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#ffffff00'
        }
    }, {
        'featureType': 'water',
        'elementType': 'labels.text.stroke',
        'stylers': {
            'color': '#ffffff00'
        }
    }, {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': {
            'color': '#111010ff'
        }
    }]
    map.setMapStyle({ styleJson: styleJson })
    //  添加地图事件
    map.addEventListener('click', function (e) {
        let a = document.getElementById('Odoms')
        if (a) {
            if (that.indexDom === 0) {
                that.indexDom += 1
            } else {
                a.parentNode.removeChild(a)
                that.indexDom = 0
            }
        }
    })
    that.maps = map
    CreatDom(map, that)
}

// 通过创建dom来创建小图标
 export let CreatDom = function (map, that) {
    //  console.log('刷新数据')

    function SquareOverlay (point, iCanss, num) {
        this._length = 30
        this._point = point
        this._iCanss = iCanss
        this._num = num
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay()
    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
        // 保存map对象实例
        this._map = map
        // 创建div元素，作为自定义覆盖物的容器
        let div = document.createElement('i')
        div.style.position = 'absolute'
        div.setAttribute('class', this._iCanss)
        div.style.width = this._length + 'px'
        div.style.height = this._length + 'px'
        div.style.fontSize = '24px'
        // div.style.color = '#EFB00C'
        let _this = this
        div.data = that.mapDatas.icanDatas[this._num]
        // 直接显示鼠标放上去的内容
        switch (this._iCanss) {
            case 'iconfont icongongren2':
                if (that.mapDatas.icanDatas[this._num].dispatchTaskVoList.length > 0) {
                    that.mapDatas.icanDatas[this._num].dispatchTaskVoList.forEach(item => {
                        if (item.taskican === 'iconfont iconjinhangzhong') {
                            if (item.taskStatus === '02') {
                                                        arc(this._map, that.mapDatas.icanDatas[this._num].longitude, that.mapDatas.icanDatas[this._num].latitude, item.taskLongitude, item.taskLatitude)
                                                    }
}
                    })
                }
                tip(this._map, _this._point, that.mapDatas.icanDatas[this._num].name, 'sy_xsk_d.png')
                break
            case 'iconfont iconjinhangzhong':
            case 'iconfont iconrenwu1':
            case 'iconfont iconrenwuliebiao_zhijian':
            case 'iconfont iconweichulidingdan':
           tip(this._map, _this._point, that.mapDatas.icanDatas[this._num].name, 'sy_xsk_d.png')
        }
        if (that.mapDatas.icanDatas[this._num].ican === 'iconfont icondianzhan') {
            switch (getState(that.mapDatas.icanDatas[_this._num])) {
                case '正常运行':
                    div.style.color = 'green'
                    break
                case '故障':
                    div.style.color = 'red'
                    break
                case '告警':
                    div.style.color = 'yellow'
                    break
                case '通讯中断':
                    div.style.color = 'gray'
                    break
            }
        }
        if (that.mapDatas.icanDatas[this._num].ican === 'iconfont icon3-01guangfufangzhen') {
            switch (that.mapDatas.icanDatas[_this._num].stateDesc) {
                case '正常运行':
                    div.style.color = 'green'
                    break
                case '故障':
                    div.style.color = 'red'
                    break
                case '报警':
                    div.style.color = 'yellow'
                    break
                case '中断':
                    div.style.color = 'gray'
                    break
                case '待机':
                    div.style.color = 'blue'
                    break
            }
        }
        // 风机状态对应（颜色）
        if (that.mapDatas.icanDatas[this._num].ican === 'iconfont iconfengji20190403-02') {
            switch (that.mapDatas.icanDatas[_this._num].state) {
                case '01':
                    div.style.color = 'green'
                    break
                case '02':
                    div.style.color = 'red'
                    break
                case '03':
                    div.style.color = 'yellow'
                    break
                case '04':
                    div.style.color = 'gray'
                    break
                case '05':
                    div.style.color = 'blue'
                    break
                    case '06':
                   div.style.color = 'blue'
                break
                case '07':
                div.style.color = 'blue'
                break
                case '099':
                    div.style.color = 'blue'
               break
            }
        }

        div.onclick = function (e) {
            if (e.target.data.ican !== 'iconfont iconweichulidingdan' && e.target.data.ican !== 'iconfont iconrenwu1' && e.target.data.ican !== 'iconfont iconjinhangzhong' && e.target.data.ican !== 'iconfont iconrenwuliebiao_zhijian') {
                let oDOM = document.getElementsByClassName('Odom')
                if (oDOM.length === 0) {
                    //   创建弹出框
                    popBox(_this._map, that, _this._point, e)
                    that.flag = true
                } else {
                    oDOM[0].parentElement.removeChild(oDOM[0])
                    popBox(_this._map, that, _this._point, e)
                    that.flag = true
                }
            } else {
                // 展示详情页
                that.getTask(e.target.data.id)
                localStorage.setItem('detaileId', e.target.data.id)
            }
        }

        div.onmouseover = function (e) {
            console.log(e)

            if (e.target.data.ican === 'iconfont icon3-01guangfufangzhen') {
                let labels = tip(_this._map, _this._point, e.target.data.name, 'sy_xsk_d.png')
                div.onmouseout = function () {
                    labels.setStyle({
                        display: 'none'
                    })
                }
                map.addOverlay(labels)
            }
            if (e.target.data.ican === 'iconfont icondianzhan') {
                let labels = tip(_this._map, _this._point, e.target.data.stationName, 'sy_xsk_d.png')
                // this.style.color = '#10BD89'
                div.onmouseout = function () {
                    labels.setStyle({
                        display: 'none'
                    })
                }
                map.addOverlay(labels)
            }
            if (e.target.data.ican === 'iconfont iconfengji20190403-02') {
                let labels = tip(_this._map, _this._point, e.target.data.name, 'sy_xsk_d.png')
                // this.style.color = '#10BD89'
                div.onmouseout = function () {
                    labels.setStyle({
                        display: 'none'
                    })
                }
                map.addOverlay(labels)
            }
        }
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div)
        div.parentNode.style.zIndex = -1
        div.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.style.zIndex = -2
        // console.log(div.parentNode.parentNode.parentNode.parentNode.childNodes)

        // div.parentNode.parentNode.parentNode.parentNode.childNodes[6].style.top = '65px'

        // 保存div实例
        this._div = div
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return div
    }
    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
        let map = this._map
        // 根据地理坐标转换为像素坐标，并设置给容器
        let position = map.pointToOverlayPixel(this._point)
        this._div.style.left = position.x + 'px'
        this._div.style.top = position.y + 'px'
    }
    // 添加自定义覆盖物(小图标)
    map.clearOverlays()
    for (let i = 0; i < that.mapDatas.icanDatas.length; i++) {
        let mySquare = new SquareOverlay(new BMap.Point(Number(that.mapDatas.icanDatas[i].longitude), Number(that.mapDatas.icanDatas[i].latitude)), that.mapDatas.icanDatas[i].ican, i)
        map.addOverlay(mySquare)
    }
}
//    显示文本内容封装
function tip (map, points, text, pathName) {
    let opts = {
        position: points, // 指定文本标注所在的地理位置
        offset: new BMap.Size(-30, -50) // 设置文本偏移量
    }

    let label = new BMap.Label(text, opts) // 创建文本标注对象
    label.setStyle({
        color: '#FCFCFD',
        fontSize: '16px',
        position: 'absolute',
        zIndex: 1,
        border: '0',
        height: '45px',
        textAlign: 'center',
        padding: '0 20px',
        fontWight: 900,
        lineHeight: '45px',
        fontFamily: '微软雅黑',
        background: 'url(' + `${staticSrc}/images/` + pathName + ') no-repeat',
        backgroundSize: '100% 100%'

    })
    map.addOverlay(label)
    return label
}
// 弹框信息
function popBox (map, that, point, e) {
    function SquareOverlay (points, e) {
        this._point = points
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new BMap.Overlay()
    // 实现初始化方法
    SquareOverlay.prototype.initialize = function (map) {
        // 保存map对象实例
        this._map = map
        // 创建div元素，作为自定义覆盖物的容器
        let div = document.createElement('div')
        div.setAttribute('class', 'Odom')
        div.setAttribute('id', 'Odoms')
        this._div = div
        div.style.position = 'absolute'
        div.style.width = 200 + 'px'
        div.style.height = 220 + 'px'
        div.style.borderRadius = '5px'
        div.style.fontSize = '14px'
        div.style.background = 'url(' + `${staticSrc}/images/33.png` + ') no-repeat'
        div.style.backgroundSize = '100% 100%'
        // debugger
        let childs = div.children
        // 根据类型判断是否可以点击that.PowerType == 0是公司级的 ==1是电站级的
        // debugger
        if (that.PowerType === 0) {
            // 点站图表 点进去有链接的
            if (e.target.data.ican === 'iconfont icondianzhan') {
                div.innerHTML = `<span>×</span>
                <div>${e.target.data.stationName}</div>
                <div>运行状态:${getState(e.target.data)}</div>
                <div>容量:${e.target.data.inst_kw}KW</div>
                <div>进入电站 ></div>
                `
                childs[4].style.cssText = 'height:30px;text-align:right;color:#20DFFF;font-size:14px;line-height:30px;margin-right:20px'
                childs[4].data = e.target.data
                childs[4].onclick = function (e) {
                    //  切换电站并且重新渲染
                    that.changePowerStation(e)
                }
            } else if (e.target.data.ican === 'iconfont icongongren2') {
                //  公司级的任务人员，点击去不显示链接
                div.innerHTML = `<span>×</span>
                <div>${e.target.data.name}</div>
                <div>电话:${e.target.data.phone}</div>
                <div>任务点距离:${e.target.data.distance === null ? '' : e.target.data.distance.replace(/\d/g, function () {
                    if ((e.target.data.distance.length - arguments[1] - 1) % 3 === 0 && e.target.data.distance.length - 1 !== arguments[1]) {
                        return arguments[0] + ','
                    } else {
                        return arguments[0]
                    }
                })

            }</div>
                <div>位置更新时间:${e.target.data.positionUpTime === null ? '' : new Date(Date.parse(e.target.data.positionUpTime)).Format('yyyy-MM-dd')}</div>
                `
                childs[4].style.cssText = 'height:30px;line-height:15px;text-indent:16px;color:#FFFFFF;font-weight:100'
            }
        } else {
            // 电站级别的提示框，点击进去不显示链接
            if (e.target.data.ican === 'iconfont icon3-01guangfufangzhen') {
                div.innerHTML = `<span>×</span>
                <div>${e.target.data.name}</div>
                <div>运行状态:${e.target.data.stateDesc}</div>
                <div>容量:${e.target.data.inst_kw}KW</div>
                `
            }
            if (e.target.data.ican === 'iconfont iconfengji20190403-02') {
                div.innerHTML = `<span>×</span>
                <div>${e.target.data.name}</div>
                <div>运行状态:${e.target.data.stateDesc}</div>
                <div>容量:${e.target.data.inst_kw}</div>
                `
            }
        }
        if (e.target.data.ican !== 'iconfont iconweichulidingdan' && e.target.data.ican !== 'iconfont iconrenwu1' && e.target.data.ican !== 'iconfont iconjinhangzhong' && e.target.data.ican !== 'iconfont iconrenwuliebiao_zhijian') {
            for (let i = 1; i < childs.length - 1; i++) {
                childs[i].style.cssText = 'height:30px;line-height:15px;text-indent:16px;color:#FFFFFF;font-weight:100'
            }
            childs[0].onclick = function () {
                div.remove()
            }
            childs[0].style.cssText = 'margin:10px 3px 0 0;width:18px;height:18px;border:1px solid #50A7CC;display:inline-block;text-align:center;color:#50A7CC;float:right;'
            childs[1].style.cssText = 'font-weight:900;height:25px;margin-top:10px;line-height:15px;text-indent:16px;color:#FFFFFF;'
            childs[3].style.cssText = 'height:30px;line-height:15px;text-indent:16px;color:#FFFFFF;font-weight:100'
        }

        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div)
        div.parentNode.style.zIndex = 600

        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return div
    }
    // 实现绘制方法
    SquareOverlay.prototype.draw = function () {
        let map = this._map
        // 根据地理坐标转换为像素坐标，并设置给容器
        let position = map.pointToOverlayPixel(this._point)
        this._div.style.left = position.x - 190 + 'px'
        this._div.style.top = position.y - 210 + 'px'
    }
    // 添加自定义覆盖物
    let mySquare = new SquareOverlay(new BMap.Point(point.lng, point.lat), e)
    map.addOverlay(mySquare)
}
//   地图的缩放级别
function getZoom (lngs, lats, map) {
    let zoom = ['50', '100', '200', '500', '1000', '2000', '5000', '10000', '20000', '25000', '50000', '100000', '200000', '500000', '1000000', '2000000']// 级别18到3。
    // debugger
    let pointA = new BMap.Point(Number(lngs[lngs.length - 1]), Number(lats[lats.length - 1])) // 创建点坐标A
    let pointB = new BMap.Point(Number(lngs[0]), Number(lats[0])) // 创建点坐标B
    let distance = map.getDistance(pointA, pointB).toFixed(1) // 获取两点距离,保留小数点后两位
    for (let i = 0; i < zoom.length; i++) {
        if (zoom[i] - distance > 0) {
            return 18 - i + 3// 之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
        }
    };
}
//  添加两坐标点之间的弧线
function arc (map, longitude, latitude, taskLongitude, taskLatitude) {
    let beijingPosition = new BMap.Point(Number(longitude), Number(latitude))
    let hangzhouPosition = new BMap.Point(Number(taskLongitude), Number(taskLatitude))
    let points = [beijingPosition, hangzhouPosition]

    let curve = new BMapLib.CurveLine(points, { strokeColor: '#FDFC47', strokeWeight: 4, strokeOpacity: 1, strokeStyle: 'dashed' }) // 创建弧线对象
    map.addOverlay(curve) // 添加到地图中
    curve.enableEditing() // 开启编辑功能
}
// 判断电站状态
function getState (val) {
    switch (val.stationClass) {
        case '01': // 光伏电站
            switch (val.run_status) {
                case '0':
                    return '正常运行'
                case '1': //
                    return '故障'
                case '2': //
                    return '告警'
                case '3': //
                    return '通讯中断'
                case '4': // 初始化
                    return '初始化'
                case '5':
                    return '未知'
                case '6':
                    return '未接入'
                case '7':
                    return '部分中断'
                case '8':
                    return '部分中断和报警'
                case '9':
                    return '部分中断和故障'
            }
            break
        case '02':
            switch (val.run_status) {
                case '0':
                    return '正常运行'
                case '1': //
                    return '待机'
                case '2': //
                    return '故障'
                case '3': //
                    return '告警'
                case '4': // 初始化
                    return '通讯中断'
                case '5':
                    return '待机'
            }
    }
    if (typeof (val.stationClass) === 'undefined' || val.stationClass === null) {
        switch (val.run_status) {
            case '00':
                return '任务待启动'
            case '01':
                return '在途中'
            case '02':
                return '处理中'
            case '03':
                return '处理完成'
        }
    }
}
