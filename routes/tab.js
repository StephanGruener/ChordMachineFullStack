const express = require('express')
const router = express.Router()

const TabController = require('../controllers/TabController')

router.get('/', TabController.index)
router.post('/create', TabController.store)
router.post('/show', TabController.show)
router.post('/destroyTab', TabController.destroyTab)
router.post('/updateTab', TabController.updateTab)

module.exports = router