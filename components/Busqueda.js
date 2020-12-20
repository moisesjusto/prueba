import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View, TextInput, Alert, Platform } from 'react-native'
import { styles } from '../Styles/Styles'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Bus extends Component {
    state = {
        search: '',
        Data: [],
    };

    updateSearch = async (search) => {
        this.setState({ search })
        if (Platform.OS === 'web') {
            alert('Hola', 'Aun no tenemos esta funcion ativa SORRI')
        }else{
            Alert.alert('Hola', 'Aun no tenemos esta funcion ativa SORRI')
        }
        
    };
    update = () => {
        this.setState({ search: '' });
    };

    render() {
        const { search } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar style='auto' />
                <View style={styles.Barra} />

                <View style={{ flexDirection: 'row', flex: 0.1, alignItems: 'center' }}>

                    <Icon
                        color=' rgba(156, 156, 156, 0.473)'
                        size={30}
                        name="arrow-left"
                        style={styles.iconoo}
                        onPress={() => this.props.navigation.goBack()}
                    />

                    <TextInput
                        placeholder="Buscar."
                        onChangeText={this.updateSearch}
                        value={search}
                        style={styles.Inputt}
                        autoFocus={true}
                    />

                    <Icon
                        color=' rgba(156, 156, 156, 0.473)'
                        size={30}
                        name="close"
                        style={styles.iconoo}
                        onPress={this.update}
                    />

                </View>
                <View style={styles.barraa} />
            </View>
        )
    }
}

