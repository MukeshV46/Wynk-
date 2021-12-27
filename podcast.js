
function mode(x) {
    x.classList.toggle("fa-cloud-moon");
}

let tog = document.querySelector('.fa-bars');
tog.addEventListener('click',()=>{
    let items = document.querySelectorAll('.nav-items a')
    items.forEach((ele)=>ele.classList.toggle('show'))
})
// Geners 
let alb = document.querySelectorAll('.item a')
for (i = 0; i < alb.length; i++) {
    alb[i].addEventListener("click", function(e) {
      e.preventDefault()
      var panel = this.nextElementSibling;
      panel.classList.toggle('see')
    });
  }

  // carosuel
  let play = document.querySelectorAll('.cont-overlay .icon')
  play.forEach(ele => {
    ele.addEventListener('click',()=>{
        let player = document.querySelector('.Player')
        player.classList.toggle('show-play')
    })
});
let closeL = document.querySelector('.fa-times');
closeL.addEventListener('click',()=>{
  let login = document.querySelector('.login');
  login.classList.toggle('show')
})
let Log = document.querySelector('.fa-user-circle');
Log.addEventListener('click',()=>{
  let login = document.querySelector('.login')
  login.classList.toggle('show')
})


// Login && Sign in  Part 
let sign = document.querySelector('.regist #Reg');
let Login = document.querySelector('.regist #But');
let form = document.querySelector('.forum')
// Register 
async function register(e){
  e.preventDefault();
  const doc = {
    name:form.name.value,
    pass:form.pass.value
  }
    await fetch('http://localhost:3000/user',{
      method:'POST',
      body:JSON.stringify(doc),
      headers:{'Content-Type':'application/json'}
  }).then(()=>{
    alert('Succesfully created');
    window.location.replace('Podcast.html')
  });
};
// Checking The User
async function check (e){
    e.preventDefault();
    let name=form.name.value;
    let pass =form.pass.value;
    await fetch('http://localhost:3000/user')
    .then(res => res.json())
    .then((arr)=>{
        // Validation 
        let succ= false;        
        for(i=0;i<arr.length;i++){  
            // console.log(arr[i].mail);
            if(name===arr[i].name && pass===arr[i].pass){
                succ = true 
                break;
            }
            else{
                succ=false;
            }
        }
        if(succ){
            console.log('Login Success');
            let wel = document.querySelector('.warm');
            wel.innerHTML =`<h1>WelCome ${name}!</h1>`
            let login = document.querySelector('.login')
            login.classList.add('show');
            window.location.replace('All.html')            
          }
        else{
            alert('Login Failed');
        }
    })
}
sign.addEventListener('click',register)
Login.addEventListener('click',check);
