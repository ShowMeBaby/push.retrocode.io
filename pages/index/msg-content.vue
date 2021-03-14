<template>
  <unicloud-db ref="msgData" @load="loadSuccess" v-slot:default="{ data }" collection="msg" :getone="true" :where="`_id=='${messageId}'`">
    <template v-if="data && data.payload && data.payload.data">
      <MDParserHighlight :resource="data.payload.data"></MDParserHighlight>
    </template>
  </unicloud-db>
</template>

<script>
import MDParserHighlight from '../../components/cmder-MDParserHighlight/index.vue';
export default {
  components: {
    MDParserHighlight
  },
  data() {
    return {
      messageId: ''
      // makedown:''
    };
  },
  onLoad(e) {
    this.messageId = e.id;
    // uni.request({
    //   url: 'https://retrocode.io/markdown/%E6%8A%80%E5%B7%A7/Markdown%E8%AF%AD%E6%B3%95.md',
    //   success: res => {
    //     this.makedown = res.data;
    //   }
    // });
  },
  methods: {
    loadSuccess(data) {
      if (!data) {
        uni.showToast({ title: '读取推送信息失败!', icon: 'none' });
        return;
      }
      uni.setNavigationBarTitle({
        title: data.title
      });
    }
  }
};
</script>

<style></style>
