const ensureAuthenticated = require("../Middlewares/Auth");
const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    { id: 1, brand: "Tesla", model: "Model 3", year: 2023, color: "White" },
    { id: 2, brand: "Toyota", model: "Corolla", year: 2021, color: "Blue" },
    { id: 3, brand: "BMW", model: "X5", year: 2022, color: "Black" },
    { id: 4, brand: "Honda", model: "Civic", year: 2020, color: "Red" },
    { id: 5, brand: "Ford", model: "Mustang", year: 2023, color: "Yellow" },
  ]);
});

module.exports = router;
