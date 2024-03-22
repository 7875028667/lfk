import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

const RadioButton = ({id, label, selected, onSelect}) => {
  return (
    <Pressable
      style={[styles.radioButton, selected && styles.radioButtonSelected]}
      onPress={() => onSelect(id)}>
      <Text
        style={[
          styles.radioButtonText,
          selected && styles.radioButtonTextSelected,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    paddingVertical: 10,
  },
  radioButtonSelected: {
    borderBottomColor: 'black',
  },
  radioButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  radioButtonTextSelected: {
    fontWeight: 'bold',
  },
});

export default RadioButton;
