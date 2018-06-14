<template>
    <div id="login" class="text-center">
        <img src="../assets/image/logo.png" alt="">
        <div class="container">
            <div class="form-signin">
                <div class="row">
                    <div class="slideThree pull-right">
                        <input type="checkbox" id="slideThree" v-model="lang" :true-value="'tw'" :false-value="'en'" @change="setlanguage(lang)">
                        <label for="slideThree"></label>
                    </div>
                </div>
                <h2 class="form-signin-heading">{{ $t("Please_sign_in") }}</h2>
                <label for="email" class="sr-only">{{ $t("Email_address") }}</label>
                <input type="text" class="form-control" placeholder="Email address" required autofocus v-model="email">
                <label for="inputPassword" class="sr-only">{{ $t("Password") }}</label>
                <input type="password" class="form-control password" placeholder="Password" required v-model="password" @keyup.enter="login" v-toggle-password="togglePassword">
                <div class="squaredFour">
                    <input type="checkbox" id="togglePassword" v-model="togglePassword">
                    <label for="togglePassword" class="checkbox-icon"></label>
                    <label for="togglePassword">{{ $t("Show_password") }}</label>
                </div>
                <button tyep="submit" class="btn btn-lg btn-primary btn-block" @click="login">{{ $t("Sign_in") }}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            email: 'vue_vuex@demo.com',
            password: '',
            togglePassword: false,
            lang: this.$store.state.lang
        }
    },
    methods: {
        ...mapActions([
            'setlanguage'
        ]),
        login () {
            // action return promise
            // use then and catch
            this.$store.dispatch('actionLogin', {
                email: this.email,
                password: this.password
            })
            .then(() => {
                // get resolve
                console.log('3. get Promise resolve')
                // redirect
                this.$router.push('/hello')
            })
            .catch(() => {
                // get reject
                console.log('%c error get Promise reject', 'color:red')
            })
        }
    }
}
</script>
<style lang="scss">
#login {
    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
        input[type='text'] {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        input.password {
            margin-bottom: 10px;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }

        .squaredFour {
            text-align: left; //margin: 20px 10px;
        }
    }

    /* switch */
    $switch-width: 120px;
    $switch-labal-width: 50px;
    $switch-background: #a4daff;
    $switch-font-color: #333;
    .slideThree {
        width: $switch-width;
        height: 26px;
        background: $switch-background;
        position: relative;
        border-radius: 50px;
        box-shado: inset 0px 1px 1px rgba(0, 0, 0, 0.5), 0px 1px 0px rgba(255, 255, 255, 0.2);
        &:after {
            content: 'English';
            color: $switch-font-color;
            position: absolute;
            right: 12px;
            z-index: 0;
            font-size: 12px;
            line-height: 26px;
            text-shadow: 1px 1px 0px rgba(255, 255, 255, .15);
        }
        &:before {
            content: '繁體';
            color: $switch-font-color;
            position: absolute;
            left: 24px;
            z-index: 0;
            font-size: 12px;
            line-height: 26px;
        }
        label {
            display: block;
            width: $switch-labal-width;
            height: 20px;
            cursor: pointer;
            position: absolute;
            top: 3px;
            left: 3px;
            z-index: 1;
            background: #fcfff4;
            background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);
            border-radius: 50px;
            transition: all 0.4s ease;
            box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        }
        input[type=checkbox] {
            visibility: hidden;
            &:checked+label {
                left: 65px;
            }
        }
    }
}
</style>

