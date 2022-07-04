/***** @trial class *****/

const jsonFile      = './assets/json/question.json?v=1';


class Trial {

    static answer = [];
    static page = 1;

    constructor(dataType = "json") {
        console.log('class Trial instance');
        this.dataType = dataType;
    }

    Trialboot = () => {
        this.removeAllchild(document.getElementById("mainWrap"));
        this.dataLoad();
    };


    removeAllchild = (div) => {
        while (div.hasChildNodes())
        {
            div.removeChild(div.firstChild);
        }
    };

    dataLoad = () => {
        if(this.dataType === "json") {
            this.readTextFile(jsonFile, this.saveTextFile);
        }
    }

    saveTextFile = (object) => {
        this.q = JSON.parse(object);
    }

    readTextFile = (file, callback) => {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    drawOverallHtml = (page = 1) => {
        document.getElementById("nowP").innerHTML = page;
        document.getElementById("endP").innerHTML = this.q.length;
        document.getElementById("count").classList.remove("none");
        document.getElementById("quiz").classList.remove("none");

        let addWidth = (100 / this.q.length ) * page;
        document.getElementById("myBar").style.width = addWidth+"%";

        this.showQuiz(page);
    }

    showQuiz(page = 1){
        document.getElementById("subject").innerHTML = this.q[page-1].subject;
        document.getElementById("question").innerHTML = this.createQbtn(this.q[page-1]);
    }

    createQbtn(obj){
        let html    = "";
        let spl     = "";

        if(typeof obj === "object"){
            for(let i=0;i<obj.question.length;i++){
                spl = obj.question[i].split("|");
                html += '<button onclick="trial.answerHit(\''+spl[1]+'\')" class="option-btn" style="color: black;">'+spl[0]+'</button>';
            }
        }
        return html;
    }

    answerHit(v){
        if(Trial.page >= this.q.length){
            this.finish();
            return true;
        }
        Trial.answer.push(v);
        Trial.page++;
        this.drawOverallHtml(Trial.page);
        this.showQuiz(Trial.page);
    }

    finish = () =>{
        alert('결과는 나중에 개발예정');
    }



}



/****@ trial object **/
trialBoot = () => {
    trial = new Trial();
    trial.Trialboot();
    trial.drawOverallHtml();
};
