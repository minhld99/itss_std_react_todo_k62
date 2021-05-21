import React from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useFirestore from '../hooks/firestore';

/* ライブラリ */
// import {getKey} from "../lib/util";

function Todo() {
  
  const [items, addItem, updateItem, clearItems] = useFirestore();
  
  const handleCheckbox = checked => {
    updateItem(checked);
  };
  
  const handleAddBox = text => {
    addItem({ text, done: false });
  };
  
  const [filter, setFilter] = React.useState('ALL');

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    else if (filter === 'TODO') return !item.done;
    else return item.done; // (filter === 'DONE')
  });
  
  const handleFilterChange = value => setFilter(value);

  return (
    <div className="panel">
      <div className="panel-heading">
        <i class="fas fa-calendar-check"> ITSS ToDoアプリ</i>
      </div>
      <Input onAdd={handleAddBox} />
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {displayItems.map(item => (
        <TodoItem
          key={item.key}
          item={item}
          onCheck={handleCheckbox}
        />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;