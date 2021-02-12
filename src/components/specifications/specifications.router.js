// user controller 
const ctrl = require('./specifications.controller');
// custom joi validation
const {
  joiGetSpecifications
} = require('./specifications.validators');

// exporting the user routes 
function userRoutes() {
  return (open, closed) => {
    closed.route('/get-meta-data/module/:moduleName/screen/:screenName').get(
      joiGetSpecifications, // joi validation
      ctrl.getFileDynamically // controller function 
    );
  };
}

module.exports = userRoutes();
