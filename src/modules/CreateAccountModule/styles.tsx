import { StyleSheet } from 'react-native';
import { baseStyles } from '../../styles/global';

export const styles = StyleSheet.create({
  ...baseStyles,
  flexIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#000000"
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
    color: "#000000"
  }
});