<template>
  <div>
    <p class="text-h4">
      设置
    </p>

    <p class="text-h5">
      颜色主题
    </p>
    <v-radio-group
      v-model="settingsTheme"
      row
      @change="toggle_theme"
    >
      <v-radio
        label="浅色主题"
        value="light"
      />
      <v-radio
        label="深色主题"
        value="dark"
      />
      <v-radio
        label="同步系统"
        value="sync_with_system"
      />
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    settingsTheme: 'light'
  }),
  head () {
    return {
      title: '设置'
    }
  },
  methods: {
    toggle_theme () {
      if (this.settingsTheme === 'light') {
        this.$vuetify.theme.dark = false
      } else if (this.settingsTheme === 'dark') {
        this.$vuetify.theme.dark = true
      } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.$vuetify.theme.dark = true
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
          this.$vuetify.theme.dark = false
        }
        const listeners = {
          dark (mediaQueryList) {
            if (mediaQueryList.matches) {
              this.$vuetify.theme.dark = true
            }
          },
          light (mediaQueryList) {
            if (mediaQueryList.matches) {
              this.$vuetify.theme.dark = false
            }
          }
        }
        window.matchMedia('(prefers-color-scheme: dark)').addListener(listeners.dark)
        window.matchMedia('(prefers-color-scheme: light)').addListener(listeners.light)
      }
    }
  }
}
</script>
