const cache = window.cacheCssJs = window.cacheCssJs || {}
const dom = document

function funct (path, callback = () => {}) {
    if (!path) throw new Error('请输入path路径!')
    const fn = Object.prototype.toString.call(callback) === '[object Function]' ? callback : function () { }
    if (path.substr(-3) === '.js') return addJs(path, fn)
    else if (path.substr(-4) === '.css') return addCss(path, fn)
    else throw new Error('请输入正确的path路径!')
}

export function addCss (path, callback = () => {}) {
    return new Promise((resolve, reject) => {
        if (cache[path]) {
            resolve()
            return callback()
        }
        const head = dom.getElementsByTagName('head')[0]
        const link = dom.createElement('link')
        link.href = path
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.id = Math.random()
        head.appendChild(link)
        link.onload = link.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                link.onload = link.onreadystatechange = null
                resolve()
                callback()
            }
        }
        cache[path] = link.id
    })
}

export function addJs (path, callback = () => {}) {
    return new Promise((resolve, reject) => {
        if (cache[path]) {
            resolve()
            return callback()
        }
        const head = dom.getElementsByTagName('head')[0]
        const script = dom.createElement('script')
        script.src = path
        script.type = 'text/javascript'
        script.id = Math.random()
        head.appendChild(script)
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onload = script.onreadystatechange = null
                resolve()
                callback()
            }
        }
        cache[path] = script.id
    })
}

export function deleteFile (path) {
    function d (v) {
        try {
            document.getElementById(cache[v]).remove()
            delete cache[v]
        } catch (error) {
            console.log('删除文件失败')
        }
    }
    if (typeof path === 'string') d(path)
    else if (Object.prototype.toString.call(path) === '[object Array]') path.map(v => d(v))
}

export default function addCssJsList (path, callback = () => {}) {
    return new Promise((resolve, reject) => {
        if (typeof path === 'string') funct(path, callback).then(() => resolve())
        else if (Object.prototype.toString.call(path) === '[object Array]') Promise.all(path.map(v => funct(v))).then(() => resolve())
    })
}
