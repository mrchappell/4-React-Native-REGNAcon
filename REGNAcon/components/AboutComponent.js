import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { PARTNERS } from '../shared/partners';

function Mission() {
    return (
        <Card title="Our Mission"
            wrapperStyle={{ margin: 10 }}>
            {/* this wrapper made the text format the same as the example */}
            <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Hendrerit dolor magna eget est lorem ipsum dolor. Volutpat consequat mauris nunc congue nisi vitae suscipit. Viverra justo nec ultrices dui sapien. Molestie at elementum eu facilisis sed odio morbi. A scelerisque purus semper eget duis at. Pharetra vel turpis nunc eget. Sed egestas egestas fringilla phasellus faucibus scelerisque. Felis imperdiet proin fermentum leo vel orci porta non pulvinar. Varius vel pharetra vel turpis nunc.
            </Text>
        </Card>
    );
}

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            partners: PARTNERS
        };
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render() {

        const renderPartner = ({ item }) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: require('./images/bootstrap-logo.png') }}
                />
            );
        };

        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList
                        data={this.state.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );

    }
}


export default About;
