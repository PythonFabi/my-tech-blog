 const signupForm = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim()
    const password = document.querySelector('#password-signup')

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
 }

 document.querySelector('.signup-form').addEventListener('submit', signupForm);

