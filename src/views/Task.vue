<template>
    <div class="task-section">
      <h1 class="day-num">День # {{todayTask.taskId}}</h1>
        <h2 class="task-name" v-html="todayTask.taskTitle">{{todayTask.taskTitle}}</h2>
        <div class="task-media"><img src="https://via.placeholder.com/800x450" alt=""></div>
        <div class="task-text" ><div class="task-inner" v-html="todayTask.taskText">{{todayTask.taskText}}</div></div>
        <div class="task-input"><ckeditor :editor="editor" v-model="taskAnswer" :config="editorConfig"></ckeditor> </div>
        <div class="submit-button" v-on:click="submitAnswer">ОТПРАВИТЬ</div>
        <div class="div"></div>
    </div>
</template>
<script>
// @ is an alias to /src
import Vue from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

Vue.use( CKEditor );
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    
  },
  data: function () {
    return {
      
      todayTask: {
        taskId: 0,
        taskTitle: '',
        taskText:'',
        },
      taskAnswer: '',
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
        toolbar: ['Heading', 'bold', 'italic',  'blockQuote','Undo','Redo' ],
        height: ['100%']
      }
    }
  },
  methods:{
    submitAnswer: function () {
            if (this.taskAnswer) {      
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/answers/?format=json',
                headers: {
                'Authorization':'Token '+this.$store.state.token
                },
                data: {
                    text: this.taskAnswer,
                    task: this.todayTask.taskId
                }
            })
            axios.interceptors.request.use(request => {
                console.log('Starting Request', JSON.stringify(request, null, 2))
                return request
            })
        } this.taskAnswer= ''
         }
  },
  mounted: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8000/api/assignment/',
        headers: {
            'Authorization':'Token '+this.$store.state.token
        }
        })
        
        .then((response) => { 
          console.log(response)
          if(response.data.task_exists){
          this.todayTask.taskId = response.data.task.task_id
          this.todayTask.taskTitle = response.data.task.title
          this.todayTask.taskText = response.data.task.text
          
          
          }
          })
        
    }
  
}
</script>

<style >
.ck-editor__editable_inline {
  /* min-height: 250px;
  max-height: 400px; */
  height: 140px;
}

.task-inner {
    margin: 15px;
}

.submit-button:hover{
  background-color: #c2d6ff;
}
.task-section {
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
.day-num {
  font-weight: 300;
  font-size: 24pt;
  }
.task-name{
  font-weight: 300;
  font-size: 16pt;
}
.task-media {
  margin: 30px auto;
  display: none;
}
.task-text {
  width: 800px;
  min-height: 180px;
  display: block;
  /* margin: 120px auto; */
  border: #CCCCCC solid 2px;
  border-radius: 5px;
  font-family: 'Roboto';
  color: black;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  font-weight: 300;
  font-size: 14pt;
}
/* p {
  padding: 10px 30px;
} */
.task-input {
  width: 800px;
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
  margin: 30px auto;
}
</style>