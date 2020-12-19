import { StatusBar } from 'expo-status-bar';
import React, { Component, useCallback } from 'react'
import { Text, View, FlatList, TouchableOpacity, Acti } from 'react-native'
import { styles } from '../Styles/Styles'
import Axios from 'axios'
import {useFocusEffect} from '@react-navigation/native'

export default class cardStyles extends Component {
    state = {
        Pedidos: [],
        Progres: 0,
        number: 0,
    }


     componentDidMount() {
        this.GetData()
    }

    GetData = async()=>{
        const ID = this.props.route.params._id;
        const res = await Axios.get(`https://moises-back.herokuapp.com/Card/${ID}`);

        if (res.data.length > 0) {
            this.setState({
                Pedidos: res.data
            })
        } else{
            const Carta =[ 
                {_id:'no tienes nigun pedido',createdAt: 'haora mismo'}
            ]
            this.setState({Pedidos: Carta})
        }
        this.props.navigation.setOptions({tabBarBadge: this.state.Pedidos.length})

    }

    Efeto=()=> {
        useFocusEffect(

            useCallback(() => {
                if (this.state.number > 0) {
                    this.GetData()
                }else{
                    this.setState({number: 1})
                }
            }, [])
          );
        
          return null;
    }

    render() {
        const DATA = this.state.Pedidos;
        const AC = this.state.Progres;
        return (
            <View style={{ flex: 1 }}>
                <this.Efeto/>
                <StatusBar style='auto' />
                <View style={styles.Barra} />
                <View style={styles.cardd}>
                    <View>
                        <Text style={styles.a} >
                            Progresos
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                        <View>
                            <View style={styles.progress}>
                                <View style={{ width: 0, height: 0, backgroundColor: '#11b827', borderRadius: 50 }} />
                            </View>
                        </View>
                        <View style={styles.progress}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#11b827', borderRadius: 50 }} />
                        </View>
                        <View style={styles.progress}>
                            <View style={{ width: 25, height: 25, backgroundColor: '#11b827', borderRadius: 50 }} />
                        </View>
                        <View style={styles.progress}>
                            <View style={{ width: 50, height: 50, backgroundColor: '#11b827', borderRadius: 50 }} />
                        </View>

                    </View>
                    
                </View>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={item._id}
                            style={{ margin: 5 }}
                        >
                            <View style={styles.card}>
                                <View>
                                    <View style={styles.progress}>
                                        <View style={{ width: AC, height: AC, backgroundColor: '#11b827', borderRadius: 50 }} />
                                    </View>
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text> ID: {item._id}</Text>
                                    <Text>Fecha de Emicion</Text>
                                    <Text>{item.createdAt}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View>
                        <View style={styles.card}>
                            
                            <View style={{ marginLeft: 10 }}>
                                <Text> No hay  </Text>
                                <Text>Pedidos Pendientes</Text>
                                <Text>Ve y as el tullo haora</Text>
                            </View>
                        </View>
                    </View>
                    }
                />
            </View>
        )
    }
}



