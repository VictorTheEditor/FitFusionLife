let icons = document.querySelector('.icons')
let navlist = document.querySelector('.nav-list')

//BOTÃO MENU HAMBURGUER
function iconsAnimation(){

    if(navlist.style.display == 'block'){
        navlist.style.display = 'none'
        const icon1 = document.querySelector('.icon:nth-child(1)')

        icon1.classList.add('styleNormal')
        icon1.classList.remove('styleX')

        const icon2 = document.querySelector('.icon:nth-child(2)')

        icon2.classList.add('styleNormal')
        icon2.classList.remove('styleX')

        const icon3 = document.querySelector('.icon:nth-child(3)')

        icon3.classList.add('styleNormal')
        icon3.classList.remove('styleX')
        
    }else{
        navlist.style.display = 'block'

        const icon1 = document.querySelector('.icon:nth-child(1)')
        icon1.classList.add('styleX')

        const icon2 = document.querySelector('.icon:nth-child(2)')
        icon2.classList.add('styleX')

        const icon3 = document.querySelector('.icon:nth-child(3)')
        icon3.classList.add('styleX')
        }
}


function MudouTamanho(){
   if(window.innerWidth >= 601){
        navlist.style.display = 'block'
   } else {
    navlist.style.display = 'none'
    const icon1 = document.querySelector('.icon:nth-child(1)')

    icon1.classList.add('styleNormal')
    icon1.classList.remove('styleX')

    const icon2 = document.querySelector('.icon:nth-child(2)')

    icon2.classList.add('styleNormal')
    icon2.classList.remove('styleX')

    const icon3 = document.querySelector('.icon:nth-child(3)')

    icon3.classList.add('styleNormal')
    icon3.classList.remove('styleX')
   }
}