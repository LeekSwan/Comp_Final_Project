var ids = 0; 


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
        e.preventDefault(); 
        getToDo(); 
    });
        
        // list functionality 
        $(document).on("keyup", ".userInput" ,function(e) {
            e.preventDefault();         
            var idNUM = 0;         
            //13  means enter button
            if(e.keyCode == 13 && $(".userInput").val() != "")
            {
                e.preventDefault();
                var task = $(`<div id=l${idNUM} class='task'></div>`).text($(".userInput").val());
                idNUM++; 
                addTODO(idNUM, $(".userInput").val());  
                
                
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
              return false;
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


export function getUserHomeInfo() {
    const $root = $('#root');

    /*const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/public/users'
    })*/

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

export async function getToDo(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <div id="list" class="container">
            <div class="notCompleted">
            <h3>Not Completed</h3>
            </div>
            <div class="completed">
            <h3>Completed</h3>
            </div>
            <input type="text" class="userInput" placeholder="Put the things you will procrastinate on here">
            </div>
        </div>
    </section>
    `
    $root.replaceWith(screen); 

}

// add to To do
async function addTODO(idNUM, task){
    var id = idNUM;
    axios.post('http://localhost:3000/user/TODO' ,
    {data: {
      [id] : task
    }},
    {headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }},
    {type: "merge"}
  ).then(function(res){
    console.log("added todo");
  }).catch(error =>{
    console.log(error);
  });

}

// delete to do 
async function deleteTODO(){

}















export async function getLeaderBoard(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <h1>Leader board</h1>

    </section>`

    $root.replaceWith(screen);  
}


//API taken from https://github.com/lukePeavey/quotable
async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    $('#root').html(`${data.content} —${data.author}`);
  }


export async function getInspired(){
    const $root = $('#root');
    let screen = document.createElement('section');
    const response = await fetch('https://api.quotable.io/random')
    const data = await response.json()
    screen.innerHTML = `
    <section id="root">
        <p style="text-align:center">
            <h1 >${data.content}</h1>
            <h2>-- ${data.author}</h2>
        </p>
    </section>`

    

    $root.replaceWith(screen);  
}

export async function getChat(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <h1>Chat room here</h1>

    </section>`
    $root.replaceWith(screen);  
}










function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementById("tabcontent");
    /*for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }*/
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }