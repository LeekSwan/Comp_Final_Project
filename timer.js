// inspiration by: 
// https://jsfiddle.net/Daniel_Hug/pvk6p/



var stopWatch = document.getElementById('timer'),
start = document.getElementById('start'),
stop = document.getElementById('stop'),
clear = document.getElementById('clear'),
seconds = 0, minutes = 0, hours = 0,
score=0,
t;

function add() {
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

/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
score = (hours + minutes/60) * 60; 
    
clearTimeout(t);
}

/* Clear button */
clear.onclick = function() {
    stopWatch.textContent = "00:00:00";
    //calculate score
    score = (hours + minutes/60) * 60; 
    seconds = 0; minutes = 0; hours = 0;
}

