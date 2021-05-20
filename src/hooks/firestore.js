import { useState, useEffect } from 'react';

import { getFirebaseItems, addFirebaseItem, updateFirebaseItem, deleteFirebaseItem } from "../lib/firebase";

function useFirestore() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const itemList = await getFirebaseItems();
    setItems(itemList);
  };

  const addItem = async item => {
    const newItem = { text: item.text, done: item.done };
    await addFirebaseItem(newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async checked => {
    const changes = { done: !checked.done };
    await updateFirebaseItem(changes, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes}
      }
      return item;
    })
    setItems(newItems);
  }

  const clearItems = () => {
    items.forEach((item) => {
      deleteFirebaseItem(item);
    })
    setItems([]);
  };

  return [items, addItem, updateItem, clearItems];
}

export default useFirestore;