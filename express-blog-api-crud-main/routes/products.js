const express = require(`express`)
const router = express.Router()
const controller = require(`../controllers/controller`)


router.get(`/`, controller.index)

router.get(`/:id`, controller.Show)

router.post(`/`, controller.Store)

router.put(`/:id`, controller.Update)

router.patch(`/:id`, controller.Modify)

router.delete(`/:id`, controller.Delete)

module.exports = router


