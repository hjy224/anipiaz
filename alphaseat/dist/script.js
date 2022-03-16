$(document).ready(function () {

    $('#btn1').click(function () {

        var offset = $('#div1').offset(); //선택한 태그의 위치를 반환

        //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

        $('html').animate({
            scrollTop: offset.top
        }, 400);

    });
    $('#btn2').click(function () {

        var offset = $('#div2').offset(); //선택한 태그의 위치를 반환

        //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

        $('html').animate({
            scrollTop: offset.top
        }, 400);

    });

});