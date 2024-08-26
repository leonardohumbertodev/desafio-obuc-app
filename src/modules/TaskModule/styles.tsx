import { StyleSheet } from 'react-native';
import { baseStyles } from '../../styles/global';

export const styles = StyleSheet.create({
  ...baseStyles,
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#000000"
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#000000"
  },
  filterFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  filter: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000"
  },
  badgeStatus: {
    width: "auto",
    backgroundColor: "#00BE78",
    borderRadius: 12,
    padding: 6
  },
  badgeStatusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  titleBottom: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#000000"
  },
  descriptionBottom: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#000000"
  },
  bottomContent: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 24
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    maxHeight: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24
  },
  titleModal: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#000000"
  },
  labelModal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#000000"
  },
  descriptionModal: {
    fontSize: 16,
    color: "#000000"
  },
  flexBadgeModal: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
  },
  flexBadgeModalFilter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  badgeModal: {
    width: "auto",
    borderWidth: 2,
    borderRadius: 12,
    padding: 6
  },
  badgeModalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000"
  },
  listItemContainer: {
    paddingHorizontal: 0,
    borderColor: "#004C6D",
    backgroundColor: "#F2F2F2"
  },
  listItemTitle: {
    color: "#000000"
  }
});