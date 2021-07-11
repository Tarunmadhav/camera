import React,{Component} from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PickImage from './caamera';

function Demo() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Text>This is top text.</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
}

export default class App extends Component{
  render(){
  return (
    <SafeAreaProvider>
    <PickImage/>
    </SafeAreaProvider>
  );
}
}
