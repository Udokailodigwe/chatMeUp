import React from 'react';
import {
   View, 
   Text, 
   StyleSheet, 
   TextInput, 
   ImageBackground, 
   TouchableOpacity, 
   // Pressable,
   Button 
} from 'react-native'; // import react-native components

const image = require ('../assets/BackgroundImage.png');

export default class Start extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         name: ' ',
         backgroundColor: this.colors.skyblue
      };
   }

   //setState on backgroundColor selection
   changeBackgroundColor = (newColor) => {
      this.setState({backgroundColor: newColor});
   }

   colors= 
   {
      skyblue: '#2E86C1',
      gold: '#B7950B',
      darkgreen: '#28B463',
      green: '#B9C6AE'
   };

   render () {
      
      return (
         <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}
                        accessibilityRole = 'App Title'
                        accessibilityLabel='Welcome to UDO chat App'>
               UDO {"\n"} Chat App
            </Text >
         <View style={styles.mid_view}>
            <Text style={styles.input_label} accessibilityLabel='Input your name'>
               Input your name
            </Text>
            <TextInput 
               accessibilityLabel='Input your name in text field'
               style={styles.text_input}
               value={this.state.name}
               onChangeText={(name) => this.setState({name})}
            /> 
         <View>
            <Text  style={styles.color_info_text} 
                        accessibilityLabel='Select colors for chatroom below'> 
               Tap to select different Chat Room color
            </Text>
         <View style={styles.color_display}>
                  {/*TouchableOpacity allowed for the selection of various colors, recieved setState*/}
            <TouchableOpacity
            accessible={true}
            accessibilityLabel='Chatroom color'
            accessibilityHint="Select Chatroom color"
            style={styles.first_color}
            onPress={() => this.changeBackgroundColor(this.colors.skyblue)}> 
            </TouchableOpacity>               
            <TouchableOpacity
            accessible={true}
            accessibilityLabel='Chatroom color'
            accessibilityHint="Select Chatroom color"
            style={styles.second_color}
            onPress={() => this.changeBackgroundColor(this.colors.gold)}>
            </TouchableOpacity>               
            <TouchableOpacity
            accessible={true}
            accessibilityLabel='Chatroom color'
            accessibilityHint="Select Chatroom color"
            style={styles.third_color}
            onPress={() => this.changeBackgroundColor(this.colors.darkgreen)}>
            </TouchableOpacity>               
            <TouchableOpacity
            accessible={true}
            accessibilityLabel='Chatroom color'
            accessibilityHint="Select Chatroom color"
            style={styles.fourth_color}
            onPress={() => this.changeBackgroundColor(this.colors.green)}>
            </TouchableOpacity>               
            </View>
            </View>
            {/*Used pressable to form button like component*/}
            <Button 
            accessibilityLabel='Enter chatroom'
            title = ' Enter Chat Room'
            style={styles.pressable_button}
            //onPress function to route and navigate props to chat screen, props like name, bgcolor.
            onPress={() => this.props.navigation.navigate('Chat', {
               name:  this.state.name, 
               name2:  this.state.name, 
               backgroundColor: this.state.backgroundColor
               })}
            >
               {/* <Text style= {styles.pressable_button_text}>Enter Chat Room</Text> */}
            </Button>
         </View>
         </ImageBackground>
      </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
   },

   mid_view: {
      justifyContent: 'center',
      backgroundColor: "#000000c0",
      marginTop: 100,
      marginBottom: 300,
      margin: 10,
      borderRadius: 10
   },

   title: {
      color: '#000000c0',
      textAlign: 'center',
      fontSize: 45,
      fontWeight: '800'
   },

   input_label: {
      fontSize: 16,
      textAlign: 'center',
      color: 'white',
      fontWeight: '800',
      fontStyle: 'italic',
      marginBottom: 5
   },

   text_input: {
      borderColor: 'white',
      borderWidth: 3,
      height: 50,
      fontSize: 20,
      borderRadius: 20,
      margin: 20,
      marginBottom: 5,
      color: 'black',
      backgroundColor: 'white'
   },

   image: {
      justifyContent: "center",
      flex: 1
   },

   first_color: {
      backgroundColor: '#2E86C1',
      width: 50,
      height: 50,
      borderRadius: 25
   },

   second_color: {
      backgroundColor: '#B7950B',
      width: 50,
      height: 50,
      borderRadius: 25
   },

third_color: {
      backgroundColor: '#28B463',
      width: 50,
      height: 50,
      borderRadius: 25
   },

fourth_color: {
      backgroundColor: '#B9C6AE',
      width: 50,
      height: 50,
      borderRadius: 25
   },
color_display: {
   flexDirection: 'row',
   justifyContent: 'space-evenly',

},
color_info_text: {
   textAlign: 'center',
   color: 'white',
   margin: 10
},
// pressable_button: {
//    width: '50%',
//    height: 35,
//    backgroundColor: '#8A95A5',
//    alignItems: 'center',
//    justifyContent: 'center',
//    margin: 20,
//    marginLeft: 90,
//    padding: 3,
//    borderRadius: 15,
//    shadowOpacity: 6,

// },
// pressable_button_text: {
//    color: 'black',
//    fontSize: 22,
//    fontWeight: "300",
//    fontStyle: 'italic',
// }
})