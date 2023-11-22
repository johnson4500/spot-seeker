const jwt = require('jsonwebtoken');
require('dotenv').config()


function verifyToken(req, res, next) {
        const token = req.header('Authorization');
        // console.log(token)
        if (token == null) return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })  
  }

module.exports = verifyToken