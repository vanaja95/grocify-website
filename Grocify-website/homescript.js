// JavaScript code to handle menu toggle and header scroll effects

// Select elements from the DOM
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');

// Add click event listener to the menu icon
menu.addEventListener('click', () => {
    // Toggle 'fa-times' class to change the menu icon
    menu.classList.toggle('fa-times');
    // Toggle 'active' class to show/hide the navbar
    navbar.classList.toggle('active');
});

// Add scroll event listener to the window
window.onscroll = () => {
    // Remove classes when scrolling to close the menu and hide the navbar
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    // Add 'active' class to the header when scrolled past 150px
    if (window.scrollY > 150) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
};







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



//account page login and register page js start

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});







//account page login and register page js end