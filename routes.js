'use strict';

import express from 'express';
const router = express.Router();
import logger from "./utils/logger.js";

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import list from './controllers/list.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';



router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/list/:id', list.createView);
router.get('/list/:id/deletebook/:bookid', list.deleteBook);
router.get('/dashboard/deletelist/:id', dashboard.deleteList);
router.get('/stats', stats.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/manga', list.createView);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);





router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.post('/list/:id/addbook', list.addBook);
router.post('/dashboard/addlist', dashboard.addList);
router.post('/list/:id/updatebook/:bookid', list.updateBook);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


export default router;
