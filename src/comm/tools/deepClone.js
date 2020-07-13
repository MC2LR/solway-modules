export default function deepClone (target) {
    let result
    if (typeof target !== 'object') return target
    if (target === null) return null
    if (target.constructor === RegExp) return target
    if (target.constructor === Date) return new Date(target)
    if (Array.isArray(target)) {
        result = []
        for (let i in target) result.push(deepClone(target[i]))
    } else {
        result = {}
        for (let i in target) result[i] = deepClone(target[i])
    }
    return result
}
