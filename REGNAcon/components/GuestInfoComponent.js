import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        celebs: state.celebs,
        comments: state.comments,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: celebId => (postFavorite(celebId)),
    postComment: (celebId, rating, author, text) => (postComment(celebId, rating, author, text))
};

function RenderCeleb(props) {

    const { celeb } = props;

    if (celeb) {
        return (
            <Card
                featuredTitle={celeb.name}
                image={{ uri: baseUrl + celeb.image }}>
                <Text style={styles.textWithShadow }>
                    {celeb.description}
                </Text>
                <View style={styles.cardRow}>
                    <Icon
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        raised
                        reverse
                        onPress={() => props.favorite ? console.log('Already set as a favorite')
                            : props.markFavorite()}
                    />
                    <Icon style={styles.cardItem}
                        name='pencil'
                        type='font-awesome'
                        color='#5637DD'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                </View>
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
                <Rating style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                    startingValue={item.rating}
                    imageSize={10}
                    read-only />
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
            showModal: false,
            rating: 5,
            author: "",
            text: ""
        };
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }
    handleComment(celebId, rating, author, text) {
        this.props.postComment(celebId, rating, author, text);
        this.toggleModal();
    }


    resetForm() {
        this.setState({
            showModal: false,
            rating: 5,
            author: "",
            text: ""

        });
    }

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
                    onShowModal={() => this.toggleModal()} />
                <RenderComments comments={comments} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}>

                    <View style={styles.modal}>
                        <Rating
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                            style={{ paddingVertical: 10 }}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(author) => this.setState({ author: author })}
                            value={this.state.author}
                        />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                            leftIconContainerStyle={{ paddingRight: 10 }}
                            onChangeText={(comment) => this.setState({ text: comment })}
                            value={this.state.text}
                        />
                        {/* The next View component holding the Submit button also needed the margin set for the formatting to reflect correctly.  */}
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    this.handleComment(celebId, this.state.rating, this.state.author, this.state.text);
                                }}
                                title='Submit'
                                color='#5637DD'
                            />
                        </View>
                        <View style={{ margin: 10 }}>
                            <Button
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                title='Cancel'
                                color='#808080'
                            />
                        </View>
                    </View>
                </Modal >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardItem: {
        flex: 1,
        margin: 10
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    textWithShadow:{
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(GuestInfo);