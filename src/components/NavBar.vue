<template>
  <v-layout>
    <header id="header">
			<div class="header-top pt-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between mx-10">
                        <div class="header-top-left">
                            <div class="header-social" v-if="branches.length > 0">
                                <a href="#" class="text-warning"
                                    v-for="item in branches"
                                    :key="item.id"
                                ><span v-if="item.name == 'Kampala'"><i class="fa fa-phone"></i> Call Toll-Free: {{ item.mobile }}</span></a>
                                <a href="#" class="text-warning"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="text-warning"><i class="fa fa-twitter"></i></a>
                            </div>
                        </div>
                        <div class="header-top-right">
                            <a href="" class="text-warning font-weight-bold" @click="login()">LogIn</a>
                        </div>
                    </div>			  					
                </div>
            </div>
            <nav class="navbar navbar-expand-md header-top navbar-dark px-6 pb-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div id="logo">
                            <a href="/">
                                <div class="float-left" v-if="company.length > 0"><img style="width: 40px; height: 40px" :src="company[0].logo" alt="Logo" title="" /></div>
                                <div class="text-white text-uppercase font-weight-bold d-flex float-right pt-1 pl-1" style="font-size: 20px;" v-if="company.length > 0">{{ company[0].name }}</div>
                            </a>
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="col-lg-6 collapse navbar-collapse header-top-right" id="collapsibleNavbar">
                            <ul class="nav-menu">
                                <li><a href="" id="indexpage" class="text-white"
                                        @mouseover="changeColor('indexpage')"
                                        @mouseout="changeColor('indexpage')"
                                        @click="indexPage">Home</a></li>
                                <li><a href="#about-us" id="about" class="text-white"
                                        @mouseover="changeColor('about')"
                                        @mouseout="changeColor('about')"
                                        @click="aboutUs">About</a></li>
                                <li><a href="#services" id="services" class="text-white"
                                        @mouseover="changeColor('services')"
                                        @mouseout="changeColor('services')"
                                        @click="services">Services</a></li>
                                <li><a href="" class="text-white" id="booking"
                                        @mouseover="changeColor('booking')"
                                        @mouseout="changeColor('booking')"
                                        @click="booking">Booking</a></li>	
                                <li><a href="#about-us" class="text-white" id="contact"
                                        @mouseover="changeColor('contact')"
                                        @mouseout="changeColor('contact')"
                                        @click="aboutUs">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data: () => ({
    }),
	computed: {
		...mapGetters({
            company: 'COMPANY',
            branches: "BRANCH"
        }),
	},
	mounted() {
        this.$store.dispatch('GET_COMPANY');
        this.$store.dispatch('GET_BRANCH');
    },
    
    updated(){
        this.getBranch();
    },

	methods: {
        login() {
            this.$router.push({name: 'login'});
        },

		booking(){
                this.$router.push({name: 'bookingboard'});
		},

		indexPage() {
			this.$router.push({name: 'indexpage'});
		},

		aboutUs() {
			this.$router.push({name: 'indexpage#about-us'});
		},

		services() {
			this.$router.push({name: 'indexpage#services'});
		},
		changeColor(obj) {
            if (document.getElementById(obj).className === "text-warning"){
                document.getElementById(obj).className = "text-white"
            }else {
                document.getElementById(obj).className = 'text-warning'
            }
        },
        getBranch() {
            this.$store.dispatch('GET_BRANCH');
            this.branch = this.branches.filter(item => item.name === 'Kampala' )[0];
        }
	},
};
</script>