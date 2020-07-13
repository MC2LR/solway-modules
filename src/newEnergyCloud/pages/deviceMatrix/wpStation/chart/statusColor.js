export const deviceStatusColorMap = {
    '0': '#48CD81',
    '1': 'rgb(153, 153, 153)',
    '2': 'rgb(219, 65, 47)',
    '3': 'rgb(255, 153, 0)'
}

export const groupStringColorMap = {
    '0': 'transparent',
    '1': 'rgb(219, 65, 47)',
    '2': 'rgb(255, 153, 0)',
    '3': '#48CD81'
}

export const filterStatus = (status, statu, shadowFlags) => {
    if (!status) return true
    if (status.includes('shadow')) {
        return shadowFlags && shadowFlags.some(v => v === 1)
    }
    return status.includes(statu)
}
