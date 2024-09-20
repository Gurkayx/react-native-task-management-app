import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'

const AddtodoFlyBtn = () => {
  return (
    <TouchableOpacity onPress={()=>{router.navigate("/addtodo")}} style={styles.flybtn}>
      <FontAwesome name='plus' size={25} color={"white"} /> 
    </TouchableOpacity>
  )
}

export default AddtodoFlyBtn

const styles = StyleSheet.create({
    flybtn:{
        backgroundColor:"#2f95dc",
        width:60,
        height:60,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        bottom:20,
        right:20,
        borderRadius:20,
        zIndex:50
    }
})