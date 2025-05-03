var mysql = require('mysql2');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(expressLayouts);
app.set('layout', 'layouts/main'); // The default layout file

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// redirect for testing
app.get('/', (req, res) => {
    connection.query('SELECT * FROM User', (err, users) => {
        if (err) throw err;
        res.render('test.ejs', {users});
    });
});


// Search --------------------------------------------------------------------------

app.get('/', (req, res) => {
    connection.query('SELECT * FROM User', (err, users) => {
        if (err) throw err;
        res.render('test.ejs', {users});
    });
});


// Browse functionality
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// users CRUD -----------------------------------------------------------------------------------------------

// login and permissions setup :)


// Read functionality - displays list of all users - for admin only
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create/Insert functionality
/*app.post('/users', (req, res) => {
    const user = req.body;
    var sql = "INSERT INTO User (Email, Password, Classification) VALUES ('" + user.Email + "', '" + user.Password + "', '" + user.Classification + "')";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...user });
    });
});*/

// create that checks if there is a duplicate account and warned you if there isn't.
// creates user account
const checkSql = "SELECT * FROM User WHERE Email = ?";
connection.query(checkSql, [user.Email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
        return res.status(409).json({ message: 'User already exists. Try again.' });
    }
    
    // Now safe to insert
    app.post('/users', (req, res) => {
        const user = req.body;
        var sql = "INSERT INTO User (Email, Password, Classification) VALUES ('" + user.Email + "', '" + user.Password + "', '" + user.Classification + "')";
        connection.query(sql, (err, results) => {
            if (err) throw err;
            res.json({ id: results.insertId, ...user });
        });
    });

});

// Update functionality - wait on jacob
app.put('/users/:id', (req, res) => {
    const user = req.body;
    connection.query('UPDATE User SET ? WHERE id = ?', [user, req.params.id], (err, results) => {
        if (err) throw err;
        res.json({ id: req.params.id, ...user });
    });
});

// Delete functionality - deletes user account
app.delete('/users/:id', (req, res) => {
    var sql = "DELETE FROM User WHERE id = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Customer dashboard functionality
// create, read self info, update info, and delete account (all in user functionality)

// Seller dashboard functionality
// has all user functionality but can also create, read, update and delete their own products

// checks if a duplicate product exists, sends warning if it does.
// creates a new product - work on this!
// THIS MIGHT NOT BE CORRECT COMPLETELY TO JACOB'S STUFF - just something i found/made
// please tweak
const checkProductSql = "SELECT * FROM Products WHERE ProductID = ?";
connection.query(checkProductSql, [products.ProductID], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
        return res.status(409).json({ message: 'Product already exists. Try again.' });
    }
    
    // Now safe to insert
    const insertSql = "INSERT INTO Products (ProductID, Name, Description, Category, SellerID, SellerBrand, Quantity) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(insertSql, [products.ProductID, products.Name, products.Description], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId, ...user });
    });
});

// Reads and displays all of the seller's products.
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Deletes a specific product
app.delete('/products/:id', (req, res) => {
    var sql = "DELETE FROM Products WHERE ProductID = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Admin dashboard functionality

// Read functionality - displays list of all users - for admin only
app.adminUserGet('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Delete functionality - delete a user's account upon request
app.adminProductDelete('/users/:id', (req, res) => {
    var sql = "DELETE FROM User WHERE id = '" + req.params.id + "'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Reads and displays all products for monitoring
app.adminProductGet('/products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Connections
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Make session data available to all views
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isAuthenticated || false;
    res.locals.userRole = req.session.userRole || null;
    res.locals.userName = req.session.userName || null;
    res.locals.cart = req.session.cart || [];
    res.locals.wishlist = req.session.wishlist || [];
    next();
});

// Database connection
var connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'asdlfkj12345',
    password: 'drghudla',
    database: 'asdlfkj12345'
});

connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
};

const hasRole = (roles) => {
    return (req, res, next) => {
        if (req.session.isAuthenticated && roles.includes(req.session.userRole)) {
            return next();
        }
        res.status(403).render('pages/error', { message: 'Access Denied' });
    };
};

// Configure multer storage -- this allows for seller to upload their own images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/images/products'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, 'product-' + uniqueSuffix + extension);
    }
  });
  
  // Create upload middleware
  const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Not an image! Please upload an image.'), false);
      }
    }
  });
  
  // Make sure the upload directory exists
  const uploadDir = path.join(__dirname, 'public/images/products');
  if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir, { recursive: true });
  }  


// Home routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM Products WHERE Featured = 1 AND IsListed = 1 LIMIT 4', (err, featuredProducts) => {
        if (err) {
            console.error('Error fetching featured products:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        res.render('pages/home', { featuredProducts });
    });
});


// Browse functionality
app.get('/inventory', (req, res) => {
    // Get filter parameters from query string
    const searchTerm = req.query.search || '';
    const categoryFilter = req.query.category || '';
    const brandFilter = req.query.brand || '';
    const priceRange = parseInt(req.query.price || 200);
    
    // Build query with filters and ensure IsListed = 1
    let query = 'SELECT * FROM Products WHERE IsListed = 1';
    const queryParams = [];
    
    if (searchTerm) {
      query += ' AND (Name LIKE ? OR Description LIKE ?)';
      queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }
    
    if (categoryFilter) {
      // Use exact matching for category
      query += ' AND Category = ?';
      queryParams.push(categoryFilter);
    }
    
    if (brandFilter) {
      query += ' AND SellerBrand LIKE ?';
      queryParams.push(`%${brandFilter}%`);
    }
    
    query += ' AND Price <= ?';
    queryParams.push(priceRange);
    
    connection.query(query, queryParams, (err, products) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).render('pages/error', { message: 'Database error' });
      }
      
      res.render('pages/inventory', {
        products,
        searchTerm,
        categoryFilter,
        brandFilter,
        priceRange
      });
    });
  });

// Product detail page
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const userId = req.session.userId || null;
    const userRole = req.session.userRole || null;
    
    // First, get the product
    connection.query('SELECT * FROM Products WHERE ProductID = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.render('pages/product', { product: null });
        }
        
        const product = results[0];
        
        // Check if product is listed or if the user is the seller/admin
        const isOwnerOrAdmin = (userId && product.SellerID === userId) || (userRole === 'admin');
        
        if (!product.IsListed && !isOwnerOrAdmin) {
            return res.status(404).render('pages/error', { message: 'Product not available' });
        }
        
        // If product is unlisted, add a notice
        let notice = null;
        if (!product.IsListed && isOwnerOrAdmin) {
            notice = 'This product is currently unlisted and not visible to customers.';
        }
        
        res.render('pages/product', { 
            product,
            query: req.query,
            notice
        });
    });
});


// Add to cart
app.post('/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    // Get product details from database
    connection.query('SELECT * FROM Products WHERE ProductID = ?', [productId], (err, results) => {
        if (err) throw err;
        
        if (results.length === 0) {
            return res.status(404).render('pages/error', { message: 'Product not found' });
        }
        
        const product = results[0];
        const cartItemId = `${productId}`;
        
        // Initialize cart in session if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = [];
        }
        
        // Check if item already exists in cart
        const existingItemIndex = req.session.cart.findIndex(item => item.cartItemId === cartItemId);
        
        if (existingItemIndex > -1) {
            // Update quantity if item exists
            req.session.cart[existingItemIndex].quantity += parseInt(quantity);
        } else {
            // Add new item to cart
            req.session.cart.push({
                cartItemId,
                productId: product.ProductID,
                name: product.Name,
                price: parseFloat(product.Price),
                imageUrl: product.ImageUrl,
                quantity: parseInt(quantity)
            });
        }
        
        // Redirect back to product page with success message
        res.redirect(`/product/${productId}?added=1`);
    });
});

// Update cart quantity
app.post('/cart/update-quantity', (req, res) => {
    const { cartItemId, action } = req.body;
    
    if (!req.session.cart) {
        req.session.cart = [];
    }
    
    const existingItemIndex = req.session.cart.findIndex(item => item.cartItemId === cartItemId);
    
    if (existingItemIndex > -1) {
        if (action === 'increase') {
            req.session.cart[existingItemIndex].quantity += 1;
        } else if (action === 'decrease') {
            if (req.session.cart[existingItemIndex].quantity > 1) {
                req.session.cart[existingItemIndex].quantity -= 1;
            } else {
                // Remove item if quantity would become 0
                req.session.cart.splice(existingItemIndex, 1);
            }
        }
    }
    
    res.redirect('/cart');
});

// Remove from cart
app.post('/cart/remove', (req, res) => {
    const { cartItemId } = req.body;
    
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.cartItemId !== cartItemId);
    }
    
    res.redirect('/cart');
});

// Cart page
app.get('/cart', (req, res) => {
    // Calculate total price
    const totalPrice = (req.session.cart || []).reduce(
        (total, item) => total + item.price * item.quantity, 
        0
    ).toFixed(2);
    
    res.render('pages/cart', {
        cart: req.session.cart || [],
        wishlist: req.session.wishlist || [],
        totalPrice
    });
});

// Wishlist routes
app.post('/wishlist/add', (req, res) => {
    const { productId } = req.body;
    
    // Get product details from database
    connection.query('SELECT * FROM Products WHERE ProductID = ?', [productId], (err, results) => {
        if (err) throw err;
        
        if (results.length === 0) {
            return res.status(404).render('pages/error', { message: 'Product not found' });
        }
        
        const product = results[0];
        const wishlistItemId = `${productId}`;
        
        // Initialize wishlist in session if it doesn't exist
        if (!req.session.wishlist) {
            req.session.wishlist = [];
        }
        
        // Check if item already exists in wishlist
        const existingItemIndex = req.session.wishlist.findIndex(item => item.wishlistItemId === wishlistItemId);
        
        if (existingItemIndex === -1) {
            // Add new item to wishlist
            req.session.wishlist.push({
                wishlistItemId,
                productId: product.ProductID,
                name: product.Name,
                price: parseFloat(product.Price),
                imageUrl: product.ImageUrl
            });
        }
        
        // Redirect back to product page with success message
        res.redirect(`/product/${productId}?wishlisted=1`);
    });
});

// Remove from wishlist
app.post('/wishlist/remove', (req, res) => {
    const { wishlistItemId } = req.body;
    
    if (req.session.wishlist) {
        req.session.wishlist = req.session.wishlist.filter(item => item.wishlistItemId !== wishlistItemId);
    }
    
    res.redirect('/cart');
});

// Move from wishlist to cart
app.post('/wishlist/move-to-cart', (req, res) => {
    const { wishlistItemId } = req.body;
    
    if (req.session.wishlist) {
        const item = req.session.wishlist.find(item => item.wishlistItemId === wishlistItemId);
        
        if (item) {
            // Add to cart
            if (!req.session.cart) {
                req.session.cart = [];
            }
            
            const cartItemId = `${item.productId}`;
            const existingItemIndex = req.session.cart.findIndex(cartItem => cartItem.cartItemId === cartItemId);
            
            if (existingItemIndex > -1) {
                // Update quantity if item exists
                req.session.cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                req.session.cart.push({
                    cartItemId,
                    productId: item.productId,
                    name: item.name,
                    price: item.price,
                    imageUrl: item.imageUrl,
                    quantity: 1
                });
            }
            
            // Remove from wishlist
            req.session.wishlist = req.session.wishlist.filter(wishlistItem => wishlistItem.wishlistItemId !== wishlistItemId);
        }
    }
    
    res.redirect('/cart');
});

// Checkout page
app.get('/checkout', isAuthenticated, (req, res) => {
    // Check if cart is empty
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.redirect('/cart');
    }
    
    // Calculate total price
    const totalPrice = req.session.cart.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
    ).toFixed(2);
    
    res.render('pages/checkout', {
        cart: req.session.cart,
        totalPrice
    });
});

// Process order
app.post('/checkout', isAuthenticated, (req, res) => {
    const { name, address, phone, paymentMethod } = req.body;
    
    // Validation
    if (!name || !address || !phone || !paymentMethod) {
        const totalPrice = req.session.cart.reduce(
            (total, item) => total + item.price * item.quantity, 
            0
        ).toFixed(2);
        
        return res.render('pages/checkout', {
            error: 'Please fill in all required fields',
            cart: req.session.cart,
            totalPrice
        });
    }
    
    // Process order (to be completed)?
    //
    
    // Clear cart after successful order
    req.session.cart = [];
    
    // Redirect to confirmation page
    res.redirect('/order-confirmation');
});

// Order confirmation page
app.get('/order-confirmation', isAuthenticated, (req, res) => {
    res.render('pages/order-confirmation');
});

// Authentication routes
app.get('/login', (req, res) => {
    // Redirect if already logged in
    if (req.session.isAuthenticated) {
        return res.redirect('/profile');
    }
    
    res.render('pages/login', { error: null });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    connection.query('SELECT * FROM User WHERE Email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).render('pages/login', { error: 'Database error' });
        }
        
        if (results.length > 0) {
            const user = results[0];
            // In production, use bcrypt for password comparison
            if (password === user.Password) {
                // Set up session
                req.session.isAuthenticated = true;
                req.session.userId = user.id;
                req.session.userRole = user.Classification;
                req.session.userName = email.split('@')[0]; // Simple name extraction
                
                // Redirect based on user role
                if (user.Classification === 'seller') {
                    return res.redirect('/seller');
                } else if (user.Classification === 'admin') {
                    return res.redirect('/admin');
                } else {
                    return res.redirect('/profile');
                }
            }
        }
        
        // Failed login
        res.render('pages/login', { error: 'Invalid email or password' });
    });
});

app.get('/signup', (req, res) => {
    // Redirect if already logged in
    if (req.session.isAuthenticated) {
        return res.redirect('/profile');
    }
    
    res.render('pages/signup', { error: null });
});

app.post('/signup', (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    
    // Basic validation
    if (!name || !email || !password || password !== confirmPassword) {
        return res.render('pages/signup', { 
            error: password !== confirmPassword ? 'Passwords do not match' : 'Please fill in all fields'
        });
    }
    
    // Check if user already exists
    connection.query('SELECT * FROM User WHERE Email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error during signup:', err);
            return res.status(500).render('pages/signup', { error: 'Database error' });
        }
        
        if (results.length > 0) {
            return res.render('pages/signup', { error: 'User already exists. Try again.' });
        }
        
        // Create user
        const sql = "INSERT INTO User (Email, Password, Classification) VALUES (?, ?, ?)";
        connection.query(sql, [email, password, role || 'user'], (err, results) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).render('pages/signup', { error: 'Error creating user' });
            }
            
            // Redirect to login page
            res.redirect('/login');
        });
    });
});

app.post('/logout', (req, res) => {
    // Clear session
    req.session.destroy();
    res.redirect('/');
});

// User profile routes
app.get('/profile', isAuthenticated, (req, res) => {
    res.render('pages/profile', { 
        userName: req.session.userName,
        userRole: req.session.userRole
    });
});

app.post('/profile/update', isAuthenticated, (req, res) => {
    const { name } = req.body;
    
    // Update user name in session
    req.session.userName = name;
    
    // No functionality
    
    res.redirect('/profile');
});

app.post('/profile/delete', isAuthenticated, (req, res) => {
    
    // No functionality, will need to account for sellers' products
    // Clear session
    req.session.destroy();
    res.redirect('/');
});

// Seller dashboard routes
app.get('/seller', isAuthenticated, hasRole(['seller', 'admin']), (req, res) => {
    const sellerId = req.session.userId;
    
    // Get seller's products
    connection.query('SELECT * FROM Products WHERE SellerID = ?', [sellerId], (err, products) => {
      if (err) {
        console.error('Error fetching seller products:', err);
        return res.status(500).render('pages/error', { message: 'Database error' });
      }
      
      // Calculate estimated sales with a more realistic algorithm
      let totalSales = 0;
      
      res.render('pages/seller-dashboard', {
        products,
        totalSales,
        error: req.query.error || null,
        success: req.query.success || null
      });
    });
  });
  
  // Update product listing status
  app.post('/seller/toggle-listing', isAuthenticated, hasRole(['seller', 'admin']), (req, res) => {
    const { productId } = req.body;
    const sellerId = req.session.userId;
    
    // Check if product belongs to seller
    connection.query(
      'SELECT * FROM Products WHERE ProductID = ? AND SellerID = ?',
      [productId, sellerId],
      (err, results) => {
        if (err) {
          console.error('Error toggling product listing:', err);
          return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        if (results.length === 0) {
          return res.status(403).render('pages/error', { message: 'Unauthorized: This product does not belong to you' });
        }
        
        const product = results[0];
        const newListedStatus = !product.IsListed;
        
        // Update product status
        connection.query(
          'UPDATE Products SET IsListed = ? WHERE ProductID = ?',
          [newListedStatus, productId],
          (err) => {
            if (err) {
              console.error('Error updating product status:', err);
              return res.status(500).render('pages/error', { message: 'Database error' });
            }
            
            const statusMessage = newListedStatus ? 'Product is now listed.' : 'Product has been unlisted.';
            res.redirect(`/seller?success=${encodeURIComponent(statusMessage)}`);
          }
        );
      }
    );
  });


  
  // Delete product route
  app.post('/seller/delete-product', isAuthenticated, hasRole(['seller', 'admin']), (req, res) => {
    const { productId } = req.body;
    const sellerId = req.session.userId;
    
    // Check if product belongs to seller
    connection.query(
      'SELECT * FROM Products WHERE ProductID = ? AND SellerID = ?',
      [productId, sellerId],
      (err, results) => {
        if (err) {
          console.error('Error deleting product:', err);
          return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        if (results.length === 0) {
          return res.status(403).render('pages/error', { message: 'Unauthorized: This product does not belong to you' });
        }
        
        // Delete the product
        connection.query(
          'DELETE FROM Products WHERE ProductID = ?',
          [productId],
          (err) => {
            if (err) {
              console.error('Error deleting product:', err);
              return res.status(500).render('pages/error', { message: 'Database error' });
            }
            
            res.redirect('/seller?success=Product+has+been+deleted.');
          }
        );
      }
    );
  });
  
  // Edit product route
  // Route to display the edit product page
app.get('/seller/edit-product/:id', isAuthenticated, hasRole(['seller', 'admin']), (req, res) => {
  const productId = req.params.id;
  const sellerId = req.session.userId;
  
  // Verify product ownership
  connection.query(
    'SELECT * FROM Products WHERE ProductID = ? AND SellerID = ?',
    [productId, sellerId],
    (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        return res.status(500).render('pages/error', { message: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.status(403).render('pages/error', { 
          message: 'Unauthorized: This product does not belong to you or does not exist' 
        });
      }
      
      const product = results[0];
      res.render('pages/edit-product', { product, error: null });
    }
  );
});

// Route to process the product edit form submission
app.post('/seller/edit-product', isAuthenticated, hasRole(['seller', 'admin']), upload.single('image'), (req, res) => {
  try {
    const 
    { 
      productId,
      name, 
      price, 
      description, 
      category, 
      brand, 
      quantity, 
      featured 
    } = req.body;
    
    const sellerId = req.session.userId;
    
    // Basic validation
    if (!name || !price || !description) 
        {
      // Fetch the product again to redisplay the form with error
      connection.query(
        'SELECT * FROM Products WHERE ProductID = ? AND SellerID = ?',
        [productId, sellerId],
        (err, results) => {
          if (err || results.length === 0) 
            {
            return res.status(500).render('pages/error', { message: 'Could not validate product' });
          }
          
          return res.render('pages/edit-product', { 
            product: results[0], 
            error: 'Please fill in all required fields' 
          });
        }
      );
      return;
    }
    
    // Verify product ownership before updating
    connection.query(
      'SELECT * FROM Products WHERE ProductID = ? AND SellerID = ?',
      [productId, sellerId],
      (err, results) => 
        {
        if (err) {
          console.error('Error editing product:', err);
          return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        if (results.length === 0) {
          return res.status(403).render('pages/error', { message: 'Unauthorized: This product does not belong to you' });
        }
        
        const currentProduct = results[0];
        
        // Determine image path
        let imagePath = currentProduct.ImageUrl; // Keep existing image by default
        if (req.file) {
          imagePath = `/images/products/${req.file.filename}`;
        }
        
        // Update product
        const sql = `
          UPDATE Products 
          SET Name = ?, Price = ?, Description = ?, ImageUrl = ?, 
              Category = ?, SellerBrand = ?, Quantity = ?, Featured = ?
          WHERE ProductID = ?
        `;
        
        const isFeatured = featured === '1' ? 1 : 0;
        
        connection.query(
          sql,
          [
            name,
            price,
            description,
            imagePath,
            category || currentProduct.Category,
            brand || currentProduct.SellerBrand,
            quantity || currentProduct.Quantity,
            isFeatured,
            productId
          ],
          (err) => {
            if (err) {
              console.error('Error updating product:', err);
              return res.status(500).render('pages/error', { message: 'Database error' });
            }
            
            res.redirect('/seller?success=Product+updated+successfully');
          }
        );
      }
    );
  } catch (error) {
    console.error('Error in edit-product route:', error);
    res.status(500).render('pages/error', { message: 'An error occurred while processing your request' });
  }
});

app.post('/seller/add-product', isAuthenticated, hasRole(['seller', 'admin']), upload.single('image'), (req, res) => {
    try {
      const { 
        name, 
        price, 
        description, 
        category, 
        brand, 
        quantity, 
        featured 
      } = req.body;
      
      const sellerId = req.session.userId;
      
      // Set image path - either from uploaded file or default
      let imagePath = '/images/default-product.jpg';
      if (req.file) {
        imagePath = `/images/products/${req.file.filename}`;
      }
      
      // Basic validation
      if (!name || !price || !description) {
        // Get seller's products for re-rendering the page
        connection.query('SELECT * FROM Products WHERE SellerID = ?', [sellerId], (err, products) => {
          if (err) {
            console.error('Error fetching seller products:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
          }
          
          let totalSales = 0;
          products.forEach(product => {
            if (product.IsListed) {
              totalSales += parseFloat(product.Price) * Math.random() * 5;
            }
          });
          
          return res.render('pages/seller-dashboard', { 
            error: 'Please fill in all required fields',
            products,
            totalSales: totalSales.toFixed(2)
          });
        });
        return;
      }
      
      // Default values and type conversions
      const productCategory = category || 'Shoes';
      const productBrand = brand || 'Generic Brand';
      const productQuantity = quantity || 100;
      const isFeatured = featured === '1' ? 1 : 0;
      
      // Create product
      const sql = `
        INSERT INTO Products 
        (Name, Price, Description, ImageUrl, SellerID, IsListed, Featured, Category, 
         SellerBrand, Quantity) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      connection.query(
        sql, 
        [
          name, 
          price, 
          description, 
          imagePath, 
          sellerId, 
          1, // IsListed (default to true)
          isFeatured,
          productCategory, 
          productBrand, 
          productQuantity
        ],
        (err, result) => {
          if (err) {
            console.error('Error creating product:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
          }
          
          res.redirect('/seller');
        }
      );
    } catch (error) {
      console.error('Error in add-product route:', error);
      res.status(500).render('pages/error', { message: 'An error occurred while processing your request' });
    }
  });
  
  // Simplified product detail route - no parsing of JSON values needed
  app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    connection.query('SELECT * FROM Products WHERE ProductID = ?', [productId], (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        return res.status(500).render('pages/error', { message: 'Database error' });
      }
      
      if (results.length === 0) {
        return res.render('pages/product', { product: null });
      }
      
      // Get the product data
      const product = results[0];
      
      // Make the query string available to the template
      res.render('pages/product', { 
        product,
        query: req.query
      });
    });
  });

// Admin routes
app.get('/admin', isAuthenticated, hasRole(['admin']), (req, res) => {
    res.render('pages/admin/dashboard');
});

app.get('/admin/users', isAuthenticated, hasRole(['admin']), (req, res) => {
    connection.query('SELECT * FROM User', (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        res.render('pages/admin/users', { users });
    });
});

app.post('/admin/users/delete', isAuthenticated, hasRole(['admin']), (req, res) => {
    const { userId } = req.body;
    
    connection.query('DELETE FROM User WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        res.redirect('/admin/users');
    });
});

app.get('/admin/products', isAuthenticated, hasRole(['admin']), (req, res) => {
    connection.query('SELECT * FROM Products', (err, products) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        res.render('pages/admin/products', { products });
    });
});

// Add admin toggle product listing route
app.post('/admin/products/toggle-listing', isAuthenticated, hasRole(['admin']), (req, res) => {
    const { productId } = req.body;
    
    connection.query('SELECT * FROM Products WHERE ProductID = ?', [productId], (err, results) => {
        if (err) {
            console.error('Error toggling product listing:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        if (results.length === 0) {
            return res.status(404).render('pages/error', { message: 'Product not found' });
        }
        
        const product = results[0];
        const newListedStatus = !product.IsListed;
        
        connection.query(
            'UPDATE Products SET IsListed = ? WHERE ProductID = ?',
            [newListedStatus, productId],
            (err) => {
                if (err) {
                    console.error('Error updating product status:', err);
                    return res.status(500).render('pages/error', { message: 'Database error' });
                }
                
                res.redirect('/admin/products');
            }
        );
    });
});

// Add admin delete product route
app.post('/admin/products/delete', isAuthenticated, hasRole(['admin']), (req, res) => {
    const { productId } = req.body;
    
    connection.query('DELETE FROM Products WHERE ProductID = ?', [productId], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).render('pages/error', { message: 'Database error' });
        }
        
        res.redirect('/admin/products');
    });
});

// Error page
app.use((req, res) => {
    res.status(404).render('pages/error', { message: 'Page not found' });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
