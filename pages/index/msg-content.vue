<template>
  <MDParserHighlight :resource="markdown"></MDParserHighlight>
</template>

<script>
import MDParserHighlight from '../../components/cmder-MDParserHighlight/index.vue';
export default {
  components: {
    MDParserHighlight
  },
  data() {
    return {
      messageId: '',
      markdown: ''
    };
  },
  onLoad(e) {
    // #ifdef APP-NVUE
    const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
    // #endif
    // #ifndef APP-NVUE
    const eventChannel = this.getOpenerEventChannel();
    // #endif

    const _this = this;
    this.messageId = e.id;
    this.$api
      .getinfo({ id: e.id })
      .then(pushlist => {
        _this.markdown = pushlist[0].CONTENT;
        uni.setNavigationBarTitle({ title: pushlist[0].TITLE });
        eventChannel.emit('updateUnreadnum', {});
      })
      .catch(() => {
        uni.showToast({ title: '读取推送信息失败!', icon: 'none' });
      });
  }
};
</script>

<style></style>
