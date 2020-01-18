import React, { Component } from 'react';
import Guests from './GuestsComponent';
import { CELEBS } from '../shared/celebs';
import GuestInfo from './GuestInfoComponent';
import { View } from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            celebs: CELEBS,
            selectedCeleb: null
        };
    }

    onCelebSelect(celebId) {
        this.setState({ selectedCeleb: celebId });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Guests celebs={this.state.celebs} onPress={celebId => this.onCelebSelect(celebId)} />
                <GuestInfo celeb={this.state.celebs.filter(celeb => celeb.id === this.state.selectedCeleb)[0]} />
            </View>
        );
    }
}

    export default Main;