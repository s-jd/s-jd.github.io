// @ts-nocheck
const nav = document.querySelector('.nav')
nav.addEventListener('click',(e)=>{
  const target = e.target
  document.querySelectorAll('.menu_item').forEach((item,index)=>{
    // item.classList.remove('active')
    if(item.classList.contains('active')){
      item.classList.remove('active')
    }
  })
  // console.log()
  const border = document.querySelector('.menu__border')
  const left = 1.5*(target.dataset.index-1);
  console.log(left);
  // border.style.transform = `transform: translateX(${0.75+1.5*target.dataset.index}em);`
  border.style.transform = `translate3d(${left}em, 0 , 0)`;
})