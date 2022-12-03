const router = require('express').Router();
const connection = require('../connection');

router.get("/check", (req, res, next) => {

    connection.query('select * from files', function (err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
        res.end();
    });
});

router.post("/create", (req, res, next) => {
    let files = req.body;
    var query = "insert into files (FileID,FilePath,TaskId,CreatedOn, CreatedBy) values(?,?,?,?,?)";
    connection.query(query, [files.FileID, files.FilePath, files.TaskId,
    files.CreatedOn, files.CreatedBy], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "File added successfully" });
        }
        else return res.status(500).json(err);
    });
});

router.patch('/update/:FileID', (req, res, next) => {
    const id = req.params.FileID;
    let files = req.body;

    var query = "update files set FilePath=?,TaskId=?,CreatedOn=?, CreatedBy=? where FileID=?";
    connection.query(query, [files.FilePath, files.TaskId,
    files.CreatedOn, files.CreatedBy, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "File ID not found" });
            }
            return res.status(200).json({ message: "File updated successfully" })
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:FileID', (req, res, next) => {
    const id = req.params.FileID;

    var query = "delete from files where FileID=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0)
                return res.status(404).json({ message: "File ID not found" });

            return res.status(200).json({ message: "File deleted successfully" })
        }
        else {
            return res.status(500).json(err);
        }

    });
});


module.exports = router;