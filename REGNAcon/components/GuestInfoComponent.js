import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { CELEBS } from '../shared/celebs';
import { COMMENTS } from '../shared/comments';

function RenderCeleb(props) {

    const { celeb } = props;

    if (celeb) {
        return (
            <Card
                featuredTitle={celeb.name}
                image={require('./images/logo.png')}>
                <Text style={{ margin: 10 }}>
                    {celeb.description}
                </Text>
                <Icon
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    reverse
                    onPress={() => props.favorite ?
                        console.log('Already set as a favorite') : props.markFavorite()}
                />
            </Card>
        );
    }
    return <View />;
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class GuestInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            celebs: CELEBS,
            comments: COMMENTS,
            favorite: false
        };
    }

    markFavorite() {
        this.setState({ favorite: true });
    }

    static navigationOptions = {
        title: 'Guest Information'
    };

    render() {
        const celebId = this.props.navigation.getParam('celebId');
        const celeb = this.state.celebs.filter(celeb => celeb.id === celebId)[0];
        const comments = this.state.comments.filter(comment => comment.celebId === celebId);
        return (
            <ScrollView>
                <RenderCeleb celeb={celeb}
                    favorite={this.state.favorite}
                    markFavorite={() => this.markFavorite()}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default GuestInfo;