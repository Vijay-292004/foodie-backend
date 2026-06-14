const userModel = require('../models/userModel')

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId)

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        if (user.userType !== 'admin') {
            return res.status(401).send({
                success: false,
                message: 'Only Admin Access'
            })
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Unauthorized User",
            error
        })
    }
}