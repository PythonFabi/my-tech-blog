const router = require('express').Router();
const { Blog } = require('../../models/BlogPost');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        console.log(blogData)
        res.render('blog', blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        console.log(blogData);
        const blog = blogData.get({ plain: true });
        res.render('blog', blog);
    } catch (err) {
        res.status(500).json(err);
    }
});