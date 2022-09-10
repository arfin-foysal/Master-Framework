const express = require('express');
const userRouter = express.Router();
const auth = require('../middlewares/authUser');
const {
    createUser,
    listUser,
    singalUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const permissionHalper = require('../utils/permissionHalper');






userRouter.post('/',auth, createUser);
userRouter.get('/',auth, listUser);
userRouter.get('/:id',auth, singalUser);
userRouter.put('/:id',auth, updateUser);
userRouter.delete('/:id', auth, deleteUser);



  
module.exports = userRouter;