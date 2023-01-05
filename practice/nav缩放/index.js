// @ts-nocheck
const closeIcon = document.querySelector('.close');

closeIcon.addEventListener('click',(e)=>{
  const items = document.querySelectorAll('.suo');
  items.forEach((item,index)=>{
    item.classList.add('disactive')
  })
  
})