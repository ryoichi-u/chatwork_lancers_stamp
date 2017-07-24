// ==UserScript==
// @name         chatwork helper
// @match        https://www.chatwork.com/*
// @match        https://kcw.kddi.ne.jp/*
// @version      1.0.3
/* load jQuery */
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// ==/UserScript==

(function (callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")(jQuery.noConflict(true));";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
})(function ($) {
  var _chatText = $('#_chatText');
  var txt = '';

  _chatText.on('keyup', function() {
    if(_chatText.val() !== '') {
       txt = _chatText.val();
    }
  });

  var lstampconfs = [
    {key: ':ok',    previewId: 162683192},
    {key: ':thank', previewId: 162683234},
    {key: ':rager', previewId: 162683222},
    {key: ':good',  previewId: 162683201},
    {key: ':ban',   previewId: 162683193},
    {key: ':bow',   previewId: 162683211},
    {key: ':lgtm',  previewId: 169997557},
  ];

  lstampconfs.forEach(function(lstampconf) {
      lstampconf.action = function() {
          _chatText.val(_chatText.val().replace(new RegExp(lstampconf.key), '[preview id=' + lstampconf.previewId + ' ht=130]'));
      };
  });

  const lstampexec = function() {
    // each action 
    lstampconfs.forEach(function(lsconf) {
      var regMatch = new RegExp("(^|\n)" + lsconf.key + "($|\n)");
      if (_chatText.val().match(regMatch)) {
        lsconf.action();
      }
    });
  };

  // shortcut for main massege area
  _chatText.on('keydown', function(e) {
    if (e.keyCode != 13 || (!e.ctrlKey && !e.metaKey && !e.shiftKey)) {
        return;
    }
    lstampexec();
  });

});

