<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Vue demo</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li><router-link to="Hello">Hello</router-link></li>
                    <li><router-link to="C2f">CtoF</router-link></li>
                    <li><router-link to="TodoList">TodoList</router-link></li>
                    <li><router-link to="shop">Shop</router-link></li>
                    <li><router-link to="OpenData">OpenData</router-link></li>
                </ul>
            </div>
            <!--/.navbar-collapse -->
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar'
}
</script>