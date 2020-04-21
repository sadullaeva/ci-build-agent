const BuildRunner = require('../services/buildRunner');

module.exports = (req, res, next) => {
  try {
    const { buildId, repoName, mainBranch, commitHash, command } = req.body;

    const startTime = new Date();
    const buildRunner = new BuildRunner({
      buildId,
      repoName,
      mainBranch,
      commitHash,
      command,
      startTime,
    });
    buildRunner.runProcess();

    res.send({ startTime });
  } catch (e) {
    next(e);
  }
};
