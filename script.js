'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navBar = document.querySelector('.nav');
const navlinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

/********** Modal Window **********/
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/********** Insert & remove cookie message **********/
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

message.style.backgroundColor = '#37383d';
message.style.width = '103%';

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

/********** Implement smooth scrolling **********/
btnScrollTo.addEventListener('click', e => {
  // const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/********** Page Navigation Smooth Scrolling with Event Delegation **********/
navlinks.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/********** Tabbed Component **********/
tabsContainer.addEventListener('click', e => {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;

  // Active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate tab content
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/********** Menu Fade Animation **********/

// For Using Bind Method
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = document.querySelector('.nav__logo');

    siblings.forEach(item => {
      if (item !== link) item.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing argument into handler
navBar.addEventListener('mouseover', handleHover.bind(0.5));
navBar.addEventListener('mouseout', handleHover.bind(1));

// Using Closures
// const handleHover = function (opacity) {
//   return function (e) {
//     if (e.target.classList.contains('nav__link')) {
//       const link = e.target;
//       const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//       const logo = document.querySelector('.nav__logo');

//       siblings.forEach(item => {
//         if (item !== link) item.style.opacity = opacity;
//       });
//       logo.style.opacity = opacity;
//     }
//   };
// };

// navBar.addEventListener('mouseover', handleHover(0.5));
// navBar.addEventListener('mouseout', handleHover(1));

/********** Sticky Navigation **********/
const stickyNav = entries => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};

const navHeight = navBar.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
