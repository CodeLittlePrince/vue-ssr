// const isProd = process.env.NODE_ENV === 'production'
const devPort = 7777

module.exports = {
  mockPort: devPort,
  // domain: isProd ? '' : `http://localhost:${devPort}`
  // 为了demo的完整性，无论开发和正式环境，都走代理至本地mock
  domain: `http://localhost:${devPort}`,
  // 需要转发的api接口的前缀
  prefix: '/api'
}