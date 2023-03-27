const Tab = require('../models/Tab')

const index = (req, res, next) => {
    Tab.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

const show = (req, res, next) => {
    Tab.find({songID: req.body.songID}).sort({position: 1})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

const store = (req, res, next) => {
    let tab = new Tab({
        accord: req.body.accord,
        length: req.body.length,
        songID: req.body.songID,
        position: req.body.position,
        bpm: req.body.bpm
    })
    tab.save()
    .then(response => {
        res.json({
            message: 'tab added!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

const updateTab = (req, res, next) => {
    let _id = req.body._id

    let updateData = {
        accord: req.body.accord,
        length: req.body.length,
        songID: req.body.songID,
        position: req.body.position
    }

    Tab.findByIdAndUpdate(_id, {$set: updateData})
    .then(() => {
        res.json({
            message: 'Tab updated successfully!'
        })
    })    
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

const destroyTab = (req, res, next) => {
    let _id = req.body._id
    Tab.findByIdAndRemove(_id)
    .then(() => {
        res.json({
            message: 'Tab deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error!'
        })
    })
}

module.exports = {
    index, show, store, updateTab, destroyTab
}