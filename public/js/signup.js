document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                header: {
                    'Content-Type': 'application/json',
                },
            });

            if(!response.ok) {
                throw new Error('Error creating user.');
            }

            window.location.replace('/login');
        } catch (err) {
            console.error(err);
        }
    });
});