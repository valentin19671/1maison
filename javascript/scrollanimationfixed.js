let cardFixed= document.querySelector('.main-flex-card-fixed');
let mainFlexLeft=document.querySelector('.main-flex-card-left');

mainFlexLeft.addEventListener("mouseover", () => {
  cardFixed.classList.add('visibility-true');
});

mainFlexLeft.addEventListener("mouseout", () => {
  cardFixed.classList.remove('visibility-true');
});


function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('card-fixed-border');
      }
    });
  }
  
  let options = {
    threshold: [0.5],
   };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-fixed');
  
  for (let elm of elements) {
    observer.observe(elm);
  }