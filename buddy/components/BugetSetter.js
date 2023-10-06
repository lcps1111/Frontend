import React from "react";
import { View, Text } from "react-native";
import { CurrencyDollarIcon } from "react-native-heroicons/solid";
import Styles from '../Styles';
import { RadioButton } from 'react-native-paper';


export default BudgetSetter = ({ budget, setBudget }) => {
    return (
        <View style={Styles.inputContainer2}>
            <CurrencyDollarIcon style={Styles.icon} size={30} color="#B00326" />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton.Group onValueChange={(newBudget) => setBudget(newBudget)} value={budget}>
                    <View style={Styles.radioButtonContainer}>
                        <View style={Styles.radioButtonWrapper}>
                            <RadioButton value="Budgeted" color="#B00326" uncheckedColor="#B00326" icon={() => <Icon name="done" size={30} color="white" />} />
                        </View>
                        <Text style={Styles.radioButtonText}>Budgeted</Text>

                        <View style={Styles.radioButtonWrapper}>
                            <RadioButton value="Normal" color="#B00326" uncheckedColor="#B00326" icon={() => <Icon name="done" size={30} color="white" />} />
                        </View>
                        <Text style={Styles.radioButtonText}>Normal</Text>

                        <View style={Styles.radioButtonWrapper}>
                            <RadioButton value="Luxury" color="#B00326" uncheckedColor="#B00326" icon={() => <Icon name="done" size={30} color="white" />} />
                        </View>
                        <Text style={Styles.radioButtonText}>Luxury</Text>
                    </View>
                </RadioButton.Group>

            </View>
        </View>);

};