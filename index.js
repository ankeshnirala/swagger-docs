const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const fileUpload = require("express-fileupload");

const swaggerDocs = YAML.load("./swagger.yml");

const app = express();
const PORT = 4000;
const serverMessage = `Server is running on port ${PORT}`;

let courses = [
    { id: "11", name: "Learn Node", price: "199" },
    { id: "12", name: "Learn React", price: "299" },
    { id: "13", name: "Learn Angular", price: "299" }
];

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
    res.send("<h1>Hello, Welcome Ankesh!!</h1>");
});

app.get("/api/v1/lco", (req, res) => {
    res.send("Welcome to learn code online")
});

app.get("/api/v1/lco/courses", (req, res) => {
    res.status(200).json(courses);
});

app.get("/api/v1/lco/course/:courseId", (req, res) => {
    const course = courses.find(course => course.id === req.params.courseId)
    res.status(200).json(course);
})

app.post("/api/v1/lco/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/lco/courseQuery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;

    res.send({ location, device });
});

app.post("/api/v1/lco/courseUpload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    file.mv(path, (err) => {
        err ? res.send(false) : res.send(true)
    })
});

app.listen(PORT, () => {
    console.log(serverMessage);
});