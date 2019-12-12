
var idNUM = 0;
export const renderSite = function() {
    const $root = $('#root');
    //here is where you will add button handlers, and any extra stuff you need to link to your async helper functions. You can also do this directly in the main function but its not recommended.

    //Home
    $(document).on('click', '#home',  function(e){
        e.preventDefault(); 
        getUserHomeInfo(); 
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
    
    });
    
    
    
        
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
          });
    
    
    
    //Calendar
    $(document).on('click', '#inspire', async function(e){
        getInspired();
    });

    //Chat
    $(document).on('click', '#chat', async function(e){
        getChat(); 
    });


    





    
}
 
$(function () {
    renderSite(); 
}); 


 function getUserHomeInfo() {
    const $root = $('#root');

    let screen = `
        <section id="root">
        <div>
        <h1>Welcome Back! Let's get to Studying!</h1>
        <h2>Current Score: </h2>
        <div>
            <h1><time id="timer">00:00:00</time></h1>
            <button id="start">start</button>
            <button id="stop">stop</button>
            <button id="clear">clear</button>
        </div>
    </div>
    </section>`
    $root.replaceWith(screen); 
}

 async function getToDo(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <div id="list" class="container">
        <form id = 'formname' onsubmit = "async(e) =>{
            e.preventDefault();}">
            <div class="notCompleted">
            <h3>Not Completed</h3>
            </div>
            <div class="completed">
            <h3>Completed</h3>
            </div>
            <input type="text" class="userInput" placeholder="Put the things you will procrastinate on here">
            <button type="submit" onSubmit id="test">Add</button>
            </div>
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


// delete to do 
async function deleteTODO(){

}















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

 async function getInspired(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <h1>Inspirational Quote</h1>

    </section>`;

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









