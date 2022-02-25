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

/*상단 셀렉트 그룹*/

$( document ).ready( function() {
	$( '.select_group_btn' ).click( function() {
		if($( '.passenger' ).css("height") == "55px"){
			$( '.passenger' ).animate( {
				height: '0px'
			});
		}else{
			$( '.passenger' ).animate( {
				height: '55px'
			});
		}
	});
});


/*스크롤 멈춤*/
$('.element').on('scroll touchmove mousewheel', function(event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
});



/*스크롤 다시허용

$('#element').off('scroll touchmove mousewheel');

*/

/*좌석선택*/
$(document).on("click", ".seat_btn", function () {
	$(this).addClass("seat_active");
});
$(document).on("click", ".seat_active", function () {
	$(this).removeClass("seat_active");
});


/*스케일*/
$( document ).ready(function() {
/*
	$('.trigger').on('click', function() {
		$('.seat_sheet').toggleClass('scale');
		$('.airplane_bg').removeClass('airplane_bg');
		return false;
	});
*/
	alphaSet.init();
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


var alphaSet	= {
	init	: function() {
		var	_self	= this;

		_self.setEvt();
	}
	,setEvt	: function() {



		// Button Event
		$("[as-recom-btn]").each(function(idx, elmt) {
//console.log(			$(elmt).attr("as-recom-btn")			);
			$(elmt).on("click", function() {

//				$('.seat_sheet').toggleClass('scale');
//				$('.airplane_bg').removeClass('airplane_bg');

//				document.getElementById("seat-row-"+$(elmt).attr("stRow")).focus();
//				$("#seat-row-"+$(elmt).attr("stRow")).scrollIntoView();
//				location.href	= "#seat-row-"+$(elmt).attr("stRow");

				var seatBg	= $("#ag-seat-bg");
//seatBg.toggleClass('scale');
$('.seat_sheet').toggleClass('scale');

				if( seatBg.attr("zoomYn") == "Y" ) {

					setTimeout(function(){
						seatBg.addClass('airplane_bg');
					}, 1000);

					$("html,body").animate({
						scrollTop: $("#seat-row-01").offset().top    //id가 target 인 일레먼트의 상단위치로 페이지 스크롤
					}, 500);
/*
					seatBg.animate(
						{'transform':'translate(-500px,0); scale(0.3);'}
					);
*/
//seatBg.toogle("style"	,{'transform':'translate(-500px,0); scale(0.3);'});
//seatBg.toogle("style"	,{'transform':'scale(1)'});
//					seatBg.css("transform","translate(-500px,0);");
					seatBg.attr("zoomYn"	,"N");
				} else {
/*
					setTimeout(function(){
						$("#seat-row-20").focus();
					}, 2000);
*/
					setTimeout(function(){
						$("html,body").animate({
							scrollTop: $("#seat-row-"+$(elmt).attr("stRow")).offset().top - 150   //id가 target 인 일레먼트의 상단위치로 페이지 스크롤
//							scrollTop: $("#seat-row-"+$(elmt).attr("stRow")).position().top - 205    //id가 target 인 일레먼트의 상단위치로 페이지 스크롤
						}, 1000);
					}, 1500);
console.log("--------------------------------------------------");
console.log($("#seat-row-"+$(elmt).attr("stRow")).offset().top);

					setTimeout(function(){
console.log($("#seat-row-"+$(elmt).attr("stRow")).offset().top);
					}, 1000);

//					seatBg.css("transform","translate(-500px,3500px);");
/*
					seatBg.animate(
						{'transform':'translate(0,1500); scale(1);'}
					);
*/
//seatBg.toogle("style"	,{'transform':'translate(0,1500); scale(1);'});
//seatBg.toogle("style"	,{'transform':'scale(1)'});
					seatBg.attr("zoomYn"	,"Y");
					seatBg.removeClass('airplane_bg');
				}

console.log("zoomYn	: "+seatBg.attr("zoomYn"));


/*
				var seatSheet	= $('.seat_sheet');
				var airPlane	= $('.airplane_bg');

//				css({'transform':'rotate('+test0+'deg)'})

//				seatSheet.toggleClass('scale');
//				seatSheet.css({'transform':'rotate('+test0+'deg)'})
//				seatSheet.css({'transform':'translate(0px, 1px)'});

				seatSheet.toggleClass('scale');
				airPlane.removeClass('airplane_bg');

				if( seatSheet.attr("zoomYn") != "Y" ) {
//					airPlane.removeClass('airplane_bg');

//					seatSheet.css({'transform':'none'});
//					seatSheet.css({'transform':'translate(0,1500); scale(1);'});
//					seatSheet.attr("zoomYn"	,"Y");
				} else {
					seatSheet.addClass('airplane_bg');
//					airPlane.addClass('airplane_bg');
//					seatSheet.css({'transform':'translate(-500px,0) scale(0.3);'});
//					seatSheet.attr("zoomYn"	,"N");
				}

*/


/*
	transform: translate(-500px,0);
	transform: scale(0.3);

transform: none;
*/

				return false;
			});
		});


		var grade	= "";

		// Seat Grade
		$("li[as-seat-gr]").each(function(idx, elmt) {
			var li	= $(elmt);
			var ul	= li.parent();
			var ss	= $("#as-seat-sheet");

			var	sp	= ss.position();

console.log(ul.attr("id"));

			if(grade == "" || grade != li.attr("as-seat-gr")) {

				var ulPos	= ul.position();
				var liPos	= li.position();
//				var pos		= {};
//				liPos.top	= li.offset().top;
//				liPos.left	= li.offset().left;

//				liPos.top	= li.position().top	- $("#seat-num-ul").position().top;
//				liPos.left	= li.position().left- $("#seat-num-ul").position().left;



//console.log("top : "+li.offset().top+"      left : "+li.offset().left);

				grade	= li.attr("as-seat-gr");

				var btn	= $("[as-recom-btn='"+grade+"']").eq(0);

console.log(idx+"."+btn.text()+"  ["+btn.attr("as-recom-btn")+"]");
//console.log("li.position().top : "+parseInt(li.position().top)+"      li.position().left : "+parseInt(li.position().left));
//console.log("li.scrollTop : "+li.scrollTop()+"      li.scrollLeft : "+li.scrollLeft());
//console.log("li.offset().top : "+li.offset().top+"      li.offset().left : "+li.offset().left);

//console.log("elmt.offset().top : "+$(elmt).offset().top+"      elmt.offset().left : "+$(elmt).offset().left);
//console.log("elmt.position().top : "+$(elmt).position().top+"      elmt.position().left : "+$(elmt).position().left);



//				btn.css("top"	,liPos.top+"px");
//				btn.css("left"	,liPos.left+"px");

				var	btnPos	= {};
//				btnPos.position	= "relative";
				btnPos.position	= "absolute";
//				btnPos.top		= liPos.top+"px";
//				btnPos.left		= liPos.left+"px";
//				btn.css(btnPos);

//				btnPos.top		= (liPos.top	+ li.scrollTop())+"px";
//				btnPos.top		= (liPos.top)	+ "px";
//				btnPos.top		= "0px";

//				btnPos.top		= parseInt(liPos.top	- ulPos.top)	+ "px";
//				btnPos.left		= parseInt(liPos.left	- ulPos.left)	+ "px";

//				btnPos.top		= parseInt(li.offset().top	- ul.offset().top)	+ "px";
//				btnPos.left		= parseInt(li.offset().left	- ul.offset().left)	+ "px";
//				btn.css(btnPos);

				btn.css("top"	,"");
//console.log(    ""+parseInt(li.position().left)+"px")    );

/*
console.log(	"ul.position().top	: "	+ parseInt(ul.position().top)	+ "	ul.position().left	: "	+ parseInt(ul.position().left)	);
console.log(	"ul.offset().top	: "	+ parseInt(ul.offset().top)		+ "	ul.offset().left	: "	+ parseInt(ul.offset().left)		);
console.log(	"li.position().top	: "	+ parseInt(li.position().top)	+ "	li.position().left	: "	+ parseInt(li.position().left)	);
console.log(	"li.offset().top	: "	+ parseInt(li.offset().top)		+ "	li.offset().left	: "	+ parseInt(li.offset().left)	);
console.log(	"ss.position().top	: "	+ parseInt(ss.position().top)	+ "	ss.position().top	: "	+ parseInt(ss.position().top.left)	);
console.log(	"ss.offset().top	: "	+ parseInt(ss.offset().top)		+ "	ss.offset().top		: "	+ parseInt(ss.offset().left)	);
*/
				btn.css("position"	,"absolute");
//				btn.css("top"		,parseInt(li.offset().top - ul.offset().top)+"px");
				btn.css("top"		,parseInt(li.offset().top + 58));
				btn.css("left"		,parseInt(li.offset().left));

				btn.css("width"		,"60px");
				btn.css("hight"		,"20px");
				btn.css("font-size"	,"10px");

//btn.offset(li.offset());

				// 버튼 배경색
				btn.css("background-color","#"+Math.floor(Math.random()*16777215).toString(16));
//				btn.css("top"	,li.offset().top+"px");

//				btn.parent().css("top"	,li.offset().top+"px");
//				btn.css("top"	,li.offset().top+"px");

				var	stRow	= ""+(idx+1);
				if(stRow.length==1) stRow	= "0"+stRow;
				btn.attr("stRow"	,stRow);
			}
//console.log(idx+"."+grade);
		});

/*
		// Seat Grade
		$("li[as-seat-gr]").each(function(idx, elmt) {
console.log(idx+".li");

		});
*/
	}
};

