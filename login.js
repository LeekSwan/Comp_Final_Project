
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
    console.log(first); 
    var last = document.getElementById('last').value; 
    var email = document.getElementById('email').value; 
    var pass = document.getElementById('pass').value;  
    storeUser(first, last, email, pass); 
    window.location.replace("study_hall.html");
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
    r.then(response => {
      window.location.replace("study_hall.html");    
    }).catch(error =>{
      console.log(error); 
    })
  localStorage.setItem('jwt', jwt); 
  
}

async function login(name, pass) {
  let r = axios.post('http://localhost:3000/account/login', 
  {
    name: name,
    pass: pass,
  });
  r.then(response => {
    window.location.replace("study_hall.html");    
  }).catch(error =>{
    console.log(error); 
  })
}