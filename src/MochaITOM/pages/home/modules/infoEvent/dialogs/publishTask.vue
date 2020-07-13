<template>
    <div class="publish-task-dialog">
        <div v-show="showDialog === 'firstStep'">
            <el-form label-width="120px" :model="formData" :rules="formRules" ref="formData" class="task-content" style="width:84%;margin: 20px auto;">
                <el-form-item label="任务类型">
                    <el-radio-group v-model="formData.type" size="medium">
                        <el-radio-button label="01" :disabled="isRepair">通用</el-radio-button>
                        <el-radio-button label="02">检修</el-radio-button>
                        <el-radio-button label="03" :disabled="isRepair">清洗</el-radio-button>
                        <el-radio-button label="04" :disabled="isRepair">抄表</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电站名称" prop="stationId">
                    <el-select placeholder="请选择" v-model="formData.stationId" @change="changeStation()" :filterable="true" :disabled="isRepair">
                        <el-option
                            v-for="item in stationlistData.res.data"
                            :key="item.id"
                            :label="item.name"
                            :value="item.busiId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行人" prop="handlerIdList">
                    <span class="like-input" @click="toSelectExecutors()" :title="executors">{{executors}}</span>
                    <span v-if="taskPeopleType === 'share'">
                        <span style="margin:0 10px 0 30px;">红包金额(元)</span>
                        <el-input v-model="formData.redEnvAmount" style="width:217px;"></el-input>
                    </span>
                </el-form-item>
                <el-form-item label="抄送人">
                    <el-select v-model="formData.ccIds" :filterable="true" multiple collapse-tags>
                        <el-option
                            v-for="item in peopleProfessinalData.res.data"
                            :key="item.id"
                            :label="item.realname"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务周期">
                    <el-radio-group v-model="formData.cycle">
                        <el-radio label="01">一次性</el-radio>
                        <el-radio label="02">每天</el-radio>
                        <el-radio label="03">每周</el-radio>
                        <el-radio label="04">每月</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="通知执行人">
                    <el-row>
                        <el-col :span="8" v-if="formData.cycle === '01'">
                            <el-select v-model="time1TypeObj.timeType" placeholder="请选择" style="width:90%;">
                                <el-option label="立即通知" value="1"></el-option>
                                <el-option label="设置时间" value="2"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="16">
                            <el-date-picker
                                v-if="formData.cycle === '01' && time1TypeObj.timeType === '2'"
                                style="width:180px;"
                                v-model="time1TypeObj.startDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <el-select v-if="formData.cycle === '04'" v-model="time1TypeObj.day" placeholder="请选择" style="width:90px;">
                                <el-option
                                    v-for="item in dayArr"
                                    :key="item.day"
                                    :label="item.day"
                                    :value="item.day">
                                </el-option>
                            </el-select>
                            <span v-if="formData.cycle === '04'" class="day-lable">日</span>
                            <el-select v-if="formData.cycle === '03'" v-model="time1TypeObj.week" placeholder="请选择" style="width:90px;">
                                <el-option
                                    v-for="item in weekArr"
                                    :key="item.week"
                                    :label="item.name"
                                    :value="item.week">
                                </el-option>
                            </el-select>
                            <el-time-select
                                v-if="(formData.cycle === '01' && time1TypeObj.timeType === '2') || formData.cycle === '02' || formData.cycle === '03' || formData.cycle === '04'"
                                style="width:150px;"
                                v-model="time1TypeObj.startTime"
                                :picker-options="{
                                    start: '06:00',
                                    step: '00:30',
                                    end: '23:30'
                                }" placeholder="选择时间">
                            </el-time-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="计划开始时间">
                    <el-row>
                        <el-col :span="8" v-if="formData.cycle === '01'">
                            <el-select v-model="time2TypeObj.timeType" placeholder="请选择" style="width:90%;">
                                <el-option label="通知后立即开始" value="1"></el-option>
                                <el-option label="设置时间" value="2"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="16">
                            <el-date-picker
                                v-if="formData.cycle === '01' && time2TypeObj.timeType === '2'"
                                style="width:180px;"
                                v-model="time2TypeObj.startDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <el-select v-if="formData.cycle === '04'" v-model="time2TypeObj.day" placeholder="请选择" style="width:90px;">
                                <el-option
                                    v-for="item in dayArr"
                                    :key="item.day"
                                    :label="item.day"
                                    :value="item.day">
                                </el-option>
                            </el-select>
                            <span v-if="formData.cycle === '04'" class="day-lable">日</span>
                            <el-select v-if="formData.cycle === '03'" v-model="time2TypeObj.week" placeholder="请选择" style="width:90px;">
                                <el-option
                                    v-for="item in weekArr"
                                    :key="item.week"
                                    :label="item.name"
                                    :value="item.week">
                                </el-option>
                            </el-select>
                            <el-time-select
                                v-if="(formData.cycle === '01' && time2TypeObj.timeType === '2') || formData.cycle === '02' || formData.cycle === '03' || formData.cycle === '04'"
                                style="width:150px;"
                                v-model="time2TypeObj.startTime"
                                :picker-options="{
                                    start: '06:00',
                                    step: '00:30',
                                    end: '23:30'
                                }" placeholder="选择时间">
                            </el-time-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="计划结束时间">
                    <el-row>
                        <el-col :span="8" v-if="formData.cycle === '01'">
                            <el-select v-model="time3TypeObj.timeType" placeholder="请选择" style="width:90%;">
                                <el-option label="无" value="1"></el-option>
                                <el-option label="设置时间" value="2"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="16">
                            <el-date-picker
                                v-if="formData.cycle === '01' && time3TypeObj.timeType === '2'"
                                style="width:180px;"
                                v-model="time3TypeObj.startDate"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <el-select v-if="formData.cycle === '04'" v-model="time3TypeObj.day" placeholder="请选择" style="width:90px;">
                                <el-option
                                    v-for="item in dayArr"
                                    :key="item.day"
                                    :label="item.day"
                                    :value="item.day">
                                </el-option>
                            </el-select>
                            <span v-if="formData.cycle === '04'" class="day-lable">日</span>
                            <el-select v-if="formData.cycle === '03'" v-model="time3TypeObj.week" placeholder="请选择" style="width:90px;">
                                <el-option
                                    v-for="item in weekArr"
                                    :key="item.week"
                                    :label="item.name"
                                    :value="item.week">
                                </el-option>
                            </el-select>
                            <el-time-select
                                v-if="(formData.cycle === '01' && time3TypeObj.timeType === '2') || formData.cycle === '02' || formData.cycle === '03' || formData.cycle === '04'"
                                style="width:150px;"
                                v-model="time3TypeObj.startTime"
                                :picker-options="{
                                    start: '06:00',
                                    step: '00:30',
                                    end: '23:30'
                                }" placeholder="选择时间">
                            </el-time-select>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div style="text-align:center;"><el-button type="primary" @click="nextStep()">下一步</el-button></div>
        </div>
        <div v-show="showDialog === 'secondStep'" style="position:relative;">
            <el-form label-width="120px" :model="formData1" :rules="formRules1" ref="formData1" class="task-content" style="width:80%;margin: 20px auto;">
                <el-form-item label="任务名称" prop="name">
                    <el-input v-model="formData1.name" placeholder="请输入任务名称" style="width:90%;"></el-input>
                </el-form-item>
                <el-form-item label="任务内容">
                    <el-input v-model="formData1.content" type="textarea" :rows="2" placeholder="请输入任务内容" style="width:90%;"></el-input>
                </el-form-item>
                <!-- 若任务类型为抄表 -->
                <el-form-item label="期数" v-if="formData.type === '04'">
                    <el-date-picker
                        v-model="meterReadTerm"
                        type="month"
                        placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="添加附件">
                    <el-upload
                        ref="upload"
                        action="/api/oss/saveAndUploadOss"
                        :headers="{'X-Requested-With': 'XMLHttpRequest'}"
                        :data="{bizType: 'mainTask', bizId: ''}"
                        :on-success="uploadSuccess"
                        :on-remove="removeFile"
                        :file-list="fileList">
                        <span slot="trigger"><i class="iconfont icontianjia"></i></span>
                        <!-- <el-button slot="trigger" size="small" type="b1">选取文件</el-button> -->
                    </el-upload>
                </el-form-item>
                <div class="task-point-con">
                    <div class="task-point" v-for="(childTask, index) in childTaskList" :key="index">
                        <p>任务点{{index + 1}}</p>
                        <span class="delete-task-icon" @click="deleteChildTask(index)"><i class="iconfont iconcuowu"></i></span>
                        <el-form-item label="待检修设备" v-if="formData.type === '02'">
                            <el-input v-model="childTask.deviceName" placeholder="请输入设备名称" style="width:217px;"></el-input>
                        </el-form-item>
                        <el-form-item label="任务内容">
                            <el-input v-model="childTask.name" placeholder="请输入任务内容" style="width:217px;"></el-input>
                        </el-form-item>
                        <el-form-item label="任务地理位置">
                            <el-input v-model="childTask.position" class="input-with-select" placeholder="请输入地理位置" style="width:90%;">
                                <el-button slot="append" icon="el-icon-search" @click="showMap(childTask, index)"></el-button>
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div style="position:absolute;width:80%;text-align:right;bottom: -19px;background: white;padding: 10px 0;">
                    <el-button type="primary" @click="addChildTask()" style="float:left" v-if="!isRepair">+ 增加任务点</el-button>
                    <el-button @click="showDialog = 'firstStep'">上一步</el-button>
                    <el-button type="primary" @click="toPublishTask()">确定</el-button>
                </div>
            </el-form>
            <div class="map-container" v-if="mapDialog.show">
                <el-input v-model="mapSearchKeyword" placeholder="区域关键字搜索" class="map-search-input"></el-input>
                <el-button type="primary" class="select-pos-btn-cancel" @click="confirmPositionCancel()">放弃选择</el-button>
                <el-button type="primary" class="select-pos-btn" @click="confirmPosition()">选好了</el-button>
                <baidu-map
                    :center="mapDialog.center"
                    :zoom="mapDialog.zoom"
                    @ready="handler"
                    class="bm-view"
                    :scroll-wheel-zoom="true"
                    ak="PDG8ovPtyIsvYXNFR55sLYbdSKFql7W7">
                    <bm-local-search :keyword="mapSearchKeyword" :auto-viewport="true"></bm-local-search>
                    <bm-marker :position="mapDialog.markerPoint" :dragging="true"></bm-marker>
                    <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" ></bm-navigation>
                </baidu-map>
            </div>
        </div>
        <div class="executor-con" v-if="showDialog === 'executorStep'">
            <executors v-bind="executorProps"></executors>
        </div>
    </div>
</template>

<script>
import {queryStWithListStationlist, peopleProfessinal, addPlanTask, queryDeviceMapPosition, getStationGeo, api＿apiAuthtaskDetail, getPositionByLonlat, uploadOssFile} from '@/request/api'
import {Select, Option, FormItem, Form, Input, RadioGroup, RadioButton, Upload, TimeSelect, Message} from 'element-ui'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
export default {
    props: {
        isRepair: {},
        checkedEvents: {},
        repairData: {},
        taskId: {}
    },
    data () {
        return {
            formRules: {
                stationId: [
                    {required: true, message: '请选择电站', trigger: 'blur'}
                ],
                handlerIdList: [
                    {required: true, message: '请选择执行人', trigger: 'blur'}
                ]
            },
            formRules1: {
                name: [
                    {required: true, message: '请输入任务名称', trigger: 'blur'}
                ]
            },
            formData: {
                id: '',
                handlerIdList: null,
                type: '01', // 任务类型，默认为通用
                cycle: '01' // 任务周期，默认为一次性
            },
            executorProps: {}, // 传给执行者的参数对象
            personsArr: [], // 选择完的执行者
            formData1: {},
            meterReadTerm: new Date(), // 若为清洗，期数值
            fileList: [], // 上传附件
            currentStationName: '',
            showDialog: 'firstStep', // 面板显示哪部分（第一步，第二步、执行人）
            taskPeopleType: null, // 已选择的执行人类型，专业还是共享
            executors: null, // 显示的执行人名称
            weekArr: [{'week': 1, 'name': '周一'}, {'week': 2, 'name': '周二'}, {'week': 3, 'name': '周三'}, {'week': 4, 'name': '周四'}, {'week': 5, 'name': '周五'}, {'week': 6, 'name': '周六'}, {'week': 7, 'name': '周日'}],
            dayArr: [],
            time1TypeObj: { // 时间通知设置-执行人
                startDate: '',
                startTime: '',
                week: '',
                day: '',
                timeType: '1'
            },
            time2TypeObj: { // 开始时间通知设置
                startDate: '',
                startTime: '',
                week: '',
                day: '',
                timeType: '1'
            },
             time3TypeObj: { // 结束时间通知设置
                startDate: '',
                startTime: '',
                week: '',
                day: '',
                timeType: '1'
            },
            mapDialog: { // 地图显示
                show: false,
                center: {lng: 0, lat: 0},
                zoom: 3,
                map: null,
                geoc: null,
                markerPoint: {lng: 116.404, lat: 39.915},
                position: '',
                hasDefault: false
            },
            selectedStationPos: null, // 所选的电站地理位置信息
            childTaskList: [{name: '', position: '', longitude: '', latitude: '', deviceId: '', deviceName: '', eventList: []}], // 子任务列表
            editCurrentTaskIndex: null, // 当前修改地理位置的任务序号
            mapSearchKeyword: '',
            stationlistData: queryStWithListStationlist({
                later: true
            }),
            peopleProfessinalData: peopleProfessinal({
                later: true
            }),
            saveAddTask: addPlanTask({
                later: true
            }),
            queryDeviceMapPositionData: queryDeviceMapPosition({
                later: true
            }),
            getStationGeoData: getStationGeo({later: true}),
            apiAuthtaskDetail: api＿apiAuthtaskDetail({later: true}),
            getPositionByLonlatData: getPositionByLonlat({later: true}),
            uploadOssFileData: uploadOssFile({later: true})
        }
    },
    methods: {
        // 选择电站
        changeStation () {
            this.stationlistData.res.data.map(v => {
                if (this.formData.stationId === v.busiId) this.currentStationName = v.name
            })
            if (!this.taskId) this.getDefaultStaPos()
        },
        // 去选择执行人
        toSelectExecutors () {
            if (!this.formData.stationId) return Message.error('请先选择一个电站')
            if (this.formData.mode) {
                this.executorProps = {
                    stid: this.formData.stationId,
                    currentExecutorTypeProp: this.taskPeopleType,
                    handlerIdList: this.formData['handlerIdList'],
                    handlerNameList: this.formData['handlerNameList'],
                    personsArr: this.personsArr
                }
            } else {
                this.executorProps = {
                    stid: this.formData.stationId
                }
            }
            this.showDialog = 'executorStep'
        },
        // 下一步
        nextStep () {
            // 确认选了电站
            if (!this.formData.stationId) return Message.error('请先选择一个电站')
            this.showDialog = 'secondStep'
        },
        // 上传
        uploadSuccess (data, file, fileList) {
            if (file.status !== 'success') return
            this.fileList = fileList
        },
        removeFile (file, fileList) {
            if (file.status !== 'success') return
            this.fileList = fileList
        },
        concatTimeFun () {
            let cycle = this.formData.cycle
            // 通知执行人时间
            this.formData['pointTime'] = (cycle === '01' && this.time1TypeObj.timeType === '2') ? (this.time1TypeObj.startDate ? this.time1TypeObj.startDate.Format('yyyy-MM-dd') : '') : (cycle === '04' ? this.time1TypeObj.day : (cycle === '03' ? this.time1TypeObj.week : ''))
            this.formData['publishTime'] = (cycle === '01' && this.time1TypeObj.timeType === '1') ? '' : (this.time1TypeObj.startTime ? (this.time1TypeObj.startTime + ':00') : '')
            // 开始执行时间
            this.formData['startPoint'] = (cycle === '01' && this.time2TypeObj.timeType === '2') ? (this.time2TypeObj.startDate ? this.time2TypeObj.startDate.Format('yyyy-MM-dd') : '') : (cycle === '04' ? this.time2TypeObj.day : (cycle === '03' ? this.time2TypeObj.week : ''))
            this.formData['startTime'] = (cycle === '01' && this.time2TypeObj.timeType === '1') ? '' : (this.time2TypeObj.startTime ? (this.time2TypeObj.startTime + ':00') : '')
            // 结束执行时间
            this.formData['endPoint'] = (cycle === '01' && this.time3TypeObj.timeType === '2') ? (this.time3TypeObj.startDate ? this.time3TypeObj.startDate.Format('yyyy-MM-dd') : '') : (cycle === '04' ? this.time3TypeObj.day : (cycle === '03' ? this.time3TypeObj.week : ''))
            this.formData['endTime'] = (cycle === '01' && this.time3TypeObj.timeType === '1') ? '' : (this.time3TypeObj.startTime ? (this.time3TypeObj.startTime + ':00') : '')
        },
        // 校验-发布任务
        toPublishTask () {
            this.$refs.formData.validate((valid, a) => { // 校验
                if (!valid) return false
                this.$refs.formData1.validate((inside, a) => {
                    if (!inside) return false
                    this.concatParamsData()
                })
            })
        },
        // 发布任务
        concatParamsData () {
            if (this.formData.type !== '02') {
                this.childTaskList.map(v => (v.deviceName = ''))
            }
            if (this.formData.type === '04') {
                this.formData1.meterReadTerm = this.meterReadTerm ? this.meterReadTerm.Format('yyyy-MM') : ''
            } else {
                if (this.formData1.meterReadTerm) delete this.formData1.meterReadTerm
            }
            if (this.fileList && this.fileList.length) {
                this.formData1['fileIdList'] = this.fileList.map(v => {
                    return v?.response?.data?.id
                })
            }
            this.concatTimeFun()
            let formData = this.formData
            formData['ccNameList'] = [] // 抄送人姓名
            this.peopleProfessinalData.res.data.map(v => {
                if (formData.ccIds.includes(v.id)) formData['ccNameList'].push(v.realname)
            })
            this.stationlistData.res.data.map(v => {
                if (formData.stationId === v.busiId) formData['stationName'] = v.name
            })
            formData['initiatorId'] = this.$store.getters.user_id
            formData['initiatorName'] = this.$store.getters.real_name
            Object.assign(formData, this.formData1, {itemTaskVOList: this.childTaskList})
            this.saveAddTask.getData(formData).then(res => {
                if (res.code !== 200) return Message.error(res.msg || '派工失败')
                Message.success(res.msg || '派工成功')
                this.$emit('updateSuccess')
            })
        },
        // 显示地图
        showMap (child, index) {
            this.editCurrentTaskIndex = index
            if (child.longitude && child.latitude) {
                this.mapDialog.hasDefault = true
                this.mapDialog.markerPoint = {lng: child.longitude, lat: child.latitude}
                this.mapDialog.center = {lng: child.longitude, lat: child.latitude}
                this.mapDialog.position = child.position
            }
            this.mapDialog.show = true
        },
        handler ({BMap, map}) {
            this.BMap = BMap
            if (!this.mapDialog.hasDefault) {
                this.mapDialog.center.lng = 116.404
                this.mapDialog.center.lat = 39.915
            }
            this.mapDialog.zoom = 15
            this.setMapClick(BMap, map)
        },
        setMapClick (BMap, map) {
            this.map = map
            map.addEventListener('click', clickCallback)
            let _this = this
            function clickCallback (e) {
                _this.mapDialog.markerPoint = e.point
                _this.mapDialog.longitude = e.point.lng
                _this.mapDialog.latitude = e.point.lat
                let geoc = new BMap.Geocoder()
                geoc.getLocation(e.point, function (rs) {
                    let addComp = rs.addressComponents
                    _this.mapDialog.position = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
                })
            }
        },
        // 选好地址，关闭地图
        confirmPosition () {
            this.mapDialog.show = false
            this.childTaskList[this.editCurrentTaskIndex].position = this.mapDialog.position
            this.childTaskList[this.editCurrentTaskIndex].longitude = this.mapDialog.longitude
            this.childTaskList[this.editCurrentTaskIndex].latitude = this.mapDialog.latitude
        },
        // 放弃选择地址，返回
        confirmPositionCancel () {
            this.mapDialog.show = false
        },
        // 添加任务点
        addChildTask () {
            this.childTaskList.push({name: '', position: '', longitude: '', latitude: '', deviceId: '', deviceName: '', eventList: []})
        },
        // 删除任务点
        deleteChildTask (index) {
            this.childTaskList.splice(index, 1)
        },
        // 清洗、抄表，默认获取电站的地理位置信息，作为默认一个子任务点
        getDefaultStaPos () {
            this.getStationGeoData.getData({stid: this.formData.stationId}).then(res => {
                if (res.data) {
                    this.selectedStationPos = res.data
                    if (!this.isRepair) {
                        this.childTaskList = []
                        this.childTaskList.push({name: this.currentStationName, position: res.data.address, longitude: res.data.longitude, latitude: res.data.latitude, deviceId: '', deviceName: '', eventList: []})
                    }
                }
            })
        },
        openModal () {
            // 勾选电站，检修
            if (this.isRepair) {
                this.formData = {
                    type: this.repairData.type,
                    stationId: this.repairData.stid,
                    id: '',
                    handlerIdList: null,
                    cycle: '01'
                }
                // 获取当前电站的地理位置信息
                this.getStationGeoData.getData({stid: this.formData.stationId}).then(res => {
                    if (res.data) {
                        this.selectedStationPos = res.data
                        let deviceParams = []
                        let deviceIdArr = []
                        let eventList = this.checkedEvents.map(v => ({eventId: v.id, eventName: v.eventname}))
                        this.checkedEvents.map(v => {
                            if (!deviceIdArr.includes(v.deviceId)) {
                                deviceIdArr.push(v.deviceId)
                                deviceParams.push({deviceType: v.deviceType, deviceId: v.deviceId})
                            }
                        })
                        // 设备子任务点
                        this.queryDeviceMapPositionData.getData(deviceParams).then(res => {
                            this.childTaskList = []
                            if (res.data && res.data.length) {
                                res.data.map(v => {
                                    this.childTaskList.push({name: '检修' + v.deviceName + '的问题', position: this.selectedStationPos.address, longitude: v.lon, latitude: v.lat, deviceId: v.deviceId, deviceName: v.deviceName, eventList})
                                })
                            }
                        })
                    }
                })
                let station = this.checkedEvents[0].pstationname
                let problems = [...new Set(this.checkedEvents.map(v => (v.eventDesc)))]
                this.formData1 = {
                    name: (problems.length > 2 ? (problems[0] + '、' + problems[1]) : problems.join('、')) + '等异常检修',
                    content: '到' + station + '电站进行检修，包含' + problems.join('、') + '等问题'
                }
            }
            // 重新发布任务
            if (this.taskId) {
                this.apiAuthtaskDetail.getData({id: this.taskId}).then(res => {
                    if (res.code !== 200) return Message.error(res.msg || '获取任务详情失败')
                    let data = res.data
                    if (data.itemTaskList && data.itemTaskList.length) {
                        // let params = data.itemTaskList[0]
                        // this.getPositionByLonlatData.getData({lat: params.latitude, lon: params.longitude}).then(res => {
                        // })
                        this.childTaskList = []
                        data.itemTaskList.map(v => {
                            this.childTaskList.push({id: v.id, name: v.name, position: v.position, longitude: v.longitude, latitude: v.latitude, deviceId: v.deviceId, deviceName: v.deviceName, eventList: v.eventList})
                        })
                    }
                    this.formData = {
                        id: data.id,
                        type: data.type,
                        stationId: data.stationId,
                        stationName: data.stationName,
                        cycle: data.cycle,
                        pointTime: data.pointTime, // 时间
                        publishTime: data.publishTime,
                        startPoint: data.startPoint,
                        startTime: data.startTime,
                        endPoint: data.endPoint,
                        endTime: data.endTime, // 时间
                        content: data.content,
                        ccIds: data.ccIds,
                        ccNameList: data.ccNameList,
                        handlerIdList: [data.handlerId],
                        handlerNameList: [data.handlerName],
                        mode: data.mode
                    }
                    this.taskPeopleType = this.formData.mode === '01' ? 'share' : 'profession'
                    if (this.taskPeopleType === 'share') {
                        this.personsArr = {id: data.handlerId, realname: data.handlerName}
                        // this.personsArr = {id: data.handlerId, realname: data.handlerName, shareTab: '1'} // ???todo
                    } else if (this.taskPeopleType === 'profession') {
                        this.personsArr = [{id: data.handlerId, realname: data.handlerName}]
                    }
                    // this.revertTimeFun(data)
                    this.executors = data.handlerName
                    this.formData1 = {
                        name: data.name,
                        content: data.content
                    }
                    if (data.fileInfolist && data.fileInfolist.length) this.fileList = data.fileInfolist
                    if (this.formData.type === '04') {
                        this.meterReadTerm = data.meterReadTerm ? new Date(data.meterReadTerm) : new Date()
                    }
                })
            }
        }
    },
    created () {
        this.$bus.on('openPublishTaskDialog', this.openModal)
        this.stationlistData.getData()
        this.peopleProfessinalData.getData()
        this.dayArr = new Array(31).fill(0).map((v, i) => ({'day': i + 1}))
        // 监听选择执行人
        this.$bus.$on('selectedExecutorEmit', (data) => {
            this.showDialog = 'firstStep'
            if (!data.persons) return
            this.taskPeopleType = data.type
            this.formData['mode'] = data.type === 'share' ? '01' : '02' // 任务模式(共享01，专业02)
            let persons = data.persons
            this.personsArr = persons
            if (data.type === 'share') {
                this.executors = persons.realname
                this.formData['handlerIdList'] = [persons.id]
                this.formData['handlerNameList'] = [persons.realname]
            } else {
                this.executors = persons.map(v => v.realname).join('、')
                this.formData['handlerIdList'] = persons.map(v => v.id)
                this.formData['handlerNameList'] = persons.map(v => v.realname)
            }
        })
    },
    beforeDestroy () {
        this.$bus.off('openPublishTaskDialog', this.openModal)
    },
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElSelect: Select,
        ElOption: Option,
        ElRadioGroup: RadioGroup,
        ElRadioButton: RadioButton,
        ElInput: Input,
        ElUpload: Upload,
        ElTimeSelect: TimeSelect,
        Executors: () => import('./executors'),
        BaiduMap,
        BmNavigation,
        BmMarker,
        BmLocalSearch
    }
}
</script>

<style lang="scss" scoped>
.publish-task-dialog {
    .task-content{
        max-height:calc(100vh - 340px);
        overflow:auto;
        .like-input{
            border:1px solid rgb(220, 223, 230);
            width: 217px;
            cursor: pointer;
            display: inline-block;
            height: 34px;
            line-height: 34px;
            vertical-align: middle;
            border-radius: 4px;
            padding: 0 17px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .day-lable{
            margin-right: 15px;
        }
        .task-point-con{
            padding-bottom: 15px;
            .task-point{
                background: #f7f7f7;
                padding: 15px 52px 1px;
                margin-bottom:10px;
                position: relative;
                .delete-task-icon{
                    display: inline-block;
                    position: absolute;
                    width: 22px;
                    height: 22px;
                    right: 0;
                    top:0;
                    border-radius: 50%;
                    border: 1px solid red;
                    text-align: center;
                    line-height: 21px;
                    cursor: pointer;
                    .iconfont{
                        font-size: 20px;
                        color: red;
                    }
                }
            }
        }
    }
    .executor-con{
        position: absolute;
        z-index: 10;
        top: 0;
        width: 100%;
        left: 0;
    }
    .map-container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .map-search-input{
            position:absolute;
            top:5px;
            left:5px;
            width:300px;
            z-index: 1;
        }
        .select-pos-btn{
            position: absolute;
            right:0px;
            bottom: 0px;
            z-index: 1;
        }
        .select-pos-btn-cancel{
            position: absolute;
            right:100px;
            bottom: 0px;
            z-index: 1;
        }
        .bm-view {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
