//멀티페이지 구현을 수행하는 라이브러리(jQuery 의존성이 존재)

$(function(){
    
    $(".page").hide().first().show();
    calculateGauge();

    $(".btn-next").on("click", function(){
        $(this).closest(".page").hide().next(".page").show();
        calculateGauge();
    });
    $(".btn-prev").on("click", function(){
        $(this).closest(".page").hide().prev(".page").show();
        calculateGauge();
    });

    //progressbar처리
    //[1] 처음에 .gauge의 폭을 설정
    // $(".progressbar > .gauge").css("width", "20%");
    // $(".progressbar").find(".gauge").css("width", "20%");
    // $(".progressbar").find(".gauge").css("width", 100/$(".page").length + "%");

    //(+추가) 보여지는 페이지의 위치를 계산 
    function calculateGauge(){
        if($(".progressbar").length == 0) return;

        var current = $(".page:visible");
        var page = $(".page").index(current) + 1;
        var percent = page * 100 / $(".page").length;
        $(".progressbar").find(".gauge").css("width", percent + "%");
    }
});
