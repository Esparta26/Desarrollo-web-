const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const productos = [
    { 
        id: 1, 
        name: 'Hoodie Oversize "Street"', 
        price: 120000, 
        img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80' 
    },
    { 
        id: 2, 
        name: 'Jogger Urbano Negro', 
        price: 95000, 
        img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80' 
    },
    { 
        id: 3, 
        name: 'Camiseta Boxy Fit', 
        price: 65000, 
        img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80' 
    },
    { 
        id: 4, 
        name: 'Gorra Trucker Style', 
        price: 45000, 
        img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=300&q=80' 
    }
];

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    res.render('index', { items: productos });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/productCart', (req, res) => {
    res.render('productCart');
});

app.get('/productDetail', (req, res) => {
    res.render('productDetail');
});

app.get('/products/create', (req, res) => {
    res.render('products/create');
});

app.post('/login', (req, res) => {
    console.log('Usuario intentando entrar:', req.body.email);
    res.redirect('/home');
});

app.post('/register', (req, res) => {
    console.log('Nuevo registro:', req.body.fullName);
    res.redirect('/'); 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`🚀 StyleHub activo en http://localhost:${PORT}`);
    console.log('-------------------------------------------');
});