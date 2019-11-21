$(document).ready(function() {
  $(".dropdown").hover(
    function() {
      $(".dropdown-menu", this)
        .not(".in .dropdown-menu")
        .stop(true, true)
        .slideDown("400");
      $(this).toggleClass("open");
    },
    function() {
      $(".dropdown-menu", this)
        .not(".in .dropdown-menu")
        .stop(true, true)
        .slideUp("400");
      $(this).toggleClass("open");
    }
  );

  // loop door allemaal heen
  // clear ul
  // remove active class
  // add active
  // show subcats

  $("#banken-Bankstellen").hover(function() {
    $(this).addClass("active");
    $(".subCats").hide();
    $("#banken-Bankstellen-SubCats").show();
    $("#menu-img").attr("src", "/img/couch.jpg");
  });

  $("#stoelen-fauteuils").hover(function() {
    $(this).addClass("active");
    $(".subCats").hide();
    $("#stoelen-fauteuils-SubCats").show();
    $("#menu-img").attr("src", "/img/fauteuil.jpg");
  });

  $("#tafels").hover(function() {
    $(this).addClass("active");
    $(".subCats").hide();
    $("#tafels-SubCats").show();
    $("#menu-img").attr("src", "/img/tafel.jpg");
  });

  $("#kasten").hover(function() {
    $(this).addClass("active");
    $(".subCats").hide();
    $("#kasten-SubCats").show();
    $("#menu-img").attr("src", "/img/kast.jpg");
  });

  $("#complete-collectie").hover(function() {
    $(this).addClass("active");
    $(".subCats").hide();
  });
});
