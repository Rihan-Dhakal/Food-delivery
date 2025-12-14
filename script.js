  var swiper = new Swiper(".mySwiper", {
      loop:true,
    navigation: {
       
        nextEl: "#next",
        prevEl: "#prev",
      },
    });

    const carticon= document.querySelector('.cart-icon');
    const carttab=document.querySelector('.cart-tab');
    const closebtn=document.querySelector('.close-btn');
    const cardList=document.querySelector('.card-list');

    carticon.addEventListener('click',()=>carttab.classList.add('cart-tab-active'));
    closebtn.addEventListener('click',()=> carttab.classList.remove('cart-tab-active'));

    let productList=[]

    const showCarts=()=>{

      productList.forEach(product=>{
        const orderCard = document.createElement('div')
        orderCard.classList.add('order-card')
        orderCard.innerHTML=`
        
          <div class="card-image">
            <img src="${product.image}" >
          </div>
          <h4>${product.name}</h4>
          <h4 class="price">${product.price}</h4>
          <a href="#" class="btn add-to-cart-btn">Add to cart</a>
        `

        cardList.appendChild(orderCard)
        
      })


    }



    const initApp=()=>{

      fetch('products.json').then
      (response=>response.json()).then
      (data=>{
        productList=data;
        showCarts()
      })


    }

    initApp();