const router = require('express').Router();
const Post = require('./models/post');
const Faker = require('faker');
const Pusher = require('pusher');

router.get('/', (req, res) => {
    return res.render('index');
});

router.post('/posts', async (req, res) => {
    const post = await Post.create({ title: Faker.lorem.words(), body: Faker.lorem.paragraph() });
    if (post) {
        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.PUSHER_APP_CLUSTER
        }); 

        pusher.trigger('notifications', 'POST_CREATED', post, req.headers['x-socket-id']);
        return res.status(200).end();
    }
});

router.get('/posts/:id', async (req, res) => {
    console.log(req.params);
    const post = await Post.findById(req.params.id);
    if (post) {
        return res.render('post', { post });
    }
});

module.exports = router;