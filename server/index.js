const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.options("*", cors());

app.get("/api", (req, res) => {
  return res.json({
    message: "Welcome to your Fibonacci series",
  });
});

app.get("/api/fibo/:serie", (req, res) => {
  const fiboSerie = req.params.serie;
  let result = "";

  // Iterative function to calculate fibonacci series with O(n) complexity
  function fibonacci(param) {
    const baseSerie = [0, 1];
    for (i = 2; i <= param; i++) {
      baseSerie[i] = baseSerie[i - 2] + baseSerie[i - 1];
    }
    return (result = baseSerie[param]);
  }

  // Validate if param includes numbers we can calculate fibonacci
  if (!isNaN(fiboSerie)) {
    const number = parseInt(fiboSerie);
    fibonacci(number);
    res.send({
      serie: fiboSerie,
      result: result,
    });
  } else {
    res.send({
      error: true,
      message: "Invalid Input, try again...",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
