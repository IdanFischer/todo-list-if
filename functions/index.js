import express from "express"
import cors from "cors"
import functions from "firebase-functions"
import { getAllTasks, addTask, updateTask } from "./src/tasks.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get('/tasks', getAllTasks)

app.post('/tasks', addTask)

app.patch('/tasks/:taskId', updateTask)

export const api = functions.https.onRequest(app)

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
