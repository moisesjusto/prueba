import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { FlatList, RefreshControl, TouchableOpacity, View, Image, ActivityIndicator, Alert, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import { format } from 'timeago.js'
//estylos
import { styles } from '../Styles/Styles'
import { Testo, TouchsImg } from '../controller/Funciones';


const DATA = [
  { name: 'polo', title: "POLOS", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606316212/moisespaca/descarga_8_zwrfpx.jpg" },
  { name: 'blusa', title: "BLUSAS", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606318864/moisespaca/descarga_10_kjn2z1.jpg" },
  { name: 'jeans', title: "JEANS", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606318984/moisespaca/images_10_v9kokr.jpg" },
  { name: 'playa', title: "PLAYA", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606318985/moisespaca/images_9_serpmj.jpg" },
  { name: 'vermuda', title: "VERMUDA", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606319443/moisespaca/descarga_12_tvrnst.jpg" },
  { name: 'capri', title: "CAPRIS", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1607354431/capri_b21l7o.jpg" },
  { name: 'pijama', title: "PIJAMAS", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606319078/moisespaca/images_20_zfcxjg.jpg" },
  { name: 'vestido', title: "VESTIDOS", IMGS: "https://res.cloudinary.com/moises-pacas/image/upload/v1606325269/71bcp6b_UyL._AC_UX385__oq5hiv.jpg" }
]


export default class Login extends Component {

  state = {
    scroll: null,
    Shopp: null,
    D: [],
  }

  componentDidMount() {
    this.GetNotes()
  }

  //guardar notas
  GetNotes = async () => {
    const res = await Axios.get('https://moises-notas.herokuapp.com/api/notes');
    this.setState({
      D: res.data,
      scroll: false,
      Shopp: false,
    })
  }

  //getBotones
  GetBotones = async (e) => {
    const res = await Axios.get(`https://moises-notas.herokuapp.com/api/notes/Busq/${e}`);
    if (res.data.length > 0) {
      this.setState({
        D: res.data
      })
    } else {
      Alert.alert('No Hay', e)
    }

  }

  Delete = async (e) => {
    await Axios.delete(`https://moises-notas.herokuapp.com/api/notes/${e}`);
    this.GetNotes()
    this.props.navigation.navigate('Carrito')
    this.props.navigation.goBack()
  }


  Guardar = async (e) => {
    this.setState({
      Shopp: true
    });
    const Nota = {
      name: `${e.name}`,
      precio: `${e.precio}`,
      dueño: `${this.props.route.params._id}`,
      url: `${e.imgs}`,
      categoria: `${e.categoria}`,
      descripsio: `${e.descripsion}`,
      id: `${e._id}`
    }
    const res = await Axios.post('https://moises-back.herokuapp.com/Notes', Nota);
    if (res.data === null) {
      this.GetNotes();
      alert('no esta')
    } else {
      this.Delete(e._id);
    }

  }
  

  CardShop = (props) => {
    if (this.state.Shopp === false) {
      return (
        <Icon
          size={30}
          disabled={this.state.Shopp}
          name='cart-plus'
          color='#efefef'
          onPress={props.onPress} />
      )
    } else {
      return (
        <ActivityIndicator
          size='large' color='rgb(204, 204, 204)'
        />
      )
    }
  }

  onRefresh = () => {
    this.setState({
      scroll: true
    });
 
    this.GetNotes();
  }
  
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style='auto' />
        <View style={styles.Barra} />

        {/* Icono y boton de busqueda */}
        <View style={styles.Link}>
          <TouchableOpacity style={{ width: '40%', paddingLeft: 30 }} onPress={this.GetNotes} >
            <Image
              source={require('../assets/favi.png')}
              style={styles.icono}
            />
          </TouchableOpacity>
          <View style={styles.SS}>
            <Icon
              color=' rgba(156, 156, 156, 0.473)'
              style={{ padding: 10 }}
              size={30}
              name="search"
              onPress={() => this.props.navigation.navigate('Busqueda')}
            />
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          initialNumToRender={1000}
          refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={this.state.scroll} />}
          ListEmptyComponent={() => (
            <View>

              {/*Botones */}
              <View >
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  style={{ ...styles.Link, alignSelf: 'center' }}
                  horizontal={true}
                  data={DATA}
                  keyExtractor={item => item.title}
                  renderItem={({ item }) => (
                    <TouchsImg
                      styl={{ alignSelf: 'center', alignItems: 'center', margin: 5 }}
                      kei={item.title}
                      onPress={() => { this.GetBotones(item.name) }}
                      sour={{ uri: item.IMGS }}
                      resizeM='scale'
                      resize='stretch'
                      sty={styles.icc}
                      text={item.title}
                    />
                  )}
                />
              </View>

              {/* targetas */}

              <View>
                <FlatList
                  style={{ flexDirection: 'column-reverse' }}
                  data={this.state.D}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <View style={{ alignSelf: 'center' }} >
                      <TouchableOpacity
                        activeOpacity={2}
                        key={item._id}
                        style={{ width: '100%' }}

                      >
                        <View style={{ paddingLeft: 30, flexDirection: 'row', marginTop: 3 }}>
                          <Image
                            source={{ uri: item.imgs }}
                            style={styles.icono}
                            resizeMethod='scale'
                            resizeMode='stretch'
                          />
                          <Testo sty={styles.ttt} title={`  Categoria  #${item.categoria} `} />
                          

                        </View>

                        <Image
                          source={{ uri: item.imgs }}
                          style={styles.imsg}
                          resizeMethod='scale'
                          resizeMode='stretch'
                        />

                        
                        <View style={{...styles.Texx,flexDirection:'row'}}>
                          <View style={styles.Texx}>

                          <Testo sty={styles.Text} title={`$RD: ${item.precio}`} />
                          <Testo sty={styles.Text} title='Descripsion' />
                          <Testo title={item.descripsion} />
                          <Testo sty={styles.Te} title={format(item.createdAt)} />

                        </View>
                        <TouchableOpacity
                            style={{...styles.tatil,...styles.openButton,height:50,width:50,borderRadius:50,marginTop:20,left:120, backgroundColor:'red'}}
                          >
                            <this.CardShop
                              onPress={() => this.Guardar(item)}
                            />
                          </TouchableOpacity>

                         

                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  ListEmptyComponent={
                    <View>
                    <View style={styles.card}>
                        
                        <View style={{ marginLeft: 10 }}>
                            <Text> No hay  </Text>
                            <Text>Arcticulos</Text>
                            <Text>DE venta</Text>
                        </View>
                    </View>
                </View>
                  }
                />
              </View>
            </View>
          )}
        />

      </View>
    )
  }
}
