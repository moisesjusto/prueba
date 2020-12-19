import React, { Component } from 'react'
import {
  Alert,
  TextInput,
  View,
} from 'react-native'

// inport
import Axios from 'axios';
//styles
import { styles } from '../Styles/Styles'
import { Botones, Cardd, Testo, TouchsIcon } from '../controller/Funciones'


export default class Regis extends Component {

  state = {
    Stads: null,
    Userr: [],
    email: '',
    password: '',
    name: '',
    lastname: '',
    provincia: '',
    sector: '',
    calle: '',
    tel: '',
    Datos: this.props.route.params
  }

  // funciones

  //axios
  Onclick = async () => {
    this.setState({Stads: true})
    this.Botones()

    const { provincia, sector, calle, tel } = this.state;
    const { name, lastname, email, password } = this.state.Datos;
    const NewData = { name, tel, lastname, email, password, provincia, calle, sector };
    const res = await Axios.post('https://moises-back.herokuapp.com/NewUser', NewData);
    try {
      this.props.navigation.navigate('Login', res.data)
    } catch (e) {

    }

  }

  Alerttas = (e) => {
    Alert.alert('Alerta', e)
  }
  //segundo boton
  Datoss = () => {
    const { name, lastname, email, password } = this.state;
    const na = name.toLowerCase();
    const las = lastname.toLowerCase();
    const em = email.toLowerCase();
    const pas = password.toLowerCase();
    if (na.length > 2) {
      if (las.length > 2) {
        if (em.includes('@gmail.com') && em.endsWith('@gmail.com') || em.includes('@hotmail.com') && em.endsWith('@hotmail.com')) {
          if (pas.length > 4) {
            const NewData = {
              name: na,
              lastname: las,
              email: em,
              password: pas
            };
            this.props.navigation.push('Regis', NewData)
          } else {
            this.Alerttas('La contraceña debe tener almenos 4 carateres')
          }
        } else {
          this.Alerttas('El email no es balido')
        }
      } else {
        this.Alerttas('Introduce un apellido valido')
      }
    } else {
      this.Alerttas('Introduce un nombre valido')
    }

  }



  User = (name, value) => {
    this.setState({
      [name]: value
    })
  }


  //inpus
  Inputs = () => {
    const datos = this.props.route.params;
    if (!datos) {
      return (
        <View>
          <View style={styles.Spacio2} />
          <Testo sty={styles.texto} title='Nombre' />
          <TextInput style={styles.Input}
            autoFocus={true}
            onChangeText={value => this.User('name', value)}
          />
          <Testo sty={styles.texto} title='Apellido' />
          <TextInput style={styles.Input}
            onChangeText={value => this.User('lastname', value)}
          />
          <Testo sty={styles.texto} title='Correo Eletronico' />
          <TextInput style={styles.Input}
            autoCompleteType='email'
            onChangeText={value => this.User('email', value)}
          />
          <Testo sty={styles.texto} title='Contraceña' />
          <TextInput style={styles.Input}
            secureTextEntry={true}
            onChangeText={value => this.User('password', value)}
          />


        </View>
      )
    } else {
      return (
        <View>
          <View style={styles.Spacio2} />
          <Testo sty={styles.texto} title='Provincia' />
          <TextInput style={styles.Input}
            autoFocus={true}
            onChangeText={value => this.User('provincia', value)}
          />
          <Testo sty={styles.texto} title='Sector' />
          <TextInput style={styles.Input}
            onChangeText={value => this.User('sector', value)}
          />
          <Testo sty={styles.texto} title='Calle' />
          <TextInput style={styles.Input}
            onChangeText={value => this.User('calle', value)}
          />
          <Testo sty={styles.texto} title='Tel' />
          <TextInput style={styles.Input}
            onChangeText={value => this.User('tel', value)}
          />
        </View>
      )
    }
  }

  //botones
  Botones = () => {
    const STADO = this.state.Stads;
    const datos = this.props.route.params;
    if (!datos) {
      return (
        <Botones
          title='Sig'
          onPress={this.Datoss}
        />
      )
    } else {
      return (
        <Botones
          title='Siguiente'
          Stado={STADO}
          Stados={STADO}
          onPress={this.Onclick}
        />
      )
    }
  }

  render() {
    return (
      <Cardd
      Back={
        <TouchsIcon
        size={30}
        sty={styles.iconoo}
        size={30}
        name="arrow-left"
        onPress={()=> this.props.navigation.goBack()}
        />
    }
        title='Registrate'
        Cardr={
          <View>
            <this.Inputs />
            <View style={styles.Spacio} />
            <this.Botones />
            <View style={styles.Spacio} />
          </View>
        }
      />

    )

  }
}
