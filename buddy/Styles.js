import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({

  login_container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  login_header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: '#ffffff',
  },
  login_header_logo: {
    width: 220,
    resizeMode: 'contain',
  },
  login_header_text: {
    marginTop: 15,
    color: '#444444',
    fontSize: 16,
  },
  login_header_text_bold: {
    color: '#444444',
    fontWeight: 'bold',
  },
  login_wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 280,
  },
  form_input: {
    height: 44,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#EDF0F7',
    borderRadius: 50,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    backgroundColor: '#B00326',
    borderRadius: 50,
  },
  button_label: {
    color: '#fff',
    fontSize: 15,
  },
  login_social: {
    width: '100%',
    maxWidth: 280,
    marginTop: 20,
  },
  login_social_separator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  login_social_separator_line: {
    flex: 1,
    width: '100%',
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  login_social_separator_text: {
    marginHorizontal: 10,
    color: '#808080',
    fontSize: 16,
  },
  login_social_buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  login_social_button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 60,
  },
  login_social_icon: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  login_social_facebook: {
    backgroundColor: '#4267B2',
    borderColor: '#4267B2',
  },
  login_footer_text: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#808080',
    fontSize: 15,
  },
  login_footer_link: {
    color: '#208AEC',
    fontSize: 15,
    fontWeight: 'bold',
  },
  login_footer_guest: {
    marginLeft: 5,
    marginTop: 5,
  },
  //Main.js
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white", // Set the background color to white
  },


  // HomepageScreen.js
  container1: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "white"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
    marginTop: 30,
  },

  inputContainerPerson: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "left",
  },
  autocompleteContainer: {
    position: 'relative',
    alignItems: 'center',
    position: 'relative',
  },
  autocompleteContainerFocused: {
    borderWidth: 0,
    borderColor: '#d1002d',
    position: 'relative',
  },
  autocompleteInput: {
    height: 30,
    width: 150,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: '#d1002d',
    paddingHorizontal: 10,
    fontSize: 18,
    position: 'relative',
  },
  autocompleteInputFocused: {
    textAlign: 'left', // Reset the text alignment to left when focused
    position: 'relative',
  },
  autocompleteDropdown: {
    position: 'relative',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: '#d1002d',
    borderRadius: 5,
    maxHeight: 200,
  },

  autocompleteDropdownContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1002d',
    borderRadius: 5,
    maxHeight: 200,
    alignItems: 'center', // Align the dropdown items in the center
  },

  autocompleteDropdownContent: {
    flexGrow: 1,
    position: 'relative',
    marginHorizontal: 10,
    marginVertical: 10,
  },

  autocompleteItem: {
    padding: 10,
    fontSize: 18,
    position: 'relative',
  },
  guestContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  guestButtonText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#B00326',
    borderWidth: 0,
    borderRadius: 5,
    marginHorizontal: 5,
    fontSize: 30,
    color: "#B00326",
    fontWeight: "bold",
    marginBottom: 30,
  },
  icon: {
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
  },
  datePickerContainerLeft: {
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#B00326",
    borderRadius: 25,
    paddingVertical: 8, // Adjust the padding as needed
    paddingHorizontal: 8, // Adjust the padding as needed
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16, // Adjust the font size as needed
    textAlign: "center",

  },
  smallText: {
    fontSize: 14, // Adjust the font size as needed
    textAlign: "center",
  },
  datePicker: {
    width: 90, // Adjust the width as needed
    marginHorizontal: 5,
  },
  searchButton: {
    backgroundColor: "#B00326",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 5,
    alignSelf: "center",
    flex: 1,
    marginRight: 10,
    marginBottom: 30
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    backgroundColor: "#B00326",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 5,
    alignSelf: "center",

    flex: 1,
    marginLeft: 10,
    marginBottom: 30
  },
  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  input: {
    fontSize: 18,
    marginLeft: 7,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 0,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,


  },
  radioButtonText: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: 'bold',

  },

  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  radioButtonWrapper: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#B00326',
    marginRight: 10,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',

  },


  //Lottie
  containerL: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  animationContainer: {
    alignItems: 'center'
  },
  lottie: {
    width: 100,
    height: 100,
  },
  loadingText: {
    position: 'absolute',
    top: '50%',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10, // Adjust the value to vertically center the text
  },
  personText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,

  }
});


export default Styles;