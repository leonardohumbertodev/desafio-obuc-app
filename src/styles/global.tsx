import { StyleSheet, Dimensions } from 'react-native';

export const baseStyles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.05,
  },
  inputContainer: {
    height: 48,
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16
  },
  inputText: {
    fontSize: 16,
    outlineStyle: "none",
    color: "#000000"
  },
  errorInput: {
    marginTop: 0,
    marginBottom: 0,
    color: "#FF4D4F"
  },
  checkBoxText: {
    fontSize: 16,
    marginLeft: 6,
    color: "#000000"
  },
  btnPrimary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "100%",
    backgroundColor: "#004C6D",
    borderRadius: 16,
  },
  btnPrimaryText: {
    fontSize: 16,
    color: "#FFFFFF"
  },
  btnSecondary: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "100%",
    borderWidth: 2,
    borderColor: "#004C6D",
    borderRadius: 16,
  },
  btnSecondaryText: {
    fontSize: 16,
    color: "#004C6D"
  },
  marginLogout: {
    marginRight: 16
  },
  textLogout: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  flexExit: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 16,
    marginRight: 16
  },
  rowExit: {
    flexDirection: "row",
    alignItems: "center"
  },
  textExit: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000"
  },
  loadingContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  mt24: {
    marginTop: 24
  },
  mt32: {
    marginTop: 32
  },
  ml10: {
    marginLeft: 10
  },
  mb14: {
    marginBottom: 14
  }
});