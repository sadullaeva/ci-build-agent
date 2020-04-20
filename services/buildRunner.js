const cloneRepo = require('./cloneRepo');
const checkoutCommit = require('./checkoutCommit');
const runBuild = require('./runBuild');
const { notifyBuildResult } = require('../api/serverMethods');

class BuildRunner {
  constructor({ buildId, repoName, mainBranch, commitHash, command }) {
    this._repoName = repoName;
    this._mainBranch = mainBranch;
    this._commitHash = commitHash;
    this._command = command;

    this._build = {
      id: buildId,
      startTime: undefined,
      endTime: undefined,
      success: false,
      log: '',
    };
  }

  runProcess = () => {
    this.cloneRepo()
      .then(success => {
        if (success) {
          return this.checkoutCommit();
        }
        return Promise.reject();
      })
      .then(success => {
        if (success) {
          return this.runBuild();
        }
        return Promise.reject();
      })
      .then(() => {
        return this.sendResult();
      })
      .catch(err => {
        return this.sendFail();
      });
  };

  cloneRepo = async () => {
    return await cloneRepo(this._repoName, this._mainBranch);
  };

  checkoutCommit = async () => {
    return await checkoutCommit(this._commitHash);
  };

  runBuild = async () => {
    this._build.startTime = new Date();

    const { stdout, stderr, code } = await runBuild(this._command);
    console.log('RUN BUILD', { stdout, stderr, code });

    this._build.endTime = new Date();
    this._build.success = code === 0;
    this._build.log = `${stdout}\n${stderr}`;

    return Promise.resolve();
  };

  sendResult = async () => {
    const { id: buildId, success, startTime, endTime, log: buildLog } = this._build;

    return await notifyBuildResult({
      buildId,
      buildLog,
      success,
      duration: endTime - startTime,
    });
  };

  sendFail = async () => {
    const { id: buildId, log: buildLog } = this._build;

    return await notifyBuildResult({
      buildId,
      buildLog,
      success: false,
      duration: 0,
    });
  };
}

module.exports = BuildRunner;
