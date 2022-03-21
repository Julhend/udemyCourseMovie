//pure componet shortcut = pcs
import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/Color';

class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      //funciton handle press untuk show modal video
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Icon name={'caret-forward-outline'} size={30} color={Colors.black} />
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});
export default PlayButton;
