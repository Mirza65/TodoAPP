// TodoList.js
import React from 'react';
import { FlatList } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  const renderTodoItem = ({ item }) => (
    <TodoItem todo={item} onDelete={onDelete} onUpdate={onUpdate} />
  );

  return (
    <FlatList
      data={todos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TodoList;
