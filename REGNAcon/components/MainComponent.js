import React, { Component } from 'react';
import Guests from './GuestsComponent';
import { CELEBS } from '../shared/celebs';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          celebs: CELEBS
        };
    }

    render() {
        return <Guests celebs={this.state.celebs} />;
    }
}

export default Main;