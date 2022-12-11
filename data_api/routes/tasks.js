const router = require('express').Router();
const connection = require('../connection');

router.get("/", (req, res, next) => {
    
    connection.query("select * from tasks", function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    }); 
});

router.get("/:ProjectID", (req, res, next) => {

    let tasks=req.params.ProjectID;
    connection.query(`select * from tasks where ProjectID=${tasks}`, function (err, data) {
        if (err) {
            throw err.message;
        }
        res.json(data);
        res.end();
    }); 
});

router.post("/", (req, res, next) => {
    let tasks = req.body;
    var query = "insert into tasks (TaskID,TaskName,ProjectID,Status,AssignedTo,StartDate, DueDate) values(?,?,?,?,?,?,?)";
    connection.query(query, [tasks.TaskID, tasks.TaskName, tasks.ProjectID,tasks.Status,tasks.AssignedTo,
        tasks.StartDate,tasks.DueDate], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Task added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.post('/update', (req, res, next) => {
    // const id = req.params.TaskID;
    let tasks = req.body;

    var query = "update tasks set TaskName=?,ProjectID=?, Status=?,AssignedTo=?, StartDate=?, DueDate=? where TaskID=?";
    connection.query(query, [tasks.TaskName,tasks.ProjectID,tasks.Status, tasks.AssignedTo, tasks.StartDate,
    tasks.DueDate, tasks.TaskID], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Task ID not found" });
            }
            return res.status(200).json({ message: "Task updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:TaskID', (req, res, next) => {
    const id = req.params.TaskID;

    var query = "delete from tasks where TaskID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "Task ID not found" });

            return res.status(200).json({ message: "Task deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;