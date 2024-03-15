// TodoItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{todo.content}</Text>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.button}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onUpdate(todo.id)}>
        <Text style={styles.button}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    color: 'blue',
  },
});

export default TodoItem;
