const fs = require('fs')
const path = require('path')

/* 拷贝一份package.cp.json回package.json */
fs.copyFileSync(
  path.join(__dirname, './package.cp.json'),
  path.join(__dirname, '../../package.json')
)

/* package.cp.json */
fs.unlinkSync(path.join(__dirname, './package.cp.json'))