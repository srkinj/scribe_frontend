<template>
    <div class="background">
        <div class="signup-form">
            <h1>РЕГИСТРАЦИЯ</h1>
            <div class="username-container">
                <h2>Придумайте Ваш уникальный псевдоним:</h2>
                <input type="text" placeholder="Логин" v-model="signup.username" v-bind:class="{'invalid-email':!usernameValid}">
                <h3 v-bind:class="{'invalid-password' : !usernameValid}">{{usernameMessage}}</h3>
            </div>
            <div class="name-container">
                <h2>Как к Вам обращаться?</h2>
                <input type="text" placeholder="Имя" v-model="signup.firstName" >
                <input type="text" placeholder="Фамилия" v-model="signup.lastName">
            </div>
            <div class="email-container">
                <h2>E-mail необходим для подтверждения аккаунта</h2>
                <input type="text" placeholder="E-mail" v-model="signup.email" v-bind:class="{'invalid-email':!emailValid}">
                <h3 v-bind:class="{'invalid-password' : !emailValid}">{{emailMessage}}</h3>
            </div>
            <div class="password-container">
                <h2>Придумайте уникальный пароль:</h2>
                <input type="password" placeholder="Пароль" v-model="signup.password"  v-bind:class="{'invalid-email':(passwordMessage=='Пароль слишком короткий')}">
                <input type="password" placeholder="Повторите пароль" v-model="signup.passwordCheck" v-bind:class="{'invalid-email':(passwordMessage=='Пароли не совпадают')}">
                <h3 v-bind:class="{'invalid-password' : !passwordValid}">{{passwordMessage}}</h3>
            </div>
            
            <button class="sign-up-button" @click="submitForm" :disabled="!formIsValid">Зарегистрироваться</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            signup :{
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordCheck: ''
            },
            passwordMessage: '0',
            emailMessage : '0',
            usernameMessage: '0',
            csrfToken : '',
        }
    },
    methods: {
         validateEmail: function(email) {
            const re = new RegExp (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return re.test(String(email).toLowerCase());
        },
        submitForm: function () {

            // let formData = new FormData();
            // formData.append("file", 'aaa');
            // formData.append("id", 7878);
            // console.log(formData);
            // axios.interceptors.request.use(request => {
            //     console.log('Starting Request', JSON.stringify(request, null, 2))
            //     return request
            // })
            // axios({
            //     method: 'post',
            //     headers: {
            //         'X-CSRFToken':this.csrfToken,
            //         'withCredentials': 'true',
            //         'Cookie' : csrftoken
            //     },
            //     formData,
            //     url: 'http://localhost:8000/accounts/sign_up/',

            // })
            let formData = new FormData();
            formData.append("username", this.signup.username);
            formData.append("email", this.signup.email);
            formData.append("password", this.signup.password);
            formData.append("first_name", this.signup.firstName);
            formData.append("last_name", this.signup.lastName);
            
            const axiosInstance = axios.create({
            
            timeout: 5000,
            
            });
            axiosInstance.defaults.withCredentials = true;
            axiosInstance.defaults.xsrfCookieName = 'csrftoken'
            axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken'
            axiosInstance.post(
            "http://localhost:8000/api/users/",
                 formData ,
        {
          headers: {
            'X-CSRFToken':  this.csrfToken,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'multipart/form-data',
        
          }
        }
      ).then ((response) => {
          this.onLogin()
      }, (error) => {
          console.log(error);
      })
        },
        onLogin: function () {
           
            this.$store.dispatch('login',{login: this.signup.username, password : this.signup.password})
            .then( (response) => {
                this.$router.push('/SeasonSignUp')
               
            })
            .catch ((error) => {
                console.log(error);
            })
         
        }
    
    },
    computed: {
        formIsValid: function () {
            if (this.emailValid && this.passwordValid && this.usernameValid && this.signup.username && this.signup.email && this.signup.password && this.signup.passwordCheck){
                
                return (true)
            }else {
                
                return (false)
            }

        },
        emailValid: function () {
            if (this.signup.email && !this.validateEmail(this.signup.email)) {
                this.emailMessage = 'Некорректный Email'
                return (false)
            }else if (this.signup.email && this.validateEmail(this.signup.email))
             {
                 

                axios ({
                    url: 'http://localhost:8000/api/check_email?email=' + this.signup.email,
                    method: 'get'
                }).then ( (response) => {
                    
                    if (response.data) {
                        this.emailMessage = 'Пользователь с таким Email уже существует'
                        
                    }else {
                        
                        this.emailMessage = '0'
                        
                    }
                } )
                if (this.emailMessage==='0') {
                    return (true)                    
                } else {
                    return (false)
                }
            }
            else{
                this.emailMessage = '0'
                return(true)
            }
        },
        passwordValid: function () {
            if ((this.signup.password && this.signup.passwordCheck) && (this.signup.password != this.signup.passwordCheck)  ) {
               this.passwordMessage = 'Пароли не совпадают'
                return (false)
            }else if (this.signup.password && this.signup.password.length < 5){
                this.passwordMessage = 'Пароль слишком короткий'
                return(false)
            }
            else{
                this.passwordMessage = '0' 
                return (true)
            }
            
        },
        usernameValid: function () {
            if(this.signup.username && this.signup.username.length <3){
                this.usernameMessage = 'Имя пользователя слишком короткое'
                return (false)
            } else if (this.signup.username && this.signup.username.length >3) {
                axios ({
                    url: 'http://localhost:8000/api/check_username?username=' + this.signup.username,
                    method: 'get'
                }).then ( (response) => {
                    
                    if (response.data) {
                        this.usernameMessage = 'Пользователь с таким логином уже существует'
                        
                    }else {
                        
                        this.usernameMessage = '0'
                        
                    }
                } )
                if (this.usernameMessage==='0') {
                    return (true)                    
                } else {
                    return (false)
                }
            }
            else {
                this.emailMessage = '0' 
                return (true)
            }
        }
        

    },
    mounted:  async function () {
        axios({
            method: 'get',
            url: 'http://localhost:8000/accounts/sign_up/',
            headers: {
                'withCredentials': 'true'
                // 'Access-Control-Allow-Credentials': 'true'
            }
        }).then((response) => {
             this.csrfToken = response.data.split('value="', 2)[1].split('"',1)[0]
        })

        
      
        
        

    }

}
</script>

<style scoped>
.invalid-email:focus {
    background-color:#FFEDED;
    border: red solid 2px;
}
.invalid-email {
    background-color:#FFEDED;
    border-color :red;
    outline:none;

}
.invalid-password  {
    opacity: 1;
}
h3 {
    opacity: 0;
    font-size: 15px;
    color: red;
    font-weight: 300;
    text-align: left;
    margin-left: 100px;
    margin-top: 0;
    margin-bottom: 0;

}

.sign-up-button:disabled {
    background-color: #c2d6ff;
    cursor: default;
}
.sign-up-button:hover:disabled {
    background-color: #c2d6ff;
    cursor: default;
}
.sign-up-button:hover {
    background-color: #c2d6ff;
    cursor: pointer;
}
.sign-up-button {
    width: 500px;
    height: 40px;
    margin: 30px auto;
    /* border: solid black 2px; */
    background-color: #97BBFF;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 24px;
    border-radius: 5px;
    border: none;
}
.password-container {
    margin-top: 30px;
}
.email-container {
    margin-top: 30px;
}
.name-container {
    margin-top: 30px;
}

::-webkit-input-placeholder {
   font-weight: 300;
   font-family: 'Roboto';
   font-size: 24px;
}
.signup-form {
    background-color: white;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 50px auto;
    border: #777777 solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    color: black;
    padding-bottom: 50px;
}
.background{
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    overflow: hidden;
    /* opacity: 0.8; */
}
h1 {
    font-size: 30px;
    font-weight: 400;
    margin-top: 50px;
    margin-bottom: 20px;
}
h2 {
    font-weight: 300;
    font-size: 20px;
    text-align: left;
    margin-left: 100px;
    margin-top: 0;
    margin-bottom: 0;
}
input {
    border: #777777 solid 2px;
    border-radius: 5px;
    margin: 5px 100px;
    padding: 5px;
    font-size: 24px;
    width: 586px; 
}
</style>