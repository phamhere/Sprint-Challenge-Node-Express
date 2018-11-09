const express = require("express");
const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome!"));

app.use("/projects", projectsRouter);
app.use("/actions", actionsRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App running on port ${port}`));
