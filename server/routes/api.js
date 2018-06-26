const router = require('express').Router();
const search = require('../controllers/api/search');
const getSongSource = require('../controllers/api/get_song_source');

router.get('/search', search);
router.get('/song_source/:platform/:originalId', getSongSource);

module.exports = router;
