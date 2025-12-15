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
    const cartlist=document.querySelector('.cart-list');
    const carttotal=document.querySelector('.cart-total');
    const cartvalue=document.querySelector('.cart-value');
    const hamburger=document.querySelector('.hamburger');
    const mobilemenu=document.querySelector('.mobile-menu');
    const bars=document.querySelector('.hamburger i');

    carticon.addEventListener('click',()=>carttab.classList.add('cart-tab-active'));
    closebtn.addEventListener('click',()=> carttab.classList.remove('cart-tab-active'));
    hamburger.addEventListener('click',()=>mobilemenu.classList.toggle('mobile-menu-js'));
    hamburger.addEventListener('click',()=>{
      
      bars.classList.toggle('fa-bars')
      bars.classList.toggle('fa-xmark')

    
    });




    let productList=[]
    let cartProduct=[]

    const updateTotal=()=>{

      let totalprice=0;
      let totalquantity=0;

      document.querySelectorAll('.item').forEach(item=>{
        const quantity=parseInt(item.querySelector('.quantity-value').textContent)
        const price= parseFloat((item.querySelector('.item-total').textContent.replace('$','')))
        totalprice += price;
        totalquantity += quantity;
      })

       carttotal.textContent= `$${totalprice.toFixed(2)}`;
       cartvalue.textContent=`${totalquantity}`;
    }


   



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
        const cardbtn=orderCard.querySelector('.add-to-cart-btn')
        cardbtn.addEventListener('click',(e)=>{
          e.preventDefault()
          addtoCart(product);
        
        })
        
      })


    }

    const addtoCart=(product)=>{


      const existingProduct=cartProduct.find(item=>item.id===product.id)
      if (existingProduct){
        alert('Items already in your cart')
        return;
      }

      cartProduct.push(product);

      let quantity=1
      let price=parseFloat(product.price.replace("$",''))



        const cartitem=document.createElement('div')
        cartitem.classList.add('item')
        cartitem.innerHTML=`
          <div class="item-image">
              <img src="${product.image}">
          </div>
          <div > 
              <h4>${product.name}</h4>
              <h4 class="item-total">${product.price}</h4>
          </div>
          <div class="flex m-auto  ">
              <a href="#" class="quantity-btn minus"><i class="fa-solid fa-minus"></i></a>
              <h4 class="quantity-value">1</h4>
              <a href="#" class="quantity-btn plus"><i class="fa-solid fa-plus"></i></a>

          </div>
        
        `
          cartlist.appendChild(cartitem);
          updateTotal();
        
        

        const plusbtn=cartitem.querySelector('.plus')
        const quantityValue=cartitem.querySelector('.quantity-value')
        const itemTotal=cartitem.querySelector('.item-total')
         const minusbtn=cartitem.querySelector('.minus')


        plusbtn.addEventListener('click',(e)=>{
          e.preventDefault()
            quantity++
            quantityValue.textContent=quantity;
            itemTotal.textContent=`$${(price * quantity).toFixed(2)}`;
            updateTotal();
        })

        minusbtn.addEventListener('click',(e)=>{
          e.preventDefault()
           if (quantity>1){
            quantity--
            quantityValue.textContent=quantity;
            itemTotal.textContent=`$${(price *quantity).toFixed(2)}`;
            updateTotal();
          }else{
            cartitem.classList.add('item-slide-out')
            setTimeout(()=>{
             cartitem.remove()
            cartProduct= cartProduct.filter(item=>item.id!==product.id)
            },300)
            updateTotal();
          }
         
          
          
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