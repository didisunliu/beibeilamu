// initial state
const state = {
	hnUserId: '',   // 惠农用户ID
	yunxinAccid: '',    // 云信账户
	yunxinToken: '',    // 云信token
	sessionId: '',   // 接口返回的会话ID
	yunxinRobotAccid: '',    // 机器人云信账号
	robotoInfo: null, // 机器人信息
	userInfo: null, // 用户信息（主要是拿头像信息）
	osUserId: '',   // 客服ID（无云信前缀 云信前缀为ocs）
	osUserInfo: null, // 客服信息（主要是拿客服的头像信息）
}

// 计算属性
const getters = {}

// actions
const actions = {
	setHnUserId ({commit}, hnUserId) {
		commit('setHnUserId', hnUserId)
	},
	setUserInfo ({commit}, info) {
		commit('setUserInfo', info)
	},
	setOsUserInfo ({commit}, info) {
		commit('setOsUserInfo', info)
	},
	setYunxinAccid ({commit}, yunxinAccid) {
		commit('setYunxinAccid', yunxinAccid)
	},
	setYunxinTokenn ({commit}, yunxinToken) {
		commit('setYunxinTokenn', yunxinToken)
	},
	setYunxinRobotAccid ({commit}, yunxinRobotAccid) {
		commit('setYunxinRobotAccid', yunxinRobotAccid)
	},
	setRobotoInfo ({commit}, info) {
		commit('setRobotoInfo', info)
	},
	setOsUserId ({commit}, osUserId) {
		commit('setOsUserId', osUserId)
	},
	setSessionId ({commit}, sessionId) {
		commit('setSessionId', sessionId)
	}
}

// mutations
const mutations = {
	setHnUserId (state, hnUserId) {
		state.hnUserId = hnUserId
	},
	setUserInfo (state, info) {
		if (!!info && !info.avatar) {
			info.avatar = 'http://image.cnhnb.com/image/png/head/2018/08/29/5364458664bf4f4cb1b7f6c86057863a.png'
		}
		state.userInfo = info
	},
	setYunxinAccid (state, yunxinAccid) {
		state.yunxinAccid = yunxinAccid
	},
	setYunxinTokenn (state, yunxinToken) {
		state.yunxinToken = yunxinToken
	},
	setYunxinRobotAccid (state, yunxinRobotAccid) {
		state.yunxinRobotAccid = yunxinRobotAccid
	},
	setRobotoInfo (state, info) {
		state.robotoInfo = info
	},
	setOsUserId (state, osUserId) {
		state.osUserId = osUserId
	},
	setOsUserInfo (state, info) {
		state.osUserInfo = info
	},
	setSessionId (state, sessionId) {
		state.sessionId = sessionId
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}