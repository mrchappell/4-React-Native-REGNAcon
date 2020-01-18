import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderCeleb({celeb}) {   
    if (celeb) {
        return (
            <Card
                featuredTitle={celeb.name}
                image={require('./images/patrickstewart.jpg')}>
                <Text style={{margin: 10}}>
                    {celeb.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

function GuestInfo(props) {
    return <RenderCeleb celeb={props.celeb} />;
}

export default GuestInfo;