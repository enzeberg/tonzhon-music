const router = require('express').Router();
const search = require('../controllers/api/search');
const getSongSource = require('../controllers/api/song_source');
const getHotList = require('../controllers/api/hot_list');

router.get('/search', search);
router.get('/song_source/:platform/:originalId', getSongSource);
router.get('/hot_list/:platform', getHotList);

module.exports = router;
