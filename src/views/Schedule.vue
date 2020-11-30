<template>
    <div>
        <header id="header">
            <div class="header-top pt-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between mx-10">
                        <div class="header-top-left">
                            <div class="header-social">
                                <a href="#" class="text-warning"><i class="fa fa-phone"></i> Call Toll-Free: +256-700-000-000</a>
                                <a href="#" class="text-warning"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="text-warning"><i class="fa fa-twitter"></i></a>
                            </div>
                        </div>
                        <div class="header-top-right">
                            <a href="" class="text-warning" @click="login()">LogIn</a>
                        </div>
                    </div>			  					
                </div>
            </div>
            <nav class="navbar navbar-expand-md header-top navbar-dark px-6 pb-4">
                <div class="container">
                    <div class="row align-items-center justify-content-between">
                        <div id="logo">
                            <a href="index.html">
                                <div class="float-left"><img style="width: 40px; height: 40px" src="../assets/logo.png" alt="" title="" /></div>
                                <div class="text-white text-uppercase font-weight-bold d-flex float-right pt-1 pl-1" style="font-size: 20px;"> Zawadi Bus Services</div>
                            </a>
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="col-lg-6 collapse navbar-collapse header-top-right" id="collapsibleNavbar">
                            <ul class="nav-menu">
                                <li><a href="" class="text-white" @click="indexPage">Home</a></li>
                                <li><a href="#about-us" class="text-white" @click="aboutUs">About</a></li>
                                <li><a href="#services" class="text-white" @click="services">Services</a></li>
                                <li><a href="" class="text-white" @click="booking">Booking</a></li>	
                                <li><a href="#about-us" class="text-white" @click="aboutUs">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <v-row class="container justify-center mt-100">
            <div class="my-5 py-3 ml-2 px-0">
                <h5 class="pb-5 text-dark">
                    Please choose your preferred seat and boarding point.
                </h5>
            </div>
        </v-row>
        <v-row class="container-fluid  justify-center">
            <v-card class="px-2 mb-5">
                <div class="mr-1 py-3 pl-3 pr-8">
                    <div class="row justify-content-between font-weight-bold px-3 mb-3">
                        <div>
                            <div class="justify-center"><v-btn text class="indigo lighten-5"></v-btn></div>
                            Available Seat
                        </div>
                        <div>
                            <div class="justify-center"><v-btn text class="blue"></v-btn></div>
                            Selected Seat
                        </div>
                        <div>
                            <div class="justify-center"><v-btn text class="green"></v-btn></div>
                            Booked Seat
                        </div>
                    </div>
                    <div class="row pb-0 mb-0 justify-content-between">
                        <div><v-btn class="d-flex justify-content-center d-md-table mx-5">1</v-btn></div>
                        <div><v-btn disabled class="mr-5"><small>Driver</small></v-btn></div>
                    </div>
                    <div class="row py-0">
                            <div class="col-2 pl-5"><v-btn>2</v-btn></div>
                            <div class="col-2"><v-btn>3</v-btn></div>
                    </div>
                    <div class="row py-0">
                            <div class="col-2 pl-5"><v-btn>4</v-btn></div>
                            <div class="col-2"><v-btn>5</v-btn></div>
                            <div class="col-2">&nbsp;</div>
                            <div class="col-2 pr-0"><v-btn>6</v-btn></div>
                            <div class="col-2 pl-2"><v-btn>7</v-btn></div>
                            <div class="col-2 pl-0"><v-btn>8</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn>9</v-btn></div>
                        <div class="col-2"><v-btn>10</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>11</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>12</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>13</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-6 justify-center font-weight-bold">ENTRANCE</div>
                        <div class="col-2 pr-0"><v-btn>14</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>15</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>16</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn>17</v-btn></div>
                        <div class="col-2" ><v-btn disabled><small>STAFF</small></v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>18</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>19</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>20</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn>21</v-btn></div>
                        <div class="col-2"><v-btn>22</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>23</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>24</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>25</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn>26</v-btn></div>
                        <div class="col-2"><v-btn>27</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>28</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>29</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>30</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn>31</v-btn></div>
                        <div class="col-2"><v-btn>32</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>33</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>34</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>35</v-btn></div>
                    </div>
                    <div class="row py-0">
                        <div class="col-2 pl-5"><v-btn>36</v-btn></div>
                        <div class="col-2"><v-btn>37</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>38</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>39</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>40</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn>41</v-btn></div>
                        <div class="col-2"><v-btn>42</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>43</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>44</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>45</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn>46</v-btn></div>
                        <div class="col-2"><v-btn>47</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>48</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>49</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>50</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn>51</v-btn></div>
                        <div class="col-2"><v-btn>52</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>53</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>54</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>55</v-btn></div>
                    </div>
                    <div class="row">
                        <div class="col-2 pl-5"><v-btn>56</v-btn></div>
                        <div class="col-2"><v-btn>57</v-btn></div>
                        <div class="col-2">&nbsp;</div>
                        <div class="col-2 pr-0"><v-btn>58</v-btn></div>
                        <div class="col-2 pl-2"><v-btn>59</v-btn></div>
                        <div class="col-2 pl-0"><v-btn>60</v-btn></div>
                    </div>
                    <div class="row px-0 mx-0 justify-content-between">
                        <div class="col-1 mx-0 px-0"><v-btn small>61</v-btn></div>
                        <div class="col-1 mx-0 pr-1"><v-btn small>62</v-btn></div>
                        <div class="col-1 mx-1 pr-1"><v-btn small>63</v-btn></div>
                        <div class="col-1 mx-0 px-1"><v-btn small>64</v-btn></div>
                        <div class="col-1 mx-0 pr-1"><v-btn small>65</v-btn></div>
                        <div class="col-1 mx-0 pr-1"><v-btn small>66</v-btn></div>
                        <div class="col-1 mx-0 pr-1"><v-btn small>67</v-btn></div>
                        <span></span>
                    </div>
                </div>
            </v-card>
            <div class="mx-5">&nbsp;</div>
            <div class="ml-5">
                <form>
                    <v-card class="px-2 pb-5">
                            <div class="px-4">
                                <v-text-field small required label="Enter Boarding point *"></v-text-field>
                                <v-text-field small disabled label="Seat(s)"></v-text-field>
                                <v-text-field small disabled id="total" required label="Total"></v-text-field>
                                <v-btn class="primary" block>Continue</v-btn>
                            </div>
                    </v-card>
                </form>
            </div>
        </v-row>
        <!-- start footer Area -->
        <div id="about-us" class="row">	
            <footer class="footer-area section-gap bg-dark">
                <div class="container">
                    <div class="row mx-10 justify-content-between pr-0">
                        <div class="col-lg-4 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>About Zawadi</h6>
                                <p>
                                    The world has become so fast paced that people don’t want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point 
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>Navigation Links</h6>
                                <div class="row">
                                    <div class="col">
                                        <ul>
                                            <li><a href="#">Home</a></li>
                                            <li><a href="#about-us">About</a></li>
                                            <li><a href="#services">Services</a></li>
                                            <li><a href="#" @click="Booking()">Booking</a></li>
                                            <li><a href="#about-us">Contact</a></li>
                                        </ul>
                                    </div>									
                                </div>							
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4">
                            <div class="single-footer-widget">
                                <h6>Contact Us</h6>
                                <div class="row">
                                    <div class="col">
                                        <ul>
                                            <li>Kampala: +256700000000</li>
                                            <li>Adjumani: +256700000000</li>
                                            <li>Moyo: +256700000000</li>
                                            <li>Yumbe: +256700000000</li>
                                            <li>Arua: +256700000000</li>
                                            <li>Lira: +256700000000</li>
                                        </ul>
                                    </div>									
                                </div>							
                            </div>
                        </div>
                    </div>

                    <div class="row footer-bottom d-flex justify-content-between align-items-center mx-10">
                        <p class="col-lg-4 col-sm-12 footer-text text-white text-center m-0">
                        &copy; Zawadi Bus Services 2020, All Rights Reserved.</p>
                        <p class="col-lg-4 col-sm-12 footer-text text-white text-center m-0">Powered by: Smart Traveller Limited.</p>
                        <div class="col-lg-4 col-sm-12 footer-social text-center">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>	
        <!-- End footer Area -->
    </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data: () => ({
        items: []
    }),

    computed: {
		...mapGetters({
                fleets: 'FLEETS',
                routes: 'ROUTES',
                assignTrips: 'ASSIGNED_TRIPS',
                isLoggedIn: "IS_LOGGED_IN",
                schedule: "TRIP_SCHEDULE"
			}),
		formTitle () {
			return this.editedIndex === -1 ? 'Add Assignment' : 'Edit Assignment'
		},
    },
    mounted() {
        this.$store.dispatch('GET_FLEETS');
        this.$store.dispatch('GET_ROUTES');
        this.$store.dispatch('GET_ASSIGNED_TRIPS');
        this.$store.dispatch('GET_TRIP_SCHEDULE');
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

        seats() {
            
        }
    }
}
</script>