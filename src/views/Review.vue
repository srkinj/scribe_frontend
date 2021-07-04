<template>
    <div class="review-section">
        <h1 class="review-header">Оцените текст участника по заданию</h1>
        <h1 class="task-header" v-html="reviewTask.reviewName">“День {{currentState}}  {{reviewTask.reviewName}}”</h1>
        <div class="user-task-section">
            <div class="user-text" v-html="reviewTask.text"> {{reviewTask.text}}</div>
        </div>
        <!-- <div class="review-mark">
            <h2>Поставьте оценку:</h2>
            <div class="mark-buttons">
                <div class="left-button"><img src="@/assets/thumbDown.png"></div>
                <div class="mid-button"><img src="@/assets/ok.png"></div>
                <div class="right-button"><img src="@/assets/star.png"></div>
            </div>
        </div> -->
        <div class="review-text">
            <h2>Напишите рецензию:</h2>
            <div class="task-input" ><ckeditor :editor="editor" v-model="reviewAnswer" :config="editorConfig"></ckeditor> </div>
            <div class="submit-button" @click="onSubmit">ОТПРАВИТЬ</div>
        </div>

    </div>
    
</template>

<script>
import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

Vue.use( CKEditor );

import axios from 'axios';
export default {
    data: function () {
        return {
            reviewTask: {
                reviewName: '',
                text: '',
                id: ''
            },
            reviewAnswer:'',
            currentState: '',
            editor: ClassicEditor,
            editorConfig: {
                // The configuration of the editor.
                toolbar: ['Heading', 'bold', 'italic',  'blockQuote','Undo','Redo' ],
                height: ['100%']
            }
        }
    },
    methods: {
        onSubmit: function () {
            if (this.reviewAnswer) {      
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/reviews/?format=json',
                headers: {
                'Authorization':'Token '+this.$store.state.token
                },
                data: {
                    text: this.reviewAnswer,
                    answer: this.reviewTask.id
                }
            })
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            })
        } this.reviewAnswer= ''
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
        url: 'http://localhost:8000/api/today-review-text/',
        headers: {
          'Authorization':'Token '+this.$store.state.token
        }
      }).then ((response) => {
        if (response.data.task_exists) {
        this.reviewTask.reviewName = response.data.task.instruction
        this.reviewTask.text = response.data.task.text
        this.reviewTask.id = response.data.task.answer_id    
        }
        
      })
    }
    
}
</script>

<style scoped>
.submit-button:hover{
  background-color: #c2d6ff;
}
.review-section {
    width: 1200px;
    display: flex;
    flex-direction: column;
    margin: 120px auto;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    color: black;
    margin-bottom: 50px;
}
.review-header {
    font-size: 16pt;
}
.task-header {
    font-weight: 300;
    font-size: 18pt;
}
.user-task-section {
    width: 950px;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    color: black;
    margin: 30px auto;
    
}
.user-text{
    text-align: left;
    padding: 60px;
    font-weight: 300;
    font-size: 16pt;
}
h2 {
    font-size: 16pt;
    margin-left: 35px;
}
.mark-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 215px;
    height: 45px;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    margin: 30px auto;
    
}
.left-button {
    padding-left:23px ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    }
.mid-button {
    border-right: 2px solid #CCCCCC;
    border-left: 2px solid #CCCCCC; 
    padding:  0 23px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.right-button {
    padding-right:23px ;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.task-input {
  width: 950px;
  height: 180px;
  border: #CCCCCC solid 2px;
  border-radius: 5px;
  font-family: 'Roboto';
  margin-left: auto;
  margin-right: auto;
  resize: none;
  text-align: left;
  font-weight: 300;
  font-size: 14pt;
  margin-bottom: 30px;
  
}
textarea {
  resize: none;
  border: none;
  padding: 10px;
  /* overflow: auto; */
  outline: none;
  font-family: 'Roboto';
  text-align: left;
  font-weight: 300;
  font-size: 14pt;
  width: 780px;
  height: 160px;
}
.submit-button {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 40px;
  border: #CCCCCC solid 2px;
  border-radius: 5px;
  font-family: 'Roboto';
  background-color: #F3F7FF;
  font-weight: 300;
  font-size: 18pt;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
}
</style>