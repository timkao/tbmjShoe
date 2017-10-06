const conn = require('./conn');
const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');

Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Category.hasMany(Product);
Product.belongsTo(Category);
User.hasMany(Order);
Order.belongsTo(User);

const sync = ()=>{
	return conn.sync({ force: true})
}

module.exports = {
  sync,
  models: {
    Product,
    Category,
    User,
    Order,
    LineItem
  }
}