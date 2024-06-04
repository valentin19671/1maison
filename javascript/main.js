let clickCount=0;
let cardArray= document.querySelectorAll('.product-thumb');
let progressBar= document.querySelector('.progress-bar');
let thirdBlockImg=document.querySelector('.third-block-img');
let thirdBlock=document.querySelector('.third-block');




//thirdBlock.style.height=thirdBlockImg.height+'px';



const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth/4;
        clickCount+=1;
        if (clickCount>5){
          clickCount=5;
        }
        progressBar.style.width=clickCount*20+'%';
        console.log(progressBar.style.width);
        console.log(clickCount);
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth/4;
        clickCount-=1;
        if (clickCount<0){
          clickCount=0;
        }
        progressBar.style.width=clickCount*20+'%';
        console.log(clickCount);
    })
})

