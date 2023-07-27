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

router.get('/blog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        console.log(blogData);
        const blog = blogData.get({ plain: true });
        res.render('blog', blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/dashboard', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({

        })
    } catch (err) {

    }
})