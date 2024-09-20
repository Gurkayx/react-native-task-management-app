import {Image, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import emptyImage from "@/assets/images/empty.png"

const NoTodoHave = () => {

  const theme = useColorScheme() ?? "light";


  return (
    <View style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1}}>
      <Image source={emptyImage} style={{height:400,marginBottom:40}} />
      <Text style={{color:theme==="dark" ? "white":"black",fontSize:28,fontWeight:"bold"}}>Burası sanki biraz ıssızz...</Text>
      <Text style={{color:theme==="dark" ? "white":"black"}}>Not eklemek için + butonuna tıkla</Text>
    </View>
  )
}

export default NoTodoHave
