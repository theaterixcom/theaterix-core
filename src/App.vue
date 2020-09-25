<template>
  <div id="app">
    <div id="demo">
      <p>{{ $t("message.hello") }}</p>
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
      </select>
      <ul>
        <li v-for="mainCat in mainCategories" :key="mainCat.merchantId">
          <input type="checkbox" :value="mainCat.merchantId" id="mainCat.merchantId" v-model="checkedCategories"> {{mainCat.merchantId}}
        </li>
      </ul>
      {{ checkedCategories }}
    </div>    
    <div v-if="statusVideo === true" class="popup" @click="statusVideo = false">
      <youtube :video-id="thing" ref="youtube" @playing="playing" :player-vars="playerVars"></youtube>
    </div>
    <div v-for="item in items" :key="item.id" data-aos="zoom-out-up" data-aos-offset="100" data-aos-easing="ease-out-back" class="col-lg-4 my-4">
            <div v-if="checkedCategories.includes(item.type)" class="col-lg-4 col-sm-6">
                    <figure>
                      <a :href="item.url" target="_blank">
                        <img v-if="item.cover && item.type === 'link'" :src="item.cover" alt="" style="max-width: 100%; width: 100%; height: auto;">
                      </a>
                    </figure>
                    <figure>
                        <img @click="doSomethingWith(item.url); playVideo" v-if="item.cover && item.type === 'media'" :src="item.cover" alt="" style="max-width: 100%; width: 100%; height: auto;">
                    </figure>                    
                    <div class="gallery-box-caption">
                        <div class="gallery-box-content">
                            <div>
                                <i class="icon-lg ion-ios-play"></i>
                            </div>
                        </div>
                    </div>
                    {{ item.type }}
                    <h1 class="text-primary talk-title">{{ item.title }}</h1>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube);

const api = 'https://theaterix.com/api/posts.json'

export default {
  name: 'App', 
  components: {},
  data: function () {
    return {
      page: 1,
      items: [],
      langs: ['es', 'en'],
      thing: '',
      statusVideo: false,
      playerVars: {
        autoplay: 1
      },
      checkedCategories: ["link", "media"],
      mainCategories: [{
        merchantId: 'link'
      }, {
        merchantId: 'media'
      }],
    }
  }, 
  methods: {
    doSomethingWith(item) {
        this.thing = item;
        this.statusVideo = true;
    },    
    api () {
      axios.get(api).then(response => {
          this.items = response.data
      });
    },
    playVideo() {
      this.player.playVideo()
    },   
    playing() {
      console.log('/ we are watching!!!')
    }
  },
  created() {
    this.api();
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    }
  }     
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  margin: 0;
  padding: 0;
  border: 0;
}
figure {
  margin: 0;
  padding: 0;
  border: 0;
}
.popup {
  width: 100%;
  height: 100vh;
  position: fixed;
  background: #000000;
  z-index: 1;
}
</style>