import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  AsyncStorage
} from 'react-native'

import SpotList from '../components/SportList'

import logo from '../assets/logo.png'

export default function List() {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      //http://192.168.0.0:3333 ip do expo
      const socket = socketio('http://192.168.0.0:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} para a o dia ${booking.date} foi ${
            booking.approved ? 'Aceita' : 'Rejeitada'
          }`
        )
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
})
