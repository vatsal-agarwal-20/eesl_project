const router = require('express').Router();
const connection = require('../connection');

router.get("/check", (req, res, next) => {

    connection.query('select * from discussions', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/create", (req, res, next) => {
    let discussions = req.body;
    var query = "insert into discussions (DiscussionID,TaskID,Comments,CreatedOn, CreatedBy) values(?,?,?,?,?)";
    connection.query(query, [discussions.DiscussionID,discussions.TaskID,discussions.Comments,
    discussions.CreatedOn, discussions.CreatedBy], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Discussion added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.patch('/update/:DiscussionID', (req, res, next) => {
    const id = req.params.DiscussionID;
    let discussions = req.body;

    var query = "update discussions set TaskId=?,Comments=?,CreatedOn=?, CreatedBy=? where DiscussionID=?";
    connection.query(query, [discussions.TaskId, discussions.Comments,
    discussions.CreatedOn, discussions.CreatedBy, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Discussion ID not found" });
            }
            return res.status(200).json({ message: "Discussion updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:DiscussionID', (req, res, next) => {
    const id = req.params.DiscussionID;

    var query = "delete from discussions where DiscussionID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "Discussion ID not found" });

            return res.status(200).json({ message: "Discussion deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;