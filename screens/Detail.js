import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
//import service need to use bracket
import {getMovie} from '../services/services';

//slr / state less component return
const Detail = ({route, navigation}) => {
  const movieId = route.params.movieDetail.id;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  return (
    <React.Fragment>
      {loaded && <Text>{movieDetail.title}</Text>}
    </React.Fragment>
  );
};

export default Detail;
