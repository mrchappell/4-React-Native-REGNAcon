import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        celebs: state.celebs,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: celebId => (postFavorite(celebId))
};

function RenderCeleb(props) {

    const { celeb } = props;

    if (celeb) {
        return (
            <Card
                featuredTitle={celeb.name}
                image={{ uri: baseUrl + celeb.image }}>
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

    markFavorite(celebId) {
        this.props.postFavorite(celebId);
    }

    static navigationOptions = {
        title: 'Guest Information'
    };

    render() {
        const celebId = this.props.navigation.getParam('celebId');
        const celeb = this.props.celebs.celebs.filter(celeb => celeb.id === celebId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.celebId === celebId);
        return (
            <ScrollView>
                <RenderCeleb celeb={celeb}
                    favorite={this.props.favorites.includes(celebId)}
                    markFavorite={() => this.markFavorite(celebId)}
                />
                <RenderComments comments={comments} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestInfo);