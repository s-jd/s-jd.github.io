// @ts-nocheck
const ul = document.querySelector('ul')

ul?.addEventListener('click',(e)=>{
  const item = e.target
  if(item?.classList.contains('icon-x')){
    document.querySelectorAll('.btn').forEach((it,index)=>{
      it.style.display = 'none';
    })
    item?.classList.remove('icon-x');
    item?.classList.add('icon-menu');
    ul.style.width = '.4rem';
  }else if(item?.classList.contains('icon-menu')){
    document.querySelectorAll('.btn').forEach((it,index)=>{
      it.style.display = 'block';
    })
    item?.classList.remove('icon-menu');
    item?.classList.add('icon-x');
    ul.style.width = '3.5rem';
  }else {

  }
})