import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { FlatList, RefreshControl, TouchableOpacity, View, Image, ActivityIndicator, Alert, Text, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import { format } from 'timeago.js'
//estylos
import { styles } from '../Styles/Styles'
import { Testo, TouchsImg } from '../controller/Funciones';


const DATA = [
  { name: 'polo', title: "POLOS", IMGS: "https://scontent.fhex4-1.fna.fbcdn.net/v/t1.0-9/132127226_1007063246366915_691833097676974011_n.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_ohc=81T0E2vrrLoAX-PyVze&_nc_ht=scontent.fhex4-1.fna&oh=ff901343342d1928ad2fe1d75689ea91&oe=60027B58" },
  { name: 'comjunto', title: "COMJUNTOS", IMGS: "https://scontent.fhex4-1.fna.fbcdn.net/v/t1.0-9/131908051_1007063786366861_969532240772828827_n.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_ohc=rugIBysjtwQAX-7xQ9e&_nc_ht=scontent.fhex4-1.fna&oh=3dfd5d2e56b3e8316d5242b545a54570&oe=6004D9B2" },
  { name: 'blusa', title: "BLUSAS", IMGS: "https://scontent.fhex4-2.fna.fbcdn.net/v/t1.0-9/131466902_1007063236366916_4694319741015623003_n.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=lFOJB44HoOEAX9pwU18&_nc_ht=scontent.fhex4-2.fna&oh=19b1557a2693fc9d63605c2b6655103d&oe=6003C68A" },
  { name: 'jeans', title: "JEANS", IMGS: "https://scontent.fhex4-2.fna.fbcdn.net/v/t1.0-9/131902757_1007063446366895_2706498852884233843_n.jpg?_nc_cat=103&ccb=2&_nc_sid=730e14&_nc_ohc=I6z-IvuNmuQAX-7ASiZ&_nc_ht=scontent.fhex4-2.fna&oh=ee80e8e569831a852523e607dd56734e&oe=6006268C" },
  { name: 'playa', title: "PLAYA", IMGS: "https://scontent.fhex4-2.fna.fbcdn.net/v/t1.0-9/132018127_1007063553033551_3003198655903804379_n.jpg?_nc_cat=111&ccb=2&_nc_sid=730e14&_nc_ohc=oxthNePL0MUAX8wGnZO&_nc_ht=scontent.fhex4-2.fna&oh=82654b08f4e2bd9b8a05a7bd0980d689&oe=600353E8" },
  { name: 'vermuda', title: "VERMUDA", IMGS: "https://scontent.fhex4-1.fna.fbcdn.net/v/t1.0-9/131902925_1007063296366910_6248567470060214411_n.jpg?_nc_cat=102&ccb=2&_nc_sid=730e14&_nc_ohc=oOyrFyOT9PcAX9XJ-96&_nc_ht=scontent.fhex4-1.fna&oh=6b652dabf10da44b32b04b56aa6cc97b&oe=60027584" },
  { name: 'capri', title: "CAPRIS", IMGS: "https://scontent.fhex4-1.fna.fbcdn.net/v/t1.0-9/132015511_1007063093033597_4571971329678450268_o.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_ohc=428xRZcmkecAX-2bL69&_nc_ht=scontent.fhex4-1.fna&oh=08a56627c12636c5612de078d15abd56&oe=6002EBFA" },
  { name: 'pijama', title: "PIJAMAS", IMGS: "https://scontent.fhex4-2.fna.fbcdn.net/v/t1.0-9/132047313_1007063646366875_7082840470085665534_n.jpg?_nc_cat=109&ccb=2&_nc_sid=730e14&_nc_ohc=t2ZsXzM-ofEAX9o_ceU&_nc_ht=scontent.fhex4-2.fna&oh=fc3617f43634860b09ada807d8dd9d7c&oe=6003F643" },
  { name: 'vestido', title: "VESTIDOS", IMGS: "https://scontent.fhex4-2.fna.fbcdn.net/v/t1.0-9/131905085_1007062976366942_2895795784324326521_n.jpg?_nc_cat=107&ccb=2&_nc_sid=730e14&_nc_ohc=UZCgX5LKuosAX-4q_9L&_nc_ht=scontent.fhex4-2.fna&oh=f308b63af02c18ad6c3034c4bc9e7ee7&oe=6002BED9" }
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
      if (Platform.OS === 'web') {
        alert(`No Hay ${e}`)

      } else {
        Alert.alert('No Hay', e)
      }
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
          refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={this.state.scroll} />}
          ListEmptyComponent={() => (
            <View>

              {/*Botones */}
              <View >
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  style={{ ...styles.Link }}
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
                  initialNumToRender={1000}
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


                        <View style={{ ...styles.Texx, flexDirection: 'row' }}>
                          <View style={styles.Texx}>

                            <Testo sty={styles.Text} title={`$RD: ${item.precio}`} />
                            <Testo sty={styles.Text} title='Descripsion' />
                            <Testo title={item.descripsion} />
                            <Testo sty={styles.Te} title={format(item.createdAt)} />

                          </View>
                          <TouchableOpacity
                            style={{ ...styles.tatil, ...styles.openButton, height: 50, width: 50, borderRadius: 50, marginTop: 20, left: 120, backgroundColor: 'red' }}
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
