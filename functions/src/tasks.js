import { getFirestoreInstance } from "./utils.js";

export function getAllTasks(req, res) {
  const db = getFirestoreInstance()
  // const collection = await db.collection('tasks').get() the async way
  db.collection('tasks').get()
  .then(collection => {
    const tasks = collection.docs.map(doc => ({taskId: doc.id, ...doc.data() }))
    res.send(tasks)
  })
  .catch(err => res.status(500).json({error: err.message}))
}
