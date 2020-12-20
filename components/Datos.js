import React, { Component } from 'react'
import { Text, View, TextInput, Alert, Platform } from 'react-native'
import Axios from 'axios';
import { styles } from '../Styles/Styles';
import { Button, Card } from "react-native-elements";
import { Botones, Cardd, Testo, TouchsIcon } from '../controller/Funciones';

export default class Datos extends Component {

    state = {
        calle:"",
        createdAt:"",
        email:"",
        lastname:"",
        name:"",
        password:"",
        provincia:"",
        sector:"",
        tel:"",
        _id:"",
        Stado: false

    }

     componentDidMount() {
        const { _id, calle, createdAt, email, lastname, name, password, provincia, sector, tel } = this.props.route.params;

        this.setState({
            calle:calle,
            createdAt:createdAt,
            email:email,
            lastname: lastname,
            name: name,
            password:password,
            provincia:provincia,
            sector:sector,
            tel:tel,
            _id:_id
        })

    }

    Editar = async () => {
        const { name, calle, createdAt, email, lastname, password, provincia, sector, tel, _id } = this.state;

        const Users = { calle, createdAt, email, lastname, name, password, provincia, sector, tel }
        const res = await Axios.put(`https://moises-back.herokuapp.com/NewUser/${_id}`,Users);
        if (res.data === 'ok') {
            this.setState({
                Stado: false
            })
            Alert.alert('atualizado')
        } else{
            if (Platform.OS ==='web') {
                alert(`Ubo un error`)
            }else{
                Alert.alert('Ubo un error')
            }
        }
    }

    User = (name, value) => {
        this.setState({
            [name]:value
        })
    }

    //separadores
    Separa = () => {
        return (
            <View>
                <View style={styles.R} />
                <View style={styles.Spacio2} />
            </View>
        )
    }

    render() {
        const State = this.state.Stado;
        if (State === false) {
            const Data = [this.state];
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
                    sty={{ flex: 1 }}
                    Datos={Data}
                    keyExt={item => item._id}
                    render={({ item }) => (
                        <View style={styles.fondo}
                            key={item._id}
                        >
                            <View style={styles.reyeno} />
                            <View style={styles.Form} >
                                <Card.Title>Tus Datos</Card.Title>
                                <Card.Divider />
                                <View style={styles.Spacio2} />
                                {/* nombre */}
                                <Testo sty={styles.Te} title='Nombre' />
                                <Testo sty={styles.Te} title={item.name} />
                                <this.Separa />

                                {/* apellido */}
                                <Testo sty={styles.Te} title='Apellido' />
                                <Testo sty={styles.Te} title={item.lastname} />

                                <this.Separa />

                                {/* email */}
                                <Testo sty={styles.Te} title='Email' />
                                <Testo sty={styles.Te} title={item.email} />
                                <this.Separa />

                                {/* contraceña */}
                                <Testo sty={styles.Te} title='Contraceña' />
                                <Testo sty={styles.Te} title='xxxxxxxxxx' />
                                <this.Separa />

                                {/* provincia */}
                                <Testo sty={styles.Te} title='Provincia' />
                                <Testo sty={styles.Te} title={item.provincia} />
                                <this.Separa />

                                {/* sector */}
                                <Testo sty={styles.Te} title='Sector' />
                                <Testo sty={styles.Te} title={item.sector} />
                                <this.Separa />

                                {/* calle */}
                                <Testo sty={styles.Te} title='Calle' />
                                <Testo sty={styles.Te} title={item.calle} />
                                <this.Separa />

                                {/* tel */}
                                <Testo sty={styles.Te} title='Tel' />
                                <Testo sty={styles.Te} title={item.tel} />
                                <this.Separa />

                                <Botones
                                    sty={styles.Info}
                                    title='Editar'
                                    onPress={() => { this.setState({ Stado: true }) }}
                                />

                                <View style={{...styles.Input,borderBottomWidth:0,height:1}} />
                                <View style={styles.Spacio2} />
                            </View>
                        </View>
                    )} />

            )
        } else {
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
                    Cardr={
                        <View>
                            {/* nombre */}
                            <Text style={styles.texto}>Nombre</Text>
                            <TextInput style={styles.Input}
                                maxLength={30}
                                value={this.state.name}
                                onChangeText={(value) => this.User('name', value)}
                            />
                            {/* apellido */}
                            <Text style={styles.texto}>Apellido</Text>
                            <TextInput style={styles.Input}
                                value={this.state.lastname}
                                onChangeText={(value) => this.User('lastname', value)}
                            />
                            {/* email */}
                            <Text style={styles.texto}>Email</Text>
                            <TextInput style={styles.Input}
                                autoCompleteType='email'
                                value={this.state.email}
                                onChangeText={(value) => this.User('email', value)}
                            />
                            {/* contraceña */}
                            <Text style={styles.texto}>Contraceña</Text>
                            <TextInput style={styles.Input}
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={(value) => this.User('password', value)}
                            />
                            {/* provincia */}
                            <Text style={styles.texto}>Provincia</Text>
                            <TextInput style={styles.Input}
                                value={this.state.provincia}
                                onChangeText={(value) => this.User('provincia', value)}
                            />
                            {/* sector */}
                            <Text style={styles.texto}>Sector</Text>
                            <TextInput style={styles.Input}
                                value={this.state.sector}
                                onChangeText={(value) => this.User('sector', value)}
                            />
                            {/* calle */}
                            <Text style={styles.texto}>Calle</Text>
                            <TextInput style={styles.Input}
                                value={this.state.calle}
                                onChangeText={(value) => this.User('calle', value)}
                            />
                            {/* tel */}
                            <Text style={styles.texto}>Tel</Text>
                            <TextInput style={styles.Input}
                                value={this.state.tel}
                                onChangeText={(value) => this.User('tel', value)}
                            />
                            <View style={styles.Spacio} />
                            <Button
                                title='Guardar'
                                onPress={this.Editar}
                            />
                        </View>
                    }
                />
            )
        }
    }
}


