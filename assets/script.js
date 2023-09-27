const sectionsLis = document.querySelectorAll("main section");
const dropdownBtn = document.querySelector('.dropdown-btn')
const pageBtnList = document.querySelector('.page-btn-list')
const pageBtns = document.querySelectorAll('.page-btn-list button')
const closeListingBtn = document.querySelector('.close-listing')
const listingList = document.querySelectorAll(".listing-list div");
const listingEl = document.querySelector("#listing");

// OPEN AND CLOSE DROPDOWN NAV
dropdownBtn.addEventListener('click', () => {
    pageBtnList.classList.toggle('hidden')
})

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



// CHECKOUT THE URLS WE CAN USE FOR DIFFERENT PAGES
fetch('https://fakestoreapi.com/products/').then(res => res.json()).then(data => console.log(data))
fetch('https://fakestoreapi.com/products/categories').then(res => res.json()).then(data => console.log(data))
fetch('https://fakestoreapi.com/products/1').then(res => res.json()).then(data => console.log(data))
fetch('https://fakestoreapi.com/products/category/jewelery').then(res => res.json()).then(data => console.log(data))
