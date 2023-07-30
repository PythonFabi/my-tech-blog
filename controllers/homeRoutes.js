const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogs = blogData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username']
                        }
                    ]
                }
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Blog,
                    include: {
                        model: User,
                        as: 'user',
                        attributes: ['username'],
                    }
                }
            ],
        });

        const users = userData.get({ plain: true });

        res.render('dashboard', {
            ...users,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('newBlog', withAuth, async (req, res) => {
    try {
        res.render('newBlog', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.json(err);
    }
});

router.get('/editBlog/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        res.render('editBlog', {
            ...blog,
            logged_in: req.session.logged_in,
            blod_id: blog.id,
        });
    } catch (err) {
        res.json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});


router.get('/logout', (req, res) => {
    console.log(req.session);
    if (req.session.logged_in) {
        req.session.destroy();
    }
     res.redirect('/');
})

router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;