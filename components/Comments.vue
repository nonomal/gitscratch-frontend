<template>
  <v-list>
    <v-card v-for="comment_list in commentIns" :key="comment_list[0]" style="padding: 16px;border-radius: 10px !important;margin-bottom: 15px;" class="d-flex">
      <v-avatar>
        <v-img :src="comment_list[1]" />
      </v-avatar>
      <v-divider vertical style="margin: 0 8px;" />
      <div class="flex-grow-1 overflow-auto" style="border-radius: 0px;">
        <router-link :to="'/users/' + comment_list[2]">
          {{ comment_list[2] }}
        </router-link>
        <v-tooltip v-if="comment_list[4]" bottom>
          <template #activator="{ on, attrs }">
            <v-icon style="margin-top: -2px;" :color="comment_list[6]" v-bind="attrs" size="20" v-on="on">
              mdi-check-decagram-outline
            </v-icon>
          </template>
          <span>{{ comment_list[5] }}</span>
        </v-tooltip>
        <v-tooltip v-if="comment_list[7]" bottom>
          <template #activator="{ on, attrs }">
            <v-icon style="margin-top: -2px;" color="rgba(255, 87, 34)" v-bind="attrs" size="20" v-on="on">
              mdi-comment-remove-outline
            </v-icon>
          </template>
          <span>剩余 {{ comment_list[8] }} 天解禁</span>
        </v-tooltip>
        <span style="margin-left: 8px;" class="grey-text">{{ comment_list[3] }}</span>
        <v-divider style="margin: 8px 0;" />
        <MarkdownRender />
      </div>
    </v-card>
  </v-list>
</template>
<script>
import MarkdownRender from './MarkdownRender.vue'
const date = new Date()
const dateStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.toLocaleTimeString()
export default {
  components: {
    MarkdownRender
  },
  data: () => ({
    commentIns: [
      ['1', '/GitScratch-icon-background-blue.svg', '作者', dateStr, true, '社区官方认证', 'rgba(33,150,243)', true, '-1'],
      ['2', '/GitScratch-icon-background-blue.svg', 'Test', dateStr, false, '', '', false, '0']
    ]
  }),
  methods: {
  }
}
</script>
