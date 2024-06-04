let wishlistGrid=document.querySelector('.wishlist-grid');
let wishArr=[];



metka: for (let i = 0; i < localStorage.length; i++) {
  if (JSON.parse(localStorage.getItem(localStorage.key(i))).hasOwnProperty('wishTitle'))
  {
    const div = document.createElement("div");
    div.classList.add("wishlist-card");
    const img = document.createElement("img");
    img.classList.add("wishlist-img");
    img.setAttribute("src", JSON.parse(localStorage.getItem(localStorage.key(i))).src );
    const a = document.createElement("a");
    a.classList.add("wishlist-a");
    a.setAttribute("href", JSON.parse(localStorage.getItem(localStorage.key(i))).href );
    const p = document.createElement("p");
    p.classList.add("wishlist-p");
    p.textContent= JSON.parse(localStorage.getItem(localStorage.key(i))).wishTitle;
    const deleteWish = document.createElement("div");
    deleteWish.classList.add("wish-delete");
    deleteWish.innerHTML = "&#10006;";

    wishlistGrid.appendChild(div);
    div.appendChild(a);
    a.appendChild(img);
    a.appendChild(p);
    div.appendChild(deleteWish);

    let deleteWishArr=document.querySelectorAll('.wish-delete');

    console.log(p.textContent);

deleteWishArr.forEach((e)=>{
    e.addEventListener('click',(e)=>{
        let closestDiv=e.target.closest('.wishlist-card');
        wishlistGrid.removeChild(closestDiv);
        localStorage.removeItem(p.textContent);
    })
})

  } else {
    continue metka;
  }
}

