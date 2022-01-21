const nav = document.querySelector('nav');
const openNav = document.querySelector('.nav-btn');
const closeNav = document.querySelector('.btn-close');
const productImage = document.querySelector('.product-img');
const prevImage = document.querySelector('.btn-prev');
const nextImage = document.querySelector('.btn-next');
const thumbnails = document.querySelectorAll('.thumbnail');
const cart = document.querySelector('.cart');
const cartBody = document.querySelector('.cart-body');
const cartName = document.querySelector('h1').textContent;
const cartPrice = document
  .querySelector('.curr-price')
  .textContent.substring(1);
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const unitMinus = document.querySelector('.btn-minus');
const unitPlus = document.querySelector('.btn-plus');
const addUnit = document.querySelector('.add-cart');

let unit = document.querySelector('#unit');
let unitCount = 0;
let itemCount = 0;

const deleteItem = itemCount >= 1 && document.querySelector('.icon-delete');

// Nav
openNav.addEventListener('click', (e) => {
  e.preventDefault();
  nav.classList.add('show-nav');
});

closeNav.addEventListener('click', navClose);

function navClose() {
  nav.classList.remove('show-nav');
}

let count = 1;

nextImage.addEventListener('click', (e) => {
  if (count < 4) {
    count++;
  } else {
    count = 1;
  }
  productImage.src = `/images/image-product-${count}.jpg`;
});

prevImage.addEventListener('click', (e) => {
  if (count > 1) {
    count--;
  } else {
    count = 4;
  }
  productImage.src = `/images/image-product-${count}.jpg`;
});

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', (e) => {
    thumbnails.forEach((y) => {
      y.classList.remove('active');
    });
    thumbnail.classList.add('active');

    if (e.target.classList.contains('active')) {
      productImage.src = e.target.src.replace('-thumbnail', '');
    }
  });
});

window.addEventListener('scroll', (e) => {
  if (nav.getBoundingClientRect().y < -120) {
    navClose();
  }
});
window.addEventListener('resize', (e) => {
  if (window.innerWidth >= 720) {
    navClose();
  }
});

unitMinus.addEventListener('click', (e) => {
  if (unitCount > 0) {
    unitCount--;
    unit.textContent = unitCount;
  }
});

unitPlus.addEventListener('click', (e) => {
  unitCount++;
  unit.textContent = unitCount;
});

addUnit.addEventListener('click', (e) => {
  e.preventDefault();
  itemCount += unitCount;
  unitCount = 0;
  unit.textContent = 0;
  cartBody.innerHTML = addCart();
  cartCount.textContent = itemCount;
});

cartIcon.addEventListener('click', (e) => {
  e.preventDefault();
  cart.classList.toggle('show-cart');
});

function addCart() {
  if (itemCount == 0) {
    return `
            <div class="cart-empty">
                <p>Your Cart is empty</p>
            </div
        `;
  } else {
    return `
        <div class="cart-main">

            <img src="/images/image-product-1-thumbnail.jpg" alt="" srcset="" class="cart-img">

            <div class="cart-desc">
                <p class="cart-name">${cartName}</p>
                <p class="cart-price">$${cartPrice} <span> x ${itemCount}</span> <b>$${
      itemCount * cartPrice
    }</b></p>
            </div>

            <div class="cart-delete">
                <img src="/images/icon-delete.svg" alt="" srcset="" class="icon-delete">
            </div>

        </div>

        <a class='checkout'>
            Checkout
        </a>

    `;
  }
}

window.addEventListener('click', (e) => {
  if (e.target.className === 'icon-delete') {
    itemCount = 0;
    unitCount = 0;
    cartBody.innerHTML = addCart();
    cartCount.textContent = itemCount;
  }
});
