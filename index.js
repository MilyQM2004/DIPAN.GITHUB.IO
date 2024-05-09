let navbar = document.querySelector('.header .navbar');
let menu = document.querySelector('#menu-btn');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let cart = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.add('active');
}

document.querySelector('#close-form').onclick = () =>{
    cart.classList.remove('active');
}
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const cartIcon = document.getElementById('cart-btn');
    let totalPrice = 0;
    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.box');
            const productName = product.querySelector('.content h3').textContent;
            const productPrice = parseFloat(product.querySelector('.content .price').textContent.replace('$', ''));
            const productImageSrc = product.querySelector('.image img').getAttribute('src');

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="fas fa-times"></span>
                <img src="${productImageSrc}" alt="${productName}">
                <div class="content">
                <h3>${productName}</h3>
                <div class="quantity">
                    <input type="number" class="quantity-input" value="1" min="1">
                </div>
                <div class="price">$${productPrice.toFixed(2)}</div>
            </div>`;
            
            cartItemsContainer.appendChild(cartItem);

            totalPrice += productPrice;
            totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
            itemCount++;
            cartIcon.dataset.count = itemCount; // Actualiza el contador del ícono del carrito

            // Agregar un controlador de eventos al campo de entrada de cantidad
            const quantityInput = cartItem.querySelector('.quantity-input');
            quantityInput.addEventListener('change', () => {
                const newQuantity = parseInt(quantityInput.value);
                const itemTotal = productPrice * newQuantity;
                const priceElement = cartItem.querySelector('.price');

                // Actualizar el precio del producto en el carrito
                priceElement.textContent = `$${itemTotal.toFixed(2)}`;

                // Calcular el nuevo total
                let newTotalPrice = 0;
                const cartItems = document.querySelectorAll('.cart-item');
                cartItems.forEach(item => {
                    const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
                    newTotalPrice += itemPrice;
                });

                // Actualizar el total en el contenedor
                totalPriceContainer.textContent = `Total: $${newTotalPrice.toFixed(2)}`;
            });
        });
    });

    // Agregar un controlador de eventos al contenedor del carrito para delegar el clic en los elementos de la cruz
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('fa-times')) {
            const cartItem = event.target.parentElement;
            const priceElement = cartItem.querySelector('.price');
            const productPrice = parseFloat(priceElement.textContent.replace('$', ''));

            totalPrice -= productPrice;
            totalPriceContainer.textContent = `Total: $${totalPrice.toFixed(2)}`;
            itemCount--;
            cartIcon.dataset.count = itemCount; // Actualiza el contador del ícono del carrito

            cartItem.remove();
        }
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.box');
    const productsPerPage = 3; // Cambia este valor según la cantidad de productos que quieras mostrar por página
    let currentPage = 1;

    // Función para mostrar los productos correspondientes a la página actual
    function showProducts(page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        products.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Mostrar la primera página al cargar la página
    showProducts(currentPage);

    // Función para generar los botones de paginación
    function generatePaginationButtons() {
        const totalPages = Math.ceil(products.length / productsPerPage);
        
        const paginationContainer = document.getElementById('pagination-buttons');
        paginationContainer.innerHTML = ''; // Limpiar los botones existentes
        if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', function() {
                currentPage = i;
                showProducts(currentPage);
            });
            paginationContainer.appendChild(button);
          }
        }
    }

    // Generar los botones de paginación al cargar la página
    generatePaginationButtons();
});




var swiper = new Swiper(".home-slider", {
    grabCursor:true,
    loop:true,
    cnteredSlides:true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});




document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generate-invoice-btn').addEventListener('click', function() {
        Swal.fire({
            title: 'Ingrese sus datos',
            html:
                '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
                '<input id="apellido" class="swal2-input" placeholder="Apellido">' +
                '<input id="ruc" class="swal2-input" placeholder="RUC">' +
                '<input id="direccion" class="swal2-input" placeholder="Dirección">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('nombre').value,
                    document.getElementById('apellido').value,
                    document.getElementById('ruc').value,
                    document.getElementById('direccion').value
                ];
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const [nombre, apellido, ruc, direccion] = result.value;
                // Aquí puedes usar los datos ingresados para lo que necesites
                const products = document.querySelectorAll('.box');
                generarPDF(nombre, apellido, ruc, direccion, products);
            }
        });
    });

    function generarPDF(nombre, apellido, ruc, direccion, products) {
        const pdf = new jsPDF();
        pdf.setFontSize(20);
        pdf.text('Factura', 105, 15, { align: 'center' });

        pdf.setFontSize(12);
        pdf.text(`Nombre: ${nombre} ${apellido}`, 20, 30);
        pdf.text(`RUC: ${ruc}`, 20, 40);
        pdf.text(`Dirección: ${direccion}`, 20, 50);
    
        const startY = 60;
        const colNames = ['Nombre', 'Precio'];
        const colWidths = [80, 40];
        const rows = [];
        products.forEach(product => {
            const nombreElement = product.querySelector('.content h3');
            const precioElement = product.querySelector('.content .price');
            if (nombreElement && precioElement) {
                const nombre = nombreElement.textContent;
                const precio = precioElement.textContent;
                rows.push([nombre, precio]);
            }
        });
    
        pdf.autoTable({
            startY,
            head: [colNames],
            body: rows,
            startY: startY + 10,
            theme: 'plain',
            columnStyles: {
                0: { fontStyle: 'bold' },
                1: { halign: 'right' }
            },
            styles: {
                cellPadding: 1,
                fontSize: 10,
                overflow: 'linebreak',
                columnWidth: 'wrap'
            },
            margin: { top: 10 }
        });

        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.text(`Página ${i} de ${pageCount}`, 195, pdf.internal.pageSize.height - 10);
        }
    
        pdf.save('factura.pdf');
    }
});
