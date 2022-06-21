
/**
 * custom nav-menu toogle
 */

const btn =document.getElementById('toggle');
const navmenu = document.querySelector('.menu');

btn.addEventListener('click',function () {
    navmenu.classList.toggle('open');
    
})

// close menu links when click on the page
document.addEventListener('click', (e) => {
    if (e.target != btn && e.target != btn.querySelector('i') && navmenu.classList.contains('open')) {
         navmenu.classList.remove('open');
         
    }
});