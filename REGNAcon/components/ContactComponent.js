import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
import * as WebBrowser from 'expo-web-browser';


class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    state = {
        result: null,
    };

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['convention@regnacon.co'],
            subject: 'Inquiry',
            body: 'To whom it may concern:'
        })
    }

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.google.com/maps/place/601+Commerce+St,+Nashville,+TN+37203/@36.1611155,-86.7821982,17z/data=!4m5!3m4!1s0x88646658ce635165:0x701e185202931c75!8m2!3d36.1612488!4d-86.7801528');
        this.setState({ result });
    };


    render() {
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card title="Contact Information"
                        wrapperStyle={{ margin: 20 }}>
                        <Text>601 Commerce St.</Text>
                        <Text>Nashville, TN 37203</Text>
                        <Text style={{ marginBottom: 10 }}>U.S.A</Text>
                        <Text>Phone: 1-206-555-1234</Text>
                        <Text>Email: convention@regnacon.co</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />}
                            onPress={() => this.sendMail()}
                        />
                    </Card>
                </Animatable.View>
                <Card title="Directions"
                    wrapperStyle={{ margin: 20 }}>
                    <View>
                        <Button 
                            title="Click for Map" 
                            buttonStyle={{ backgroundColor: '#5637DD', margin: 40 }}
                            icon={<Icon
                                name='map-marker'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{ marginRight: 10 }}
                            />}
                            onPress={this._handlePressButtonAsync} />
                        <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default Contact;
