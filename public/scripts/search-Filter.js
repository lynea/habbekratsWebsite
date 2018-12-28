$(document).ready(function() {

$("#searchText").on("keyup", function() {
    var g = $(this).val();
    $(".title h2").each( function() {
        var s = $(this).text();
        if (s.indexOf(g)!=-1) {
            $(this).parent().parent().parent().parent().show();
        }
        else {
            $(this).parent().parent().parent().parent().hide();
        }
    })
}); 
});