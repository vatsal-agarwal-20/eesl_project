const router = require('express').Router();
const connection = require('../connection');

router.get("/check", (req, res, next) => {

    connection.query('select * from activity_log', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/create", (req, res, next) => {
    let activity_log = req.body;
    var query = "insert into activity_log (LogID,Action, TaskID,CreatedBy,CreatedOn) values(?,?,?,?,?)";
    connection.query(query, [activity_log.LogID, activity_log.Action, activity_log.TaskID,
    activity_log.CreatedBy, activity_log.CreatedOn], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Log added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.patch('/update/:LogID', (req, res, next) => {
    const id = req.params.LogID;
    let activity_log = req.body;

    var query = "update activity_log set Action=?, TaskID=?,CreatedBy=?,CreatedOn=? where LogID=?";
    connection.query(query, [activity_log.Action, activity_log.TaskID,
    activity_log.CreatedBy, activity_log.CreatedOn, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Log ID not found" });
            }
            return res.status(200).json({ message: "Log updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:LogID', (req, res, next) => {
    const id = req.params.LogID;

    var query = "delete from activity_log where LogID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "Log ID not found" });

            return res.status(200).json({ message: "Log deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;