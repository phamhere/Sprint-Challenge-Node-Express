const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const projectControllers = require("../controllers/projectControllers");

const router = express.Router();

router.get("/", projectControllers.getAllProjects);

router.get("/:id", (req, res) => {
  projectDb
    .get(req.params.id)
    .then(project =>
      project
        ? res.status(200).json(project)
        : res.status(404).json({
            message: "The project with the specified ID does not exist."
          })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." })
    );
});

router.get("/:id/actions", (req, res) => {
  projectDb
    .getProjectActions(req.params.id)
    .then(actions =>
      actions
        ? res.status(200).json(actions)
        : res.status(404).json({
            message: "The project with the specified ID does not exist."
          })
    )
    .catch(err =>
      res.status(500).json({
        error: "The project actions information could not be retrieved."
      })
    );
});

router.post("/", (req, res) => {
  if (req.body.name && req.body.description) {
    projectDb
      .insert(req.body)
      .then(project => res.status(201).json(project))
      .catch(err =>
        res.status(500).json({
          error: "There was an error saving the project to the database."
        })
      );
  } else {
    res.status(400).json({
      message: "Please provide a name and description for the project."
    });
  }
});

router.put("/:id", (req, res) => {
  if (req.body.name && req.body.description) {
    projectDb
      .update(req.params.id, req.body)
      .then(project =>
        project
          ? res.status(200).json(project)
          : res.status(404).json({
              message: "The project with the specified ID does not exist."
            })
      )
      .catch(err =>
        res
          .status(500)
          .json({ error: "There was an error updating the project." })
      );
  } else {
    res.status(400).json({
      message: "Please provide a name and description for the project."
    });
  }
});

router.delete("/:id", (req, res) => {
  projectDb
    .remove(req.params.id)
    .then(count =>
      count
        ? res.status(200).json({ message: "Project successfully deleted." })
        : res.status(404).json({
            message: "The project with the specified ID does not exist."
          })
    )
    .catch(err =>
      res.status(500).json({
        error: "There was an error deleting the project from the database."
      })
    );
});

module.exports = router;
