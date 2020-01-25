import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        celebs: state.celebs
    };
};

class Guests extends Component {


    static navigationOptions = {
        title: 'Guests'
    };

    render() {
        const { navigate } = this.props.navigation;
        const renderGuestItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('GuestInfo', { celebId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        if (this.props.celebs.isLoading) {
            return <Loading />;
        }
        if (this.props.celebs.errMess) {
            return (
                <View>
                    <Text>{this.props.celebs.errMess}</Text>
               </View>
            );
        }
        return (
            <FlatList  
                data={this.props.celebs.celebs}
                renderItem={renderGuestItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Guests);