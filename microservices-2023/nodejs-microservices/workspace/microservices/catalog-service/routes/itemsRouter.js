const express = require("express");
const CatalogService = require("../lib/CatalogService");

const router = express.Router();

function createResponse(item) {
  return {
    id: item.id,
    price: item.price,
    sku: item.sku,
    name: item.name
  }
}

router.get('/', async (req, res) => {
  try {
    const items = await CatalogService.getAll()
    return res.json(items.map(createResponse))
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const item = await CatalogService.getOne(req.params.id)

    if (!item) {
      return res.status(404).json({ error: 'Item not found' })
    }

    return res.json(createResponse(item))
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newItem = await CatalogService.create(req.body)
    return res.json(createResponse(newItem))
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await CatalogService.update(req.params.id, req.body)

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' })
    }
    
    return res.json(createResponse(updatedItem))
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deletion = await CatalogService.remove(req.params.id, req.body)

    if (!deletion.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' })
    }
    
    return res.status(204).send()
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router;
