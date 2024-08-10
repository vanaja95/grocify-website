let menu= document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header= document.querySelector('.header-2')
menu.addEventListener('click',() =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');

});
window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    if(window.scrollY > 150){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
}



var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
  });

//cart js section starts

if(document.readyState == 'loading'){
  document.addEventListener("DOMContentLoaded",ready);
  }else{
    ready();
}

