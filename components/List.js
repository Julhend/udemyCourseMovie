import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Card from '../components/Card';
import PropTypes from 'prop-types';
import Colors from '../theme/Color';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            horizontal={true}
            renderItem={({item}) => (
              <Card navigation={navigation} item={item} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 20,
    color: Colors.black,
  },
});

List.propTypes = propTypes;
export default List;
