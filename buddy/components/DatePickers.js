import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDaysIcon } from "react-native-heroicons/solid";

import Styles from '../Styles';




export default function DatePickers({
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    showFromDatePicker,
    setShowFromDatePicker,
    showToDatePicker,
    setShowToDatePicker,
    showFromDatepicker,
    showToDatepicker }) {

    return (<>{/* set the date picker From */}
        <View style={Styles.dateContainer}>
            <CalendarDaysIcon style={Styles.icon} size={30} color="#B00326" />
            <View style={[Styles.datePickerContainer, Styles.datePickerContainerLeft]}>
                <TouchableOpacity onPress={showFromDatepicker} style={Styles.button}>
                    <Text style={[Styles.buttonText, Styles.smallText]}>From</Text>
                </TouchableOpacity>
                {showFromDatePicker && (
                    <DateTimePicker
                        value={fromDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || fromDate;
                            setShowFromDatePicker(Platform.OS === 'ios');
                            setFromDate(currentDate);
                        }}
                        style={Styles.datePicker} // Apply a custom style to the DateTimePicker
                    />
                )}
            </View>

            {/* set the date picker To */}
            <View style={Styles.datePickerContainer}>
                <TouchableOpacity onPress={showToDatepicker} style={Styles.button}>
                    <Text style={[Styles.buttonText, Styles.smallText]}>To</Text>
                </TouchableOpacity>
                {showToDatePicker && (
                    <DateTimePicker
                        value={toDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || toDate;
                            setShowToDatePicker(Platform.OS === 'ios');
                            setToDate(currentDate);
                        }}
                        style={Styles.datePicker} // Apply a custom style to the DateTimePicker
                    />
                )}
            </View>
        </View>
    </>
    );
}