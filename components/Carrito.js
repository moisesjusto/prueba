import { StatusBar } from 'expo-status-bar';
import React, { Component, useCallback } from 'react'
import { Text, View, Image, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, Platform } from 'react-native'
import { styles } from '../Styles/Styles'
import Axios from 'axios'
import { TouchsAlert } from '../controller/Funciones';
import { useFocusEffect } from '@react-navigation/native'
import { Alert } from 'react-native';

export default class cardStyles extends Component {

    state = {
        Cart: [],
        $: 0,
        number: 0,
        scroll: null,
        Av: false,
        Ef: null,
    }


    componentDidMount() {
        this.GetData();
    }


    GetData = async () => {
        const ID = this.props.route.params._id;
        const res = await Axios.get(`https://moises-back.herokuapp.com/Notes/${ID}`);
        
            this.setState({
                Cart: res.data,
                scroll: false,
                Ef: false
            })
        
        this.DD()
        this.props.navigation.setOptions({tabBarBadge: res.data.length})

    }



    onRefresh = () => {
        this.setState({
            scroll: true,
            $: 0
        });

        this.GetData();
    }

    DD = () => {
        let count = 0;
        const Press = this.state.Cart.map((i) => (parseInt(i.precio)));
        while (Press.length > count) {
            const Init = Press[count];
            const In = this.state.$;
            const OO = Init + In;
            this.setState({
                $: 0,
                $: OO
            })
            count = count + 1;
        }
    }




    Guardar = async () => {
        this.setState({ Ef: true })
        const Pedido = this.state.Cart;
        const ID = this.props.route.params._id;
        const Orden = {
            arr: Pedido,
            dueño: `${ID}`
        }
        await Axios.post('https://moises-back.herokuapp.com/Card', Orden);
        this.Delete(ID);
    }

    Delete = async (e) => {
        await Axios.delete(`https://moises-back.herokuapp.com/Notes/${e}`);
        this.setState({
            $: 0,
            Cart: [],
            Ef: false
        })

        if (Platform.OS === 'web') {
            alert('Hola','esta compra ha sido guardada en el camion de  pedidos')
        }else{
            Alert.alert('Hola','esta compra ha sido guardada en el camion de  pedidos')
        }

        this.GetData()
        this.props.navigation.navigate('Pedidos')
    }

    Targeta = () => {
        this.setState({ Av: true });
        this.Aviso();
    }

    Targ = () => {
        this.setState({ Av: false });
        this.Aviso();
    }

    Aviso = () => {
        if (this.state.Av === false) {
            return (<View />)
        } else {

            return (
                <TouchsAlert
                    txt='Este Pago aun no a Sido Integrado'
                    onPress={this.Targ} />
            )
        }
    }
    Efetctivo = () => {
        if (this.state.Ef === false) {
            return (
                <TouchableOpacity
                    onPress={this.Guardar}
                    style={styles.openButton}
                >
                    <Text style={styles.textStyle}>Efectivo</Text>
                </TouchableOpacity>
            )
        } else {

            return (
                <ActivityIndicator size='large' color="rgb(5, 146, 0)" />
            )
        }
    }
    Efeto = () => {
        useFocusEffect(

            useCallback(() => {
                if (this.state.number > 0) {
                    this.setState({
                        $: 0,
                        Cart: [],
                    }),
                        this.GetData();
                } else {
                    this.setState({
                        number: 1,
                    })
                }
            }, [])
        );

        return null;
    }

    List = (e) => {
        this.props.navigation.navigate('list', e)
    }

    render() {

        const Datos = this.state.Cart;
        return (
            <View style={{ flex: 1 }}>
                <this.Efeto />
                <StatusBar style='auto' />
                <View style={styles.Barra} />
                <View style={styles.cardd}>
                    <View>
                        <Text style={styles.a} >
                            Tipos De Pagos
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>

                        <TouchableOpacity
                            onPress={() => this.Targeta()}
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                        >
                            <Text style={styles.textStyle}>Targeta</Text>
                        </TouchableOpacity>
                        <this.Efetctivo />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.i}>
                            <Text style={styles.o}>
                                monto
                        </Text>
                            <Text style={styles.o}>
                                $RD: {this.state.$}
                            </Text>
                        </View>
                        <View style={styles.i}>
                            <Text style={styles.u}>
                                Cantidad
                        </Text>
                            <Text style={styles.u}>
                                {Datos.length}
                            </Text>
                        </View>
                    </View>

                </View>
                <this.Aviso />
                {/* lista */}
                <FlatList
                    data={Datos}
                    keyExtractor={item => item._id}
                    refreshControl={<RefreshControl onRefresh={this.onRefresh} refreshing={this.state.scroll} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={item._id}
                            onPress={() => this.List(item)}
                        >
                            <View style={styles.card}>
                                <View>
                                    <Image
                                        style={styles.imgg}
                                        source={{ uri: item.url }}
                                        resizeMethod='scale'
                                        resizeMode='stretch'
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <Text> CATEGORIA: {item.categoria} </Text>
                                    <Text>PRECIO: {item.precio} </Text>
                                    <Text> DESCRIPSION </Text>
                                    <Text> {item.descripsio} </Text>

                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View>
                            <View style={styles.card}>

                                <View style={{ marginLeft: 10 }}>
                                    <Text> No hay  </Text>
                                    <Text>Arcticulos</Text>
                                    <Text>Ve y compra algunos</Text>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}



