

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
    });

   /* r.then(response => {
      login(first, pass);   
    }).catch(error =>{
      console.log(error); 
    });*/
  }


async function login(name, pass) {
  let token; 
  axios.post('http://localhost:3000/account/login', 
  {
    name: name,
    pass: pass,
  }).then(function(response) {
    //alert("jwt:"+response.data.jwt);
    localStorage.setItem('jwt', response.data.jwt);   
    token = localStorage.getItem('jwt');  
    


    axios.post("http://localhost:3000/user/kristi", 
    {data:
      {
        name: "" 
      }
      
    },
    {headers: { Authorization: `Bearer ${token}` }},
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
    
  }).catch(error =>{
    console.log(error); 
  });

  
 
  
  /*r.then(response => {
    window.location.replace("study_hall.html");
    getUserHomeInfo(); 
    
  }).catch(error =>{
    console.log(error); 
  });
*/
  
}