import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet,Platform,Button} from 'react-native';
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
export default class PickImage extends Component {
    constructor(){
      super()
      this.state = {
          image:null
      }
    }

   getpermission=async()=>{
       if(Platform.OS!=="web"){
           const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
           if(status!=="granted"){
               alert("Sorry!We Need Camera Permissions To Make App Work")
           }
       }
   }

componentDidMount(){
    this.getpermission()
}

uploadimage=async(uri)=>{
    const data=new FormData()
var filename=uri.split("/")[uri.split("/").length-1]
var type=`image/${uri.split(".")[uri.split(".").length-1]}`
const filetoupload={
    uri:uri,
    name:filename,
    type:type
}
data.append("digit",filetoupload)
fetch("https://d924d9bb00ec.ngrok.io",{
    method:"POST",
    body:data,
    headers:{"content-type":"multipath/form-data"}
})
.then((response)=>response.json())
.then((result)=>{
    console.log("Success",result)
})
.catch((error)=>{
    console.error("error",error)
})
}

pickimage=async()=>{
    try{
        var result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
    if(!result.cancelled){
        this.setState({
            image:result.data
        })
        this.uploadimage(result.uri)
    }
    }
    catch(error){
        console.log(error)
    }
}

render(){
    return(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Button
            title="Pick An Image From Gallery"
            onPress={this.pickimage}
            />
        </View>
    )
}
}