// @ts-nocheck
const card = document.querySelector('.login-card')

let inT,ouT
let ifIn = true;
let ifOut = false;

function fn(e,animation) {
  const span = document.querySelector('.bg')
  span.style.animation = `${animation} .5s ease-${animation} forwards`;
  span.style.top = `${e.clientY-e.target.offsetTop}px`;
  span.style.left = `${e.clientX-e.target.offsetLeft}px`;
    
}

card.addEventListener('mouseenter',(e)=>{
  // let y = e.clientY-e.target.offsetTop;
  // let x = e.clientX-e.target.offsetLeft;
  // console.log(x,y)
  ifOut = false;
  if(ifIn){
    inT = new Date().getTime();
    fn(e,'out');
    ifOut = true;
    ifIn = false;
  }
});

card.addEventListener('mouseleave',(e)=>{
  if(ifOut){
    ouT = new Date().getTime();
    if(ouT-inT < 500){
      setTimeout(fn(e,'in'),500-ouT+inT)
    }else {
      fn(e,'in')
    }
    ifIn = true;
    ifOut = false;
  }
  // const span = document.querySelector('.bg')
  // span.style.animation = 'out 1.5s ease-in forwards';
  // span.style.top = `${e.clientY-e.target.offsetTop}px`
  // span.style.left = `${e.clientX-e.target.offsetLeft}px`
})