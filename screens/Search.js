import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';
import Colors from '../theme/Color';

const Search = ({navigation}) => {
  const [text, onChangeText] = useState();
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState(false);

  const onSubmit = query => {
    Promise.all([searchMovieTv(query, 'movie'), searchMovieTv(query, 'tv')])
      .then(([movies, tv]) => {
        const data = [...movies, ...tv];
        setSearchResults(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={'Search Movies or TV Shows'}
              placeholderTextColor={Colors.black}
              onChangeText={onChangeText}
              value={text}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {/* Searched items results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {/* When searched but no results */}
          {searchResults && searchResults.length == 0 && (
            <View style={styles.noResults}>
              <Text style={styles.text}>
                No results matching your criteria.
              </Text>
              <Text style={styles.text}>Try different keywords.</Text>
            </View>
          )}

          {/* When nothing is searched */}
          {!searchResults && (
            <View style={styles.empty}>
              <Text style={styles.text}>Type something to start searching</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    //bikin jadi round
    borderRadius: 15,
    //lebar border
    borderWidth: 0.5,
    height: 50,
    //push content / text inside to not teralu ke tepi
    padding: 8,
  },
  container: {
    //spasi dari atas
    padding: 10,
    paddingTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },

  form: {
    //giving flex dinamic to form
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },

  searchItems: {
    padding: 5,
  },

  noResults: {
    paddingTop: 20,
  },
  empty: {
    paddingTop: 5,
  },
  text: {
    color: Colors.black,
  },
});

export default Search;
