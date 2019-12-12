var ids = 0; 

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
        <div id="welcome" style="text-align: center">
                    <h1>Welcome Back! Let's get to Studying!</h1>
                    <h2>Current Score: </h2>
                    <h1><time id="timer">00:00:00</time></h1>
                    <button id="start">start</button>
                    <button id="stop">stop</button>
                    <button id="clear">clear</button>
                </div>
                <div class="music">
                    <audio src="" controls id="audioPlayer" loop></audio>
                    <div class="songs">
                        <h3>An Assortment of Study Music to Help You Focus</h3>
                        <button onclick='sakura();' id="sakura">Sakura Falls</button>
                        <button onclick='night();' id="night">Night Float</button>
                        <button onclick='white();' id="white">White Nostalgia</button>
                    </div>
                    <div class="sounds">
                        <h3>An Assortment of Relaxing Sounds to Help You Focus</h3>
                        <button onclick='rain();' id="rain">RAIN</button>
                        <button onclick='waves();' id="waves">WAVES</button>
                        <button onclick='forest()' id="forest">FOREST</button>
                    </div>
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
              <h3>Not Completed</h3>
            </div>
            <div class="completed">
              <h3>Completed</h3>
            </div>
              <input type="text" class="userInput" placeholder="Put the things you will procrastinate on here">
              <button type="submit" id="test">Add</button>
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
  <section id="quote_screen">
      <div id="quote">
        <p>
            <h1>${data.quote}</h1>
            <h2> — ${data.author}</h2>
        </p>
      </div>
  </section>`


  $root.replaceWith(screen);  
}

 async function getChat(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <h1>Chat room here</h1>

    </section>`;
    $root.replaceWith(screen);  
}


export async function getLogout() {
   

}






