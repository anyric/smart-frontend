<template>
    <v-layout>
        <div id="about-us" class="row">	
            <footer class="footer-area section-gap bg-dark">
                <div class="container">
                    <div class="row mx-10 justify-content-between pr-0">
                        <div class="col-lg-4 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6 v-if="company.length > 0">About {{ company[0].name }}</h6>
                                <p>
                                    The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point 
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6 class="mb-1">Navigation Links</h6>
                                <div class="row">
                                    <div class="col">
                                        <ul>
                                            <li><a href="#" @click="indexPage">Home</a></li>
                                            <li><a href="#about-us" @click="aboutUs">About</a></li>
                                            <li><a href="#services" @click="services">Services</a></li>
                                            <li><a href="/bookingboard" @click="booking">Booking</a></li>
                                            <li><a href="#about-us" @click="aboutUs">Contact</a></li>
                                        </ul>
                                    </div>									
                                </div>							
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6 class="mb-1">Contact Us</h6>
                                <div class="row">
                                    <div class="col">
                                        <ul 
                                            v-for="item in branches"
                                            :key="item.id"
                                        >
                                            <li>{{ item.name }}: {{ item.mobile }}</li>
                                        </ul>
                                    </div>									
                                </div>							
                            </div>
                        </div>
                    </div>

                    <div class="row footer-bottom d-flex justify-content-between align-items-center mx-10">
                        <p v-if="company.length > 0" class="col-lg-4 col-sm-12 footer-text text-white text-center m-0">
                        &copy; {{ company[0].name }} {{ copyrightYear }}, All Rights Reserved.</p>
                        <p class="col-lg-4 col-sm-12 footer-text text-white text-center m-0">Powered by: Smart Traveller Limited.</p>
                        <div class="col-lg-4 col-sm-12 footer-social text-center">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
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
            branches: 'BRANCH'
        }),
        copyrightYear () {
			return new Date().getFullYear()
		},
	},
	mounted() {
        this.$store.dispatch('GET_COMPANY');
        this.$store.dispatch('GET_BRANCH');
	},

	methods: {
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
	},
};
</script>