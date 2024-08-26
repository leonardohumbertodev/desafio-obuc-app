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
  },
  labelModal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000000"
  },
  flexBadge: {
    display: "flex",
    flexDirection: "row",
    gap: 18,
    alignItems: "center"
  },
  badge: {
    width: "auto",
    borderWidth: 2,
    borderRadius: 12,
    padding: 6
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000"
  }
});