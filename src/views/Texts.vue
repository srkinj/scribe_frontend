<template>
    <div>
        <div class="text-section">
            <div class="dummy" v-if="answers.length==0">Здесь пока нет Ваших текстов</div>
            <div class="text-item" v-for="answer in answers" :key="answer.id">
                <div class="answer-header">Текст #{{answer.id}}</div>
                <div class="answer-text" v-html="answer.text">
                    {{answer.text}}
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: function () {
        return {
            answers: []
        }
    },
    mounted: function () {
        axios ({
          method: 'get',
          url: 'http://localhost:8000/api/answers-on-user/',
          headers: {
          'Authorization':'Token '+this.$store.state.token
        }
        }).then((response) => {
            response.data.forEach(element => {
              let answer = {}
              answer.text = element.text;
              answer.id = element.task 
              this.answers.push(answer)
            });
           
        })
    }
    
}
</script>

<style>
.dummy {
    font-weight: 300;
    font-size: 28px;
    color: #CCCCCC;
    font-style: italic;
    margin-top: 30px;


}
.answer-text {
    font-weight: 300;
    font-size: 18px;
    text-align: justify;
    width: 1020px;
    margin: 30px auto;
}
.answer-header {
    text-align: center;
    font-weight: 400;
    font-size: 20pt;
    margin-top: 20px;
}
.text-item {
    width: 1100px;
    height: 200px;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    color: black;
    margin: 30px auto;
}
.text-section {
    min-height: 100px;
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
</style>