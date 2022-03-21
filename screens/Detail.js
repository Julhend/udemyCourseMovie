import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import PlayButton from '../components/PlayButton';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
//import service need to use bracket
import {getMovie} from '../services/services';
import Video from '../components/Video';
const placeholderImage = require('../assets/images/images.png');
const height = Dimensions.get('screen').height;
//slr / state less component return
const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  const videoShown = () => {
    //   take current state of the modal true/false and then do oposite to close or open
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                {/* pas button di klik modal nya muncul dari function videoshown  */}
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
              />

              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          {/* modal buat nampilin video , pake button play */}
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              {/* close modal with pressable*/}
              {/* <Pressable onPress={() => videoShown()}>
                <Text>{'Hicssssssde '}</Text>
              </Pressable> */}

              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" color="grey" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    top: 10,
    textAlign: 'center',
    color: 'black',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  overview: {
    //padding is margin top,left,right ,bot
    padding: 15,
    color: 'black',
  },
  release: {
    fontWeight: 'bold',
    color: 'black',
  },
  playButton: {
    position: 'absolute',
    top: -33,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
