import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CELEBS } from '../shared/celebs';

function RenderCeleb({celeb}) {
   
    if (celeb) {
        return (
            <Card
                featuredTitle={celeb.name}
                image={require('./images/logo.png')}>
                <Text style={{margin: 10}}>
                    {celeb.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class GuestInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            celebs: CELEBS
        };
    }

    static navigationOptions = {
        title: 'Guest Information'
    };

    render() {
        const celebId = this.props.navigation.getParam('celebId');
        const celeb = this.state.celebs.filter(celeb => celeb.id === celebId)[0];
        return <RenderCeleb celeb={celeb} />;
    }
}

export default GuestInfo;