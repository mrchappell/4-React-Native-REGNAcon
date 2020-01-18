import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CELEBS } from '../shared/celebs';

class Guests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            celebs: CELEBS
        };
    }

    static navigationOptions = {
        title: 'Guests'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderGuestItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('GuestInfo', { celebId: item.id })}
                    leftAvatar={{ source: require('./images/logo.png')}}
                />
            );
        };

        return (
            <FlatList
                data={this.state.celebs}
                renderItem={renderGuestItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}


export default Guests;