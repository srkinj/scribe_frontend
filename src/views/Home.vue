<template>
<div>
  
  <div class="home-body">
    <div class="daily-task" v-if="!this.noSeason">
      <div class="first-line">
        <h1 class="day-num">День #{{currentState}}</h1>
        <div class="task-notification" v-bind:class="{'task-notification-hide' : !todayTask.taskText}">
          <img class="task-icon" src="https://via.placeholder.com/10/0000FF" alt="">
          <h2>Новое задание</h2>
        </div>
      </div>
      <h2 class="task-name" v-html="todayTask.taskTitle ">{{todayTask.taskTitle}}</h2>
      <h2 class="no-task" v-if="!todayTask.taskText"> Нет текущего задания</h2>
      <div class="task-content">
        <div class="task-caption">
          <p v-html="todayTask.taskText">
           {{todayTask.taskText}}
          </p>
        </div>
        <div class="task-content-image">
          <img src="https://via.placeholder.com/270x150" alt="">
        </div>
      </div>
      <button class="start-button" v-on:click="startTask()"><p>Написать текст</p></button>
      
      <div class="deadline-timer" v-if="todayTask.taskText">Deadline через <Timer /></div>
    </div>
    <div class="no-season" v-if="this.noSeason">
      <div class="no-season-header">В данный момент Вы не зарегистрированы на активный марафон</div>
      <button class="sign-up-button" @click=" $router.push('/SeasonSignUp')" >Зарегистрироваться</button>
    </div>
    <div class="reviews-section">
      <div class="daily-review">
        <h1 class="low-block-header">Написать рецензию 
          <!-- <img class="task-icon-min" src="https://via.placeholder.com/10/0000FF" alt=""> -->
        </h1>
        <div class="review-attention-bold" v-if="todayReview.reviewExist" v-html="todayReview.reviewTask"> Текст по заданию {{todayReview.reviewTask}} ожидает вашей оценки. </div>
        <div class="no-review" v-if="!todayReview.reviewExist">Нет текста на оценку</div>
        <div class="create-review-button"  v-if="todayReview.reviewExist" @click="$router.push('/review')"><p>Написать рецензию</p></div>
        <div class="deadline-timer" v-if="todayReview.reviewExist">Deadline через<Timer /></div>
       
      </div>
      <div class="user-reviews">
        <h1 class="low-block-header">Рецензии о Ваших текстах</h1>
        <div class="view-review-button" @click="$router.push('/reviews')"><p>Читать</p></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>


import axios from 'axios';
import Timer from '@/components/Timer.vue'


export default {
  name: 'Home',
  components: {
    Timer
    
  },
  data: function () {
    return {
      currentState:'',
      todayTask: {
        taskExist: false,
        taskId: 0,
        taskTitle: '',
        taskText:'',
        taskInstruction:''},
      todayReview: {
        reviewExist: false,
        reviewTask: ''
      }
    }
  },
  methods:{
    startTask: function (){
      this.$router.push('/task')
    }
  },
  mounted: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/currentstate/',
        headers: {
          'Authorization':'Token '+this.$store.state.token
        }
      }).then((response) => {
        this.currentState=response.data.day
      })
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/assignment/',
        headers: {
          'Authorization':'Token '+this.$store.state.token
        }
        })
        
        .then((response) => { 
          console.log(response)
          if (response.data.task_exists && response.data.task_id) {
            this.todayTask.taskExist = true;
            this.todayTask.taskId = response.data.task.task_id
            this.todayTask.taskText= response.data.task.text
            this.todayTask.taskTitle = response.data.task.title
          }
        })
        .catch ((error) => {
          console.log(error)
        })
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/today-review-text/',
        headers: {
          'Authorization':'Token '+this.$store.state.token
        }
      }).then ((response) => {
        if (response.data.task_exists) {
          this.todayReview.reviewExist= true
        }
        if (this.todayReview.reviewExist){
        this.todayReview.reviewTask = response.data.task.instruction}
      }).catch ((error) => {
          console.log(error+'HERE')
        })
        
        
    },
    computed: {
      noSeason ()  {
        if(this.$store.state.userInfo.seasons){
          if (this.$store.state.userInfo.seasons.length!=0){
            return (false)
          }else {
            return(true)
          }
        }
      }
    }
  
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300&display=swap');

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

.no-season-header {
  font-size: 28px;
  font-style: italic;
  margin-top: 30px;
}
.timer {
  margin-left: 3px;
}

.start-button:hover{
  background-color: #c2d6ff;
}
.create-review-button:hover{
  background-color: #c2d6ff;
}
.view-review-button:hover{
  background-color: #c2d6ff;
}
.no-review {
  font-family: 'Roboto';
  font-weight: 300 ;
  font-size: 20pt;
  font-style: italic ;
  color: lightgray;
  margin-bottom: 100px;
}
.no-task {
  font-family: 'Roboto';
  font-weight: 300 ;
  font-size: 20pt;
  color: lightgray;
  font-style: italic ;
}
.no-season {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1200px;
  height: 180px;
  margin: 70px auto;
  border: #CCCCCC solid 2px;
  border-radius: 5px;
  font-family: 'Roboto';
  color: black;
  margin-bottom: 50px;
}
.task-notification-hide {
  opacity: 0;
 
}
.daily-task {
  display: block;
  width: 1200px;
  margin: 70px auto;
  border: #CCCCCC solid 2px;
  border-radius: 5px;
  font-family: 'Roboto';
  color: black;
  margin-bottom: 50px;
}
.day-num {
  font-weight: 300;
  font-size: 24pt;
  margin-right: 350px;
}
.task-name{
  font-weight: 400;
  font-size: 16pt;
}
.task-content{
  display: flex;
  justify-content: center;
  
}
.task-caption {
  text-align: justify;
  padding: 0 100px;
}
.task-content {
  padding: 0 100px;
}
.task-content-image {
  display: none;
}
.start-button {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  border: solid #777777 2px;
  border-radius: 5px;
  background-color: #F3F7FF;
  width: 150px;
  height:50px;
  font-weight: 300;
  font-size: 12pt;
}
.deadline-timer {
  display: flex;
  justify-content: flex-end;
  font-weight: 300;
  font-size: 12pt;
  padding: 5px;
}
.reviews-section {
 display: flex;
 width: 1200px;
 margin: auto;
 margin-top: 0;
 justify-content: space-between;
 font-family: 'Roboto';
}
.daily-review {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 575px;
  height: 250px;
  border: solid #CCCCCC 2px;
  border-radius: 5px;
  margin-right: 50px;
}
.user-reviews {
  width: 575px;
  height: 250px;
  border: solid #CCCCCC 2px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}
.low-block-header {
  margin: 15px 0;
  font-weight: 300;
  font-size: 24pt;
}
.review-attention-bold {
  margin: 10px 50px;
  font-weight: 400;
  font-size: 12pt;
  text-align: left;
  margin-bottom: 0;
}
.review-attention-old {
  margin: 10px 50px;
  font-weight: 300;
  font-size: 12pt;
  text-align: left;
}
.create-review-button {
  width: 200px;
  height: 40px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: solid #777 2px;
  border-radius: 5px;
  background-color: #F3F7FF;
  font-weight: 300;
  font-size: 12pt;

}
.view-review-button {
  width: 200px;
  height: 40px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  margin-bottom: 45px;
  border: solid #777 2px;
  border-radius: 5px;
  background-color: #F3F7FF;
  font-weight: 300;
  font-size: 12pt;

}
.first-line {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
}
.task-notification {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.task-icon{
  border-radius: 50%;
}
.task-icon-min {
  border-radius: 50%;
  
}
</style>