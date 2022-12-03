const router = require('express').Router();
const connection = require('../connection');

router.get("/check", (req, res, next) => {

    connection.query('select * from projects', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/create", (req, res, next) => {
    let projects = req.body;
    var query = "insert into projects (ProjectID,ProjectName,StartDate, DueDate, Status, ColorCode, CreatedBy) values(?,?,?,?,?,?,?)";
    connection.query(query, [projects.ProjectID, projects.ProjectName, projects.StartDate,
    projects.DueDate, projects.Status, projects.ColorCode, projects.CreatedBy], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Project added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.patch('/update/:ProjectID', (req, res, next) => {
    const id = req.params.ProjectID;
    let projects = req.body;

    var query = "update projects set ProjectName=?,StartDate=?, DueDate=?, Status=?, ColorCode=?, CreatedBy=? where ProjectID=?";
    connection.query(query, [projects.ProjectName, projects.StartDate,
    projects.DueDate, projects.Status, projects.ColorCode, projects.CreatedBy, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Project ID not found" });
            }
            return res.status(200).json({ message: "Project updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:ProjectID', (req, res, next) => {
    const id = req.params.ProjectID;

    var query = "delete from projects where ProjectID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "Project ID not found" });

            return res.status(200).json({ message: "Project deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;