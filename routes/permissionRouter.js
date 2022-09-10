const express = require('express');
const permissionRouter = express.Router();
const {
    createPermission,
    listPermission,
    updatePermission,
    deletePermission} = require('../controllers/permissionController');
const auth = require('../middlewares/authUser');

permissionRouter.post('/', auth, createPermission);
permissionRouter.get('/', auth, listPermission);
permissionRouter.put('/:id', auth, updatePermission);
permissionRouter.delete('/:id', auth, deletePermission);


module.exports = permissionRouter;
