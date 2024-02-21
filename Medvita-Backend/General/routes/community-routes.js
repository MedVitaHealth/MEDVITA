const express = require('express'); 

const checkAuth = require('../middlewares/check-auth');
const communityController = require('../controllers/community-controller');

const router = express.Router();



// -----------------------Routes-----------------------//

router.use(checkAuth);

// new post
router.post('/new-post', communityController.newPost);

// get posts
router.get('/get-posts/:community', communityController.getPosts);

// add up vote
router.patch('/add-up-vote/:postId', communityController.addUpVotes);

// remove up vote
router.patch('/remove-up-vote/:postId', communityController.removeUpVotes);


// Exporting
module.exports = router;