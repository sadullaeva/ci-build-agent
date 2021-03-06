const path = require('path');
const child_process = require('../utils/childProcess');

module.exports = async (repoName, mainBranch) => {
  const cwd = path.resolve(__dirname, '..');
  const folderName = 'ci-repo';

  try {
    await child_process.exec(`rm -rf ${cwd}/${folderName}`);
    await child_process.spawn([
      'git',
      ['clone', '-b', mainBranch, `https://github.com/${repoName}.git`, folderName],
      { cwd },
    ]);

    return true;
  } catch (e) {
    console.log('Could not clone the repo', e);

    return false;
  }
};
