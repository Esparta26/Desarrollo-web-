const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookies = require("cookie-parser");
const bcrypt = require("bcryptjs");
const db = require('./models');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(cookies());
app.use(
  session({
    secret: "SecretoSuperSeguroDeStyleHub",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(async (req, res, next) => {
  if (!req.session.userLogged && req.cookies.userEmail) {
    try {
      const usuarioRecordado = await db.User.findOne({ 
        where: { email: req.cookies.userEmail } 
      });
      
      if (usuarioRecordado) {
        let userToSession = usuarioRecordado.toJSON();
        delete userToSession.password;
        req.session.userLogged = userToSession;
      }
    } catch (error) {
      console.error("Error leyendo cookie:", error);
    }
  }
  next();
});

app.use((req, res, next) => {
  res.locals.userLogged = req.session.userLogged || null;
  next();
});

const authMiddleware = (req, res, next) => {
  if (!req.session.userLogged) {
    return res.redirect("/");
  }
  next();
};

const guestMiddleware = (req, res, next) => {
  if (req.session.userLogged) {
    return res.redirect("/home");
  }
  next();
};

app.get("/", guestMiddleware, (req, res) => {
  res.render("login", { errors: [] });
});

app.get("/register", guestMiddleware, (req, res) => {
  res.render("register", { errors: [] });
});

app.get("/login", guestMiddleware, (req, res) => {
  res.redirect("/"); 
});

app.post("/login", guestMiddleware, async (req, res) => {
  try {
    const { email, password, remember } = req.body;
    const userToLogin = await db.User.findOne({ where: { email: email } });

    if (userToLogin) {
      const isPasswordOk = bcrypt.compareSync(password, userToLogin.password);
      
      if (isPasswordOk) {
        let userToSession = userToLogin.toJSON();
        delete userToSession.password; 
        req.session.userLogged = userToSession;

        if (remember) {
          res.cookie("userEmail", userToSession.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
        }
        return res.redirect("/home");
      }
    }
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

app.post("/register", guestMiddleware, async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.User.create({
      full_name: fullName, 
      email: email,
      password: hashedPassword
    });

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/register");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("userEmail");
  req.session.destroy();
  res.redirect("/");
});

app.get("/profile", authMiddleware, (req, res) => {
  res.render("profile");
});

app.get("/home", authMiddleware, async (req, res) => {
  try {
    const productos = await db.Product.findAll();
    res.render("index", { items: productos });
  } catch (error) {
    console.error(error);
    res.send("Error cargando el catálogo");
  }
});

app.get("/productCart", authMiddleware, (req, res) => {
  res.render("productCart");
});

app.get("/productDetail/:id", authMiddleware, async (req, res) => {
  try {
    const producto = await db.Product.findByPk(req.params.id);
    if (!producto) return res.send("Producto no encontrado");
    res.render("productDetail", { producto });
  } catch (error) {
    console.error(error);
  }
});

app.get("/create", authMiddleware, (req, res) => {
  res.render("products/create", { errors: [] });
});

app.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, price, img, description, category, size } = req.body;

    const slug = name.toLowerCase().replace(/ /g, '-');

    await db.Product.create({
      name,
      price: Number(price),
      img,
      description,
      slug,
      category_id: category || null,
      size_id: size || null
    });

    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.send("Error al crear el producto");
  }
});

app.get("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const producto = await db.Product.findByPk(req.params.id);
    if (!producto) return res.send("Producto no encontrado");
    res.render("products/edit", { product: producto });
  } catch (error) {
    console.error(error);
  }
});

app.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { name, price, img, description, category, size } = req.body;
    
    await db.Product.update({
      name,
      price: Number(price),
      img,
      description,
      category_id: category || null,
      size_id: size || null
    }, {
      where: { id: req.params.id }
    });

    res.redirect("/home");
  } catch (error) {
    console.error(error);
  }
});

app.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await db.Product.destroy({
      where: { id: req.params.id }
    });
    res.redirect("/home");
  } catch (error) {
    console.error(error);
  }
});

db.sequelize.authenticate()
  .then(() => {
    console.log('¡Conexión a MySQL (stylehub_db) establecida con éxito! 🚀');
  })
  .catch(err => {
    console.error('Error fatal: No se pudo conectar a la base de datos:', err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 StyleHub activo en http://localhost:${PORT}`);
});