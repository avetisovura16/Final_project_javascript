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

buttonPrev.disabled = true


  let skip = 0; 
  let limit = 30; 
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
    skip = skip + 30;

    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );
    const data = await res.json();
    product = data.products;
    currectpage = currectpage + 1;
    pageNumber.textContent = `${currectpage}`

    if (currectpage > 1) {
      buttonPrev.disabled = false;
    }

    render(product);
  });

  buttonPrev.addEventListener(`click`, async () => {
    if (currectpage > 1) {
      skip = skip - 30;

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

      render(product);
    }
  });








}



      const buttonBack = document.getElementById(`goBackButton`)
      buttonBack.addEventListener(`click`, () => {
        details.style.display = `none`
        superproducts.style.display = `block`
      })







diva();
