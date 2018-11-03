<template>
    <!--
    <b-navbar toggleable="md" type="dark" variant="dark">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-navbar-brand to="/">Vuejs Wordpress Theme Starter</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-nav is-nav-bar>
            <b-nav-item href="#">Link</b-nav-item>
            </b-nav>

           
            <b-nav is-nav-bar class="ml-auto">

            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
       
            </b-nav>

        </b-collapse>
    </b-navbar>
    -->
    <div class="header">
        <router-link to="/"><h1>{{info.name}}</h1></router-link>
        <p>{{info.description}}</p>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                info: 'info',
            }),
            
        }
    }
</script>
