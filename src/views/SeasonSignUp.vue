<template>
<div class="season-section">
    <div class="block-header">Зарегистрируйтесь на марафон</div>
    <!-- <div class="season-selector"> -->
        <select v-model="selectedSeason" class="season-selector">
            <option v-for="season in seasons" v-bind:key='season.id' v-bind:value='season.id'> {{season.title}}</option>
        </select>
    <!-- </div> -->
    <button class="sign-up-button" :disabled="!selectedSeason" @click="submitSeason">Зарегистрироваться</button>
    <h3 v-bind:class="{'invalid-season' : !seasonValid}">{{errorMessage}}</h3>
</div>
    
</template>

<script>

import axios from 'axios';

export default {
    data: function () {
        return {
            seasons: [],
            selectedSeason: '',
            errorMessage: '0'
        }
    },
    methods: {
        submitSeason: function () {
            axios ({
                method : 'get',
                url: 'http://localhost:8000/api/register/'+this.selectedSeason,
                headers: {
                'Authorization':'Token '+this.$store.state.token
                }
            })
            .then (() =>{
                this.$store.dispatch('getUserInfo')
                this.$router.push('/home')
            })
            .then (0, (error) => {
                console.log(error.response)
                if (error.response.status===400) {
                    this.errorMessage='Вы уже записаны на данный марафон'
                }
                else if (error.response.status===403){
                    this.errorMessage='Ваш аккаунт был заблокирован'
                }
            })
        }
    },
    computed: {
        seasonValid: function () {
            if(this.errorMessage === '0'){
                return (true)
            }else {
                return(false)
            }
        }

    },
    mounted: function () {
        axios( {
            method: 'get',
            url : 'http://localhost:8000/api/seasons/',
            headers: {
            'Authorization':'Token '+this.$store.state.token
            }

        }).then ((response) => {
            response.data.results.forEach(element => {
                if(element.registration_open){
                let season = {}
                season.id = element.id
                season.title = element.title
                this.seasons.push(season)
                }
            });
        })
    }
    
}
</script>

<style scoped>
.invalid-season  {
    opacity: 1;
}
h3 {
    opacity: 0;
    font-size: 20px;
    color: red;
    font-weight: 300;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 10px;

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
.season-selector {
    width: 500px;
    height: 60px;
    margin: 50px auto;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 24px;
    text-transform: uppercase;
    color: #777777;
}

option{
    margin-left: 15px;
    font-family: 'Roboto';
    font-weight: 300;
    font-size: 24px;
}

.block-header {
    text-transform: uppercase;
    margin: 30px 0;
    font-weight: 300;
    font-size: 28px;
}
.season-section {
    width: 800px;
    display: flex;
    flex-direction: column;
    margin: 160px auto;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    color: black;
}

</style>