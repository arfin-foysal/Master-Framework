const Permission = require('../models').Permission;
const RolePermission = require('../models').RolePermission;

const permissionHalper = (permName) => {
  return async (req, res, next) => {
    try {
      const roleId = req.user.role_id;
      const permi = await Permission.findOne({
        where: {
          perm_name: permName,
        },
      });
      const rolePermission = await RolePermission.findOne({
        where: {
          role_id: roleId,
          perm_id: permi.id,
        },
      });
      if (rolePermission) {
        next();
      } else {
        res.status(403).json({
          message: "Forbidden",
        });
      }
    } catch (error) {
      res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }
  };
};

module.exports = permissionHalper;
