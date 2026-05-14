'use strict';

import logger from '../utils/logger.js';
import listStore from '../models/list-store.js';
import { v4 as uuidv4 } from 'uuid';  // creates unique ids for each new song
import accounts from './accounts.js';



const list = {
  createView(request, response) {
    const listId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('List id = ' + listId);
    
    const viewData = {
      title: 'List',
      singleList: listStore.getList(listId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };

    response.render('list', viewData);
},


  addBook(request, response) {
    const listId = request.params.id;
    const list = listStore.getList(listId);

    const newBook = {
      id: uuidv4(),  // creates a unique id for the new book
      title: request.body.title, // gets the title from the form
      author: request.body.author, // gets the author from the form
    };

    listStore.addBook(listId, newBook);
    response.redirect('/list/' + listId);
  },

  deleteBook(request, response) {
    const listId = request.params.id; // gets list id from the url
    const bookId = request.params.bookid; // gets book id from the url

    logger.debug(`Deleting Book ${bookId} from List ${listId}`);

    listStore.removeBook(listId, bookId);  // calling model funcction to remove the book from the list
    response.redirect('/list/' + listId);
},
updateBook(request, response) {
    const listId = request.params.id;
    const bookId = request.params.bookid;
    logger.debug("updating book " + bookId);
    const updatedBook = {
      id: bookId,  // keep the same id for the updated book 
      title: request.body.title,
      author: request.body.author
    };
    listStore.editBook(listId, bookId, updatedBook);
    response.redirect('/list/' + listId);
}


};

export default list;
