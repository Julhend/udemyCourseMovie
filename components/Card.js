import React from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const placeholderImage = require('../assets/images/images.png');

const propTypes = {
  item: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;
    return (
      //touchble opacity - kek button pas disentuh ada efect
      <TouchableOpacity
        //Details nama harus sama kek yang di app.js
        //pas di klik ke halaman detail
        onPress={() => navigation.navigate('Detail', {movieDetail: item})}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path}
              : placeholderImage
          }
        />
        {/* if no picture in movive there will be title in the card */}
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    // justifyContent: 'center',
    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
  },
});

Card.propTypes = propTypes;
export default Card;
