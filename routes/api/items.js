const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .select('_id value completed')
        // .sort({ date: -1 })
        .then(items => {
            res.json(items);
        });
});

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/', (req, res) => {
    let newItem = new Item({
        value: req.body.value,
        completed: req.body.completed
    });

    newItem
        .save()
        .then(item => {
            const { _id, value, completed } = item;
            res.status(201).json({ _id, value, completed });
        })
        .catch(err => console.log(err));
});

// @route Patch api/items
// @desc Update an item
// @access Public
router.patch('/:id', (req, res) => {
    let updatedItem = {
            value: req.body.value,
            completed: req.body.completed
        },
        id = req.params.id;

    Item.findOneAndUpdate({ _id: id }, updatedItem, { new: true })
        .exec()
        .then(item => {
            const { _id, value, completed } = item;
            res.status(200).json({ _id, value, completed });
        })
        .catch(err => console.log(err));
});

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', (req, res) => {
    const _id = req.params.id;
    Item.findOneAndDelete({ _id })
        .then(item => {
            // let deletedItem = item;
            // Item.find()
            //     .select('_id value completed')
            //     .then(items => {
                    res.status(200).json(item);
                // });
        })
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
