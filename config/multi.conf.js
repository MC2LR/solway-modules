const path = require('path')
const pack = require('../package.json')
const moduleNames = require('./moduleNames.json')

const argvs = process.argv.slice(2)

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getParams(key) {
    let item = argvs.find(item => item.split('=')[0] === key)
    return item ? item.split('=') : []
}

function getModuleAlias() {
    let alias = {}
    importModules.forEach(({ name }) => {
        alias[`@${name}`] = resolve(`src/${name}`)
    })
    return alias
}

class MultiModule {
    constructor(name, opts) {
        let datetime = Date.now()
        Object.assign(this, {
            name,
            assetsSubDirectory: 'static',
            assetsPublicPath: process.env.NODE_ENV === 'production' ? './' : '/',
            port: 8080,
            // host: 'local.solway.cn',
            host: '0.0.0.0',
            proxyTable: null,
            entry: {
                app: [`./src/${name}/main.js`]
            },
            alias: resolve(`src/${name}`),
            index: path.resolve(__dirname, `../dist/${name}/index.html`),
            favicon: path.resolve(__dirname, `../src/${name}/assets/favicon.ico`),
            assetsRoot: path.resolve(__dirname, `../dist/${name}/`),
            pubdate: `${name}_v${pack.version}_${datetime}`,
            publics: [name].concat(opts.statics || []),
            deployConfig: null
        }, opts)
    }
}

function getModuleProcess(name) {
    let mItem = importModules.find(item => item.name === name)
    return mItem || importModules[0]
}

const getProxyTable = (target, options = {}) => {
    const proxyTarget = getParams('--env.proxyTarget')[1]
    return {
        '/Login': {
            target: proxyTarget || target || 'http://netest.solway.cn:9090', // 接口的域名
            // secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
            pathRewrite: {
                '^/': ''
            }
        },
        '/microplat': {
            target: proxyTarget || target || 'http://netest.solway.cn:9090',
            changeOrigin: true,
            pathRewrite: {
                '^/': ''
            }
        },
        '/api': {
            target: proxyTarget || target || 'http://netest.solway.cn:9090',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
        '/oldApi': {
            target: proxyTarget || target || 'http://netest.solway.cn:9090',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
        '/static': {
            // target: 'http://local.solway.cn:8080',
            // changeOrigin: true,
            pathRewrite: {
                '^/static': ''
            }
        },
        ...options
    }
}
const importModules = moduleNames.map((module, index) => (new MultiModule(module.name, {
    port: 8080 + index,
    statics: ['static-' + module.name],
    proxyTable: getProxyTable(module.proxyTarget, module.proxyTable)
})))
var lifecycleEvents = String(process.env.npm_lifecycle_event).split(':')
var moduleName = getParams('name')[1] || lifecycleEvents[1]

const multiConfig = {
    modules: importModules,
    moduleAlias: getModuleAlias(),
    process: getModuleProcess(moduleName)
}

module.exports = multiConfig
