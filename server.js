const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next();
  return res.send("Hello from middleware 1");
});



app.get("/", (req, res) => {
  return res.send("Hello from home page");
});
app.get("/about", (req, res) => {
  return res.send("Hello from about page");
});

app.get("/api/user", (req, res) => {
  return res.json(user);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.id}+${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.json({ status: "success", id: users.length + 1 });
  });
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const useri = users.find((user) => user.id === id);
  delete useri;
  console.log("user deleted successfully");

  return res.send("User deleted successfully");
});

app.get("/user/:id", (req, res) => {
  const id = Number(req.params.id);
  const userid = users.find((user) => user.id === id);
  return res.send(userid);
});

app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});
