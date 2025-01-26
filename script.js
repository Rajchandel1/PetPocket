document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  const overlay = document.querySelector('.overlay');

  const toggleMenu = () => {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  hamburgerMenu.addEventListener('click', toggleMenu);
  closeMenu.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  const loginBtns = document.querySelectorAll('.login-btn, .mobile-login-btn');
  loginBtns.forEach(btn => {
    btn.addEventListener('click', () => {

    });
  });
});





const productCards = document.querySelector('.product-cards');
let isScrolling = false;
let scrollLeft;
productCards.addEventListener('mousedown', e => {
  isScrolling = true;
  startX = e.pageX - productCards.offsetLeft;
  scrollLeft = productCards.scrollLeft;
});
productCards.addEventListener('mouseleave', () => {
  isScrolling = false;
});
productCards.addEventListener('mouseup', () => {
  isScrolling = false;
});
productCards.addEventListener('mousemove', e => {
  if (!isScrolling) return;
  e.preventDefault();
  const x = e.pageX - productCards.offsetLeft;
  const walk = (x - startX) * 2;
  productCards.scrollLeft = scrollLeft - walk;
});
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    button.innerHTML = '✓ Added';
    button.style.background = '#4CAF50';
    setTimeout(() => {
      button.innerHTML = 'Add to Cart';
      button.style.background = '';
    }, 2000);
  });
});
document.querySelectorAll('.banner-img').forEach(img => {
  img.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.05)';
  });
  img.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});
document.querySelectorAll('.review-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});



function blog(){
document.querySelectorAll('.blog-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0)';
  });
});
const reviewsGrid = document.querySelector('.reviews-grid');
let isScrollingReviews = false;
let reviewsScrollLeft;
reviewsGrid.addEventListener('mousedown', e => {
  isScrollingReviews = true;
  startX = e.pageX - reviewsGrid.offsetLeft;
  reviewsScrollLeft = reviewsGrid.scrollLeft;
});
reviewsGrid.addEventListener('mouseleave', () => {
  isScrollingReviews = false;
});
reviewsGrid.addEventListener('mouseup', () => {
  isScrollingReviews = false;
});
reviewsGrid.addEventListener('mousemove', e => {
  if (!isScrollingReviews) return;
  e.preventDefault();
  const x = e.pageX - reviewsGrid.offsetLeft;
  const walk = (x - startX) * 2;
  reviewsGrid.scrollLeft = reviewsScrollLeft - walk;
});
const blogGrid = document.querySelector('.blog-grid');
let isScrollingBlog = false;
let blogScrollLeft;
blogGrid.addEventListener('mousedown', e => {
  isScrollingBlog = true;
  startX = e.pageX - blogGrid.offsetLeft;
  blogScrollLeft = blogGrid.scrollLeft;
});
blogGrid.addEventListener('mouseleave', () => {
  isScrollingBlog = false;
});
blogGrid.addEventListener('mouseup', () => {
  isScrollingBlog = false;
});
blogGrid.addEventListener('mousemove', e => {
  if (!isScrollingBlog) return;
  e.preventDefault();
  const x = e.pageX - blogGrid.offsetLeft;
  const walk = (x - startX) * 2;
  blogGrid.scrollLeft = blogScrollLeft - walk;
});
}

blog();

const cards = Array.from(document.querySelectorAll('.card'));
let currentIndex = 0;

function initializeCards() {
    cards.forEach((card, index) => {
        const hammer = new Hammer(card);
        
        hammer.on('pan', function(event) {
            const deltaX = event.deltaX;
            const opacity = 1 - Math.abs(deltaX) / 1000;
            const rotation = deltaX * 0.1;
            
            if (index === currentIndex) {
                card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
                card.style.opacity = opacity;
            }
        });

        hammer.on('panend', function(event) {
            if (index === currentIndex) {
                if (Math.abs(event.deltaX) > 100) {
                    swipeCard(event.deltaX > 0 ? 'right' : 'left');
                } else {
                    resetCard();
                }
            }
        });
    });
}

function swipeCard(direction) {
    const currentCard = cards[currentIndex];
    const translateX = direction === 'left' ? -1000 : 1000;
    
    currentCard.style.transform = `translateX(${translateX}px) rotate(${direction === 'left' ? -30 : 30}deg)`;
    currentCard.style.opacity = '0';

    setTimeout(() => {
        currentCard.style.zIndex = '0';
        currentIndex = (currentIndex + 1) % cards.length;
        
        if (currentIndex === 0) {
            resetAllCards();
        }
    }, 300);
}

function resetCard() {
    const currentCard = cards[currentIndex];
    currentCard.style.transform = 'rotate(-5deg)';
    currentCard.style.opacity = '1';
}

function resetAllCards() {
    cards.forEach((card, index) => {
        card.style.transition = 'none';
        card.style.transform = `rotate(${-5 + (index * 2)}deg) translateY(${index * 10}px)`;
        card.style.opacity = '1';
        card.style.zIndex = cards.length - index;
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        }, 50);
    });
}

initializeCards();
