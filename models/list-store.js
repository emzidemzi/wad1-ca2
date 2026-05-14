'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const listStore = {

  store: new JsonStore('./models/list-store.json', { listCollection: [] }),
  collection: 'listCollection',
  array: 'books',

  getAllLists() {
    return this.store.findAll(this.collection);
  },

  getList(id) {
    return this.store.findOneBy(this.collection, (list => list.id === id));
},

addBook(id, book) {
    this.store.addItem(this.collection, id, this.array, book);
},

addList(list) {
    this.store.addCollection(this.collection, list);
},

removeBook(id, bookId) {
    this.store.removeItem(this.collection, id, this.array, bookId);
},

removeList(id) {
    const list = this.getList(id);
    this.store.removeCollection(this.collection, list);
},
editBook(id, bookId, updatedBook) {
    this.store.editItem(this.collection, id, bookId, this.array, updatedBook);
},

searchList(search) {
    return this.store.findBy(
      this.collection,
      (list => list.title.toLowerCase().includes(search.toLowerCase())))
},

// gettiung user specific lists, used in dashboard.js to only show lists created by the user logged in
getUserLists(userid) {
  return this.store.findBy(this.collection, (list => list.userid === userid));
},

searchUserLists(search, userid) {
  return this.store.findBy(
    this.collection,
    (list => list.userid === userid && list.title.toLowerCase().includes(search.toLowerCase())))
}, 


};

export default listStore;
