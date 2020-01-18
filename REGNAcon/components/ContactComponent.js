import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';


class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Card title="Contact Information"
                    wrapperStyle={{ margin: 20 }}>
                    <Text>601 Commerce St.</Text>
                    <Text>Nashville, TN 37203</Text>
                    <Text style={{ marginBottom: 10 }}>U.S.A</Text>
                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: convention@regnacon.co</Text>
                </Card>
            </ScrollView>
        );
    }
}

export default Contact;
