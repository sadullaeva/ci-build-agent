const cloneRepo = require('./cloneRepo');
const checkoutCommit = require('./checkoutCommit');
const runBuild = require('./runBuild');
const { notifyBuildResult } = require('../api/serverMethods');

class BuildRunner {
  constructor({ buildId, repoName, mainBranch, commitHash, command, startTime }) {
    this._repoName = repoName;
    this._mainBranch = mainBranch;
    this._commitHash = commitHash;
    this._command = command;

    this._build = {
      id: buildId,
      startTime: startTime,
      endTime: undefined,
      success: false,
      log: '',
    };
  }

  runProcess = () => {
    console.log('BuildRunner: PROCESS IS RUN');

    this.cloneRepo()
      .then(success => {
        if (success) {
          console.log('BuildRunner: REPO WAS CLONED SUCCESSFULLY');

          return this.checkoutCommit();
        }
        console.log('BuildRunner: REPO WAS NOT CLONED');

        return Promise.reject();
      })
      .then(success => {
        if (success) {
          console.log('BuildRunner: COMMIT CHECKOUT WAS SUCCESSFUL');

          return this.runBuild();
        }
        console.log('BuildRunner: COMMIT CHECKOUT WAS NOT SUCCESSFUL');

        return Promise.reject();
      })
      .then(() => {
        console.log('BuildRunner: BUILD COMPLETED');

        return this.sendResult();
      })
      .catch(err => {
        console.log('BuildRunner: SOMETHING WENT WRONG');

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
    const { stdout, stderr, code } = await runBuild(this._command);

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
    }).catch(err => {
      console.log('BuildRunner: COULD NOT NOTIFY BUILD RESULT', err);
    });
  };

  sendFail = async () => {
    const { id: buildId, log: buildLog } = this._build;

    return await notifyBuildResult({
      buildId,
      buildLog,
      success: false,
      duration: 0,
    }).catch(err => {
      console.log('BuildRunner: COULD NOT NOTIFY BUILD FAIL', err);
    });
  };
}

module.exports = BuildRunner;
