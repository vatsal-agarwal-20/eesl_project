const app = require('./index');
const connection = require('./connection');

const userRouter = require('./routes/users');
const projectRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const filesRouter = require('./routes/files');
const discussionsRouter = require('./routes/discussions');
const logsRouter = require('./routes/logs');
const subtasksRouter = require('./routes/subtasks');

const cors= require('cors');

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my main application" });
});

/////////////////////////

app.use(cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, Origin, X-Requested-With, Accept"
}));

/////////////////////////


app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/tasks', tasksRouter);
app.use('/files', filesRouter);
app.use('/discussions', discussionsRouter);
app.use('/logs', logsRouter);
app.use('/subtasks', subtasksRouter);

let port = 8078;
app.listen(port, () => {
    console.log(`Application listened at port : ${port}`);
})