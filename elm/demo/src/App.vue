<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    
    <v-header :seller="seller"> </v-header>
    <ul class="nav">
      <li class="item"><router-link to="/goods">商品</router-link></li>
      <li class="item"><router-link to="/ratings">评价</router-link></li>
      <li class="item"><router-link to="/seller">商家</router-link></li> 
    </ul>
    <router-view :seller="seller"></router-view>


  </div>
</template>

<script>
import header from './components/header/header.vue'
const ERROR_OK = 0
export default {
  name: 'app',
  components: {
    'v-header': header
  },
  data() {
    return {
      seller:{},
      

    }
  },
  mounted:function  () {
    this.$nextTick(function(){
      this.getSellerData()
    })
    
  },
  methods:{
    getSellerData:function(){
      this.$http.get('/api/seller').then((res) => {
        if (res.body.erron === ERROR_OK) {
          this.seller = res.body.data;
        };
      })
    },

  }
  
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
.nav{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  .item{
    flex:1;
    text-align: center;
    & > a{
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93)
    }
    & .active{
      color: rgb(240, 20, 20)

    }
  }
}
</style>
