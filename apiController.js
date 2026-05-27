const db = require('./models'); 
module.exports = {
    usersList: async (req, res) => {
        try {
            const users = await db.User.findAll();
            
            const usersClean = users.map(user => {
                return {
                    id: user.id,
                    name: user.full_name,
                    email: user.email,
                    detail: `http://localhost:3000/api/users/${user.id}`
                }
            });

            return res.status(200).json({
                count: users.length,
                users: usersClean
            });
        } catch (error) {
            return res.status(500).json({ error: "Error al conectar con la base de datos" });
        }
    },

    userDetail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            return res.status(200).json({
                id: user.id,
                name: user.full_name,
                email: user.email
            });
        } catch (error) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
    },

    productsList: async (req, res) => {
        try {
            const products = await db.Product.findAll();
            
            const countByCategory = {};
            products.forEach(p => {
                if (!countByCategory[p.category_id]) {
                    countByCategory[p.category_id] = 0;
                }
                countByCategory[p.category_id]++;
            });

            const productsClean = products.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    relations: ['category_id', 'size_id'],
                    detail: `http://localhost:3000/api/products/${p.id}`
                }
            });

            return res.status(200).json({
                count: products.length,
                countByCategory: countByCategory,
                products: productsClean
            });
        } catch (error) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
    },

    productDetail: async (req, res) => {
        try {
            const product = await db.Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            return res.status(200).json({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                imgUrl: product.img,
                slug: product.slug,
                category_id: product.category_id,
                size_id: product.size_id
            });
        } catch (error) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
    }
};