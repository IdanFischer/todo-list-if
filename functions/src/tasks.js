import { getFirestoreInstance } from "./utils.js";
import { FieldValue } from "firebase-admin/firestore";

export async function getAllTasks(req, res) {
  const db = await getFirestoreInstance()
  // const collection = await db.collection('tasks').get() the async way
  db.collection('tasks').orderBy('createdAt', 'desc').get()
    .then(collection => {
      const tasks = collection.docs.map(doc => ({ taskId: doc.id, ...doc.data() }))
      res.send(tasks)
    })
    .catch(err => res.status(500).json({ error: err.message }))
}

export async function addTask(req, res) {
  const { done ,task } = req.body;
  const newTask = { done, task, createdAt: FieldValue.serverTimestamp() }
  const db = await getFirestoreInstance()
  db.collection('tasks').add(newTask)
    .then(() => getAllTasks(req, res))
    .catch(err => res.status(500).json({ error: err.message }))
}

export async function updateTask(req, res) {
  // looks for the params of the url
  const { done } = req.body
  // if i allow both task and done to be changed
  // if (!done){
  //   res.send({error:"done is a required field"})
  //   return
  // }
  const { taskId } = req.params

  const db = await getFirestoreInstance()

  db.collection('tasks').doc(taskId).update({ done })
    .then(() => getAllTasks(req, res))
    .catch(err => res.status(500).json({ error: err.message }))
}
// DELETE

export async function deleteTask(req, res) {
  // looks for the params of the url
  const { taskId } = req.params
  const db = await getFirestoreInstance()

  db.collection('tasks')
    .doc(taskId)
    .delete()
    .then(() => getAllTasks(req, res))
    .catch(err => res.status(500).json({ error: err.message }))
}
