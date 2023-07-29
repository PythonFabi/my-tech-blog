document.addEventListener('DOMContentLoaded', () => {
    const submitCommentBtn = document.getElementById('submit-comment-btn');

    submitCommentBtn.addEventListener('click', async () => {
        const commentText = document.getElementById('comment-text').value.trim();

        if (commentText) {
            try {
                const response = await fetch('/api/comments', {
                    method: 'POST',
                    body: JSON.stringify({ contents: commentText }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error creating comment.');
                }

                window.location.reload();
            } catch (err){
                console.error(err);
            }
        }
    });
});