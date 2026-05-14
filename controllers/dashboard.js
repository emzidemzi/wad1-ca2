'use strict';

import logger from "../utils/logger.js";
import listStore from "../models/list-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';



const dashboard = {
    createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const lists = searchTerm
        ? listStore.searchUserLists(searchTerm, loggedInUser.id)
        : listStore.getUserLists(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = lists;

      if (sortField) {
        sorted = lists.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Manga App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        lists: sortField ? sorted : lists,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.lists);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  },


    addList(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();
	
    const newList = {
      userid: loggedInUser.id,
      id: uuidv4(),
      title: request.body.title,
      rating: parseInt(request.body.rating),
      books: [],
      date: timestamp
    };

    listStore.addList(newList);
    response.redirect('/dashboard');
  },



  deleteList(request, response) {
    const listId = request.params.id;
    logger.debug(`Deleting List ${listId}`);
    listStore.removeList(listId);
    response.redirect("/dashboard");
  },


};

export default dashboard;
