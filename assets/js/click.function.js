$(function(){

    var agent = navigator.userAgent.toLowerCase();
    // 크롬 브라우저 확인
    if( agent.indexOf("chrome") == -1) {
        alert('Chrome 브라우저가 아닐경우 정상 작동 하지않을 수 있습니다. ');
    }

    $("#startBtn").click(function () {
        trialBoot();
    });
    
})
