const path = require('path')
const glob = require('glob')
const startPath = '/src/pages/'
const pagePath = path.resolve(__dirname, '.' + startPath)

exports.pages = function () {
  let entryFiles = glob.sync(pagePath + '/**/*.html')
  let obj = {}

  entryFiles.forEach(filePath => {
    let dirPath = filePath.substring(0, filePath.lastIndexOf('/'))
    let dirName = dirPath.substring(dirPath.lastIndexOf('/') + 1)
    let filename = filePath.substring(filePath.lastIndexOf(startPath) + startPath.length, filePath.lastIndexOf('/'))
    
    if (filename.endsWith(dirName)) {
      obj[filename] = {
        entry: filePath.substring(0, filePath.lastIndexOf('.html')) + '.js',
        template: filePath.substring(0, filePath.lastIndexOf('.html')) + '.html'
      }
    }
  })
  
  return obj
}