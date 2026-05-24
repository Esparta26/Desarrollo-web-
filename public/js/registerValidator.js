window.addEventListener('load', () => {
    const form = document.getElementById('registerForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

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

        const errorFullName = document.getElementById('error-fullName');
        if (fullName.value.trim() === '') {
            showError(fullName, errorFullName, 'El nombre completo es obligatorio.');
            hasErrors = true;
        } else if (fullName.value.trim().length < 2) {
            showError(fullName, errorFullName, 'El nombre debe tener al menos 2 caracteres.');
        } else {
            clearError(fullName, errorFullName);
        }

        const errorEmail = document.getElementById('error-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            showError(email, errorEmail, 'El correo electrónico es obligatorio.');
            hasErrors = true;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, errorEmail, 'Por favor ingresa un correo electrónico válido.');
            hasErrors = true;
        } else {
            clearError(email, errorEmail);
        }

        const errorPassword = document.getElementById('error-password');
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        
        if (password.value === '') {
            showError(password, errorPassword, 'La contraseña es obligatoria.');
            hasErrors = true;
        } else if (!passwordRegex.test(password.value)) {
            showError(password, errorPassword, 'Debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
            hasErrors = true;
        } else {
            clearError(password, errorPassword);
        }

        if (hasErrors) {
            event.preventDefault();
        }
    });
});