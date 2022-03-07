/*HTML Include*/

/*탭 기능 정의*/
function tabHandler(target) {
    var $tab = $(target.find(".tab-wrap"));
    if ($tab.length > 0) {
        $tab.each(function () {
            var $thisTap = $(this),
                $tabBtn = $thisTap.children(".tabs").children("[role='tablist']").children("[role='tab']"),
                $innerWrap = $thisTap.children(".tab-panels").children(".align-horizontal"),
                $tabPan = $innerWrap.children("[role='tabpanel']");

            if ($thisTap.find(".align-horizontal").length > 0) {
                $innerWrap.css("width", $tabPan.length * 100 + "%");
                $tabPan.css("width", $(window).innerWidth());
                $thisTap.children(".tabs").children("[role='tablist']").children("[role='tab'].active").mousedown();
            }

            // 의미적으로 활성화 표기를 위해 true로 설정된 aria-selected 속성 추가
            $tabBtn.attr("aria-selected", "true");
            $tabBtn.on("keydown", function (event) {
                event = event || window.event;
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                var keycode = event.keyCode || event.which;

                switch (keycode) {
                    case 37: // left arrow
                        if (this.previousElementSibling) {
                            $(this)
                                .attr("tabindex", "-1")
                                .prev()
                                .attr("tabindex", "0")
                                .focus();
                        } else {
                            // 초점이 첫 번째 요소에 있었다면, 마지막 탭으로 초점 이동
                            $(this)
                                .attr("tabindex", "-1");
                            $tabPan.first()
                                .attr("tabindex", "0")
                                .focus();
                        }
                        break;
                    case 39: // right arrow
                        if (this.nextElementSibling) {
                            $(this)
                                .attr("tabindex", "-1")
                                .next()
                                .attr("tabindex", "0")
                                .focus();
                        } else {
                            // 초점이 마지막 요소에 있었다면, 첫 번째 탭으로 초점 이동
                            $(this)
                                .attr("tabindex", "-1");
                            $tabPan.first()
                                .attr("tabindex", "0")
                                .focus();
                        }
                        break;
                    case 32: // Space
                    case 13: // Enter

                        // 선택된 탭 활성화
                        $(this)
                            .addClass("active")
                            .attr("aria-selected", "true")
                            // 기존 탭 비활성화
                            .siblings()
                            .removeClass("active")
                            .attr("aria-selected", "false");
                        // 연관된 탭 패널 활성화
                        $("#" + $(this).attr("aria-controls"))
                            .attr("tabindex", "0")
                            .addClass("active")
                            // 기존 탭 패널 비활성화
                            .siblings("[role='tabpanel']")
                            .attr("tabindex", "-1")
                            .removeClass("active");
                        break;
                }
            });
            $tabBtn.on("keydown", ".active", function (event) {
                event = event || window.event;
                var keycode = event.keyCode || event.which;

                // tab 키 눌렀을 때 (shift + tab은 제외)
                if (!event.shiftKey && keycode === 9) {
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    $("#" + $(this).attr("aria-controls"))
                        .attr("tabindex", "0")
                        .addClass("active")
                        .focus()
                        .siblings("[role='tabpanel']")
                        .attr("tabindex", "-1")
                        .removeClass("active");
                }
            });
            $tabBtn.on("mousedown", function (event) {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;

                // 선택된 탭 활성화
                var $this = $(this),
                    $target = $("#" + $this.attr("aria-controls"));
                $this
                    .addClass("active")
                    .attr({
                        "tabindex": "0",
                        "aria-selected": "true"
                    })
                    .focus()
                    // 기존 탭 비활성화
                    .siblings()
                    .removeClass("active")
                    .attr({
                        "tabindex": "-1",
                        "aria-selected": "false"
                    });
                // 연관된 탭 패널 활성화
                $target
                    .attr("tabindex", "0")
                    .addClass("active")
                    // 기존 탭 패널 비활성화
                    .siblings("[role='tabpanel']")
                    .attr("tabindex", "-1")
                    .removeClass("active");

                /* 탭 컨텐츠가 화면 중앙에 오도록 이동 */
                $innerWrap.css("margin-left", "-" + $target.index() * 100 + "vw");
            });
        });
    }
}


// 클래스 삭제
function dellClass(target, className) {
    target.addClass(className);
}

/* 상품가격 등의 숫자정보 표현 시 콤마 추가기능 정의 */
$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    })
};

function digitsActive(target) {
    if (target.find(".digits").length > 0) {
        $(".digits").digits();
    }
}

/* 버튼을 이용한 탭간 이동 기능 정의 */
function moveTabByClick(el, target, position, duration) {
    $(el).on("click", function () {
        $("html").animate({
            scrollTop: position
        }, duration, function () {
            $(target).mousedown()
        });
    })
}


$(window).on("load", function () {

    /* variation */
    var $win = $(window),
        $doc = $(document),
        $body = $("body");

    /* 상품가격 등의 숫자정보 표현 시 콤마 추가 */
    (function (digitsHandler) {
        digitsActive($body);
    })();

    /*.page-name에 단축 navigation 링크가 있을 경위*/
    (function () {
        var $nav = $("#nav-shortcut"),
            $navItem = $nav.find("a");
        $(document).on("click", "#btn_nav-shortcut", function (e) {
            $($(this).attr("href")).toggleClass("active");
            e.stopPropagation();
        });
        $(document).on("click", "body", function () {
            if ($nav.length > 0) {
                $nav.removeClass("active");
            }
        });
        $(document).on("click", $navItem, function () {
            $nav.removeClass("active");
        });
    })();

    /* Tab(탭) */
    (function () {
        tabHandler($body)
    })();


});