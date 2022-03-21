import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/Color';

const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};
class Navbar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image
              style={styles.logo}
              source={require('../assets/images/jul.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon
                name={'search-outline'}
                size={30}
                color={Colors.lightGray}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={Colors.lightGray} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  mainNav: {
    //flex for align item in right way
    flex: 1,
    //item will be space each other
    justifyContent: 'space-between',
    //flex direction default is column where item under each other, change to row to make it horizontal
    flexDirection: 'row',
    //push away item to the border / give distance
    padding: 10,
    //to make item center to each other
    alignItems: 'center',
  },
});

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
