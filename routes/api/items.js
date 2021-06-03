const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

//@route    GEt api/items
//@desc     GEt all items
//@access   public
router.get('/', (req, res) => {
    Item
        .find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

//@route    POST api/items
//@desc     POST an item
//@access   public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});


//@route   update api/items
//@desc    update an item
//@access  public
router.patch('/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body.item).then(item => {
        //console.log(item);
    }).catch(err => {
        console.log(err);
    });

});


//@route    DELETE api/items
//@desc     DELETE an item
//@access   public 
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;