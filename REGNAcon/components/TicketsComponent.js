import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';

class Tickets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tickets: 1,
            vip: false,
            date: '',
            showModal: false
        };
    }

    static navigationOptions = {
        title: 'Reserve Passes'
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    handleTickets() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            tickets: 1,
            vip: false,
            date: '',
            showModal: false
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Passes</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.tickets}
                        onValueChange={itemValue => this.setState({ tickets: itemValue })}>
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>VIP Perks Pass?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.vip}
                        trackColor={{ true: '#008355', false: null }}
                        onValueChange={value => this.setState({ vip: value })}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker
                        style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        format='YYYY-MM-DD'
                        mode='date'
                        placeholder='Select Date'
                        minDate={new Date().toISOString()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={date => { this.setState({ date: date }) }}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleTickets()}
                        title='Search'
                        color='#008355'
                        accessibilityLabel='Tap me to search and reserve passes'
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Search Pass Availability</Text>
                        <Text style={styles.modalText}>Number of Passes: {this.state.tickets}</Text>
                        <Text style={styles.modalText}>VIP Perk Pass?: {this.state.vip ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date: {this.state.date}</Text>
                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color='#AC3800'
                            title='Close'
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#008355',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Tickets;