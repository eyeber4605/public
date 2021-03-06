/***** @trial class *****/

const QuestionData  = './assets/json/question.json?v=777';
const MBTIData      = './assets/json/mbti.json?v=777';


class Trial {

    static lock     = false;
    static answer   = [];
    static page     = 1;

    constructor(dataType = "json") {
        console.log('class Trial instance');
        this.dataType = dataType;
    }

    Trialboot = () => {
        this.removeAllchild(document.getElementById("mainWrap"));
        this.dataLoad();
    };


    removeAllchild = (div) => {
        while (div.hasChildNodes()) {
            div.removeChild(div.firstChild);
        }
    };

    dataLoad = () => {
        if (this.dataType === "json") {
            this.readTextFile(QuestionData, this.saveTextFile);
        }
    }

    saveTextFile = (object) => {
        this.q = JSON.parse(object);
    }

    readTextFile = (file, callback) => {
        try {
            let rawFile = new XMLHttpRequest();
            rawFile.overrideMimeType("application/json");
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function () {
                if (rawFile.readyState === 4 && rawFile.status == "200") {
                    callback(rawFile.responseText);
                }
            }
            rawFile.send(null);
        }catch (e) {
            console.log(e);
        }
    }

    drawOverallHtml = (page = 1) => {
        let div = [
            'count','quiz'
        ];
        document.getElementById("nowP").innerHTML = page;
        document.getElementById("endP").innerHTML = this.q.length;
        this.ElementIDRemoveClass(div,'none');
        this.ElementIDAddClass('copyWrap','none');


        let addWidth = (100 / this.q.length) * page;
        document.getElementById("myBar").style.width = addWidth + "%";

        this.showQuiz(page);
    }

    showQuiz(page = 1) {
        document.getElementById("subject").innerHTML = this.q[page - 1].subject;
        document.getElementById("question").innerHTML = this.createQbtn(this.q[page - 1]);
    }

    createQbtn(obj) {
        let html = "";
        let spl = "";

        if (typeof obj === "object") {
            for (let i = 0; i < obj.question.length; i++) {
                spl = obj.question[i].split("|");
                html += '<button onclick="trial.answerHit(\'' + spl[1] + '\')" class="option-btn" style="color: black;">' + spl[0] + '</button>';
            }
        }
        return html;
    }

    answerHit(v) {
        if (Trial.page >= this.q.length) {
            if(!Trial.lock){
                Trial.answer.push(v);
            }
            Trial.lock = true;
            this.finish();
            return true;
        }

        Trial.answer.push(v);
        Trial.page++;
        this.drawOverallHtml(Trial.page);
        this.showQuiz(Trial.page);
    }

    finish = () => {
        // ?????? ????????? ????????? ????????????.
        // E,I / N,S / F,T / F,J
        // ==========================
        // -A:3??? / -B:2???
        // ==========================

        let [E, I, N, S, F, T, J, P] = [0, 0, 0, 0, 0, 0, 0, 0];

        let MBTIIndicators = {
            'E-A' : 3, 'E-B' : 2,
            'I-A' : 3, 'I-B' : 2,
            'N-A' : 3, 'N-B' : 2,
            'S-A' : 3, 'S-B' : 2,
            'F-A' : 3, 'F-B' : 2,
            'T-A' : 3, 'T-B' : 2,
            'J-A' : 3, 'J-B' : 2,
            'P-A' : 3, 'P-B' : 2
        }

        for(let i=0; i < Trial.answer.length; i++){

            switch (Trial.answer[i].split('-')[0])
            {
                case 'E':
                    E += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'I':
                    I += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'N':
                    N += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'S':
                    S += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'F':
                    F += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'T':
                    T += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'J':
                    J += MBTIIndicators[Trial.answer[i]];
                    break;
                case 'P':
                    P += MBTIIndicators[Trial.answer[i]];
                    break;
            }
        }
        let myIcon = '';
        (E>I) ? myIcon += 'E' : myIcon += 'I';
        (N>S) ? myIcon += 'N' : myIcon += 'S';
        (F>T) ? myIcon += 'F' : myIcon += 'T';
        (J>P) ? myIcon += 'J' : myIcon += 'P';

        this.myIcon = myIcon;
        this.showElementMBTI(myIcon);
    }

    showElementMBTI = (MBTI) => {
        let MBTI__ALL_TYPE = [
            'ISTJ' , 'ISFJ' , 'INFJ' , 'INTJ',
            'ISTP' , 'ISFP' , 'INFP' , 'INTP',
            'ESTP' , 'ESFP' , 'ENFP' , 'ENTP',
            'ESTJ' , 'ESFJ' , 'ENFJ' , 'ENTJ'
        ];
        if(MBTI__ALL_TYPE.indexOf(MBTI) > -1){
            this.removeAllchild(document.getElementById("quiz"));
            this.ElementIDAddClass('count','none');
            this.ElementIDRemoveClass('copyWrap','none');
            this.readTextFile(MBTIData, this.drawMBTI);
        }else{
            alert('Validation Error');
        }
    }

    ElementIDAddClass = (div,_class) =>{
        if(Array.isArray(div)){
            for(let i=0;i<div.length;i++){
                document.getElementById(div[i]).classList.add(_class);
            }
        }else{
            document.getElementById(div).classList.add(_class);
        }
    }

    ElementIDRemoveClass = (div,_class) =>{
        if(Array.isArray(div)){
            for(let i=0;i<div.length;i++){
                document.getElementById(div[i]).classList.remove(_class);
            }
        }else{
            document.getElementById(div).classList.remove(_class);
        }
    }

    drawMBTI = (object) => {
        let data = JSON.parse(object);
        document.getElementById("quiz").innerHTML = "<div class='question'><h5 class='question-p'>?????? ???????????? <br>\""+data[0][this.myIcon].TITLE+"\" ("+this.myIcon+")</h5><br><br><img style='max-width:100%;' src='"+data[0][this.myIcon].IMG+"'></div>";
        this.ElementIDRemoveClass('quiz','none');
        this.ElementIDRemoveClass('retryWrap','none');
        init.setCopyUrl(window.location.href+"?mbti="+this.myIcon);
    }

    setMyicon = (myIcon) => {
        this.myIcon = myIcon;
    }

}


/****@ trial object ****/
trialBoot = () => {
    trial = new Trial();
    trial.Trialboot();
    trial.drawOverallHtml();
};


/****@ init Variable function ****/
const init = {
    main_init: function () {
        this.setCopyUrl();

        // ?????? ???????????? ??????
        let agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf("chrome") === -1) {
            alert("Chrome ???????????? ??? ?????? ??????????????? ???????????? ?????? ?????? ???????????? ??? ????????????.");
        }

        if(this.getParameter('mbti')){ // ?????? ??????
            trial = new Trial();
            trial.Trialboot();
            trial.setMyicon(this.getParameter('mbti'))
            trial.showElementMBTI(this.getParameter('mbti'));
        }
    },

    shareUrlCopy: function () {
        let ShareUrl = document.getElementById("shareUrl");
        ShareUrl.style.display = 'block';
        ShareUrl.select();
        document.execCommand('copy');
        ShareUrl.style.display = 'none';
        alert('????????? ?????? ???????????????');
    },

    setCopyUrl : function(url = ""){
        if(url===""){
            $("#shareUrl").val(window.location.href);
        }else{
            $("#shareUrl").val(url);
        }
    },

    getParameter : function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


}
