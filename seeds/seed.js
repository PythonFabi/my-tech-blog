const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedData = async () => {
    await sequelize.sync({ force: true });

    const allUsers = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: allUsers[Math.floor(Math.random() * allUsers.length)].isSoftDeleted,
        });
    }

    process.exit(0);
};

seedData();