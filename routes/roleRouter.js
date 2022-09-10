const express = require('express');
const roleRouter = express.Router();
const {
    createRole,
    listRole,
    singalRole,
    updateRole,
    deleteRole,
    permissionToRole } = require('../controllers/roleController');
const auth = require('../middlewares/authUser');

roleRouter.post('/', auth, createRole);
roleRouter.get('/', auth, listRole);
roleRouter.get('/:id', auth, singalRole);
roleRouter.put('/:id', auth, updateRole);
roleRouter.delete('/:id',  auth,deleteRole);
roleRouter.post('/permission/:id', auth,permissionToRole);

module.exports = roleRouter;


