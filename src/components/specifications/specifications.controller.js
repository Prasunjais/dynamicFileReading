const BaseController = require('../baseController');
const Model = require('./models/specifications.model');
const fs = require('fs');
const path = require('path');
const {
  error,
  info
} = require('../../utils').logging;

// getting the model 
class userController extends BaseController {
  // constructor 
  constructor() {
    super();
    this.messageTypes = this.messageTypes.fileDynamic;
  }

  // do something 
  getFileDynamically = async (req, res) => {
    try {
      info('Get the Files Dynamically !');

      let moduleName = req.params.moduleName; // get the module name 
      let screenName = req.params.screenName; // get the screen name 

      // create module path 
      let specFilePath = path.join(moduleName, `${screenName}.json`); // spec file path
      let screenConfig = path.join(__dirname, '../../config/specifications/', specFilePath);

      // check if file exits 
      if (fs.existsSync(screenConfig)) {
        // get the file 
        let specs = fs.readFileSync(screenConfig); // spec json 
        let specsJson = specs.toString();
        // convert the buffer to String JSON
        return this.success(req, res, this.status.HTTP_OK, JSON.parse(specsJson), this.messageTypes.specListedSuccessfully);

        // if file not found
      } else {
        error('Spec Not Found !');
        return this.errors(req, res, this.status.HTTP_NOT_FOUND, this.messageTypes.specNotFound);
      }

      // catch any runtime error 
    } catch (e) {
      error(e);
      this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, err));
    }
  }
}

// exporting the modules 
module.exports = new userController();
