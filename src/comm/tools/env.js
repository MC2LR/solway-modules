// 是否独立部署
const pathname = window.location.pathname
export const independent = (pathname === '/') || (pathname === '/login.html')

// 是否生产环境
export const isProduction = window.location.host.includes('cloud.solway')
