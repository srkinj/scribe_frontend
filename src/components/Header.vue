<template>
    <div class="preheader">
        <header class="header">
            <div class="logo"><router-link to="/home" >ПИСЬМОВНИК</router-link></div>
            <div class="sections">
                <router-link to="/task" class="section-link" >Задания</router-link>
                <router-link to="/texts" class="section-link">Тексты</router-link>
                <router-link to="/reviews" class="section-link">Рецензии</router-link>
                <div class="user-tree" v-on:click="toggleTree()">
                    <img  class="user-tree-avatar" src="https://via.placeholder.com/40">
                    <div class="user-tree-name">{{$store.state.userInfo.first_name}}</div>
                    <a><img class="user-tree-arrow" src="@/assets/arrowDown.png"  v-bind:class="{'arrow-active':showTree}">
                    </a>
                    </div>
            </div>
            
        </header>
        <div class="tree-menu"  v-if="showTree">
            <router-link to="" class="tree-element" >Профиль</router-link>
            <hr>
            <router-link to="" class="tree-element">Настройки</router-link>
            <hr>
            <div class="tree-element" @click="logOut">Выйти</div>
        </div>
    </div>

</template>
<script>
export default {
    data() {return {
        showTree : false
    }},
    methods: {
        toggleTree: function () {
            this.showTree =!this.showTree
        },
        logOut: function (){
            console.log('here')
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
    },
    created: function () {
        this.$store.dispatch('getUserInfo')
    }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT&family=Roboto:wght@300;400&display=swap');
.preheader {
    position: fixed;
    z-index: 200;
    max-width: 1440px;
    width: 100%;
    /* max-width: 1180px; */
    /* margin-left: 30px; */
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0);
}
.header {
    
    
    
    height: 65px;
    background-color: #E5EEFF;
    display: flex;
    border: 2px solid #888888;
    border-radius: 0 0 15px 15px;
    border-top: none;
    justify-content: space-between;
}
.logo {
    font-family: 'Old Standard TT', serif;
    font-weight: 400;
    font-size: 30pt;
    position: relative;
    padding-left: 30px;
    padding-top: 10px;
    text-transform: uppercase;
    color: black;
    
}
a {
    text-decoration: none;
    color: black;
}
.sections {
    display: flex;
    justify-content: space-between;
}
.section-link {
    text-decoration: none;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20pt;
    color: black;
    padding: 17px 40px;

    
}
.user-logo {
    /* margin-top: 15px; */
    border-radius: 50%;
    margin-right: 17px;
    width: 40px;
    height: 40px;
}
.user-tree {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    
}
.user-tree-name {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20pt;
    color: black;
    margin: 17px 10px;
}
.user-tree-avatar {
    border-radius: 50%;
    margin: 12px 0;
}
.arrow-active {
    transform: scaleY(-1);
}
.user-tree-arrow {
    margin: 24px 0;
    margin-right: 10px;
}
.tree-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between ;
    width: 200px;
    height: 150px;
    border: 2px solid #888888;
    border-radius: 15px;
    position: relative;
    left: 85.76%;
    background: white;
}
.tree-element {
    cursor: pointer;
    text-decoration: none;
    font-family: Roboto;
    font-weight: 300;
    font-size: 20pt;
    color: black;
    margin: 5px 0;
}
hr {
    width: 170px;
    color: #888888;
    height: 2px;
    background-color: #888888;
    border: none;
    margin: 0 auto;
}
</style>