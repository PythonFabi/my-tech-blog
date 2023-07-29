const newPost = async (event) => {
    event.preventDefault();

    const contents = document.querySelector('#newContent').value.trim();
    const title = document.querySelector('#newTitle').value.trim();

    if(contents && title) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog');
        }
    }
};