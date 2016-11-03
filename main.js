$(function() {
  "use strict";

  $('html').removeClass('no-js').addClass('js');
  
  $('#typed').typed({
    stringsElement: $('#typed-strings'),
    loop: true,
    backDelay: 2000
  })

});
