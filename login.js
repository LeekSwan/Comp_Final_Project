

$(document).ready(function(){

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
    
    var $this = $(this),
        label = $this.prev('label');

      if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
          label.removeClass('active highlight'); 
        } else {
          label.removeClass('highlight');   
        }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
          label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
          label.addClass('highlight');
        }
      }

  });

  $('.tab a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);  
  });



  $('#create').on('click', function (e) {
    e.preventDefault(); 
    var first = document.getElementById('first').value; 
    var last = document.getElementById('last').value; 
    var email = document.getElementById('email').value; 
    var pass = document.getElementById('pass').value;  
    
    storeUser(first, last, email, pass); 

  });



  $('#loginButton').on('click', function(e) {
    e.preventDefault();
    var name = document.getElementById('getName').value; 
    var pass = document.getElementById('getPass').value;
    login(name, pass);
    
  });

});







async function storeUser(first, last, email, pass) {
  let r = axios.post('http://localhost:3000/account/create', 
    {
      name: first,
      pass: pass,
      data: {
        last: last,
        email: email
      }
    });
     
    /*let m = axios.post('http://localhost:3000/user/', 
    {
      data: {
        name: first,
        todo: {}
      },
      headers: {Authorization: "Bearer "+localStorage.getItem('jwt')}
      
    });

    m.then(response => {
      console.log("made user");
    }).catch(error =>{
      console.log(error);
      alert(error);  
    });*/

    r.then(response => {
      login(first, pass);   
    }).catch(error =>{
      console.log(error); 
    });
  }






async function login(name, pass) {
  // token for jwt to get user info
  let token; 

  //check for login 
  axios.post('http://localhost:3000/account/login', 
  {
    name: name,
    pass: pass,
  }).then(function(response) {
    
    localStorage.setItem('jwt', response.data.jwt);   
    token = localStorage.getItem('jwt');  

    // testing for user for todo list 
    axios.post('http://localhost:3000/user/TODO' , 
      {data: {
        l1: "clean dishes",
        l2: "do homework"
      }},
      {headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
    }).then(function(res){
      //change pages and load home screen for study hall after login
      window.location.replace("study_hall.html");
      getUserHomeInfo();
    }).catch(error =>{
      console.log(error); 
    });

  }).catch(error =>{
    console.log(error); 
  });


  
}