import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Chat extends React.Component {

   render () {
      //receiving and deconstructing props
      let {name, backgroundColor}=this.props.route.params; 

      //set name props as title wwhen entered in the input field of start
      this.props.navigation.setOptions({title: ['Hi',  name]}); 
      

      return (
         <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor //use recieved props as style properties
            }}>
            <Text style={styles.text}>Welcome to Chat Room </Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   text: {
   
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 30,
      fontWeight: '100'
   }
})