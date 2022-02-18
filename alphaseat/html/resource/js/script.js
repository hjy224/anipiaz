$('.btn_footer_open').click(function () {
  $('.ags-summary').addClass('modal-open');
});

$('.btn_footer_close').click(function () {
  $('.ags-summary').removeClass('modal-open');
});



    /*gnb 팝업 정의*/
    $(document).on("click", "#btn_gnb", function () {
      $("#ags-wrap").addClass("gnb-active");
      $("#gnb-2dp").addClass("active");
      $("html, body").css("overflow", "hidden");
  });
  $(document).on("click", "#btn_gnb-close", function () {
      $("#gnb-2dp").removeClass("active");
      setTimeout(function () { $("#ags-wrap").removeClass("gnb-active"); }, 1000);
      $("html, body").css("overflow", "");
  });
