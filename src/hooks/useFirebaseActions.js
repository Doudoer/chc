// useFirebaseActions.js
import { addDoc, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';
import { db, getCollectionPath } from '../firebaseGlobal';
import { useState } from 'react';

export function useFirebaseActions(userId) {
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  async function addItem(collectionName, data) {
    setLoading(true); setActionError(null);
    try {
      await addDoc(collection(db, getCollectionPath(userId, collectionName)), data);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(collectionName, id, data) {
    setLoading(true); setActionError(null);
    try {
      await updateDoc(doc(db, getCollectionPath(userId, collectionName), id), data);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(collectionName, id) {
    setLoading(true); setActionError(null);
    try {
      await deleteDoc(doc(db, getCollectionPath(userId, collectionName), id));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { addItem, updateItem, deleteItem, loading, actionError };
}
