const dropdownBtn = document.querySelector('.dropdown-btn')
const dropdownNav = document.querySelector('.dropdown-nav')

dropdownBtn.addEventListener('click', () => {
    dropdownNav.classList.toggle('hidden')
})