<template>
    <div class="background">
    <div class="login-form">
        <h1>ВОЙТИ</h1>
        <input type="text" placeholder="E-mail" v-model="auth.login">  
        <input type="password" placeholder="Пароль" v-model="auth.password">
        <div class="forgot-container">
        <router-link to="" class="forgot-link" >Забыли пароль? </router-link>  
        </div>
        <button class="sign-in-button" @click="onLogin" :disabled="(!auth.login || !auth.password)">
            ВОЙТИ
        </button>
        <div class="join">
            Новый пользователь?
            <router-link to="/signup" class="join-link" >Зарегистрируйтесь</router-link>
        </div>
    </div>
    </div>
</template>

<script>


export default { 
    data: function () {
        return {
            auth :{ 
            login: '',
            password: '',
            }
        }
    },
    methods: {
        onLogin: function () {
           
            this.$store.dispatch('login',this.auth)
            .then( (response) => {
                this.$router.push('/home')
                console.log('THEN')
            })
            .catch ((error) => {
                console.log(error+'sdfv');
            })
            
            
          
        
        
        }
    },
    mounted: function () {
        if (this.$store.state.token){
            this.$router.push('/home')

        }
    }
    
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT&family=Roboto:wght@300;400&display=swap');

.sign-in-button:disabled {
    background-color: #c2d6ff;
    cursor: default;
}
.sign-in-button:hover:disabled {
    background-color: #c2d6ff;
    cursor: default;
}
.sign-in-button:hover {
    background-color: #c2d6ff;
    cursor: pointer;
}


.login-form {
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 800px;
    margin: 100px auto;
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
    font-size: 24pt;
    font-weight: 400;
}
input {
    border: black solid 2px;
    border-radius: 5px;
    margin: 15px 100px;
    padding: 5px;
    font-size: 16pt;
}
.forgot-container {
    display: flex;
    flex-direction: row;
    margin: 10px 100px;
}
.forgot-link {
    color: #2972FF;
    font-size: 16pt;
    font-weight: 300;
}
.sign-in-button { 
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
.join {
    display: flex;
    margin: 30px auto;
    font-size: 16pt;
}
.join-link {
    color: #2972FF;
    margin-left: 5px;
}

</style>