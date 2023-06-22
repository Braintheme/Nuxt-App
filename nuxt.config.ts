import GoogleFontsModule from "./modules/GoogleFontsModule"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
            title: 'Test - SC Partners'
        }
    },
    css: [
        '~/assets/scss/main.scss'
    ],
    modules: [
        GoogleFontsModule,
    ],
    googleFonts: {
        display: 'swap',
        useStylesheet: true,
        inject: true,
        // download: true,
        families: {
            Roboto: [400, 500, 600],
        }
    }
})
