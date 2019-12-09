export const renderSite = function() {
    const $root = $('#root');
    let jwt = localStorage.getItem('jwt');
    
    //here is where you will add button handlers, and any extra stuff you need to link to your async helper functions. You can also do this directly in the main function but its not recommended.
 
    //Home
    $(document).on('click', '#home', async function(e){
    
    });

    //Leader Board
    $(document).on('click', '#leader', async function(e){
        
    });
    
    //To-Do
    $(document).on('click', '#toDo', async function(e){
        getToDo(); 
        $(".userInput").on("keyup",function(e){
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

    //Chat
    $(document).on('click', '#chat', async function(e){
        
    });
        
}
 
$(function () {
    renderSite(); 
}); 


export async function getUserHomeInfo() {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/public/users'

    })

    
}

export async function getToDo(){
    const $root = $('#root');
    let screen = `
    <div id="list" class="container">
    <div class="notCompleted">
      <h3>Not Completed</h3>

    </div>

    <div class="completed">
      <h3>Completed</h3>
    </div>
    <input type="text" class="userInput" placeholder="Put the things you will procrastinate on here">
  </div>
    `
    $root.replaceWith(screen); 

}
//<h1 class="title is-centered">Welcome Back!</h1>


/*
onclick="openTab(event, 'Home')"
function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
      }*/