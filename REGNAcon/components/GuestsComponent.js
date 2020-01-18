import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Guests(props) {

    const renderGuestsItem = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: require('./images/logo.png')}}
            />
        );
    };

    return (
        <FlatList 
            data={props.celebs}
            renderItem={renderGuestsItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Guests;