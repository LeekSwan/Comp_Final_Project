let idNUM = 0;
let counter = 0;
export const renderSite = function() {
    const $root = $('#root');
    //here is where you will add button handlers, and any extra stuff you need to link to your async helper functions. You can also do this directly in the main function but its not recommended.

    //Home
    $(document).on('click', '#home',  function(e){
        e.preventDefault(); 
        getUserHomeInfo(); 
    });

    //music
    $(document).on('click', '#sakura', function(e){
      e.preventDefault();
      $('#audioPlayer')[0].src = "./sounds/sakurafloat.mp3";
      $('#audioPlayer')[0].play();
    });
    $(document).on('click', '#night', function(e){
      e.preventDefault();
      $('#audioPlayer')[0].src = "./sounds/night.mp3";
      $('#audioPlayer')[0].play();
    });
    $(document).on('click', '#white', function(e){
      e.preventDefault();
      $('#audioPlayer')[0].src = "./sounds/whitenostalgia.mp3";
      $('#audioPlayer')[0].play();
    });
    $(document).on('click', '#waves', function(e){
      e.preventDefault();
      $('#audioPlayer')[0].src = "./sounds/beach.mp3";
      $('#audioPlayer')[0].play();
    });
    $(document).on('click', '#rain', function(e){
      e.preventDefault();
      $('#audioPlayer')[0].src = "./sounds/rain.mp3";
      $('#audioPlayer')[0].play();
    }); 

    //Leader Board
    $(document).on('click', '#leader', function(e){
        e.preventDefault(); 
        getLeaderBoard(); 
    });

     //To-Do
     $(document).on('click', '#toDo', function(e){
      getToDo(); 
      });
      
  $(document).on('click','#test', function(event){
      event.preventDefault();
      console.log('testing');
      var token = "Bearer " + localStorage.getItem('jwt');
      const pubRoot = new axios.create({
          headers: {Authorization: token},
          baseURL: "http://localhost:3000/user"
      });
  
      async function createTODO(todo, key) {
        return await pubRoot.post(`/TODO/${idNUM}`, {
          data: {["task"]:todo, ["key"]: key},
          type: "merge"
        })
      }
      (async () => {
          var task = $(".userInput").val();
          idNUM++;
          await createTODO(task, idNUM);
      })();
      addTODOscreen($(".userInput").val());
  
  });
  /*
      // list functionality 
      $(document).on("keyup", ".userInput" ,async function(e) {
          e.preventDefault();         
          //13  means enter button
          if(e.keyCode == 13 && $(".userInput").val() != "")
          {
              e.preventDefault();
              var task = $(`<div id=l${idNUM} class='task'></div>`).text($(".userInput").val());
              addTODO(idNUM, $(".userInput").val());  
              idNUM++; 
              
              
            //for checkmark
            var check = $("<i class='fas fa-check' style='float:right; margin-right: 20px;'></i>").click(function(){
              var p = $(this).parent();
              //$(".completed").append(p);
              p.fadeOut(function(){
                $(".completed").append(p);
                p.fadeIn();
              }); 
              $(this).remove();
            });
  
            //for delete
            var del = $("<i class='fas fa-trash' style='float:right; margin-right: 20px;'></i>").click(function(){
              var p = $(this).parent();
              //p.remove();
              p.fadeOut(function(){
                p.remove();
              });
            });
  
            task.append(del,check);
            $(".notCompleted").append(task);
              //to clear the input
            $(".userInput").val("");

          }
        }); */
  



    
     
    //inspired
    $(document).on('click', '#inspire', async function(e){
      getInspired();
    });

    //Chat
    $(document).on('click', '#chat', async function(e){
        getChat(); 
    });

     //Logout
     $(document).on('click', '#logout', async function(e){
      getLogout(); 
    });


    





    
}
 
$(function () {
    renderSite(); 
}); 


 function getUserHomeInfo() {
    const $root = $('#root');

    let screen = `
        <section id="root">
        <div id="homescreen">
                
        <div id="welcome" style="text-align: center">
            <h1 style="font-size: 30px;  margin-bottom: 40px">Welcome Back! Let's get to Studying!</h1>
            <h2 style="font-size: 30px">Current Score: </h2>
            <h1 style="font-size: 60px"><time id="timer">00:00:00</time></h1>
            <button id="start">start</button>
            <button id="stop">pause</button>
            <button id="clear">submit score</button>
            <p id="progress">
                The longer you study, the higher your score!
                <br/> Before you begin, get your study materials ready.
                Keep in mind that <span style="color:white">to discourage distractions, 
                changing tabs will erase
                your progress!</span>
                <br/>
                <br/>
                Be sure to check out the Useful Tips section to follow the best study practices 
                or methods!
                <br/>
                <br/>
                In addition, choose from an assortment of <span style="color:white">relaxing music or sound effects</span> below, all designed to help you <span style="color:white">focus better.</span> 
                <br/>
                <br/>
                Good luck and happy studying!
            </p>
        </div>
        <div class="music" style="text-align: center">
            <h1 style="font-size: 25px" id='label'>Music</h1>
            <div class="songs">
                <h3 style="font-size: 20px; margin-bottom: 20px">Study Music</h3>
                <button id="sakura">▶ Sakura Falls</button>
                <button id="night">▶ Night Float</button>
                <button id="white">▶ White Nostalgia</button>
            </div>
            <div class="sounds">
                <h3 style="font-size: 20px; margin-bottom: 20px">Sound Effects</h3>
                <button id="rain">▶ Rain</button>
                <button id="waves">▶ Waves</button>
                <button id="forest">▶ Forest</button>
            </div>
            </div>
            <audio src="" controls id="audioPlayer" loop></audio>
        </div>
    </div>
    </section>
    `
    $root.replaceWith(screen); 
}

 async function getToDo(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <div id="list" class="container">
        <form id = 'formname'>
            <div class="notCompleted">
              <h3 style="margin-bottom: 10px">Not Completed</h3>
            </div>
            <div class="completed">
              <h3 style="margin-bottom: 10px">Completed</h3>
            </div>
              <input type="text" class="userInput" placeholder="Put the things you will procrastinate on here">
              <button type="submit" id="test">+</button>
        </form>
        </div>
    </section>
    `
    $root.replaceWith(screen); 

}



// add to To do
async function addTODO(idNUM, task){
    console.log("in addTODO");
    axios.post('http://localhost:3000/user/TODO' ,
    {data: {
      [idNUM] : {data: task, ["key"] : idNUM}
      
    }},
    {headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }},
    {type: "merge"}
  ).then(function(res){
    console.log("added");
  }).catch(error =>{
    console.log(error);
  });
}

async function addTODOscreen(thing){
        var task = thing;
        var task = $(`<div id=l${idNUM} class='task'></div>`).text($(".userInput").val());
        //for checkmark
            var check = $("<i id='complete' class='fas fa-check' style='float:right; margin-right: 20px;'></i>").click(function(){
              var p = $(this).parent();
              //$(".completed").append(p);
              p.fadeOut(function(){
                $(".completed").append(p);
                p.fadeIn();
              }); 
              $(this).remove();
            });
  
            //for delete
            var del = $("<i id='deleteTODO' class='fas fa-trash' style='float:right; margin-right: 20px;'></i>").click(function(){
              var p = $(this).parent();
              //p.remove();
              p.fadeOut(function(){
                p.remove();
              });
            });
  
            task.append(del,check);
            $(".notCompleted").append(task);
              //to clear the input
            $(".userInput").val("");

}

// delete to do 

 async function getLeaderBoard(){
    const $root = $('#root');
    var token = "Bearer " + localStorage.getItem('jwt');
    const pubRoot = new axios.create({
        headers: {Authorization: token},
        baseURL: "http://localhost:3000/private"
    });

    async function getScores() {
      return await pubRoot.get(`/scores`);
    }

    (async () => {
       let data = await getScores();
       let obj = JSON.stringify(data, null, 2); 
       //["data"]["result"]["r"]["name"]
       
       /*for(var i in data.data.result){
           console.log(data.data.result[i].name);
       }*/
       
       let screen = document.createElement('section');
       screen = `<section id="root">
            <h1 class="title">Most Studious of Students</h1>
            <h2 class="subtitle">How do you compare?</h2>
            <div class="columns is-multiline is-mobile">
            <div class="column is-one-quarter">
                <code>Rank</code>
            </div>
            <div class="column">
                <code>Student</code>
            </div>
            <div class="column is-one-quarter">
                <code>Score</code>
            </div>
        </div>
            <section id="students">

            </section>
            </section>
       `;
       $root.replaceWith(screen); 

       var place = 1; 
       for(var i in data.data.result){
            let info = document.createElement('div');

            var name = data.data.result[i].name;
            var score = data.data.result[i].score;
            

            info.innerHTML=`
            <div class="columns is-multiline is-mobile">
                <div class="column is-one-quarter">
                    <code>${place}</code>
                </div>
                <div class="column">
                    <code>${name}</code>
                </div>
                <div class="column is-one-quarter">
                    <code>${score}</code>
                </div>
            </div>
                    `;
            document.getElementById('students').appendChild(info);
            place++; 
       }
    })();
    
    
    

     
}


//API taken from http://quotes.stormconsultancy.co.uk/api
async function randomQuote() {
  const response = await fetch('https://api.quotable.io/random')
  const data = await response.json()
  $('#root').html(`${data.content} —${data.author}`);
}


export async function getInspired(){
  const $root = $('#root');
  let screen = document.createElement('section');
  const response = await fetch('http://quotes.stormconsultancy.co.uk/random.json')
  const data = await response.json()
  screen.innerHTML = `
  <section id="root">
      <div id="quote">
        <p>
            <h1>${data.quote}</h1>
            <h2> — ${data.author}</h2>
        </p>
      </div>
  </section>`
  $root.replaceWith(screen);  
}









