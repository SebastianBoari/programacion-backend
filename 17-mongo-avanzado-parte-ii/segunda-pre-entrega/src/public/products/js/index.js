console.log('client up')

document.addEventListener('DOMContentLoaded', function () {
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
  
    quantitySelectors.forEach(selector => {
      const id = selector.getAttribute('data-id');
      const decrementButton = selector.querySelector('.btn-decrement');
      const incrementButton = selector.querySelector('.btn-increment');
      const quantityInput = selector.querySelector('.quantity-input');
  
      decrementButton.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value, 10);
        if (!isNaN(currentValue) && currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
  
      incrementButton.addEventListener('click', function () {
        let currentValue = parseInt(quantityInput.value, 10);
        if (!isNaN(currentValue)) {
          quantityInput.value = currentValue + 1;
        }
      });
    });
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function () {
        const pid = this.getAttribute('data-id');
        const selector = document.querySelector(`.quantity-selector[data-id='${pid}']`);
        const quantityInput = selector.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value, 10);
  
        // Realizar el POST al endpoint
        fetch(`/api/carts/665367f347d017336d871789/product/${pid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: quantity })
        })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            // Redirigir al carrito si el POST fue exitoso
            window.location.href = `/cart/665367f347d017336d871789`;
          } else {
            // Manejar el error si es necesario
            alert('Error al agregar al carrito');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al agregar al carrito');
        });
      });
    });
  });
  