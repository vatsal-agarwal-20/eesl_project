const router = require('express').Router();
const connection = require('../connection');

router.get("/", (req, res, next) => {

    connection.query('select * from projects where isActive=1', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/", (req, res, next) => {
    let projects = req.body;
    var query = "insert into projects (ProjectID,ProjectName,StartDate, DueDate, Status, ColorCode, CreatedBy,isActive) values(?,?,?,?,?,?,?,?)";
    connection.query(query, [projects.ProjectID, projects.ProjectName, projects.StartDate,
    projects.DueDate, projects.Status, projects.ColorCode, projects.CreatedBy,projects.isActive], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Project added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.post('/update', (req, res, next) => {
    // const id = req.params.ProjectID;
    let projects = req.body;

    var query = "update projects set ProjectName=?,StartDate=?, DueDate=?, Status=?, ColorCode=?, CreatedBy=?, isActive=? where ProjectID=?";
    connection.query(query, [projects.ProjectName, projects.StartDate,
    projects.DueDate, projects.Status, projects.ColorCode, projects.CreatedBy,projects.isActive, projects.ProjectID], (err, results) => {
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

router.post('/delete', (req, res, next) => {
    // const id = req.params.ProjectID;
    let projects = req.body;

    var query = "update projects set isActive=0 where ProjectID=?";
    connection.query(query, [projects.ProjectID], (err, results) => {
        if (!err) {
            
            return res.status(200).json({ message: "Project deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

// router.delete('/delete/:ProjectID', (req, res, next) => {
//     const id = req.params.ProjectID;

//     var query = "delete from projects where ProjectID=?";
//     connection.query(query, [id], (err, results) => {
//         if (!err) {
//             if (results.affectedRows === 0)
//                 return res.status(404).json({ message: "Project ID not found" });

//             return res.status(200).json({ message: "Project deleted successfully" })
//         }
//         else {
//             return res.status(500).json(err);
//         }

//     });
// });


module.exports = router;