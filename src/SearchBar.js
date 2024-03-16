// SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search todos"
        value={searchTerm}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    height: 50,
    // width: 250,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontStyle: "italic",

  },
});

export default SearchBar;
