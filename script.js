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