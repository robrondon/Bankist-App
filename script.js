'use strict';

const allSections = document.querySelectorAll('.section');
const header = document.querySelector('.header');
const navBar = document.querySelector('.nav');

/********** Modal Window **********/
const modalWindow = () => {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

  // Modal Functions
  const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  // Event Handlers
  btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};
modalWindow();

/********** Insert & remove cookie message **********/
const cookieMessage = () => {
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
};
cookieMessage();

/********** Implement smooth scrolling **********/
const section1SmoothScrolling = () => {
  const btnScrollTo = document.querySelector('.btn--scroll-to');
  const section1 = document.querySelector('#section--1');

  btnScrollTo.addEventListener('click', e => {
    // const s1coords = section1.getBoundingClientRect();

    // window.scrollTo({
    //   left: s1coords.left + window.scrollX,
    //   top: s1coords.top + window.scrollY,
    //   behavior: 'smooth',
    // });

    section1.scrollIntoView({ behavior: 'smooth' });
  });
};
section1SmoothScrolling();

/********** Page Navigation Smooth Scrolling with Event Delegation **********/
const smoothScrolling = () => {
  const navlinks = document.querySelector('.nav__links');
  navlinks.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      if (id !== '#')
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
};
smoothScrolling();

/********** Tabbed Component **********/
const tabbedComponent = () => {
  const tabs = document.querySelectorAll('.operations__tab');
  const tabsContainer = document.querySelector('.operations__tab-container');
  const tabsContent = document.querySelectorAll('.operations__content');

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
};
tabbedComponent();

/********** Menu Fade Animation **********/
const fadeAnimation = () => {
  // Using Bind Method
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
};
fadeAnimation();

/********** Sticky Navigation **********/
const stickyNavigation = () => {
  const stickyNav = entries => {
    const [entry] = entries;
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
};
stickyNavigation();

/********** Reveal Sections **********/
const revealSections = () => {
  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    });
  };
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });
};
revealSections();

/********** Lazy Loading Images **********/
const lazyLoading = () => {
  const featuresImgs = document.querySelectorAll('img[data-src]');

  const loadImages = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Replace src with data-src
      entry.target.src = entry.target.dataset.src;

      // Wait until is loaded to remove the class
      entry.target.addEventListener('load', () =>
        entry.target.classList.remove('lazy-img')
      );
      imagesObserver.unobserve(entry.target);
    });
  };

  const imagesObserver = new IntersectionObserver(loadImages, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });

  featuresImgs.forEach(image => {
    imagesObserver.observe(image);
  });
};
lazyLoading();

/********** Slider Component **********/
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  // Dots Functions
  const createDots = () => {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activeDot = slide => {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Slides Functions
  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    activeDot(slide);
  };
  const nextSlide = () => {
    if (currentSlide === maxSlide) currentSlide = 0;
    else currentSlide++;
    goToSlide(currentSlide);
  };
  const prevSlide = () => {
    if (currentSlide === 0) currentSlide = maxSlide;
    else currentSlide--;
    goToSlide(currentSlide);
  };

  createDots();
  goToSlide(0);

  // Slider Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
    }
  });
};
slider();
