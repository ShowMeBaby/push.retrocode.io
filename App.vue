<script>
export default {
  onLaunch: function() {
    //console.log('App Launch')
    // #ifdef APP-PLUS
    //监听push推送通知
    plus.push.addEventListener('receive', (data) => {
      let {  title, content, payload } = data;
      if (uni.getSystemInfoSync().platform != 'ios') {
        //如果type!='receive'是自己本地插件的push消息栏，“拦截”避免死循环'，安卓系统没有这个问题
        if (typeof payload != 'object') {
          payload = JSON.parse(payload);
        } //判断是否为object，不是的话手动转一下。hbuilderx 3.0以上版本已经修复此问题可省略
        plus.push.createMessage(content, JSON.stringify(payload), {
          title: payload.title,
          subtitle: payload.content
        });
      }
    });
    //监听点击通知栏
    plus.push.addEventListener('click', function({ payload }) {
      if (typeof payload != 'object') {
        payload = JSON.parse(payload);
      }

      let pages = getCurrentPages();
      let currentWebview = pages[pages.length - 1].$getAppWebview();
      if (currentWebview.__uniapp_route != 'pages/index/index') {
        uni.navigateTo({ url: '/pages/index/index' });
      }
      uni.$emit('readMsg', payload);
    });
    // #endif
  },
  onShow: function() {
    //console.log('App Show')
  },
  onHide: function() {
    //console.log('App Hide')
  }
};
</script>

<style>
/*每个页面公共css */
</style>
