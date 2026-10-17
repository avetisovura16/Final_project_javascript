let cart = JSON.parse(localStorage.getItem('myCart')) || []



async function LittleShop() {
 

 const pteg = document.getElementById(`pteg`);
pteg.style.display = `none`
  const details = document.querySelector(`.details`)
const loadtext = document.getElementById(`loadText`)
loadtext.style.display = `block`

const superproducts = document.querySelector(`.superproducts`)
const buttonNext = document.getElementById(`button_next`);
const buttonPrev = document.getElementById(`button_prev`);
const pageNumber = document.getElementById(`PageNumber`)
 const productsList = document.getElementById(`ourproducts`);
const comeback = document.getElementById(`comeback`);
const YourOwnProduct = document.querySelector(`.YourOwnProduct`)
YourOwnProduct.style.display = `none`

buttonPrev.disabled = true
comeback.disabled = true


  let skip = 0; 
  let limit = 12; 
  let currectpage = 1;
  let product = [];
  let fullProductList = []


  try {
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

      if(!res.ok) throw new Error(`responce is wrong`)

          const data = await res.json();
  product = data.products;

        const resFull = await fetch(`https://dummyjson.com/products?limit=0`);

      if(!resFull.ok) throw new Error(`responce is wrong`)


      const dataFull = await resFull.json();
   fullProductList = dataFull.products;

  } catch (error) {
    console.error(`error`, error)
    loadtext.style.display = `none`
    

    productsList.innerHTML = `
      <li class="error-container">
        <p>No internet connection.</p>
        <button id="retryMain">Try again</button>
      </li>
    `;
    

    const retryBtn = document.getElementById('retryMain');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        LittleShop()
      });
    }
    
    return
  }


let pageAmount = Math.ceil(fullProductList.length / 12)

  let displayList = fullProductList.slice()

  const sortSelect = document.getElementById(`sortOrder`)

  sortSelect.addEventListener(`change`, () => {
    if (sortSelect.value === `asc`) {
      displayList.sort((a, b) => a.price - b.price)
    } else if (sortSelect.value === `desc`) {
      displayList.sort((a, b) => b.price - a.price)
    } else {
      displayList = fullProductList.slice()
    }

    skip = 0
    currectpage = 1
    pageNumber.textContent = `${currectpage} / ${pageAmount}`
    buttonPrev.disabled = true
    buttonNext.disabled = false
    comeback.disabled = true

    render(displayList.slice(skip, skip + limit))
  })

  loadtext.style.display = `none`

  

  render(product);

  const input = document.getElementById(`searchInput`);

  const textvalue = input.value;

  input.addEventListener(`input`, async() => {
    const searchtext = input.value.toLowerCase();

      if (searchtext === "") {
        buttonNext.style.display = `block`
        buttonPrev.style.display = `block`
        pageNumber.style.display = `block`
        comeback.style.display = `block`
        sortSelect.style.display = `block`

        
    } else {

        buttonNext.style.display = `none`
        buttonPrev.style.display = `none`
        pageNumber.style.display = `none`
        comeback.style.display = `none`
        sortSelect.style.display = `none`
    }


  if (searchtext === "") return render(product); 
   
    

try {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(searchtext)}`
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
    if (data.products.length === 0) {
      document.getElementById(`pteg`).style.display = `block`;
    } else {
      document.getElementById(`pteg`).style.display = `none`;
    }

  render(data.products.slice(0, 10));

} catch (error) {
  console.error(error);
  pteg.style.display = `none`;
  productsList.innerHTML = `<li>Search failed. Please try again.</li>`;
}












    

    render(data.products.slice(0,10));


  });




 
  pteg.style.display = `none`;

    pageNumber.textContent = `${currectpage} / ${pageAmount}`



  buttonNext.addEventListener(`click`, () => {
    if (currectpage >= pageAmount) return

    skip = skip + limit
    currectpage = currectpage + 1
    pageNumber.textContent = `${currectpage} / ${pageAmount}`

    buttonPrev.disabled = currectpage === 1
    comeback.disabled = currectpage === 1
    buttonNext.disabled = currectpage === pageAmount

    render(displayList.slice(skip, skip + limit))
  });

  buttonPrev.addEventListener(`click`, () => {
    if (currectpage <= 1) return

    skip = skip - limit
    currectpage = currectpage - 1
    pageNumber.textContent = `${currectpage} / ${pageAmount}`

    buttonPrev.disabled = currectpage === 1
    comeback.disabled = currectpage === 1
    buttonNext.disabled = currectpage === pageAmount

    render(displayList.slice(skip, skip + limit))
  });





comeback.addEventListener(`click`, () => {
  skip = 0;
  currectpage = 1;
    pageNumber.textContent = `${currectpage} / ${pageAmount}`

  render(displayList.slice(skip, skip + limit));

  buttonPrev.disabled = true;
  buttonNext.disabled = false;
  comeback.disabled = true
});





}
const superproducts = document.querySelector(`.superproducts`)
  const details = document.querySelector(`.details`)
        const cartButton = document.getElementById(`cartButton`)

      const buttonBack = document.getElementById(`goBackButton`)
      buttonBack.addEventListener(`click`, () => {
        details.style.display = `none`
        superproducts.style.display = `block`
        
                cartButton.style.display=`block`
      })




            const cartSurface = document.querySelector(`.cartSurface`)

      const CartUl = document.getElementById(`UlProducts`)
      const cartButtonBack = document.getElementById(`CartBackBtn`)
      const emptyCart = document.getElementById(`emptyText`)


        



      cartButton.addEventListener(`click`, () => {
      superproducts.style.display = `none`

      
      
    
      cartSurface.style.display = `block`

                  if(cartSurface.style.display === `block`) {
        cartButton.style.display=`none`
      } else {
        cartButton.style.display=`block`
      }




      if(details.style.display === `block`) {
        details.style.display = `none`
        cartSurface.style.display = `block`
        
      } 

            if(cart.length === 0) {
            emptyCart.style.display = `block`
      } else {
                    emptyCart.style.display = `none`

      }





  const cartUl = document.getElementById(`UlProducts`);
  cartUl.innerHTML = ``; 

  cart.forEach((element) => {
    const CartLi = document.createElement(`li`);
    CartLi.innerHTML=`    <div id="productCard">

      <img id="productImage" src="${element.thumbnail}" alt="${element.title}">
      <p> ${element.title} </p>
      <p> $ ${element.price} </p>
      <button> remove </button>



      </div>
      
      `

const removeButton = CartLi.querySelector('button');

removeButton.addEventListener('click', () => {
  cart = cart.filter(item => item.id !== element.id);

  localStorage.setItem('myCart', JSON.stringify(cart));

  cartButton.click();
});


    cartUl.append(CartLi);
  });

  
  updateCartAmount()
  TotalRender()
});
      

      



      cartButtonBack.addEventListener(`click`, () => {
              superproducts.style.display = `block`
      
    
      cartSurface.style.display = `none`
              cartButton.style.display=`block`

      })





const productBtn = document.getElementById(`addProductButton`)
const productBack = document.getElementById(`ProductBack`)
const YourOwnProduct = document.querySelector(`.YourOwnProduct`)

      productBtn.addEventListener(`click`, () => {
              superproducts.style.display = `none`
      
    
      YourOwnProduct.style.display = `block`


      })
    

      productBack.addEventListener(`click`, () => {
              superproducts.style.display = `block`
                YourOwnProduct.style.display = `none`  
      })  





LittleShop();




function updateCartAmount() {
      const AmountSign = document.getElementById(`CartAmount`)
      const AmountCart = cart.length
      AmountSign.textContent =`Amount : ${AmountCart}`
}




const CartTotal = document.getElementById(`CartTotal`)
let total = 0

function TotalRender() {
  total = 0
  for(let i = 0; i < cart.length;i++) {

    total = Math.ceil(total + cart[i].price)

    


  }

      CartTotal.textContent = `total = $${total}`
}



const productForm = document.getElementById('productForm');

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const emailInput = document.getElementById('email');
  const descriptionInput = document.getElementById('description');
  const submitButton = document.getElementById('addProductbtn');
  const formMessage = document.getElementById('formMessage');

  const nameError = document.getElementById('nameError');
  const priceError = document.getElementById('priceError');
  const emailError = document.getElementById('emailError');
  const descriptionError = document.getElementById('descriptionError');


  nameError.textContent = '';
  priceError.textContent = '';
  emailError.textContent = '';
  descriptionError.textContent = '';
  formMessage.textContent = '';

  let isValid = true;

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const email = emailInput.value.trim();
  const description = descriptionInput.value.trim();

  if (name.length < 2) {
    nameError.textContent = 'Name must contain at least 2 characters.';
    isValid = false;
  }

  if (priceInput.value === '' || !Number.isFinite(price) || price <= 0) {
    priceError.textContent = 'Price must be greater than zero.';
    isValid = false;
  }

  if (!emailInput.validity.valid) {
    emailError.textContent = 'Enter a valid email address.';
    isValid = false;
  }

  if (description.length < 10) {
    descriptionError.textContent =
      'Description must contain at least 10 characters.';
    isValid = false;
  }

  if (!isValid) {
    formMessage.textContent = 'Please fix the errors above.';
    return;
  }

  submitButton.disabled = true;
  formMessage.textContent = 'Sending product...';

  try {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: name,
        price: price,
        description: description,
        email: email
      })
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();

    formMessage.textContent =
      `Product "${data.title}" created successfully. ID: ${data.id}`;

    productForm.reset();
  } catch (error) {
    console.error(error);
    formMessage.textContent =
      'Could not create the product. Please try again.';
  } finally {
    submitButton.disabled = false;
  }
});
