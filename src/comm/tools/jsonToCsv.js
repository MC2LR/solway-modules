export default (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
    let str = ''
    for (let i = 0; i < array.length; i++) {
        let line = ''
        for (let index in array[i]) line += array[i][index] + ','
        line.slice(0, -1)
        str += line + '\r'
    }
    return new Blob([str], {type: 'text/csv'})
}
