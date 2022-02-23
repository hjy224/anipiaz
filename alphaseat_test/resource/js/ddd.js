
        var $win = $(window),
            $doc = $(document),
            $html = $("html"),
            $body = $("body");

        /*좌석 범례 스크롤 기능 정의*/
        function legendHandler() {
            var $psgWrap = $(".tab-panel.active .passenger-wrap"),
                $legendWrap = $(".tab-panel.active .seat-legend"),
                pd = 7,
                mgTop = $psgWrap.height() + $legendWrap.height(),
                items = [],
                pos = [];
            $($legendWrap.find("a")).each(function (index, item) {
                var position = $($(".tab-panel.active .seat-num ." + $(item)[0].dataset.scrollto + ":first-of-type")).offset().top - mgTop - pd;

                pos.push(position);
                items.push($(item)[0].dataset.scrollto)
            });
            $win.on("scroll", function (e) {
                if ($legendWrap.parents(".tab-panel.active").length > 0) {
                    setTimeout(function () {
                        var currentScroll = $html.scrollTop();
                        for (i in pos) {
                            if (pos[i] <= currentScroll + 5) {
                                var index = i,
                                    $currentLegend = $(".tab-panel.active .seat-legend ." + items[index]);
                                $currentLegend.addClass("active").siblings().removeClass("active");
                            } else if (currentScroll + 5 <= pos[0]) {
                                $(".tab-panel.active .seat-legend ." + items[0]).addClass("active").siblings().removeClass("active");
                            }
                        }
                    }, 800);
                    activeLinkScrollLeft($(".tab-panel.active .seat-legend .active"), $legendWrap, 800);
                }
            }).scroll()
        }

        $doc.ready(function () {
            /*팝업 불러오기*/
            $("#popup").load("include/common_popup.html");

            /* 좌석 선택 방식을 컨트롤 합니다. */
            (function (seatHandler) {
                $(".tab-panel").each(function () {
                    var $thisPanel = $(this),
                        $psgLists = $thisPanel.find("[data-select='passenger']")/*승객 선택 체크박스 전체*/,
                        $selectSeats = $thisPanel.find("[data-select='seat']")/*좌석 선택 버튼 전체*/,
                        $target = $selectSeats.find("a[class*='seat-']:not([class*='disabled']")/*비활성화 되지 않은 좌석 선택 버튼 전체*/;

                    /*페이지 로드 시 첫번째 승객이 선택된 상태로 보이게 합니다*/
                    $psgLists.find("li:first-child input[type='radio']").prop("checked", true);

                    /*비활성화 되지 않은 좌석 선택 버튼을 클릭하면 다음 기능을 수행합니다*/
                    $target.on("click", function () {
                        var $this = $(this)/*클릭한 좌석 버튼*/,
                            $checkedPsg = $psgLists.find($("input[type='radio']:checked"))/*현재 선택된 승객*/,
                            $currentPsgLabel = $psgLists.find("input[type='radio']:checked ~ dl .selected-seat + dd")/*현재 선택된 승객의 좌석 텍스트*/,
                            $checkedPsgName = $checkedPsg.parent("li").find(".passenger-name").next("dd").text()/*현재 선택된 승객의 성명*/;

                        /*1. 승객의 좌석부여 상태별 IF 조건문*/
                        if ($this.attr("data-psg") === undefined || $this.attr("data-psg") === "")
                        /*1-1. 해당 승객이 아무런 좌석을 부여받지 않은 상태일 때, 선택한 좌석을 부여합니다*/ {
                            /*좌석버튼 가운데 해당 승객의 이름으로 마크된 좌석이 있을 경우, 좌석 부여를 취소합니다*/
                            $selectSeats.find("a[data-psg='" + $checkedPsgName + "']").attr("data-psg", "").removeClass("active");
                            /*선택한 좌석버튼을 활성화하고 data-psg 값에 현재 체크된 승객명을 구분자로 부여합니다*/
                            $this.addClass("active").attr("data-psg", $checkedPsgName);
                            /*현재 선택된 승객의 좌석 텍스트를 선택된 좌석 텍스트로 입력한 후 '삭제'버튼을 추가합니다*/
                            if ($checkedPsg.siblings("dl").find("[class*='bundle-type']:not(.bundle-type0)").length !== 0) {
                                /*번들 고객이라면*/
                                /*현재 선택된 승객의 좌석 텍스트를 선택된 좌석정보를 입력한 후 '삭제'버튼을 추가합니다*/
                                $currentPsgLabel.html("<span>" + $this.text().split("/")[0] + "</span><a href='#none' target='_self' class='btn_delete'>삭제</a>");
                            } else {
                                /*번들 고객이 아니라면*/
                                /*현재 선택된 승객의 좌석 텍스트를 선택된 좌석정보 + 가격정보를 입력한 후 '삭제'버튼을 추가합니다*/
                                $currentPsgLabel.html("<span>" + $this.text() + "</span><a href='#none' target='_self' class='btn_delete'>삭제</a>");
                            }
                        } else if ($this.attr("data-psg") === $checkedPsgName)
                        /*1-2. 선택한 좌석이 해당 승객에게 이미 부여된 상태일 때, 좌석 부여를 취소합니다*/ {
                            /*선택한 좌석과 동일한 좌석 텍스트를 삭제합니다*/
                            $(".tab-panel.active .selected-seat + dd").each(function () {
                                if ($(this).find("span").text() === $this.text()) {
                                    $(this).html("");
                                }
                            });
                            /*선택한 좌석을 비활성화하고, data-psg 값을 비워줍니다*/
                            $this.removeClass("active").attr("data-psg", "");
                        } else
                        /*1-3. 선택한 좌석이 다른 승객에게 부여된 좌석일 때, 현재 승객에게 좌석을 새로이 부여합니다*/ {
                            /*선택한 좌석과 동일한 좌석 텍스트를 삭제합니다*/
                            $(".tab-panel.active .selected-seat + dd").each(function () {
                                if ($(this).find("span").text() === $this.text()) {
                                    $(this).html("");
                                }
                            });
                            /*좌석버튼 가운데 해당 승객의 이름으로 마크된 좌석이 있을 경우, 좌석 부여를 취소합니다*/
                            $selectSeats.find("a[data-psg='" + $checkedPsgName + "']").attr("data-psg", "").removeClass("active");
                            /*클릭한 좌석 버튼을 활성화하고 data-psg 값에 현재 체크된 승객명을 구분자로 부여합니다*/
                            $this.addClass("active").attr("data-psg", $checkedPsgName);
                            /*현재 선택된 승객의 좌석 텍스트를 선택된 좌석 텍스트로 입력한 후 '삭제'버튼을 추가합니다*/
                            $currentPsgLabel.html("<span>" + $this.text() + "</span><a href='#none' target='' class='btn_delete'>삭제</a>");
                        }

                        /*2. IF문을 처리한 이후 다음 승객으로 포커스 이동*/
                        if ($checkedPsg.parent("li").next("li").length > 0) {
                            setTimeout(function () {
                                /*다음 승객이 존재하면 다음 승객으로 포커스를 넘깁니다*/
                                $checkedPsg.parent("li").next("li").find("input[type='radio']").prop("checked", true);
                                /*포커스를 가진 승객이 화면 좌측에 위치할 수 있도록 스크롤을 이동합니다*/
                                activeLinkScrollLeft($checkedPsg.parent("li").next("li"), $psgLists.parent(".passenger-wrap"), 800);
                            }, 1000);
                        } else if ($checkedPsg.parent("li").next("li").length === 0) {
                            /*다음 승객이 없고 다음 탭이 있을 경우, 하단 프로세스 버튼 영역으로 포커스를 내려줍니다*/
                            fixedElHeight = 0 + 32;
                            $("[data-ui='fixed']").each(function () {
                                fixedElHeight += $(this).outerHeight();
                            });
                            setTimeout(function () {
                                $("html").animate({
                                    scrollTop: $(".tab-panel.active [data-role='process-btn-wrap']").offset().top - fixedElHeight
                                }, 750);
                            }, 1000)
                        }
                    });


                    /*승객에게 좌석을 부여한 뒤, 좌석 텍스트 뒤에 붙는 삭제(X)버튼의 기능을 정의합니다*/
                    $doc.on("click", ".btn_delete", function () {
                        var $this = $(this)/*클릭한 삭제버튼*/;
                        owner = $this.parents("dl").find(".passenger-name + dd").text()/*클릭한 삭제버튼이 작동할 승객의 성명*/;

                        /*승객의 성명으로 마킹된 좌석을 찾아 마킹을 지워줍니다*/
                        $(".tab-panel.active .seat-num a.active[data-psg='" + owner + "']").attr("data-psg", "").removeClass("active");

                        /*해당 승객에게 포커스를 맞춰줍니다*/
                        $(this).closest("dl").siblings("input[type='radio']").prop("checked", true);
                        activeLinkScrollLeft($(this).closest("li"), $psgLists.parent(".passenger-wrap"), 800);

                        /*승객의 좌석 텍스트를 삭제합니다*/
                        $(this).parent("dd").html("")
                    });
                });
            })();

            /*[data-role='process-btn-wrap'] 버튼의 탭 전환 기능 정의*/
            (function (nextTab) {

                /*가는 편 탭의 .btn_confirm 버튼을 누르면 오는 편 탭으로 이동합니다*/
                moveTabByClick("#tab-panel1 [data-role='process-btn-wrap'] .btn_confirm", "li[aria-controls='tab-panel2']", 0, 800);

                /*오는 편 탭의 .btn_cancel 버튼을 누르면 가는 편 탭으로 이동합니다*/
                moveTabByClick("#tab-panel2 [data-role='process-btn-wrap'] .btn_cancel", "li[aria-controls='tab-panel1']", 0, 800);
            })();

            /*좌석 범례 클릭 기능 정의*/
            (function (legendClickHandler) {
                $doc.on("click", ".tab-panel.active .seat-legend li a", function () {
                    var $this = $(this)/*클릭된 범례 아이템*/,
                        $target = $(".tab-panel.active .seat-num a[class='" + $this.attr("data-scrollTo") + "']:first-of-type")/*클릭된 범례 아이템과 일치하는 좌석 중 가장 첫번째 아이템*/,
                        position = $target.offset().top - parseInt($(".tab-panel.active").css("padding-top")) - 7/*클릭된 범례 아이템과 일치하는 좌석 중 첫번째의 화면 위치*/;

                    /*활성화된 범례 아이템과 일치하는 좌석 중 첫번째가 위치한 곳으로 화면을 이동합니다*/
                    $("html").animate({ scrollTop: position }, 800);
                });
            })();

            /*번들선택*/
            (function () {
                $(window).on("scroll", function () {
               …