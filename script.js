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
        console.log("clicked todo");
        getToDo(); 
        
        // list functionality 
        $(".userInput").on("keyup",function(e) {
            //13  means enter button
            if(e.keyCode == 13 && $(".userInput").val() != "")
            {
              var task = $("<div class='task'></div>").text($(".userInput").val());
                
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
    /* Commented because going to implement later
    let r = axios.get('http://localhost:3000/user' ,
        { 
            headers:{
                "Authorization": "Bearer" + localStorage.getItem('jwt')
            },
    });*/


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
async function addTODO(){

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

export async function getInspired(){
    const $root = $('#root');
    let screen = document.createElement('section');
    screen.innerHTML = `
    <section id="root">
        <h1>Inspirational Quote</h1>

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