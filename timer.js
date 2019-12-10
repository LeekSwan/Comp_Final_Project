// inspiration by: 
// https://jsfiddle.net/Daniel_Hug/pvk6p/
var seconds = 0, minutes = 0, hours = 0,
score=0,
t;

export const renderSite = function() {
    /*var stopWatch = document.getElementById('timer'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear');
    */

    
    /* Start button */

    $(document).on('click', '#start', function(e){
        timer();
    });
    
    
    $(document).on('click', '#stop', function(e){
        console.log("clicked stop");
        clearTimeout(t);
    });

    /* Stop button */
    $(document).on('click', '#clear', function(e) {
        stopWatch.textContent = "00:00:00";
        score = (hours + minutes/60) * 60; 
        seconds = 0; minutes = 0; hours = 0;
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
