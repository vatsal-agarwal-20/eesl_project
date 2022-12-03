const router = require('express').Router();
const connection = require('../connection');

router.get("/check", (req, res, next) => {

    connection.query('select * from users', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/create", (req, res, next) => {
    let users = req.body;
    var query = "insert into users (UserID,FirstName, LastName,Role,EmailID,PhoneNo) values(?,?,?,?,?,?)";
    connection.query(query, [users.UserID, users.FirstName, users.LastName,
    users.Role, users.EmailID, users.PhoneNo], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "User added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.patch('/update/:UserID', (req, res, next) => {
    const id = req.params.UserID;
    let users = req.body;

    var query = "update users set FirstName=?, LastName=?, Role=? , EmailID=?, PhoneNo=? where UserID=?";
    connection.query(query, [users.FirstName, users.LastName, users.Role, users.EmailID, users.PhoneNo, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User ID not found" });
            }
            return res.status(200).json({ message: "User updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:UserID', (req, res, next) => {
    const id = req.params.UserID;

    var query = "delete from users where UserID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "User ID not found" });

            return res.status(200).json({ message: "User deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;