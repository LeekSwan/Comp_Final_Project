

// inspiration by: 
// https://jsfiddle.net/Daniel_Hug/pvk6p/
var seconds = 0, minutes = 0, hours = 0,
score=0,
t;

var start_clicked = false, stop_clicked = false;

export const renderSite = function() {
    /*var stopWatch = document.getElementById('timer'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear');
    */

    
    /* Start button */

    $(document).on('click', '#start', function(e){
        if(!start_clicked){
            timer();
            start_clicked = true; 
        }
        
    });
    
    
    $(document).on('click', '#stop', function(e){
        start_clicked=false; 
        console.log("clicked stop");
        clearTimeout(t);
    });

    /* Stop button */
    $(document).on('click', '#clear', function(e) {
        event.preventDefault();
        
        start_clicked=false; 
        console.log("clicked stop");
        clearTimeout(t);

        var stopWatch=document.getElementById('timer');
        stopWatch.textContent = "00:00:00";
        // changing time according to seconds for testing
        score = seconds* 6; 
        //console.log(score); 
        seconds = 0; 
        minutes = 0; 
        hours = 0;
        
        let name;
        var token = "Bearer " + localStorage.getItem('jwt');
        const privRoot = new axios.create({
            headers: {Authorization: token},
            baseURL: "http://localhost:3000/private"
        });
        const accRoot = new axios.create({
            headers: {Authorization: token},
            baseURL: "http://localhost:3000/account/status"
        });
    


        async function saveSCORE(old) {
            let new_score = score +old;
          return await privRoot.post(`/scores/${name}/score`, {
            data: new_score
          })
        }

        async function getAccountStatus(){
            return await accRoot.get()
        }

        async function getScore(user) {
            return await privRoot.get(`/scores/${user}`);
        }
 
        (async () => {
            name = await getAccountStatus();
            console.log(name);
            name = name.data.user.name; 
            let old_score = await getScore(name);
            old_score = old_score.data.result.score;
            //console.log(old_score);
            //console.log(score);
           await saveSCORE(old_score);
           document.getElementById('currScore').innerText = `Current Score: ${score}`;
           // axios.delete(http://localhost:3000/private/scores/ ,
    //{headers: { Authorization: Bearer ${localStorage.getItem('jwt')} }});
        })();

    });

    /* Clear button */
   // clear.onclick = function() {
        
        //calculate score
        //score = (hours + minutes/60) * 60; 
        //seconds = 0; minutes = 0; hours = 0;

}

$(function () {
    renderSite(); 
}); 


function add() {
    var stopWatch=document.getElementById('timer');
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    stopWatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
    (seconds > 9 ? seconds : "0" + seconds);
    
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}