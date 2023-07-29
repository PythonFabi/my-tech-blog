const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/put/:id', withAuth, async (req, res) => {
    try {
        const updatedBlog = await Blog.update(
            {
                title: req.body.title, 
                contents: req.body.contents,
            }, 
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        if(updatedBlog[0] === 0) {
            res.status(403).json({ message: "You don't have permission to update this blog post" });
            return;
        }

        res.status(200).json({ message: 'Blog post updated successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!deletedBlog) {
            res.status(403).json({ message: "You don't have permission to delete this blog post." });
            return;
        }

        res.status(200).json({ message: 'Blog post deleted successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
