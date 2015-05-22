var spdx = require('spdx');

function render(parsed) {
  if (parsed.license) {
    if (parsed.license === 'LicenseRef-LICENSE') {
      return 'See LICENSE file for license information.';
    } else if (parsed.license.indexOf('LicenseRef') > -1) {
      return 'The package has a valid, but unknown license identifier.';
    } else {
      return (
        '<a href="http://spdx.org/licenses/' + parsed.license + '">' +
          parsed.license +
        '</a>' +
        (parsed.plus ? ' or newer' : '') +
        (parsed.exception ? ' with ' + parsed.exception : '')
      );
    }
  } else {
    return (
      render(parsed.left) +
      ' ' + parsed.conjunction + ' ' +
      render(parsed.right)
    );
  }
}

module.exports = function(expression) {
  var parsed = spdx.parse(expression);
  return render(parsed);
};