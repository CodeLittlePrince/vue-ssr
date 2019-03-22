const fs = require('fs')
const path = require('path')
const ignores = require('./ignore.config.js')

console.log('~ ignore npm start ~')

/* 拷贝一份package.json的copy版package.cp.json */
fs.copyFileSync(
  path.join(__dirname, '../../package.json'),
  path.join(__dirname, './package.cp.json')
)

/* 生成一份ignore掉了的package.json版 */
let pkg = fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8')
let devDependencies = pkg.match(/"devDependencies":\s*(\{[\S\s]+\},)/)[0]
let pieces = devDependencies.split('\n')
let piecesCopy = JSON.parse(JSON.stringify(pieces))

for (let i = 0, ignoresLen = ignores.length; i < ignoresLen; i++) {
  for (let j = 0, piecesLen = piecesCopy.length; j < piecesLen; j++) {
    if (piecesCopy[j].indexOf(`"${ignores[i]}"`) > -1) {
      pieces[j] = ''
      break
    }
  }
}
pieces = pieces.filter(item => {
  return item !== ''
})
// 处理最后一个npm的末尾是否有逗号，有则去掉
const len = pieces.length
if (pieces[len - 2].slice(-1) === ',') {
  pieces[len - 2] = pieces[len - 2].slice(0, -1)
}
devDependencies = pieces.join('\n')
  
/* 将ignore掉了的package.json版覆盖掉package.json */
pkg = pkg.replace(/"devDependencies":\s*(\{[\S\s]+\},)/, devDependencies)

fs.writeFileSync(
  path.join(__dirname, '../../package.json'),
  pkg,
  'utf8'
)

console.log('~ ignore npm end ~')

/* 最后执行sh之后命令 */
/* release.sh */
/* 执行完所有命令以后恢复package.json */
/* recover.sh */