<template>
  <v-row>
    <v-col
      cols="12"
      xl="2"
      md="3"
      sm="4"
      style="padding-right: 20px;"
      @mouseenter="userNameIsHover = !userNameIsHover"
      @mouseleave="userNameIsHover = !userNameIsHover"
    >
      <div style="text-align: center;">
        <v-avatar style="width: 100%; height: auto; max-width: 200px; margin-bottom: 20px;">
          <v-img :src="avatar" />
        </v-avatar>
        <div style="display: flex;">
          <span style="display: block; min-width: 20px; height: 20px; background-color: rgb(34, 149, 242); color: white; border-radius: 50%; font-size: 12px;">{{ level }}</span>&nbsp;
          <v-progress-linear :value="exp" class="rounded-pill" height="20" />
        </div>
      </div><br>
      <div class="d-flex align-center">
        <span class="text-h4" style="margin-right: 8px;">{{ username }}</span>
        <v-tooltip v-if="isVerified" bottom>
          <template #activator="{ on, attrs }">
            <v-icon :color="verifyColor" v-bind="attrs" v-on="on">
              mdi-check-decagram-outline
            </v-icon>
          </template>
          <span>{{ verifyCategories }}</span>
        </v-tooltip>
        <v-tooltip v-if="isMuted" bottom>
          <template #activator="{ on, attrs }">
            <v-icon color="rgb(255, 87, 34)" v-bind="attrs" v-on="on">
              mdi-comment-remove-outline
            </v-icon>
          </template>
          <span>账户被禁言，{{ muteRemainDate }} 天后解禁</span>
        </v-tooltip>
        <v-tooltip v-if="isBanned" bottom>
          <template #activator="{ on, attrs }">
            <v-icon color="rgb(238, 54, 37)" v-bind="attrs" v-on="on">
              mdi-gavel
            </v-icon>
          </template>
          <span>账户被封禁，{{ banRemainDate }} 天后解禁</span>
        </v-tooltip>
        <v-dialog v-model="reportDialog" overlay-opacity="0.3" max-width="500">
          <template #activator="{ on, attrs }">
            <v-fade-transition>
              <v-btn v-if="userNameIsHover && isLogin" plain icon v-bind="attrs" v-on="on">
                <v-icon size="18">
                  mdi-alert-outline
                </v-icon>
              </v-btn>
            </v-fade-transition>
          </template>
          <v-card class="cardblur">
            <v-card-title class="text-h5">
              举报
            </v-card-title>

            <v-card-text>
              <v-form ref="reportForm" v-model="reportValid" lazy-validation>
                <v-textarea
                  v-model="reportReason"
                  label="举报原因"
                  counter="1024"
                  :rules="reportReasonRules"
                  outlined
                  style="border-radius: 4px;"
                  auto-grow
                  rows="2"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                rounded
                @click="reportDialog = false"
              >
                取消
              </v-btn>
              <v-btn
                color="red"
                text
                rounded
                :disabled="!reportValid"
                :loading="reportLoading"
                @click="report"
              >
                举报
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <p class="text-body">
        {{ bio }}
      </p>
      <v-btn block color="primary" depressed rounded>
        <v-icon>mdi-plus</v-icon>
        关注
      </v-btn><br>
      <v-icon>mdi-account-multiple-outline</v-icon>
      <router-link :to="'/users/' + $route.params.username + '/followers'">
        {{ follower }} 粉丝
      </router-link>
      <span> · </span>
      <router-link :to="'/users/' + $route.params.username + '/following'">
        {{ following }} 正在关注
      </router-link>
      <br>
      <v-icon>mdi-web</v-icon>
      <a :href="website">{{ website }}</a>
    </v-col>
    <v-divider vertical class="hidden-xs-only" />
    <v-col cols="12" xl="10" md="9" sm="8" style="padding-left: 20px;">
      <v-tabs
        v-model="toggleTab"
        group
        mandatory
        color="primary"
      >
        <v-tab>
          <v-icon>mdi-book-open-outline</v-icon><span>概览</span>
        </v-tab>
        <v-tab>
          <v-icon>mdi-book-outline</v-icon><span>作品</span>
        </v-tab>
        <v-tab>
          <v-icon>mdi-account-group-outline</v-icon><span>组织</span>
        </v-tab>
        <v-tab>
          <v-icon>mdi-comment-text-multiple-outline</v-icon><span>留言</span>
        </v-tab>
      </v-tabs>
      <v-window
        v-model="toggleTab"
        style="display: block; padding: 16px;"
      >
        <!-- 概览 -->
        <v-window-item>
          <v-card>
            <v-card-title class="text-h5">
              <span>README</span><span class="grey-text">.md</span>
            </v-card-title>
            <v-divider />
            <MarkdownRender style="padding: 16px;" />
          </v-card>
          <ProjectGroupSmall title="置顶作品" style="margin-top: 8px;" />
        </v-window-item>
        <!-- 作品 -->
        <v-window-item>
          <div class="d-flex">
            <p class="text-h5" style="margin: 0;">
              最近收藏的作品
            </p>
            <v-spacer />
            <v-btn :to="'/users/' + username + '/stars'" text rounded>
              更多
              <v-icon right>
                mdi-chevron-right
              </v-icon>
            </v-btn>
          </div>
          <ProjectGroupSmall />
        </v-window-item>
        <!-- 组织 -->
        <v-window-item>
          <p>?????</p>
        </v-window-item>
        <!-- 留言 -->
        <v-window-item>
          <CommentForm />
          <v-divider style="margin: 8px 0;" />
          <p class="text-h5">
            留言
          </p>
          <Comments />
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<script>
const marked = require('marked')
export default {
  data: () => ({
    username: '作者',
    follower: 100,
    following: 200,
    website: 'https://git.sc.cn',
    bio: '这是简介，听我说谢谢你，因为有你，温暖了四季。',
    avatar: '/GitScratch-icon-background-blue.svg',
    toggleTab: 0,
    level: 1,
    exp: 15,
    isVerified: true,
    verifyCategories: '社区官方认证',
    verifyColor: 'rgba(33,150,243)',
    isMuted: true,
    isBanned: true,
    muteRemainDate: '-1',
    banRemainDate: '-1',
    userNameIsHover: false,
    isLogin: true,
    reportDialog: false,
    reportValid: false,
    reportLoading: false,
    reportReason: '',
    reportReasonRules: [
      v => !!v || '请输入举报原因',
      v => v.length <= 1024 || '举报原因不能超过 1024 个字符'
    ]
  }),
  head () {
    return {
      title: this.username
    }
  },
  methods: {
    renderMd () {
      return marked.parse(this.README)
    },
    validateReport () {
      this.$refs.reportForm.validate()
    },
    report () {
      this.validateReport()
      if (this.reportValid) {
        this.reportLoading = true
        setTimeout(() => {
          this.reportLoading = false
          this.reportDialog = false
          this.reportReason = ''
        }, 1000)
      }
    }
  }
}
</script>
