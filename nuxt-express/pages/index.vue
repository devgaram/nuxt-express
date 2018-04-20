<template>
  <section class="container">
    <div class="holder">
      <!--
      v-validate
      errors 객체는 VeeValidate가 생성한 에러들
      errors.has('vocabulary')란 vocabulary data 속성에 유효성 체크 에러가 발생했는지를 확인하는 것.
      -->
      <form @submit.prevent="addVocabulary">
        <input type="text" placeholder="기억하고 싶은 단어를 입력하세요..." name="vocabulary" v-model="vocabulary" v-validate="'min:5'">
        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('vocabulary')">
            {{ errors.first('vocabulary') }}
          </p>
        </transition>      
      </form>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
         <li v-for="( data, index ) in vocabularies" :key="index">{{ data.content }}
          <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
        </li>
        </transition-group>
      </ul>
      <p>These are the vocabulary that you possess.</p>
    </div>  
  </section>
</template>

<script>
/*
  비동기 데이터
  - 서버에서 데이터를 가져와서 렌더링하고 싶을 때, 컴포넌트의 데이터를 셋팅하기 전에 비동기 작업을 처리할 수 있게 asyncData를 지원함.

  페이지 속성들.
  asyncData 
  - pages 컴포넌트를 로딩하기 전에 매번 호출됨
  - pages 컴포넌트만 지원
  - asyncData(context..)
    -context 객체에는 error(params) 메소드 존재, 이를 통해 에러페이지 보여줄수있음.
  - asyncData 반환값은 data와 합쳐짐.
  - 사용법)promise객체, async/await 사용, callback 사용

  fetch
  - 페이지가 렌더링되기 전에 스토어를 채우기위해 사용
  layout
  - layouts 폴더에 정의된 레이아웃을 지정
  head
  - 현재 페이지에 대한 특정 메타태그 설정

*/
import axios from '~/plugins/axios'
import veeValidate from '~/plugins/vee-validate'
console.log(veeValidate)
export default {
  name: 'vocabulary',
  data () {
    return {
      vocabulary: '',
      vocabularies: []
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/vc/list')
    return { vocabularies: data }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  methods: {
    addVocabulary () {
      var vm = this
      this.$validator.validateAll().then((result) => {
        if (result) {
          axios.post('/api/vc/add', {
            vocabulary: this.vocabulary
          }).then(function (response) {
            vm.vocabularies = response.data
          }).catch(function (error) {
            console.log(error)
          })
          this.vocabulary = ''
        } else {
          console.log('Not valid')
        }
      })
    },
    remove (id) {
      var vm = this
      axios({
        method: 'delete',
        url: '/api/vc/remove',
        data: {id: id},
        headers: {'Content-Type': 'application/json'}
      }).then(function (response) {
        vm.vocabularies = response.data
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  @import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
  @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 
  
  .holder {
    background: #fff;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }

  .alert {
    background: #fdf2ce;
    font-weight: bold;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }

  i {
    float: right;
  }
</style>
