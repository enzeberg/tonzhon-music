(function() {
  window.tongzhong = {};
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  }
  window.tongzhong.isMobile = isMobile();
})();
