import express from "express";
const app = express();

app.use(express.json());

app.listen(3030, () => console.log("Server listening on port 3030"));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

