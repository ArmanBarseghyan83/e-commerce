const sectionsLis = document.querySelectorAll("main section");
const dropdownBtn = document.querySelector('.dropdown-btn')
const pageBtnList = document.querySelector('.page-btn-list')
const pageBtns = document.querySelectorAll('.page-btn-list button')
const closeListingBtn = document.querySelector('.close-listing')
const listingList = document.querySelectorAll(".listing-list div");
const listingEl = document.querySelector("#listing");
const categoryBtns = document.querySelectorAll('#all-listings button')
const modalBackdropEl = document.querySelector(".modal-backdrop");
const addCartBtn = document.querySelector("#listing button");
const cartBtnQty = document.querySelector(".cart-btn span");


// TOGGLE DROPDOWN NAV BUTTONS AND CART BUTTONS
document.addEventListener("click", (e) => {
    if (e.target.matches(".dropdown-btn")) {
        pageBtnList.classList.toggle("hidden");
    } else if (e.target.matches(".cart-btn")) {
        modalBackdropEl.classList.toggle("active");
    } else if (e.target.matches(".modal-backdrop")) {
        modalBackdropEl.classList.remove("active");
    }
});

// TOGGLE BETWEEN PAGES, SET WHITE COLOR FOR THE ACTIVE PAGE BUTTON
pageBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        pageBtns.forEach((b) => b.classList.remove("text-white"));
        btn.classList.add("text-white");

        sectionsLis.forEach((section) => (section.style.display = "none"));
        document.querySelector(`#${btn.dataset.page}`).style.display = "block";
        pageBtnList.classList.add("hidden");
    });
});

// TOGGLE BETWEEN CATEGORIES
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach((b) => b.classList.remove('text-cyan-700', 'underline'))
        btn.classList.add('text-cyan-700', 'underline')
    })
})

// OPEN LISTING PAGE WHEN CLICKING TO THE LISTING
listingList.forEach((listing) => {
    listing.addEventListener("click", () => {
        sectionsLis.forEach((section) => (section.style.display = "none"));
        listingEl.style.display = "block";
    });
});

// CLOSE LISTING PAGE WHEN CLICKING CLOSE BUTTON ON THE LISTING PAGE
closeListingBtn.addEventListener("click", () => {
    listingEl.style.display = "none"
    document.querySelector('#all-listings').style.display = "block"
});

addCartBtn.addEventListener("click", () => {
    cartBtnQty.textContent = +cartBtnQty.textContent + 1;
    cartBtnQty.classList.add("bg-blue-800");
    setTimeout(() => {
        cartBtnQty.classList.remove("bg-blue-800");
    }, 150);
});



// CHECKOUT THE URLS WE CAN USE FOR DIFFERENT PAGES
fetch('https://fakestoreapi.com/products/').then(res => res.json()).then(data => console.log(data))
fetch('https://fakestoreapi.com/products/categories').then(res => res.json()).then(data => console.log(data))
fetch('https://fakestoreapi.com/products/1').then(res => res.json()).then(data => console.log(data))
fetch('https://fakestoreapi.com/products/category/jewelery').then(res => res.json()).then(data => console.log(data))


