
const RolePermission = require('../models').RolePermission;
const Helper = require("../utils/helper");
const helper = new Helper();


const roleToPermission = async (req, res) => {
    for(let i = 0; i < req.body.perm_id.length; i++){
        const match = await RolePermission.findOne({
            where: {
                role_id: req.body.role_id,
                perm_id: req.body.perm_id[i]
            }
        })
        if (match) {
            continue
        }
        else {
            await RolePermission.create({
                role_id: req.body.role_id,
                perm_id: req.body.perm_id[i]
            })
        }
    }
    try {
        res.status(201).send({
            messages: 'Role Permission created successfully.'
        })
    } catch (error) {
        res.status(400).send(error);
    }
}
module.exports = {
    roleToPermission
}