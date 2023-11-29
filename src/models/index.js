const Category = require('./Category');
const Products = require('./Product');
const Image = require('./Image');
const Cart = require('./Cart');
const User = require('./User');
const Purchase = require('./Purchase');


Category.hasMany(Products);
Products.belongsTo(Category);


Products.hasMany(Image);
Image.belongsTo(Products);

Products.hasMany(Cart);
Cart.belongsTo(Products);

User.hasMany(Cart);
Cart.belongsTo(User);

Products.hasMany(Purchase);
Purchase.belongsTo(Products);

User.hasMany(Purchase);
Purchase.belongsTo(User);