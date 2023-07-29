const createNewComment = async (event) => {
    event.preventDefault();
    
    const blog_id = event.target.getAttribute('data-id');
    const description = document.querySelector('#comment').value.trim();

    if (description) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({description, blog_id}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok) {
            window.location.replace(`/blog/${blog_id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#submitbtn').addEventListener('click', createNewComment);