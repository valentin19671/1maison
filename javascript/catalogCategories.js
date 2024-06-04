let vse=document.querySelector('.catalog-vse');
let platiya=document.querySelector('.catalog-platiya');
let palito=document.querySelector('.catalog-palito');
let costumi=document.querySelector('.catalog-costumi');


let platiyaArr=document.querySelectorAll('.platiya');
let palitoArr=document.querySelectorAll('.palito');
let costumiArr=document.querySelectorAll('.costumi');

vse.addEventListener('click',()=>{
    vse.classList.add('border-categories');
    platiya.classList.remove('border-categories');
    palito.classList.remove('border-categories');
    costumi.classList.remove('border-categories');
    platiyaArr.forEach((platiya)=>{
        platiya.classList.remove('hide');
    });
    palitoArr.forEach((palito)=>{
        palito.classList.remove('hide');
    });
    costumiArr.forEach((costumi)=>{
        costumi.classList.remove('hide');
    });
})


platiya.addEventListener('click',()=>{
    vse.classList.remove('border-categories');
    platiya.classList.add('border-categories');
    palito.classList.remove('border-categories');
    costumi.classList.remove('border-categories');
    platiyaArr.forEach((platiya)=>{
        platiya.classList.remove('hide');
    });
    palitoArr.forEach((palito)=>{
        palito.classList.add('hide');
    });
    costumiArr.forEach((costumi)=>{
        costumi.classList.add('hide');
    });
})

palito.addEventListener('click',()=>{
    vse.classList.remove('border-categories');
    platiya.classList.remove('border-categories');
    palito.classList.add('border-categories');
    costumi.classList.remove('border-categories');
    platiyaArr.forEach((platiya)=>{
        platiya.classList.add('hide');
    });
    palitoArr.forEach((palito)=>{
        palito.classList.remove('hide');
    });
    costumiArr.forEach((costumi)=>{
        costumi.classList.add('hide');
    });
})

costumi.addEventListener('click',()=>{
    vse.classList.remove('border-categories');
    platiya.classList.remove('border-categories');
    palito.classList.remove('border-categories');
    costumi.classList.add('border-categories');
    platiyaArr.forEach((platiya)=>{
        platiya.classList.add('hide');
    });
    palitoArr.forEach((palito)=>{
        palito.classList.add('hide');
    });
    costumiArr.forEach((costumi)=>{
        costumi.classList.remove('hide');
    });
})