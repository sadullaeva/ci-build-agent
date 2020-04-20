const path = require('path');
const child_process = require('../utils/childProcess');

module.exports = async command => {
  const cwd = path.resolve(__dirname, '../ci-repo');
  let stdout = '';
  let stderr = '';

  try {
    const result = await child_process.exec(command, { cwd });

    stdout = result.stdout;
    stderr = result.stderr;

    return { stdout, stderr, code: 0 };
  } catch (err) {
    stdout = err.stdout;
    stderr = err.stderr;

    return { stdout, stderr, code: err.code };
  }
};
