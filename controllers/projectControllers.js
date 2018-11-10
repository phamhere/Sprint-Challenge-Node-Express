const projectDb = require("../data/helpers/projectModel");

module.exports = {
  getAllProjects(req, res) {
    projectDb
      .get()
      .then(projects => res.status(200).json(projects))
      .catch(err =>
        res
          .status(500)
          .json({ error: "The projects information could not be retrieved." })
      );
  }
};
