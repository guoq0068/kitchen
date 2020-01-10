const HTTP_PORT       = 80;
const HTTP_PORT_DEV   = 8080;
const HTTPS_PORT      = 443;
const HTTPS_PORT_DEV  = 446;

var   http_port  = HTTP_PORT_DEV;
var https_port = HTTPS_PORT_DEV;
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  http_port : http_port,
  https_port : https_port
}
