window.addEventListener('load', () => {
    const form = document.getElementById('productForm');
    const name = document.getElementById('name');
    const price = document.getElementById('price');
    const img = document.getElementById('img');
    const description = document.getElementById('description');

    const showError = (input, elementError, message) => {
        elementError.innerText = message;
        elementError.classList.remove('hidden');
        input.classList.add('border-red-500', 'focus:ring-red-500');
    };

    const clearError = (input, elementError) => {
        elementError.innerText = '';
        elementError.classList.add('hidden');
        input.classList.remove('border-red-500', 'focus:ring-red-500');
    };

    form.addEventListener('submit', (event) => {
        let hasErrors = false;

        const errorName = document.getElementById('error-name');
        if (name.value.trim() === '') {
            showError(name, errorName, 'El nombre del producto es obligatorio.');
            hasErrors = true;
        } else if (name.value.trim().length < 5) {
            showError(name, errorName, 'El nombre debe tener al menos 5 caracteres.');
            hasErrors = true;
        } else {
            clearError(name, errorName);
        }

        const errorPrice = document.getElementById('error-price');
        if (price.value.trim() === '' || Number(price.value) <= 0) {
            showError(price, errorPrice, 'Por favor ingresa un precio válido mayor a 0.');
            hasErrors = true;
        } else {
            clearError(price, errorPrice);
        }

        const errorImg = document.getElementById('error-img');
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        
        if (img.value.trim() === '') {
            showError(img, errorImg, 'La URL de la imagen es obligatoria.');
            hasErrors = true;
        } else if (!allowedExtensions.test(img.value.trim().split('?')[0])) { 

            showError(img, errorImg, 'La imagen debe tener un formato válido (.jpg, .jpeg, .png o .gif).');
            hasErrors = true;
        } else {
            clearError(img, errorImg);
        }

        const errorDescription = document.getElementById('error-description');
        if (description.value.trim() === '') {
            showError(description, errorDescription, 'La descripción es obligatoria.');
            hasErrors = true;
        } else if (description.value.trim().length < 20) {
            showError(description, errorDescription, 'La descripción debe tener al menos 20 caracteres.');
            hasErrors = true;
        } else {
            clearError(description, errorDescription);
        }

        if (hasErrors) {
            event.preventDefault();
        }
    });
});