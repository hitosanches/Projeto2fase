import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import api from '../../Services/Api/api';
import * as G from '../../styles/styles_adm';
import * as C from './style';
import * as Yup from 'yup';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const ValidaLogin = async() => {

        const schema = Yup.object().shape({
            email: Yup.string()
                .required("Erro: O campo e-mail é obrigatório!")
                .email("Erro: Por favor informar um e-mail válido!"),
            password: Yup.string()
                .required("Erro: O campo senha é obrigatório!")

        });
        try{
            return await schema.validate({email, password});
        }catch(err){
            return setStatus({
                type: 'error',
                message: err.message
            });
        }
    };

    const Logar = async () => {

        if(!(await ValidaLogin())) return;
        
        try{
            const result = await api.post('login', {
                email,
                password
            });

            alert(result.data.mensagem);
            return navigation.navigate('Home');

        }catch(err){
            return setStatus({
                type: 'error',
                message: "Erro: E-mail ou senha incorretos!"
            });
        }
    };

    return (

        <C.Container>

            <StatusBar
                hidden={false}
            />

            <C.ImageTop
                source={require('../../Assets/Login/imageTop.png')}
            />

            <C.Login>

                <C.Title>ENTRAR</C.Title>
                <G.Texto>Email</G.Texto>
                <G.Input
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <G.Texto>Senha</G.Texto>
                <G.Input
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setPassword(text)}
                />
                <C.Status>
                    <C.StatusTextDanger>{status.type === 'error' ? status.message : ""}</C.StatusTextDanger>
                </C.Status>
                <C.EsqueciSenha>
                    <C.Text>Esqueci minha senha</C.Text>
                </C.EsqueciSenha>
                <G.Button onPress={Logar}>
                    <G.TextButton>ENTRAR</G.TextButton>
                </G.Button>

                <C.ImageBot
                    source={require('../../Assets/Login/imageBot.png')}
                />
            </C.Login>

        </C.Container>
    )
}

export default Login;