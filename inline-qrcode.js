function qrcode_code() {
  var url = $('#copylink').val();
  
  // Remove any existing QR code first
  $('#qrcode2').remove();
  
  if (!url || url === '') {
    return;
  }
  
  var qrcimg = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(url);
  var qrcimglnk = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=' + encodeURIComponent(url);
  var insertimg = "<div id='qrcode2' class='share'><a href=\"" + qrcimglnk + "\"><img id='myid' src='" + qrcimg + "' /></a></div>";
  
  if ($("#shareboxes").length) {
    $("#shareboxes").append(insertimg);
    $("div#qrcode2 img").css({"width": "100px", "height": "100px"});
  }
}

// Watch for changes to the #copylink value
$(document).ready(function() {
  // Use MutationObserver to detect when #copylink value changes
  var observer = new MutationObserver(function(mutations) {
    qrcode_code();
  });
  
  var copylink = document.getElementById('copylink');
  if (copylink) {
    observer.observe(copylink, { attributes: true });
  }
  
  // Also hook into row clicks in the URL table
  $(document).on('click', '#main_table tr', function() {
    setTimeout(qrcode_code, 200);
  });
  
  // Clean up when share boxes are hidden
  $(document).on('click', '.toggle_share', function() {
    setTimeout(qrcode_code, 200);
  });
});