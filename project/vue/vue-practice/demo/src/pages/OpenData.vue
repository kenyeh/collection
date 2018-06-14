<template>
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">open data</a>
                </div>
                <div class="navbar-form navbar-left">
                    <div class="form-group">
                        <label for="searchId">Search ID：</label>
                        <select id="searchId" class="form-control" v-model="searchId">
                            <option value='all'>All</option>
                            <option v-for="option in idOption" :value="option">{{option}}</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Search" 
                        v-model="searchKeyword"
                        @keyup.enter="handleWorksearch">
                        <div class="input-group-btn">
                            <button class="btn btn-default" @click="handleWorksearch">
                                <i class="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <hr>

        <div v-if="opendate.length===0" class="alert alert-info">
            Sorry! Can not find anything.
        </div>
        <div v-else>
            <div class="alert alert-success">We've found {{opendate.length}} results for you.</div>
        </div>

        <!-- layout -->
        <div class="row">
            <div class="col-md-4 col-sm-6" v-for="item in opendate">
                <div class="thumbnail">
                    <span class="label label-warning">PostId:{{ item.id }}</span>
                    <span class="label label-primary">Id:{{item.postId }}</span>
                    <div class="caption">
                        <h3><a href="#">{{ item.email }}</a></h3>
                        <p>{{ item.body }}</p>
                        <small class="text-muted">{{ item.email }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            searchId: 'all',
            searchKeyword: ''
        }
    },
    created () {
        // created hook send action call to API
        this.$store.dispatch('openData')
    },
    computed: mapGetters({
        opendate: 'getOpenData',
        idOption: 'getIdOption'
    }),
    methods: {
        ...mapActions([]),
        handleWorksearch () {
            this.$store.dispatch('opendataSearchKeyword', this.searchKeyword)
        }
        /*
        getGoogleMap (address) {
            return `https://www.google.com/maps/place/${address}`
        }
        */
    },
    watch: {
        searchId (val) {
            this.$store.dispatch('opendataSearchId', val)
        }
    }
}
</script>
