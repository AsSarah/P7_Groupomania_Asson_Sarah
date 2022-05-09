const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const likeRoute = require("./routes/likes");
const comsRoute = require("./routes/commentaires");
const path = require("path");

dotenv.config();

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
//Connection à la base de donnée//
const db = require("./config/db.config");
const Users = db.users;
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
//   initiate();
// });

function initiate() {
  Users.create({
    username: "Admin",
    email: "Admin@gmail.com",
    password: "$2b$10$v9F6ITzX0F/ELJ2H1UO77eS2y.37osra4ecPntPvzgMNdWR34xGra",
    isAdmin: true,
  });
}

const mysql = require("mysql");
const multer = require("multer");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", //password of your mysql db
  database: "groupomania",
});
connection.connect((err) => {
  if (err) {
    console.log("Not connected to database");
    throw err;
  } else {
    console.log("Connected to database");
  }
});

// make connection global
global.db = connection;

//middleware//
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

//Récupération des routes//
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/likes", likeRoute);
app.use("/api/coms", comsRoute);

//Création du serveur //
app.listen(4200, () => {
  console.log("Backend server est pret");
});
