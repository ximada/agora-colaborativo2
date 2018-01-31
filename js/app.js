 //Funcion para postear comentario
 function postear () {
    var firstcontainer2 = $("<div></div>");
    firstcontainer2.attr({
      class: 'comments',
    });
    $("#comment-section-post").append(firstcontainer2);
    var userName = "Angelina dice:";
    var user = $("<span></span>").text(userName);
    user.attr({
      class: 'font-weight-bold d-block littlefont',
    });
    firstcontainer2.append(user);
    var profile = $("<img></img>");
    profile.attr({
      class: 'littleprofile',
      src: "assets/images/profilefriends.png"
    });
    firstcontainer2.append(profile);
    var cardcommenttext2 = ($('#card-comment-post').val());
    var commentext = $("<span></span>").text(cardcommenttext2);
    firstcontainer2.append(commentext);
} //Final de funcion para postear comentario

$(document).ready(function () {


  //Función de estrellas
  var $star_rating = $('.star-rating .fa');
  var SetRatingStar = function () {
    return $star_rating.each(function () {
      if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
        return $(this).removeClass('fa-star-o').addClass('fa-star');
      } else {
        return $(this).removeClass('fa-star').addClass('fa-star-o');
      }
    });
  }; //termina función setrating
  $star_rating.on('click', function () {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    return SetRatingStar();
  }); //termina función click en estrellas

  var title = "";
  var book = "";
  var averageRating = "";
  var image = "";
  var description = "";
  //Funcion de buscar libro por 5ISBN
  $('#search').click(function () {
    var isbn = $('#isbn-input').val();
    // console.log(isbn);

    $.ajax({
      type: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn,
      success: function (data) {
        // console.log(data);
        var book = data.items[0];
        // console.log(book);
        var title = (book.volumeInfo.title);
        var authors = (book.volumeInfo.authors[0]);
        var averageRating = (book.volumeInfo.averageRating);
        var categories = (book.volumeInfo.categories[0]);
        var image = (book.volumeInfo.imageLinks.smallThumbnail);
        image.toString();
        var description = (book.volumeInfo.description);
        $('#title').text(title);
        $('#author').text(authors);
        // console.log(image);
        $('#cover').attr('src', image);
        $('#rating').text(averageRating);
        $('#description').text(description);
      },
      dataType: 'json',
    });
  }); //final de función buscar libro por ISBN

  $('#post-review').click(function () {
    $('#readingpost').clone().appendTo("#containerpost");
    $('#card-title').text(($('#title').text()));
    $('#card-author').text(($('#author').text()));
    $('#card-cover').attr('src', (($('#cover').attr('src'))));
    $('#card-description').text(($('#description').text()));
    $('#card-review').text(($('#review-comment').val()));
    $('#comment-section').html('');
    //Borrar campos
    $('#isbn-input').val('');
  }); //Final de funcion para postear review
  $('#card-submitcomment').click(function () {
    var firstcontainer = $("<div></div>");
    firstcontainer.attr({
      class: 'comments',
    });
    $("#comment-section").append(firstcontainer);
    var userName = "Angelina dice:";
    var user = $("<span></span>").text(userName);
    user.attr({
      class: 'font-weight-bold d-block littlefont',
    });
    firstcontainer.append(user);
    var profile = $("<img></img>");
    profile.attr({
      class: 'littleprofile',
      src: "assets/images/profilefriends.png"
    });
    firstcontainer.append(profile);
    var cardcommenttext = ($('#card-comment').val());
    var commentext = $("<span></span>").text(cardcommenttext);
    firstcontainer.append(commentext);
  }); //Final de funcion para postear comentario

  $('.like').click(function () {
    $(this).css('color', 'purple');
  }); //Final de funcion like
  $('.love').click(function () {
    $(this).css('color', 'purple');
  }); //Final de funcion like


  /*Función post "Comparte tus pensamientos"*/
  $('#bt-post').click(function () {
    $('#simplepost').clone().prependTo("#containerpost");
    $('#post-description').text(($('#comment').val()));
    $('#comment-section-post').html('');
    //Borrar campos
    $('#comment').val('');
  }); //Final de funcion para postear review

 
  //Función de colocar imagen
  function archivo(evt) {
    var files =  document.getElementById('files').files;

    //Obtenemos la imagen del campo "file". 
    for (var i = 0, f; f = files[i]; i++) {
      //Solo admitimos imágenes.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();
      
      reader.onload = (function (theFile) {
        return function (e) {
          // Creamos la imagen.
          document.getElementById("list").innerHTML = ['<img class=" thumb littlepicture d-block  mx-auto m-2 mb-4 mt-0" src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('bt-post').addEventListener('click', archivo, false);
}); //final funcion ready