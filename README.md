LittleShop

I made a shop app , named Little shop.
LittleShop loads products from [DummyJSON](https://dummyjson.com/) — catalog with pagination, search, sorting, product details with reviews, and a cart saved to localStorage.
You can change your theme to the dark one anytime.


<img width="1919" height="1199" alt="image" src="https://github.com/user-attachments/assets/ceb6990c-bff9-488e-9be5-55ea3dd79680" />

<img width="1919" height="1199" alt="image" src="https://github.com/user-attachments/assets/61c20edf-b8b3-49e8-b326-ca9120249173" />

HOW TO OPEN :
Open `Index.html` in a browser, e.g. via VS Code Live Server.

ENDPOINTS USED :
- GET https://dummyjson.com/products?limit=12&skip=0 — catalog page
- GET https://dummyjson.com/products?limit=0 — all products (for sorting)
- GET https://dummyjson.com/products/search?q=... — search
- GET https://dummyjson.com/products/{id} — product details
- POST https://dummyjson.com/products/add — add a product

WHAT I WOULD IMPROVE :
- UI design ( i would make it more professional)
- Better mobile layout.





