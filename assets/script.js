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
const listingDataEl = document.querySelector('.listing-data');
var products = JSON.parse(localStorage.getItem('products')) || [];


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
    btn.addEventListener("click", (e) => {
        if (e.target.matches('.all-listings')) {
            document.querySelector('#all-listings').textContent = ''
            location.reload()
        }

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
        displaySingleCatListings(btn.dataset.category)
    })
})

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


// FORM SUBMIT FOR CREATE LISTING
var listing = document.querySelector('form');

listing.addEventListener('submit', function (event) {
    event.preventDefault();
    var listingData = new FormData(listing);
    var listingObj = Object.fromEntries(listingData);

    products.push(listingObj);
    localStorage.setItem('products', JSON.stringify(products));
    listing.reset();

    var successEl = document.createElement('p');
    successEl.textContent = 'Listing created successfully!';
    listing.appendChild(successEl);
    console.log(products)
})



// OPEN SPECIFIC LISTING PAGE
document.querySelector(".listing-list").addEventListener('click', (e) => {
    if (e.target.matches('.listing-list div')) {
        sectionsLis.forEach((section) => (section.style.display = "none"));
        listingEl.style.display = "block";

        //Since local listings don't have id 
        if (e.target.dataset.id !== 'undefined') {
            displayApiListing(e.target.dataset.id)
        }
        else {
            products.forEach(product => {
                if (product.image === e.target.children[0].src) {
                    renderListingData(product)
                }
            })
        }
    }
})


const displayApiListing = (id) => {
    listingDataEl.previousElementSibling.textContent = 'Loading...'
    listingDataEl.style.display = 'none'
    fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
        .then(data => {
            renderListingData(data)
        })
        .catch(() => {
            listingDataEl.previousElementSibling.textContent = 'Something went wrong!'
        })
}


const renderListingData = (data) => {
    listingDataEl.previousElementSibling.textContent = ''
    listingDataEl.style.display = 'block'

    listingDataEl.children[0].src = data.image
    listingDataEl.children[1].children[0].textContent = data.title
    listingDataEl.children[1].children[1].children[1].textContent = data.price
    listingDataEl.children[1].children[2].children[1].textContent = data.category
    listingDataEl.children[1].children[3].children[1].textContent = data.description
}


const renderListingsData = (data) => {
    data.forEach(el => {
        const divEl = document.createElement('div')
        const imgEl = document.createElement('img')
        imgEl.src = el.image
        imgEl.classList.add('pointer-events-none')
        divEl.setAttribute('data-id', `${el.id}`)
        divEl.classList.add('bg-white', 'w-56', 'h-80', 'mb-4', 'cursor-pointer', 'text-2xl', 'rounded-md', 'shadow-lg', 'shadow-slate-300', 'border-2', 'border-solid', 'border-slate-300', 'overflow-hidden')
        divEl.append(imgEl)
        document.querySelector(".listing-list").appendChild(divEl)

    })
}


const displaySingleCatListings = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`).then(res => res.json())
        .then(data => {
            document.querySelector(".listing-list").textContent = ''
            products.forEach((product) => {
                if (product.category === category) {
                    data.unshift(product)
                }
            })
            renderListingsData(data)
        })
}


const displayAllCatListings = () => {
    fetch('https://fakestoreapi.com/products/').then(res => res.json())
        .then(data => {
            data = [...products, ...data]
            renderListingsData(data)
        })
}

displayAllCatListings()