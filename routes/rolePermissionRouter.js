
const express = require('express');
const { roleToPermission } = require('../controllers/rolePermissionController');
const rolePermissionRouter = express.Router();
const auth = require('../middlewares/authUser');
const permissionHalper = require('../utils/permissionHalper');


rolePermissionRouter.post('/',auth,permissionHalper("role_to_permission") ,roleToPermission);


module.exports = rolePermissionRouter;
