const router = require('express').Router();
const connection = require('../connection');

router.get("/", (req, res, next) => {

    connection.query('select * from subtasks', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/", (req, res, next) => {
    let subtasks = req.body;
    console.log(req.body);

    var query = "insert into subtasks (Item,Person,Status,Date, Description, TaskID) values(?,?,?,?,?,?)";
    connection.query(query, [subtasks.Item, subtasks.Person, subtasks.Status, subtasks.Date,
    subtasks.Description, subtasks.TaskID], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Subtask added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.patch('/update/:SubtaskID', (req, res, next) => {
    const id = req.params.SubtaskID;
    let subtasks = req.body;

    debugger
    var query = "update subtasks set Item,Person,Status,Date, Description, TaskID where SubtaskID=?";
    connection.query(query, [subtasks.Item, subtasks.Person, subtasks.Status, subtasks.Date, subtasks.Description,
    subtasks.TaskID, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Subtask ID not found" });
            }
            return res.status(200).json({ message: "Subtask updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:SubtaskID', (req, res, next) => {
    const id = req.params.SubtaskID;

    var query = "delete from subtasks where SubtaskID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "Subtask ID not found" });

            return res.status(200).json({ message: "Subtask deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;