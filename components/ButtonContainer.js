import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';


export const ColorButtons = ({label, ...rest}) => {
   return (
      <TouchableOpacity 
         accessible={true}
         accessibilityLabel='Chatroom color'
         accessibilityHint="Select Chatroom color"
         {...rest}>
      </TouchableOpacity>
   )
}

export const EnterChatButton = ({label, ...rest}) => {
return ( 
      <TouchableOpacity
            accessibilityLabel='Enter chatroom'
            {...rest}>
         <Text style={styles.button_text}>
               {label}
         </Text>
      </TouchableOpacity>
      )
};



const styles = StyleSheet.create({

})
