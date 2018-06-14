export const getcurrentMethodId = state => state.currentMethodData.currentMethodId
export const getCurrentMethodGroup = state => state.currentMethodData.currentMethodGroup
export const getcurrentMethodFullCnName = state => state.currentMethodData.currentMethodFullCnName

export const getHistoryBarData = (state) => state.historyBar

export const getModalOptions = (state) => state.modalState.Options
export const getModalRecord = (state) => state.modalState.Record
export const getModalHistory = (state) => state.modalState.History
export const getModalPlayChange = (state) => state.modalState.PlayChange
export const getModalWinning = (state) => state.modalState.Winning
export const getModalIssuesChange = (state) => state.modalState.IssuesChange
export const getModalLoading = (state) => state.modalState.Loading

export const getCurrentCoin = (state) => state.currentCoin
export const getCurrentBalance = (state) => state.currentBalance
export const getOrders = (state) => state.ordersList.orders
export const getIssueStateText = (state) => state.issueStateText
export const geLastWinNumber = (state) => state.lastWinNumber

export const getSurplusTime = (state) => {
    const surplus = state.surplusTime
    // const h = Math.floor(surplus / 3600)
    const m = Math.floor(surplus % 3600 / 60)
    const s = surplus % 3600 % 60

    const strM = m < 10 ? '0' + m : '' + m
    const strS = s < 10 ? '0' + s : '' + s

    return strM + ':' + strS
}

export const getGameData = (state) => {
    return {
        id: state.severData.gameRelation.id,
        name: state.severData.gameRelation.name
    }
}

export const getMethodList = state => {
    // ex [...housan, ...qiansan, ...zhongsan]
    let gameTree = state.severData.gameRelation.children
    // let gid = state.currentMethodData.currentMethodId
    let pid = state.currentMethodData.currentMethodGroup
    let methodList = []
    var seachSelf = function (obj) {
        // console.log(pid, 'this id', obj.id)
        if (pid === obj.id) {
            methodList = obj.children
            return false
        } else {
            if (obj.children) {
                // console.log('next')
                obj.children.map(seachSelf)
            }
        }
    }

    gameTree.map(seachSelf)

    // console.log('methodList', methodList)

    return methodList
}

export const getPlayList = state => {
    // ex [...yixing, ...sanxing, ...wuxing]
    let gameTree = state.severData.gameRelation.children
    let playList = []

    gameTree.map(function (obj, index) {
        playList.push({
            id: obj.id,
            pid: obj.pid,
            name: obj.name,
            cn_name: obj.cn_name
        })
    })

    // console.log(playList)

    return playList
}

export const getPreMethodId = (state, getters) => {
    // get this level list
    let list = getters.getMethodList
    let pre = 0

    if (list.length === 0) {
        pre = list[0].id
    } else {
        list.map(function (obj, index) {
            if (obj.id === state.currentMethodData.currentMethodId) {
                if (index === 0) {
                    // obj is the first, [pre] is the last
                    pre = list[(list.length - 1)].id
                } else {
                    pre = list[index - 1].id
                }
            }
        })
    }
    // console.log('pre', pre)
    return pre
}

export const getNextMethodId = (state, getters) => {
    // get this level list
    let list = getters.getMethodList
    let next = 0

    if (list.length === 0) {
        next = list[0].id
    } else {
        list.map(function (obj, index) {
            if (obj.id === state.currentMethodData.currentMethodId) {
                if (index === (list.length - 1)) {
                    // obj is the last, [next] is the first
                    next = list[0].id
                } else {
                    next = list[index + 1].id
                }
            }
        })
    }
    // console.log('next', next)
    return next
}

export const getPlayById = (state, getters) => (id) => {
    // ex {id: 101, pid: 10}
    let gameTree = state.severData.gameRelation.children

    let playData = {}
    var seachSelf = function (obj) {
        // console.log(pid, 'this id', obj.id)
        if (id === obj.id) {
            playData = obj
            return false
        }
    }

    gameTree.map(seachSelf)

    // console.log(playData)

    return playData
}

export const getMethodById = (state, getters) => (id) => {
    // ex {id: 101, pid: 10}
    let gameTree = state.severData.gameRelation.children

    let methodData = {}
    var seachSelf = function (obj) {
        // console.log(pid, 'this id', obj.id)
        if (id === obj.id) {
            methodData = obj
            return false
        } else {
            if (obj.children) {
                // console.log('next')
                obj.children.map(seachSelf)
            }
        }
    }

    gameTree.map(seachSelf)

    // console.log(methodData)

    return methodData
}

export const getModuleNameById = (state, getters) => (id) => {
    // ex {name:sanxing, fullName:sanxing/zhongsan}
    let gameTree = []
    let gid = id || state.currentMethodData.currentMethodId
    let topName = ''
    let names = []
    let cnNames = []

    if (state.severData.gameRelation !== undefined) {
        gameTree = state.severData.gameRelation.children
    }

    gameTree.map(function (obj, index) {
        let name = obj.name
        let cnName = obj.cn_name

        let rs = obj.children.find(function (element, index) {
            return element.id === gid
        })

        if (rs !== undefined) {
            topName = name
            names.push(name, rs.name)
            cnNames.push(cnName, rs.cn_name)
        }
    })

    // console.log(names.join('/'))
    return {
        name: topName,
        fullName: names.join('/'),
        fullCnName: cnNames.join('')
    }
}

export const getModuleGetter = (state, getters) => (FnName, full = false) => {
    let name = state.currentMethodData.currentMethodName
    let fullName = state.currentMethodData.currentMethodFullName

    if (full) {
        return getters[`${fullName}/${FnName}`]
    } else {
        return getters[`${name}/${FnName}`]
    }
}

export const getLastNowIssues = (state) => {
    const lastIssues = state.lastIssues
    const currentIssues = state.currentIssues

    return {
        last: lastIssues,
        current: currentIssues
    }
}

export const getSubmitIsDisabled = (state) => {
    let isdisabled = true

    if (state.ordersList.orders.length > 0) {
        isdisabled = false
    }

    return isdisabled
}

export const getRecordList = (state, getters) => {
    let recordlist = state.ordersRecord.list

    recordlist.map(function (issue) {
        issue.orders.map(function (order, index) {
            let namesData = getters.getModuleNameById(order.methodId)
            order.playCnName = namesData.fullCnName
            order.betCnName = state[namesData.name].panelData['v_' + order.betValue].cnName
            if (!issue.state) {
                order.stateText = '待开奖'
            } else {
                order.stateText = order.result > 0 ? '已中奖' : '未中奖'
            }
        })
    })

    return recordlist
}

export const getHistoryList = (state, getters) => {
    let historylist = state.severData.issueHistory
    let historyIconList = state.historyBar

    historylist.map(function (issue, index) {
        issue.result = historyIconList[historyIconList.length - (index + 1)]
    })
    // console.log(historylist)
    return historylist
}

export const getWinningData = (state) => {
    return {
        showIssue: state.ordersRecord.list[1].issue,
        winMoney: state.ordersRecord.list.length > 0 ? state.ordersRecord.list[1].totalResult : 0
    }
}
