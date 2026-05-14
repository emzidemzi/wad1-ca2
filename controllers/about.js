'use strict';

import logger from "../utils/logger.js";
import accounts from './accounts.js';


const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: 'About the Manga App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
},

};

export default about;