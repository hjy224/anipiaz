/*gnb 팝업 정의*/
$(document).on("click", "#btn_gnb", function () {
  $("#ags-wrap").addClass("gnb-active");
  $("#gnb-2dp").addClass("active");
  $("html, body").css("overflow", "hidden");
});
$(document).on("click", "#btn_gnb-close", function () {
  $("#gnb-2dp").removeClass("active");
  setTimeout(function () {
    $("#ags-wrap").removeClass("gnb-active");
  }, 1000);
  $("html, body").css("overflow", "");
});

/*모달팝업*/
$('.btn_footer_open').click(function () {
  $('.ags-summary').addClass('modal-open');
});
$('.btn_footer_close').click(function () {
  $('.ags-summary').removeClass('modal-open');
});

/*좌석선택*/

$(document).on("click", ".seat_type2_txt", function () {
  $(this).addClass("seat_active");
});
$(document).on("click", ".seat_active", function () {
  $(this).removeClass("seat_active");
});

 
/*스케일*/
$( document ).ready(function() {
  $('.trigger').on('click', function() {
    $('.contents').toggleClass('scale');
     return false;
  });
});


/*배경 DIM 생성*/
function createDim(target) {
  if (target.attr("data-type") === "drawer" || target.attr("data-type") === "message") {
    $("#ags-wrap").append("<div class='page-dim " + target.attr("id") + " active'></div>");
  } else {
    target.prepend("<div class='page-dim " + target.attr("id") + " active'></div>");
  }
  $("html, body").css("overflow", "hidden");
}

/*배경 DIM 제거*/
function deleteDim(target) {
  $(".page-dim." + target.attr("id") + ".active").remove();
  $("html, body").css("overflow", "");
}