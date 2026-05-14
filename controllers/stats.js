"use strict";
import logger from "../utils/logger.js";
import listStore from "../models/list-store.js";
import accounts from './accounts.js';


const stats = {
   createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      // app statistics calculations
      const list = listStore.getAllLists();

      let numLists = list.length;

      let numBooks = list.reduce((total, list) => total + list.books.length, 0);

      let average = numLists > 0 ? (numBooks / numLists).toFixed(2) : 0;

      let totalRating = list.reduce((total, list) => total + parseInt(list.rating), 0);

      let avgRating = numLists > 0 ? totalRating / numLists : 0;

      let maxRating = list.length > 0 ? Math.max(...list.map(list => list.rating)) : 0;
      let maxRated = list.filter(list => list.rating === maxRating);
      let favTitles = maxRated.map(item => item.title);

      let longestSize = list.length > 0 ? Math.max(...list.map(list => list.books.length)) : 0;
      let longestLists = list.filter(list => list.books.length === longestSize);
      let longestListTitles = longestLists.map(item => item.title);
      
      const statistics = {
        displayNumLists: numLists,
        displayNumBooks: numBooks ,
        displayAverage: average,
        displayAvgRating: avgRating,
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestListTitles,
      };

      const viewData = {
        title: "Manga App Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
      };

      response.render("stats", viewData);
    }
    else response.redirect('/');
  },

};

export default stats;
