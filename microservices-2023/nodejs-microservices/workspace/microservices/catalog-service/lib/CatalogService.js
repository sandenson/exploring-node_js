/** @module CatalogService */

// Import the Item model from mongoose
const Item = require("../models/Item");

/**
 * Service class for interacting with the Item catalog
 */
class CatalogService {
  /**
   * Get all items from the database, sorted in descending order by creation time
   * @returns {Promise<Array>} - A promise that resolves to an array of Items
   */
  static async getAll() {
    return Item.find({}).sort({ createdAt: -1 }).exec();
  }

  /**
   * Get a single item from the database
   * @param {string} itemId - The id of the item to retrieve
   * @returns {Promise<Object>} - A promise that resolves to an Item object
   */
  static async getOne(itemId) {
    return Item.findById(itemId).exec();
  }

  /**
   * Create a new item in the database
   * @param {Object} data - The data for the new item
   * @returns {Promise<Object>} - A promise that resolves to the new Item object
   */
  static async create(data) {
    const item = new Item(data);
    return item.save();
  }

  /**
   * Update an existing item in the database
   * @param {string} itemId - The id of the item to update
   * @param {Object} data - The new data for the item
   * @returns {Promise<Object|null>} - A promise that resolves to the updated Item object, or null if no item was found
   */
  static async update(itemId, data) {
    return Item.findByIdAndUpdate(itemId, data, { new: true }).exec();
  }

  /**
   * Remove an item from the database
   * @param {string} itemId - The id of the item to remove
   * @returns {Promise<Object>} - A promise that resolves to the deletion result
   */
  static async remove(itemId) {
    return Item.deleteOne({ _id: itemId }).exec();
  }
}

module.exports = CatalogService;
