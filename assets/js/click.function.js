$(function(){
    // load main_init()
    init.main_init();

    $("#startBtn").click(function () {
        trialBoot();
    });

    $("#shareUrlCopy").click(function(){
        init.shareUrlCopy();
    });

    $("#retryWrap").click(function(){
        location.replace('/');
    });

    
})
