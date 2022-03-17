import React, {Component} from 'react';
import Start from './components/Start';
import Chat from './components/Chat';

//used to handle all kind of touches 
import 'react-native-gesture-handler'; 
// enable navigations between screens
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(); //stacks pages unto of each other

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <NavigationContainer>
              {/* used initialRouteName to determine which screen to load first */}
          <Stack.Navigator initialRouteName="Start"> 
            {/* stacks screen untop of each, and used name prop to label sreen header */}
            <Stack.Screen name = 'Start' component={Start}/> 
            <Stack.Screen name = 'Chat' component={Chat}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

