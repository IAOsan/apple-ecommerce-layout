/* eslint-disable no-param-reassign */
class SlideShow {
   constructor(container, images, time = 1000) {
      this.container = container;
      this.images = images;
      this.time = time;
   }

   appendChild(child, father = this.container) {
      father.appendChild(child);
   }

   createDiv(img, style = '') {
      const div = document.createElement('div');
      div.className = `slideShow__img ${style}`;
      div.style.backgroundImage = `url(assets/images/slideshow/${img})`;
      return div;
   }

   removeClass(item, style) {
      item.classList.remove(`${style}`);
   }

   addClass(item, style) {
      item.classList.add(`${style}`);
   }

   run(arr) {
      let count = 0;
      const items = arr.length - 1;
      setInterval(() => {
         // remove class fist item
         this.removeClass(arr[count], 'slideShow__img--change');
         // add class next item
         if (count !== items) {
            this.addClass(arr[count + 1], 'slideShow__img--change');
         }
         count = count === items ? 0 : count + 1;
         // add class first item
         this.addClass(arr[count], 'slideShow__img--change');
      }, this.time);
   }

   show() {
      for (let i = 0; i < this.images.length; i++) {
         const element = this.createDiv(
            this.images[i],
            i === 0 && 'slideShow__img--change'
         );
         this.appendChild(element);
      }
      const slideItems = document.querySelectorAll('.slideShow__img');
      this.run(slideItems);
   }
}

const cube = {
   container: document.querySelector('.cube'),
   controls: document.querySelector('.cube__controls'),
   buttons: {
      topX: 'top-x-control',
      bottomX: 'bottom-x-control',
      leftY: 'left-y-control',
      rightY: 'right-y-control',
      topZ: 'top-z-control',
      bottomZ: 'bottom-z-control',
   },
   x: 0,
   y: 20,
   z: 0,
   isMouseOver: false,
   interval: null,
   containsClass: function (element, style) {
      return element.classList.contains(`${style}`);
   },
   rotate: function () {
      this.controls.addEventListener('click', e => {
         if (e.target.nodeName === 'I') {
            // x
            if (this.containsClass(e.target, this.buttons.topX)) this.x += 20;
            if (this.containsClass(e.target, this.buttons.bottomX))
               this.x -= 20;
            // y
            if (this.containsClass(e.target, this.buttons.leftY)) this.y -= 20;
            if (this.containsClass(e.target, this.buttons.rightY)) this.y += 20;
            // z
            if (this.containsClass(e.target, this.buttons.topZ)) this.z -= 20;
            if (this.containsClass(e.target, this.buttons.bottomZ))
               this.z += 20;

            this.container.style.transform = `rotateY(${this.y}deg) rotateX(${this.x}deg) rotateZ(${this.z}deg)`;
         }
      });
   },
   animation: function () {
      if (this.isMouseOver) {
         clearInterval(this.interval);
      } else {
         this.interval = setInterval(() => {
            this.container.style.transform = `rotateY(${this.y++}deg) rotateX(${
               this.x
            }deg) rotateZ(${this.z}deg)`;
         }, 100);
      }
   },
   overControls: function () {
      this.controls.addEventListener('mouseover', () => {
         this.isMouseOver = true;
         this.animation();
      });
   },
   leaveControls: function () {
      this.controls.addEventListener('mouseout', () => {
         this.isMouseOver = false;
         this.animation();
      });
   },
};

const scrolling = {
   container: document.querySelector('.section2__images'),
   animateMacbook: function () {
      const topPos = this.container.offsetTop; // distance between top to the page to top section
      const sectionHeight = this.container.offsetHeight / 2; // height of the section
      window.addEventListener('scroll', () => {
         const scrollY = window.pageYOffset + window.innerHeight; // distance in px top of the page
         if (scrollY >= topPos + sectionHeight) {
            this.container.classList.add('section2__images--change');
         } else {
            this.container.classList.remove('section2__images--change');
         }
      });
   },
};

const watches = {
   sectionContainer: document.querySelector('.section3'),
   bandsContainer: document.querySelector('.section3__bands'),
   casesContainer: document.querySelector('.section3__cases'),
   controls: {
      top: document.querySelector('.watch-top-control'),
      bottom: document.querySelector('.watch-bottom-control'),
      left: document.querySelector('.watch-left-control'),
      right: document.querySelector('.watch-right-control'),
   },
   X: 0,
   Y: 0,
   containsClass: function (element, style) {
      return element.classList.contains(`${style}`);
   },
   showHidde: function (axis, element, limit) {
      if (axis === limit) {
         element.classList.add('u-hidde-item');
      } else {
         element.classList.remove('u-hidde-item');
      }
   },
   clickEvt: function () {
      this.sectionContainer.addEventListener('click', e => {
         e.preventDefault();
         if (e.target.nodeName === 'I' || e.target.nodeName === 'A') {
            const element = e.target;
            // y
            if (this.containsClass(element, this.controls.top.classList[1]))
               this.Y += 70;
            if (this.containsClass(element, this.controls.bottom.classList[1]))
               this.Y -= 70;
            // x
            if (this.containsClass(element, this.controls.right.classList[1]))
               this.X += 70;
            if (this.containsClass(element, this.controls.left.classList[1]))
               this.X -= 70;

            this.casesContainer.style.marginBottom = `${this.Y}rem`;
            this.bandsContainer.style.marginLeft = `${this.X}rem`;

            this.showHidde(this.Y, this.controls.top, 280);
            this.showHidde(this.Y, this.controls.bottom, -280);
            this.showHidde(this.X, this.controls.right, 280);
            this.showHidde(this.X, this.controls.left, -280);
         }
      });
   },
};

/* -------------------------------------------------------------------------- */
/*                                  LISTENERS                                 */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
   const slideContainer = document.querySelector('.slideShow');
   const slideImages = [
      'section-1-bg-1.jpg',
      'section-1-bg-2.jpg',
      'section-1-bg-3.jpg',
      'section-1-bg-4.jpg',
      'section-1-bg-5.jpg',
   ];
   const slideImagesSM = [
      'section-1-bg-1-sm.jpg',
      'section-1-bg-2-sm.jpg',
      'section-1-bg-3-sm.jpg',
      'section-1-bg-4-sm.jpg',
      'section-1-bg-5-sm.jpg',
   ];
   let slideshow;
   function init() {
      const query = matchMedia('(min-width: 768px)');
      if (query.matches) {
         slideshow = new SlideShow(slideContainer, slideImages, 15000);
      } else {
         slideshow = new SlideShow(slideContainer, slideImagesSM, 15000);
      }
   }
   init();
   // slideshow
   slideshow.show();
   // cube
   cube.animation();
   cube.rotate();
   // macbook
   scrolling.animateMacbook();
   // watches
   watches.clickEvt();
});
cube.overControls();
cube.leaveControls();
