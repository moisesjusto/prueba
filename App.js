//dependencias
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import {
  View,
  TextInput,
  Image,
  Alert
} from 'react-native'
import Axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

//styles 
import { styles } from './Styles/Styles'

// controladores
import {
  Botones,
  Cardd,
  Testo,
  TouchsIcon,
  TouchsImg
} from './controller/Funciones'

//funciones
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

//inport
import Regis from './components/Regis'
import Layout from './components/Layout'
import Pedidos from './components/Pedidos'

import Busqueda from './components/Busqueda'
import Ayuda from './components/Ayuda'
import Carrito from './components/Carrito'
import Datos from './components/Datos'
import List from './components/List'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Userr: null,
      User: [],
      //form
      Email: '',
      Password: '',
      //quitar
      
    }
  }



  componentDidMount() {
    this.Datos();
  }

  Datos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@key')
      const Users = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (Users === null) {
        console.log('');
      } else {
        this.setState({
          Userr: true,
          User: Users
        })
      }
    } catch (e) {
      // error reading value
    }
  }


  AlertasDS = (e) => {
    Alert.alert('Alerta', e)
  }


  //wellcome
  Onclick = async () => {
    const { Email, Password } = this.state;
    const Emi = Email.toLowerCase();
    const Pass = Password.toLowerCase();
    if (Emi.length > 10) {
      if (Emi.includes('@gmail.com') && Emi.endsWith('@gmail.com') || Emi.includes('@hotmail.com') && Emi.endsWith('@hotmail.com')) {
        if (Pass.length > 4) {
          const Token = {
            email: Emi,
            password: Pass
          }

          const res = await Axios.post('https://moises-back.herokuapp.com/User', Token);
          const Res = res.data;
          if (Res === null) {

            this.AlertasDS('Correo o Contraceña Eroneas')

          } else {
            try {
              this.setState({
                Userr: Res
              })
              const jsonValue = JSON.stringify(Res)
              await AsyncStorage.setItem('@key', jsonValue)
              
            } catch (e) { }
          }

        } else {
          this.AlertasDS('contraceña incorreta')
        }
      } else {
        this.AlertasDS('correo no valido')
      }
    } else {
      this.AlertasDS('completa el canpo text')
    }

  }


  // Exi
  Us = async () => {
    try {
      const res = await AsyncStorage.removeItem('@key');
      this.setState({
        Userr: res
      })
    } catch (e) {

    }
  }



  User = (name, value) => {
    this.setState({
      [name]: value
    })
  }


  MJS = ()=>{
    Alert.alert('no puedes canviar esta foto aun')
  }
  
  //perfil

  Perfil = ({ navigation }) => {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style='auto' />
        <View style={styles.Barra} />

        {/* Perfil */}
        <View style={styles.perfil}>
          <TouchsImg
            sour={require('./assets/p.png')}
            sty={styles.icono}
            onPress={this.MJS}
          />

          <Testo sty={{ ...styles.a, fontSize: 15, alignSelf: 'center', paddingLeft: 10 }}
            title=' Tu Perfil'
          />

        </View>
        <View style={{ borderColor: 'black', borderWidth: 0.5 }} />

        {/* icon 1 */}
        <TouchsIcon
          sty={styles.perfil}
          size={30}
          name='user'
          title='Informacion Personal'
          onPress={() => navigation.navigate('Datos')}
        />

        {/* icon 2 */}
        <TouchsIcon
          size={30}
          sty={styles.perfil}
          name='question-circle'
          title='Ayuda'
          onPress={() => navigation.navigate('ayuda')}
        />

        {/* icon 3 */}
        <TouchsIcon
          size={30}
          sty={styles.perfil}
          name='sign-out'
          title=' Salir'
          onPress={this.Us}
        />

      </View>
    )
  }

  Guarda = async (e) => {
    try {
      const OK = JSON.stringify(e)
      await AsyncStorage.setItem('@key', OK);
    } catch (e) {

    }
  }

  //App
  Login = ({ route, navigation }) => {
    const NewUsers = route.params;
    if (NewUsers) {
      this.setState({
        Userr: NewUsers
      })
      this.Guarda(NewUsers)
    } else { }

    return (
      <Cardd
        title='Bienbenido'
        Cardr={
          <View>
            <Testo
              sty={styles.texto}
              title='Correo Eletronico'
            />
            <TextInput style={styles.Input}
              autoCompleteType='email'
              maxLength={30}
              onChangeText={(value) => this.User('Email', value)}
            />
            <Testo
              sty={styles.texto}
              title='Contraceña'
            />
            <TextInput style={styles.Input}
              secureTextEntry={true}
              onChangeText={(value) => this.User('Password', value)}
            />
            <View style={styles.Spacio} />

            <Botones
              title='iniciar secion'
              onPress={this.Onclick}
            />
            <View style={styles.Spacio} />
            <Botones
              type='clear'
              title='Crear Cuenta'
              onPress={() => navigation.navigate('Regis')}
            />
            <Botones
              type='clear'
              title='Olvide Mi Contraceña'
              onPress={() => navigation.navigate('ayuda')}
            />
          </View>
        }
      />
    )
  }



  // Tab
  UI = () => {
    return (
      <Tab.Navigator
        initialRouteName='Home'
        headerMode='none'
        barStyle={{ backgroundColor: '#efefef' }}
        activeColor='rgb(92, 91, 91)'
        inactiveColor='rgba(156, 156, 156, 0.473)'
        screenOptions={{tabBarBadge:null}}

      >
        <Tab.Screen name="Home" component={Layout}
          initialParams={this.state.User}

          options={{

            tabBarIcon: (props) => (
              <Icon
                name="home"
                color={props.color}
                size={20}

              />
            ),
          }}
        />
        <Tab.Screen name="Carrito" component={Carrito}
          initialParams={this.state.User}
          options={{
            tabBarBadge: null,
            tabBarIcon: props => (
              
                <Icon
                  name="shopping-cart"
                  color={props.color}
                  size={20}
                />
                
            )
          }}
        />
        <Tab.Screen name="Pedidos" component={Pedidos}
          initialParams={this.state.User}
          options={{
            tabBarBadge: null,
            tabBarIcon: props => (
              <Icon
                name="truck"
                color={props.color}
                size={20}
              />
              
            )
          }}
        />
        <Tab.Screen name="Perfil" component={this.Perfil}
          initialParams={this.state.User}
          options={{
            tabBarIcon: () => (
              <Image
                source={require('./assets/p.png')}
                style={styles.ImgIcon}
              />)
          }}

        />
      </Tab.Navigator>
    )
  }
  render() {
    const Key = this.state.Userr;
    return (
      <SafeAreaProvider>
        <NavigationContainer >
          <Stack.Navigator headerMode='none' initialRouteName='UI'  >
            {
              Key ? (
                <>
                  <Stack.Screen name='UI' component={this.UI} />
                  <Stack.Screen name='Busqueda' component={Busqueda} initialParams={this.state.User} />
                  <Stack.Screen name='ayuda' component={Ayuda} initialParams={this.state.User} />
                  <Stack.Screen name='Datos' component={Datos} initialParams={this.state.User} />
                  <Stack.Screen name='list' component={List} />

                </>
              ) : (
                  <>
                    <Stack.Screen name='Login' component={this.Login} />
                    <Stack.Screen name='Regis' component={Regis} />
                    <Stack.Screen name='ayuda' component={Ayuda} />
                  </>
                )
            }
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}

