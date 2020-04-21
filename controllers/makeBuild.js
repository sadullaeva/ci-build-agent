const BuildRunner = require('../services/buildRunner');

module.exports = (req, res, next) => {
  try {
    const { buildId, repoName, mainBranch, commitHash, command } = req.body;

    const buildRunner = new BuildRunner({ buildId, repoName, mainBranch, commitHash, command });
    buildRunner.runProcess();

    res.code(200);
  } catch (e) {
    next(e);
  }
};
