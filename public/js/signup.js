document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!response.ok) {
                throw new Error('Error creating user.');
            }

            window.location.replace('/');
        } catch (err) {
            console.error(err);
        }
    });
});
