import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'

const AddlistFlyBtn = () => {
  return (
    <TouchableOpacity onPress={()=>{router.navigate("/addlist")}} style={styles.flybtn}>
      <FontAwesome name='plus' size={25} color={"white"} /> 
    </TouchableOpacity>
  )
}

export default AddlistFlyBtn

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