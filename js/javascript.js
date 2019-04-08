//page transition
$(document).ready(function() {
  setTimeout(function(){ 
    $('body').animate({opacity:1.0},2000); 
  }, 400);

  $('a').click(function(event) {
    event.preventDefault();
    newLocation = this.href;
    $('body').fadeOut(1500, newpage);
  });

  function newpage() {
    window.location = newLocation;
  }

  window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });
});

//search bar
$(document).ready(function(){
  $.ajaxSetup({ cache: false });
  $('#search').keyup(function(){
    $('#result').html('');
    $('#state').val('');
    var searchField = $('#search').val();
    var expression = new RegExp(searchField, "i");
    $.getJSON('data.json', function(data) {
      $.each(data, function(key, value){
        if (value.name.search(expression) != -1) {
          $('#result').removeClass('active');
          $('#result').append('<li class="list-group-item link-class"><a href="'+value.image+'" height="40" width="40" class="img-thumbnail">'+value.name+'</a>');
        }
      });   
    });
  });

  hide = true;
  $('body').on("click", function () {
    if (hide) $('#result').addClass('active');
    hide = true;
  });

  $('#result').on('click', 'li', function() {
    var click_text = $(this).text().split('|');
    $('#search').val($.trim(click_text[0]));
    $("#result").html('');
  });
});

//audio play
$(document).ready(function() {
    $("#my_audio").get(0).play();
});


// hover scroll
var amount = '';

function scroll() {
    $('#container').animate({
        scrollTop: amount
    }, 100, 'linear',function() {
        if (amount != '') {
            scroll();
        }
    });
}
$('#hover').hover(function() {
    console.log("boo!");
    amount = '-=10';
    scroll();
}, function() {
    amount = '';
});
$('#hover2').hover(function() {
    amount = '+=10';
    scroll();
}, function() {
    amount = '';
});