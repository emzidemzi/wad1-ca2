// third controller - manga collection details//
// this will come from my dashboard page and will have information about the manga i put into the collection

'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';

const mangaController = {
  createView(request, response) {
    logger.info('Manga list page loading');

    const mangaList = appStore.getManga();  // Get all manga

    const viewData = {
      title: 'Manga Collection',
      manga: mangaList,
    };

    response.render('manga', viewData);
  }
};

export default mangaController;