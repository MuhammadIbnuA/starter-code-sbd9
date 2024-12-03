// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
require('newrelic');
require('dotenv').config();


// Initialize Firebase Admin SDK
const serviceAccount = require("./ucil-sbd-2024-firebase-adminsdk-eb171-179a8c8b81.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore Database Reference
const db = admin.firestore();

// Create Express App
const app = express();
app.use(bodyParser.json());

// CRUD Routes

// Create a document
app.post("/create", async (req, res) => {
  try {
    const { collection, id, data } = req.body;
    await db.collection(collection).doc(id).set(data);
    res.status(201).send({ message: "Document created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Read a document
app.get("/read/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) {
      return res.status(404).send({ message: "Document not found" });
    }
    res.status(200).send(doc.data());
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update a document
app.put("/update", async (req, res) => {
  try {
    const { collection, id, data } = req.body;
    await db.collection(collection).doc(id).update(data);
    res.status(200).send({ message: "Document updated successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Delete a document
app.delete("/delete/:collection/:id", async (req, res) => {
  try {
    const { collection, id } = req.params;
    await db.collection(collection).doc(id).delete();
    res.status(200).send({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
