const editBlog = async (event) => {
    if(event.target.getAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const name = document.querySelector('#editTitle').value.trim();

        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, contents}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit blog');
        }
    }
}

const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog');
        }
    }
};

document.querySelector('#editBtn').addEventListener('click', editBlog);
document.querySelector('#deletebtn').addEventListener('click', deletePost);
