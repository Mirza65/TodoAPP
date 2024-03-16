import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './SearchBar';

const Todo = () => {
  const [todos, setTodos] = useState([]); // State to manage todos
  const [newTodo, setNewTodo] = useState(''); // State to manage new todo input
  const [searchTodo, setSearchTodo] = useState(''); // State to manage search todo
  const [todoName, setTodoName] = useState(''); // State to manage edited todo content
  const [editingTodoId, setEditingTodoId] = useState(null); // State to manage editing todo id and make modal visible


  useEffect(() => {
    getTodos(); // Load todos from local storage on component mount
  }, []);

  const getTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos'); // Gets todos from local storage
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos)); // Set todos if found in local storage
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  // Function to add a new todo
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now().toString(),
        content: newTodo,
        createdAt: new Date().toISOString(),
      };
      const updatedTodos = [...todos, newTodoItem]; // Add new todo to existing todos
      setTodos(updatedTodos); // Update todos state
      saveTodos(updatedTodos); // Save updated todos to local storage
      setNewTodo(''); // Clear new todo input
    }
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id); // Filter out the todo to be deleted
    setTodos(updatedTodos); // Update todos state
    saveTodos(updatedTodos); // Save updated todos to local storage
  };

  // Function to update todo content
  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: todoName } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setEditingTodoId(null);
    setTodoName('');
  };

  // Function to render each todo item
  const renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={{ fontWeight: "600",fontSize:13 }}>{item.content}</Text>
      <Text style={{fontSize:12,color:"grey"}}>{new Date(item.createdAt).toLocaleString()}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={{ color: "red" }}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setEditingTodoId(item.id)}>
        <Text >Edit</Text>
      </TouchableOpacity>
    </View>
  );

  // Function to render edit modal for editing todo content
  const renderEditModal = () => (
    <Modal visible={editingTodoId !== null} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit todo"
          value={todoName}
          onChangeText={setTodoName}
        />
        <Button title="Update" onPress={() => updateTodo(editingTodoId)} />
        <View style={{ height: 10, width: 10 }} />
        <Button title="Cancel" onPress={() => setEditingTodoId(null)} />
      </View>
    </Modal>
  );

  // Function to search and filter todos based on search todo
  const searchAndFilterTodos = () => {
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(searchTodo.toLowerCase())
    );
  };

  // Function to sort todos based on creation date
  const sortTodos = (todosToSort) => {
    return todosToSort.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  // Function to save todos to local storage
  const saveTodos = async (updatedTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos)); // Save updated todos to local storage
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  // Render the Todo component
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo App</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Type here to add a new todo item"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.buttonText}>Add Todo</Text>
      </TouchableOpacity>

      <SearchBar searchTodo={searchTodo} onSearchChange={setSearchTodo} />

      {todos == '' ? <Text style={styles.emptyItem}>Nothing to Do!</Text> : <FlatList
        data={sortTodos(searchAndFilterTodos())}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />}

      {renderEditModal()}
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius:10
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginTop:30,
    borderWidth: 1,
    height: 50,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontStyle:"italic"

  },
  addButton: {
    backgroundColor: 'darkorange',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  emptyItem: {
    fontSize: 12,
    fontWeight: "500",
    color: "grey",
    alignSelf: "center",
    marginTop:20,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Todo;
