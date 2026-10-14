let cart = JSON.parse(localStorage.getItem('myCart')) || []



async function diva() {
 

 const pteg = document.getElementById(`pteg`);
pteg.style.display = `none`
  const details = document.querySelector(`.details`)
const loadtext = document.getElementById(`loadText`)
loadtext.style.display = `block`

const superproducts = document.querySelector(`.superproducts`)
const buttonNext = document.getElementById(`button_next`);
const buttonPrev = document.getElementById(`button_prev`);
const pageNumber = document.getElementById(`PageNumber`)
const diva = document.getElementById(`ourproducts`);
const comeback = document.getElementById(`comeback`);

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

  } catch {
    console.error(`error`)
    loadtext.style.display = `none`
    diva.innerHTML = `
    <li> no internet connection. </li>
    `
    return
  }


let pageAmount = Math.ceil(fullProductList.length / 12)
console.log(pageAmount)


  loadtext.style.display = `none`

  

  render(product);

  const input = document.getElementById(`searchInput`);

  const textvalue = input.value;

  input.addEventListener(`input`, async() => {
    const searchtext = input.value.toLowerCase();

      if (searchtext !== "") {
        buttonNext.style.display = `none`
        buttonPrev.style.display = `none`
        pageNumber.style.display = `none`
        
    } else {

        buttonNext.style.display = `block`
        buttonPrev.style.display = `block`
        pageNumber.style.display = `block`

    }


  if (searchtext === "") return render(product); 
   
    

       const filtered = fullProductList.filter( (item) => 
      item.title.toLowerCase().includes(searchtext)
    ) 











    if (filtered.length === 0) {
      document.getElementById(`pteg`).style.display = `block`;
    } else {
      document.getElementById(`pteg`).style.display = `none`;
    }

    

    render(filtered.slice(0,10));


  });




 
  pteg.style.display = `none`;





  buttonNext.addEventListener(`click`, async () => {
    skip = skip + 12;

    


    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    const data = await res.json();
    product = data.products;
    currectpage = currectpage + 1;
    pageNumber.textContent = `${currectpage}`

    if (currectpage > 1) {
      buttonPrev.disabled = false;
    } else if(currectpage === pageAmount) {
      buttonNext.disabled = true
    }

    if(currectpage === pageAmount) {
  buttonNext.disabled = true
} else {
    buttonNext.disabled = false
}

          if (currectpage > 1) {
        comeback.disabled = false;

      } 


    render(product);
  });

  buttonPrev.addEventListener(`click`, async () => {
    if (currectpage > 1) {
      skip = skip - 12;

      const res = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
      );
      const data = await res.json();
      product = data.products;
      currectpage = currectpage - 1;
    pageNumber.textContent = `${currectpage}`


      if (currectpage === 1) {
        buttonPrev.disabled = true;

      } 

                if (currectpage > 1) {
        comeback.disabled = false;

      } 


      render(product);
    }
  });





comeback.addEventListener(`click`, async () => {
  skip = 0;
  currectpage = 1;
  pageNumber.textContent = `1`;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  const data = await res.json();
  product = data.products;

  render(product);

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





  const cartUl = document.getElementById(`UlProducts`);
  cartUl.innerHTML = ``; 

  cart.forEach((element) => {
    const CartLi = document.createElement(`li`);
    CartLi.textContent = ` ${element.title} —  $ ${element.price} `;
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





      





diva();




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

    total = total + cart[i].price

    


  }

      CartTotal.textContent = `total = $${total}`
}