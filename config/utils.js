const execSync = require('child_process').execSync
const package = require('../package.json')
exports.getGitHash = function () {
  return execSync('git rev-parse HEAD')
    .toString()
    .trim()
}

exports.getProjectName = function () {
  return package.name.toString().trim()
}

exports.getCurrentTag = function () {
  return package.version.toString().trim()
}

exports.getProjectDesc = function () {
  // if (process.env.NODE_ENV === 'production') {
  //   return `此项目为${package.repository.description}`.toString().trim()
  // }
  const desc = `此项目为${package.repository.description}(${package.repository.team})<br/>仓库地址为<a href="${package.repository.url}">${package.repository.url}</a><br/>更新日志为<a href="${package.repository.changelogurl}">${package.repository.changelogurl}</a>`
  return desc.toString().trim()
}
