"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverTimestamp = exports.helloFunction = void 0;
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
(0, v2_1.setGlobalOptions)({ region: 'us-central1' });
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp();
}
exports.helloFunction = (0, https_1.onRequest)((_req, res) => {
    res.json({ message: 'Hello from Cloud Functions' });
});
exports.serverTimestamp = (0, https_1.onRequest)(async (_req, res) => {
    const db = firebase_admin_1.default.firestore();
    const ref = db.collection('server').doc('metadata');
    await ref.set({ updatedAt: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }, { merge: true });
    const snapshot = await ref.get();
    res.json({
        message: 'Server timestamp updated',
        data: snapshot.data() ?? {}
    });
});
