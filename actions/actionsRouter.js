const express = require("express");
const actionDb = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  actionDb
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  actionDb
    .get(req.params.id)
    .then(action =>
      action
        ? res.status(200).json(action)
        : res.status(404).json({
            message: "The action with the specified ID does not exist."
          })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." })
    );
});

router.post("/", (req, res) => {
  if (req.body.project_id && req.body.description && req.body.notes) {
    actionDb
      .insert(req.body)
      .then(action => res.status(201).json(action))
      .catch(err =>
        res.status(500).json({
          error: "There was an error saving the action to the database."
        })
      );
  } else {
    res.status(400).json({
      message:
        "Please provide a project id, description, and notes for the project."
    });
  }
});

router.put("/:id", (req, res) => {
  if (req.body.project_id && req.body.description && req.body.notes) {
    actionDb
      .update(req.params.id, req.body)
      .then(action =>
        action
          ? res.status(200).json(action)
          : res.status(404).json({
              message: "The action with the specified ID does not exist."
            })
      )
      .catch(err =>
        res
          .status(500)
          .json({ error: "There was an error updating the action." })
      );
  } else {
    res.status(400).json({
      message:
        "Please provide a project id, description, and notes for the action."
    });
  }
});

router.delete("/:id", (req, res) => {
  actionDb
    .remove(req.params.id)
    .then(count =>
      count
        ? res.status(200).json({ message: "Action successfully deleted." })
        : res.status(404).json({
            message: "The action with the specified ID does not exist."
          })
    )
    .catch(err =>
      res.status(500).json({
        error: "There was an error deleting the action from the database."
      })
    );
});

module.exports = router;
