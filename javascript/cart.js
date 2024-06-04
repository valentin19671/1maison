

function toNum(str) {
    //const num = Number(str.replace(/\s/g,''));
    let num=+str.split(' ').join('');
    return num;
  }
  
  function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }
  
  // Корзина
  
  const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
  const cartNumArr = document.querySelectorAll("#cart_num");
  const cartArr = document.querySelectorAll("#cart");
  const cart1 = document.querySelector("#cart1");
  const quantityMinusArr= document.querySelectorAll('.quantity-minus');
  const quantityPlusArr= document.querySelectorAll('.quantity-plus');
  const cardQuantityArr= document.querySelectorAll('.card-quantity');
  let quantity=1;

  let colorActiveArr= [];
  let sizeActiveArr= [];
  //let currentColor;
  const colorArr=document.querySelectorAll('.color');
  const sizeArr=document.querySelectorAll('.card-size');
  const whiteArr= document.querySelectorAll('.white');
  const whiteArrFixed= document.querySelectorAll('.white-fixed');
  const goldArr= document.querySelectorAll('.gold');
  const goldArrFixed= document.querySelectorAll('.gold-fixed');
  const redArr= document.querySelectorAll('.red');
  const redArrFixed= document.querySelectorAll('.red-fixed');
  const blackArr= document.querySelectorAll('.black');
  const blackArrFixed= document.querySelectorAll('.black-fixed');
  const brownArr= document.querySelectorAll('.brown');
  const brownArrFixed= document.querySelectorAll('.brown-fixed');
  const greenArr= document.querySelectorAll('.green');
  const greenArrFixed= document.querySelectorAll('.green-fixed');
  

  const zoomArr= document.querySelectorAll('.zoom-in');
  const zoomArrPhone= document.querySelectorAll('.zoom-in-phone');

  quantityMinusArr.forEach((n)=>{
    n.addEventListener('click',()=>{
      if (quantity>0){
        quantity-=1;
        for (let num of cardQuantityArr){
          num.innerHTML=quantity;
        }
      } else {
        quantity=0;
        for (let num of cardQuantityArr){
          num.innerHTML=quantity;
        }
      }
    })
  })

  quantityPlusArr.forEach((n)=>{
    n.addEventListener('click',()=>{
      quantity+=1;
      for (let num of cardQuantityArr){
        num.innerHTML=quantity;
      }
    })
  })


  zoomArr.forEach((zoom)=>{
    zoom.addEventListener('click',()=>{
      const zoomImage = document.createElement("img");
      zoomImage.classList.add("zoom-in-active");
      zoomImage.setAttribute("src", zoom.src);
      document.body.appendChild(zoomImage);

      const zoomDelete = document.createElement("div");
      zoomDelete.classList.add("zoom-delete");
      zoomDelete.innerHTML = "&#10006;";
      document.body.appendChild(zoomDelete);

      document.querySelector('main').classList.add('hide');

      zoomDelete.addEventListener('click',()=>{
        zoomImage.remove();
        zoomDelete.remove();
        document.querySelector('main').classList.remove('hide');
      })

      
      zoomImage.addEventListener('click',()=>{
        zoomImage.remove();
        zoomDelete.remove();
        document.querySelector('main').classList.remove('hide');
        document.querySelector('footer').classList.remove('hide');
      })
    })
  })


  zoomArrPhone.forEach((zoom)=>{
    zoom.addEventListener('click',()=>{
      const zoomImage = document.createElement("img");
      zoomImage.classList.add("zoom-in-active-phone");
      zoomImage.setAttribute("src", zoom.src);
      document.body.appendChild(zoomImage);

      const zoomDelete = document.createElement("div");
      zoomDelete.classList.add("zoom-delete");
      zoomDelete.innerHTML = "&#10006;";
      document.body.appendChild(zoomDelete);

      document.querySelector('main').classList.add('hide');
      document.querySelector('footer').classList.add('hide');
      document.querySelector('header').classList.add('hide');
      document.querySelector('.main-flex-card-right-relative').classList.add('hide');

      zoomDelete.addEventListener('click',()=>{
        zoomImage.remove();
        zoomDelete.remove();
        document.querySelector('main').classList.remove('hide');
        document.querySelector('footer').classList.remove('hide');
        document.querySelector('header').classList.remove('hide');
        document.querySelector('.main-flex-card-right-relative').classList.remove('hide');
      })

      zoomImage.addEventListener('click',()=>{
        zoomImage.remove();
        zoomDelete.remove();
        document.querySelector('main').classList.remove('hide');
        document.querySelector('footer').classList.remove('hide');
        document.querySelector('header').classList.remove('hide');
        document.querySelector('.main-flex-card-right-relative').classList.remove('hide');
      })
    })
  })





  
  class Cart {
    products;
    constructor() {
      this.products = [];
    }
    get count() {
      return this.products.length;
    }
    addProduct(product) {
      this.products.push(product);
    }
    removeProduct(index) {
      this.products.splice(index, 1);
    }
    get cost() {
      const prices = this.products.map((product) => {
        return toNum(product.price)*product.quantityCard;
      });
      const sum = prices.reduce((acc, num) => {
        return acc + num;
      }, 0);
      return sum;
    }
    
  }
  
  class Product {
    imageSrc;
    name;
    price;
    color;
    size;
    quantityCard;
    constructor(card) {
      this.imageSrc = document.querySelector(".card__image").children[0].src;
      this.name = card.querySelector(".card__title").innerText;
      this.price = card.querySelector(".card__price--common").innerText;
      this.color = card.querySelector(".color-active").innerText;
      this.size = card.querySelector(".size-active").innerText;
      this.quantityCard=quantity;
    }
  }
  
  const myCart = new Cart();
  
  if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
  }
  
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  myCart.products = savedCart.products;
  cartNumArr.forEach((cartNum)=>{
    cartNum.textContent = myCart.count;
  })

  
  myCart.products = cardAddArr.forEach((cardAdd) => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      if (colorActiveArr.length==0){
        colorArr[0].classList.add('color-active');
    }
    if (sizeActiveArr.length==0){
        sizeArr[0].classList.add('size-active');
    }
      const product = new Product(card);
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      myCart.products = savedCart.products;
      myCart.addProduct(product);
      localStorage.setItem("cart", JSON.stringify(myCart));
      cartNumArr.forEach((cartNum)=>{
        cartNum.textContent = myCart.count;
      })
      colorArr[0].classList.remove('color-active');
      sizeArr[0].classList.remove('size-active');
    });
  });
  
  // Попап
  
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector("#popup_close");
  const body = document.body;
  const popupContainer = document.querySelector("#popup_container");
  const popupProductList = document.querySelector("#popup_product_list");
  const popupCost = document.querySelector("#popup_cost");
  const popupDiscount = document.querySelector("#popup_discount");
  const popupCostDiscount = document.querySelector("#popup_cost_discount");
  const backgroundFilter= document.querySelector('.pc-body-filter');
  
  

  cartArr.forEach((cart)=>{
    cart.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.add("popup--open");
      body.classList.add("lock");
      popupContainerFill();
      backgroundFilter.classList.add('display-block');
    })
  })
 

  /*
  cart.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
    popupContainerFill();
    backgroundFilter.classList.add('display-block');
  });
  */

  cart1.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
    popupContainerFill();
backgroundFilter.classList.add('display-block');
  });
  
  function popupContainerFill() {
    popupProductList.innerHTML = null;
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    myCart.products = savedCart.products;
    const productsHTML = myCart.products.map((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("popup__product");
  
      const productWrap1 = document.createElement("div");
      productWrap1.classList.add("popup__product-wrap");
      const productWrap2 = document.createElement("div");
      productWrap2.classList.add("popup__product-wrap");
  
      const productImage = document.createElement("img");
      productImage.classList.add("popup__product-image");
      let arrSrc=Array.from(product.imageSrc);
      for (let i=0; i<5; i++){
        arrSrc.pop();
      }
      let arrSrcImg=arrSrc.concat((product.color)+'.jpg').join('');
      //let cardColorImgSrc=product.imageSrc.slice(-1,2).concat(product.color)+'.jpg';
      //let cardColorImgSrc=product.imageSrc.split('').splice(-1, 5);//.join('')+ product.color;
      productImage.setAttribute("src", arrSrcImg );
     

      const productFlexPopup =document.createElement("div");
      productFlexPopup.classList.add("popup__product-flex");
  
      const productTitle = document.createElement("h2");
      productTitle.classList.add("popup__product-title");
      productTitle.innerHTML = product.name;

      const productColor = document.createElement("h3");
      productColor.classList.add("popup__product-color");
      productColor.innerHTML ='цвет: '+ '<strong>'+product.color+'</strong>';

      const productSize = document.createElement("h3");
      productSize.classList.add("popup__product-size");
      productSize.innerHTML ='размер: '+ '<strong>'+product.size+'</strong>';


      const quantityFlex = document.createElement("div");
      quantityFlex.classList.add("card-quantity-flex");
      const buttonMinus =document.createElement("div");
      buttonMinus.classList.add('quantity-minus-inner');
      buttonMinus.innerHTML='Кол-во:';
      const quantityMain =document.createElement("div");
      quantityMain.classList.add('card-quantity-inner');
      quantityMain.innerHTML= product.quantityCard;


      const productDelete = document.createElement("button");
      productDelete.classList.add("popup__product-delete");
      productDelete.classList.add("underline-move");
      productDelete.innerHTML = "Удалить";
  
      const productPrice = document.createElement("div");
      productPrice.classList.add("popup__product-price");
      productPrice.innerHTML = toCurrency(toNum(product.price)*product.quantityCard);
  

  
      productDelete.addEventListener("click", () => {
        myCart.removeProduct(product);
        localStorage.setItem("cart", JSON.stringify(myCart));
        popupContainerFill();
        cartNumArr.forEach((cartNum)=>{
          cartNum.textContent = myCart.count;
        })
      });
  
      productWrap1.appendChild(productImage);
      productWrap1.appendChild(productFlexPopup);
      productFlexPopup.appendChild(productTitle);
      productFlexPopup.appendChild(productColor);
      productFlexPopup.appendChild(productSize);
      productWrap2.appendChild(quantityFlex);
      quantityFlex.appendChild(buttonMinus);
      quantityFlex.appendChild(quantityMain);
      productWrap2.appendChild(productDelete);
      productWrap2.appendChild(productPrice);
      productItem.appendChild(productWrap1);
      productItem.appendChild(productWrap2);

     let quantityMinusArrInner= document.querySelectorAll('.quantity-minus-inner');
     let quantityPlusArrInner= document.querySelectorAll('.quantity-plus-inner');
     let cardQuantityArrInner= document.querySelectorAll('.card-quantity-inner');


     quantityMinusArrInner.forEach((n)=>{
      n.addEventListener('click',()=>{
        if (quantity>0){
          quantity-=1;
          for (let num of cardQuantityArrInner){
            num.innerHTML=quantity;
          }
        } else {
          quantity=0;
          for (let num of cardQuantityArrInner){
            num.innerHTML=quantity;
          }
        }
      })
    })
  
    quantityPlusArrInner.forEach((n)=>{
      n.addEventListener('click',()=>{
        quantity+=1;
        for (let num of cardQuantityArrInner){
          num.innerHTML=quantity;
        }
      })
    })
  
  
      return productItem;
    });
  
    productsHTML.forEach((productHTML) => {
      popupProductList.appendChild(productHTML);
    });
  
    popupCost.value = toCurrency(myCart.cost);
    localStorage.setItem('cost', myCart.cost);
   
  }

  
  
  popupClose.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("popup--open");
    body.classList.remove("lock");
    backgroundFilter.classList.remove('display-block');
  });

  

// цвета 

  colorArr.forEach((color)=>{
color.addEventListener('click',()=>{
    if (!color.classList.contains('color-active')){
        colorActiveArr.push(color);
        if (colorActiveArr[colorActiveArr.length-1].innerText=='white'){

            blackArr.forEach((black)=>{
                black.classList.remove('show');
                            })
                blackArrFixed.forEach((blackFixed)=>{
                    blackFixed.classList.remove('show'); 
                            })


            blackArr.forEach((black)=>{
black.classList.add('hide');
            })
blackArrFixed.forEach((blackFixed)=>{
    blackFixed.classList.add('hide'); 
            })


            redArr.forEach((red)=>{
              red.classList.remove('show');
                          })
              redArrFixed.forEach((redFixed)=>{
                  redFixed.classList.remove('show'); 
                          })


          redArr.forEach((red)=>{
red.classList.add('hide');
          })
redArrFixed.forEach((redFixed)=>{
  redFixed.classList.add('hide'); 
          })
          

            whiteArr.forEach((white)=>{
                white.classList.add('show');
                            })
                whiteArrFixed.forEach((whiteFixed)=>{
                    whiteFixed.classList.add('show'); 
                            })  

                            whiteArr.forEach((white)=>{
                                white.classList.remove('hide');
                                            })
                                whiteArrFixed.forEach((whiteFixed)=>{
                                    whiteFixed.classList.remove('hide'); 
                                            })

        } else if (colorActiveArr[colorActiveArr.length-1].innerText=='black')
        {
            whiteArr.forEach((white)=>{
                white.classList.add('hide');
                            })
                whiteArrFixed.forEach((whiteFixed)=>{
                    whiteFixed.classList.add('hide'); 
                            })
                            whiteArr.forEach((white)=>{
                                white.classList.remove('show');
                                            })
                                whiteArrFixed.forEach((whiteFixed)=>{
                                    whiteFixed.classList.remove('show'); 
                                            })  


                            blackArr.forEach((black)=>{
                                black.classList.remove('hide');
                                            })
                                blackArrFixed.forEach((blackFixed)=>{
                                    blackFixed.classList.remove('hide'); 
                                            })   
                                            
                                            goldArr.forEach((gold)=>{
                                                gold.classList.remove('show');
                                                            })
                                                goldArrFixed.forEach((goldFixed)=>{
                                                    goldFixed.classList.remove('show'); 
                                                            })

                                                            goldArr.forEach((gold)=>{
                                                                gold.classList.add('hide');
                                                                            })
                                                                goldArrFixed.forEach((goldFixed)=>{
                                                                    goldFixed.classList.add('hide'); 
                                                                            })

        }


        else if (colorActiveArr[colorActiveArr.length-1].innerText=='gold')
        {
            goldArr.forEach((gold)=>{
                gold.classList.add('show');
                            })
                goldArrFixed.forEach((goldFixed)=>{
                    goldFixed.classList.add('show'); 
                            })

                            blackArr.forEach((black)=>{
                                black.classList.remove('show');
                                            })
                                blackArrFixed.forEach((blackFixed)=>{
                                    blackFixed.classList.remove('show'); 
                                            })   

                                            blackArr.forEach((black)=>{
                                                black.classList.add('hide');
                                                            })
                                                blackArrFixed.forEach((blackFixed)=>{
                                                    blackFixed.classList.add('hide'); 
                                                            })   

        }  else if (colorActiveArr[colorActiveArr.length-1].innerText=='red')
        {
            redArr.forEach((red)=>{
                red.classList.add('show');
                            })
                redArrFixed.forEach((redFixed)=>{
                    redFixed.classList.add('show'); 
                            })

                            blackArr.forEach((black)=>{
                                black.classList.remove('show');
                                            })
                                blackArrFixed.forEach((blackFixed)=>{
                                    blackFixed.classList.remove('show'); 
                                            })   

                                            blackArr.forEach((black)=>{
                                                black.classList.add('hide');
                                                            })
                                                blackArrFixed.forEach((blackFixed)=>{
                                                    blackFixed.classList.add('hide'); 
                                                            })  


                                                            greenArr.forEach((green)=>{
                                                              green.classList.remove('show');
                                                                          })
                                                              greenArrFixed.forEach((greenFixed)=>{
                                                                  greenFixed.classList.remove('show'); 
                                                                          })   
                              
                                                                          greenArr.forEach((green)=>{
                                                                              green.classList.add('hide');
                                                                                          })
                                                                              greenArrFixed.forEach((greenFixed)=>{
                                                                                  greenFixed.classList.add('hide'); 
                                                                                          })  
                              
                                                            


                                                            brownArr.forEach((brown)=>{
                                                              brown.classList.remove('show');
                                                                          })
                                                              brownArrFixed.forEach((brownFixed)=>{
                                                                  brownFixed.classList.remove('show'); 
                                                                          })   
                              
                                                                          brownArr.forEach((brown)=>{
                                                                              brown.classList.add('hide');
                                                                                          })
                                                                              brownArrFixed.forEach((brownFixed)=>{
                                                                                  brownFixed.classList.add('hide'); 
                                                                                          })  
                                                            
                                                            

                                                            whiteArr.forEach((white)=>{
                                                              white.classList.remove('show');
                                                                          })
                                                              whiteArrFixed.forEach((whiteFixed)=>{
                                                                  whiteFixed.classList.remove('show'); 
                                                                          })   
                              
                                                                          whiteArr.forEach((white)=>{
                                                                              white.classList.add('hide');
                                                                                          })
                                                                              whiteArrFixed.forEach((whiteFixed)=>{
                                                                                  whiteFixed.classList.add('hide'); 
                                                                                          })   

        } else if (colorActiveArr[colorActiveArr.length-1].innerText=='brown')
        {
            brownArr.forEach((brown)=>{
                brown.classList.add('show');
                            })
                brownArrFixed.forEach((brownFixed)=>{
                    brownFixed.classList.add('show'); 
                            })

                            redArr.forEach((red)=>{
                                red.classList.remove('show');
                                            })
                                redArrFixed.forEach((redFixed)=>{
                                    redFixed.classList.remove('show'); 
                                            })   

                                            redArr.forEach((red)=>{
                                                red.classList.add('hide');
                                                            })
                                                redArrFixed.forEach((redFixed)=>{
                                                    redFixed.classList.add('hide'); 
                                                            })   

        }  else if (colorActiveArr[colorActiveArr.length-1].innerText=='green')
        {
            greenArr.forEach((green)=>{
                green.classList.add('show');
                            })
                greenArrFixed.forEach((greenFixed)=>{
                    greenFixed.classList.add('show'); 
                            })

                            redArr.forEach((red)=>{
                                red.classList.remove('show');
                                            })
                                redArrFixed.forEach((redFixed)=>{
                                    redFixed.classList.remove('show'); 
                                            })   

                                            redArr.forEach((red)=>{
                                                red.classList.add('hide');
                                                            })
                                                redArrFixed.forEach((redFixed)=>{
                                                    redFixed.classList.add('hide'); 
                                                            })   

        }








    color.classList.add('color-active');
        if (colorActiveArr.length>=2){
            colorActiveArr[0].classList.remove('color-active');
            colorActiveArr.shift();
           // console.log(colorActiveArr);
           // console.log(color.innerText);
           // currentColor=colorActiveArr[colorActiveArr.length-1];
           if (colorActiveArr[colorActiveArr.length-1].innerText=='white'){
            blackArr.forEach((black)=>{
black.classList.add('hide');
            })
blackArrFixed.forEach((blackFixed)=>{
    blackFixed.classList.add('hide'); 
            })
        } else {
            whiteArr.forEach((white)=>{
                white.classList.remove('show');
                            })
                whiteArrFixed.forEach((whiteFixed)=>{
                    whiteFixed.classList.remove('show'); 
                            })  
        }


        }
    } else {
        color.classList.remove('color-active');
    }
})
  })


  //размеры

  sizeArr.forEach((size)=>{
    size.addEventListener('click',()=>{
        if (!size.classList.contains('size-active')){
        size.classList.add('size-active');
        sizeActiveArr.push(size);
        //console.log('true');
            if (sizeActiveArr.length>=2){
                sizeActiveArr[0].classList.remove('size-active');
                sizeActiveArr.shift();
               // currentColor=colorActiveArr[colorActiveArr.length-1];
            }
        } else {
        size.classList.remove('size-active');
        }
    })
      })
    

//////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////


const likeStroke= document.querySelectorAll('#like-stroke');
const likeFill= document.querySelectorAll('#like-fill');
//let likeCount=0;
//localStorage.likeCount=likeCount;
let wishlistName= document.querySelector('.card__title').innerText;


likeStroke.forEach((e)=>{
  e.addEventListener('click',()=>{
    likeFill.forEach((n)=>{
      n.style.display='block';
    })
    likeStroke.forEach((g)=>{
      g.style.display='none';
    })
    //let wishlistSet = new Set(wishlistArr.map(e => JSON.stringify(e)));
    //const uniqWishlistArr = Array.from(wishlistSet).map(e => JSON.parse(e));
    localStorage.setItem( wishlistName ,JSON.stringify({
      'wishTitle': document.querySelector('.card__title').innerText,
      'src': document.querySelector(".card__image").children[0].src,
      'href': document.location.href,
    }));
   // console.log(JSON.parse(localStorage.getItem('ArrWishlistUniq')));

    //likeCount= uniqWishlistArr.length;
   // localStorage.likeCount=likeCount;

   // console.log(localStorage.likeCount);
  })
})


likeFill.forEach((e)=>{
  e.addEventListener('click',()=>{
    likeFill.forEach((n)=>{
      n.style.display='none';
    })
    likeStroke.forEach((g)=>{
      g.style.display='block';
    })

    localStorage.removeItem(wishlistName);
  })
})

const predzakazTitle=document.querySelectorAll('.predzakaz-title');
const cardName=document.querySelectorAll('.card-name');
const predzakazClose=document.querySelectorAll('.predzakaz-close');
const predzakazOpen=document.querySelectorAll('.predzakaz');
const predzakazForm=document.querySelectorAll('.form-predzakaz');

predzakazTitle.innerHTML='Предзаказ '+cardName.innerHTML;


predzakazOpen.forEach((e)=>{
  e.addEventListener('click',()=>{
    predzakazForm.forEach((n)=>{
      n.style.display='block';
    })
    backgroundFilter.classList.add('display-block');
  })
})


predzakazClose.forEach((e)=>{
  e.addEventListener('click',()=>{
    predzakazForm.forEach((n)=>{
      n.style.display='none';
    })
    backgroundFilter.classList.remove('display-block');
  })
})




const tableSize=document.querySelector('.table-size');
const closeTable=document.querySelectorAll('.close-table-size');
const tableSizeButton=document.querySelectorAll('.table-size-button');


tableSizeButton.forEach((e)=>{
  e.addEventListener('click',()=>{
      tableSize.style.display='block';
    backgroundFilter.classList.add('display-block');
  })
})


closeTable.forEach((e)=>{
  e.addEventListener('click',()=>{
    tableSize.style.display='none';
    backgroundFilter.classList.remove('display-block');
  })
})


