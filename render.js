  function render(products) {




const diva = document.getElementById(`ourproducts`);
const superproducts = document.querySelector(`.superproducts`)
const details = document.querySelector(`.details`)
    
    diva.innerHTML = ``;
    products.forEach((element) => {
      const li = document.createElement(`li`);


      
      li.innerHTML = `

      <div id="productCard">

      <img id="productImage" src="${element.thumbnail}" alt="${element.title}">
      <p> ${element.title} </p>
      <p> $ ${element.price} </p>
      <P id="productDesc"> ${element.description}


      </div>
      
      
      
      `     
      
      li.addEventListener(`click`, () => {
      superproducts.style.display = `none`
      const detailPage = document.querySelector(`#detailsOfProduct`)
    
      details.style.display = `block`




      detailPage.innerHTML = `
      
      <img id="imageDetailProduct" src="${element.thumbnail}" alt="${element.title}">
      <p id="titleProduct"> ${element.title} </p>
      <p> $ ${element.price} </p>
      <p> category : ${element.category} </p>
      <p id="stock"> ${element.stock > 0 ? 'In Stock' : 'None Left'} </p>
      <P> ${element.description} </p>
      <p> tags : ${element.tags} </p>
            <button id="BuyButton">Buy This Product</button>
                    <p id="addedToCart" style="display: none;">added to cart</p>

            

  `


      const ptegCart = detailPage.querySelector(`#addedToCart`);
      const buyBtn = detailPage.querySelector(`#BuyButton`);


      buyBtn.addEventListener(`click`, () => {
         cart.push(element);
         localStorage.setItem('myCart', JSON.stringify(cart));
         ptegCart.style.display = `block`;
      }); 

    }); 
      
  
    diva.append(li);

  }); 
}