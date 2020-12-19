import React, { Component} from 'react'
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
//import { useFocusEffect } from '@react-navigation/native'
import { styles } from '../Styles/Styles'
import { Testo, TouchsIcon } from '../controller/Funciones'
import Axios from 'axios'

export default class List extends Component {

    state = {
        Lista: [this.props.route.params],

    }

    Deletene = async (e)=>{
        await Axios.delete(`https://moises-back.herokuapp.com/Notes/P/${e}`);
         this.props.navigation.goBack()
    }

    render() {
        const D = this.state.Lista;
        console.log(D);
        return (
            <View>
                <View style={styles.Barra} />
                <TouchsIcon
                    sty={{ ...styles.perfil, marginLeft: 5, }}
                    size={30}
                    name='arrow-left'
                    OnPress={() => this.props.navigation.goBack()}
                />

                <FlatList
                    data={D}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={2}
                            key={item._id}
                            style={{ width: '100%' }}

                        >
                            <View style={{ paddingLeft: 30, flexDirection: 'row', marginTop: 3 }}>
                                <Image
                                    source={{ uri: item.url }}
                                    style={styles.icono}
                                    resizeMethod='scale'
                                    resizeMode='stretch'
                                />
                                <Testo sty={styles.ttt} title={`  Categoria  #${item.categoria} `} />

                            </View>

                            <Image
                                source={{ uri: item.url }}
                                style={styles.imsg}
                                resizeMethod='scale'
                                resizeMode='stretch'
                            />

                            <View style={{ ...styles.Texx, marginLeft: 5 }}>

                                
                          <Testo title={item.name} />
                          <Testo sty={styles.Te} title={item.precio} />

                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                                <TouchableOpacity
                                   onPress={()=>this.Deletene(item._id)}
                                    style={{ ...styles.openButton, backgroundColor: 'red' }}
                                >
                                    <Text style={styles.textStyle}>Borrar</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    )}
                    ListEmptyComponent={
                        <View>
                            <ActivityIndicator size='large' color="#0000ff" />
                        </View>
                    }
                />


            </View>
        )
    }
}
