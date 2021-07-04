<template>
    <div>
        <div class="review-section">
             <div class="dummy" v-if="reviews.length==0">Здесь пока нет рецензий на Ваши тексты</div>
            <div class="review-item" v-for="review in reviews" :key="review.id">
                <div class="review-header">Рецензия на <router-link to="/texts" class="texts-link">Текст #{{review.answer}}</router-link></div>
                <div class="review-text" v-html="review.text">
                    {{review.text}}
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
            reviews: []
        }
    },
    mounted: function () {
        axios ({
          method: 'get',
          url: 'http://localhost:8000/api/reviews-on-user/',
          headers: {
          'Authorization':'Token '+this.$store.state.token
        }
        }).then ((response) => {
        console.log(response)
          response.data.forEach(element => {
              let review = {}
              review.text = element.text,
              review.answer = element.answer
              axios({
                  method: 'get',
                  url: 'http://localhost:8000/api/answers/'+review.answer,
                  headers: {
                  'Authorization':'Token '+this.$store.state.token
                  }
              }).then((response) =>{
                  review.count = response.data.task
              }).then(
              this.reviews.push(review))
          });
        })

    }
}
</script>

<style>
.texts-link {
    color: #2972FF
}
.review-text {
    font-weight: 300;
    font-size: 18px;
    text-align: justify;
    width: 1020px;
    margin: 30px auto;
}
.review-header {
    text-align: center;
    font-weight: 400;
    font-size: 20pt;
    margin-top: 20px;
}
.review-section {
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
.review-item {
    width: 1100px;
    height: 200px;
    border: #CCCCCC solid 2px;
    border-radius: 5px;
    font-family: 'Roboto';
    color: black;
    margin: 30px auto;
}
</style>