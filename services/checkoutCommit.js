const path = require('path');
const child_process = require('../utils/childProcess');

module.exports = async commitHash => {
  const cwd = path.resolve(__dirname, '../ci-repo');

  try {
    await child_process.spawn(['git', ['checkout', commitHash], { cwd }]);

    return true;
  } catch (e) {
    console.log('Could not checkout the commit', e);

    return false;
  }
};
