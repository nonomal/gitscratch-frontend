<template>
  <v-row>
    <v-col cols="12" xl="7" md="8">
      <v-card>
        <v-card-title class="text-h5">
          {{ projectTitle }}
        </v-card-title>
        <v-card-text>
          <div style="display:flex;margin-bottom:10px;">
            <v-icon>mdi-eye-outline</v-icon>
            &nbsp;{{ projectViews }}&nbsp;&nbsp;
            <v-icon>mdi-calendar-outline</v-icon>
            &nbsp;{{ projectUpdate }}&nbsp;&nbsp;
            <v-icon>mdi-update</v-icon>&nbsp;
            <nuxt-link to="/projects/1/commit/170ed1c/" class="text-color">
              {{ projectCommit }}
            </nuxt-link>&nbsp;&nbsp;
          </div>

          <v-responsive v-if="!loadPlayer" :aspect-ratio="4/3" content-class="rounded">
            <v-img
              lazy-src="/GitScratch-project-thumbnail-grey.svg"
              src="/project/64025bdca5db4938f65597e3682fddcf.svg"
              style="width: 100%; height: 100%; border-radius: 15px;"
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-btn v-if="!loadPlayer" class="rounded-pill" x-large @click="loadPlayer = true">
                  <v-icon>
                    mdi-reload
                  </v-icon>
                  &nbsp;加载播放器
                </v-btn>
              </v-row>
            </v-img>
          </v-responsive>
          <LazyProjectPlayer v-if="loadPlayer" />
          <br>
          <ProjectData />
        </v-card-text>
      </v-card>

      <div class="hidden-sm-and-down">
        <v-divider style="margin: 16px 0;" />
        <CommentForm :is-login="isLogin" :is-muted="isMuted" />
        <v-divider style="margin: 8px 0;" />
        <p class="text-h5">
          留言
        </p>
        <Comments />
      </div>
    </v-col>
    <v-col cols="12" xl="5" md="4">
      <ProjectUserInfo />
      <br>
      <ProjectDesc />
      <div class="hidden-md-and-up">
        <v-divider style="margin: 16px 0;" />
        <CommentForm :is-login="isLogin" :is-muted="isMuted" />
        <v-divider style="margin: 8px 0;" />
        <p class="text-h5">
          留言
        </p>
        <Comment />
      </div>
    </v-col>
  </v-row>
</template>
<script>
const marked = require('marked')
export default {
  props: {
  },
  data: () => ({
    loadPlayer: false,
    bio: '啊，好舒服',
    avatar: '/GitScratch-icon-background-blue.svg',
    projectTitle: 'Default Project',
    projectViews: 114514,
    projectCommit: '170ed1c',
    projectUpdate: '2022/5/28 14:39:58',
    isLogin: true,
    isMuted: true
  }),
  head () {
    return {
      title: this.projectTitle
    }
  },
  methods: {
    renderMd () {
      return marked.parse(this.README)
    }
  }
}
</script>
