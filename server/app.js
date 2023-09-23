if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User } = require("./models");
const { checkPassword, generatedToken } = require("./helpers");

app.post("/users/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const reg = await User.create({
      email,
      password,
    });

    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: {
        id: reg.id,
        email: reg.email,
      },
    });
  } catch (error) {
    console.error(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({
        message: error.errors[0].message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) throw { name: "EmailRequired" };
    if (!password) throw { name: "PasswordRequired" };

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw { name: "InvalidLogin" };

    const validPassword = checkPassword(password, user.password);

    if (!validPassword) throw { name: "InvalidLogin" };

    const access_token = generatedToken({
      id: user.id,
      email: user.email,
    });

    res.status(200).json({
      statusCode: 200,
      message: "Login successfully",
      access_token,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "InvalidLogin") {
      res.status(401).json({
        message: "Wrong email or password",
      });
    } else if (error.name === "EmailRequired") {
      res.status(400).json({
        message: error.name,
      });
    } else if (error.name === "PasswordRequired") {
      res.status(400).json({
        message: error.name,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
