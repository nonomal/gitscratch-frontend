import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.base,
                secondary: colors.blue.darken4,
                accent: colors.blue.accent2,
                grey_background: colors.grey.lighten2,
            },
            dark: {
                primary: colors.blue.lighten1,
                secondary: colors.blue.darken4,
                accent: colors.blue.accent3,
                grey_background: colors.grey.darken3,
            },
        },
    },
})