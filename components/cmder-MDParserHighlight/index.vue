<template>
  <view class="msg-content">
    <Parser class="parse" :tag-style="tagStyle" :html="inputHTML" show-with-animation>
      <view class="loading">
        <view class="loading_wrap">
          <image class="image" src="./assets/loading.gif"></image>
          <text>加载中...</text>
        </view>
      </view>
    </Parser>
  </view>
</template>

<script>
import marked from './assets/marked.min.js';
import hljs from './highlight.js';
import Parser from './parser/parser.vue';
export default {
  props: {
    resource: {
      type: String,
      default: '**请输入markdown内容**'
    }
  },
  components: {
    Parser
  },
  data() {
    return {
      tagStyle: {
        // 代码块
        pre: 'overflow: auto;background: #f5f5f5;padding: 1em;white-space: pre;margin:1em;'
      }
    };
  },
  computed: {
    inputHTML() {
      return marked(this.resource);
    }
  },
  created() {
    // 初始化markdown高亮效果
    this.initHighLight();
  },
  methods: {
    initHighLight() {
      hljs.configure({ useBR: true, tabReplace: ' ' });
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            // TODO 代码块 使其高亮
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
// @import url('./highlight.js/styles/nnfx.css');
// @import url('./assets/default.css');
.parse {
  /deep/ {
    width: 100%;
    box-sizing: border-box;
    font-family: Helvetica, sans-serif;
    font-size: 16px;
    color: #666;
    line-height: 1.8;
    overflow-x: scroll !important;
    padding-left: 30upx;
    padding-right: 30upx;
    // 代码高亮 由于嵌套导致APP端css无法应用,将css样式复制在此处
    .hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #fff;
      color: #000;
    }

    .xml .hljs-meta {
      font-weight: bold;
      font-style: italic;
      color: #48b;
    }

    .hljs-comment,
    .hljs-quote {
      font-style: italic;
      color: #070;
    }

    .hljs-name,
    .hljs-keyword {
      color: #808;
    }

    .hljs-name,
    .hljs-attr {
      font-weight: bold;
    }

    .hljs-string {
      font-weight: normal;
    }

    .hljs-variable,
    .hljs-template-variable {
      color: #477;
    }

    .hljs-code,
    .hljs-string,
    .hljs-meta-string,
    .hljs-number,
    .hljs-regexp,
    .hljs-link {
      color: #00f;
    }

    .hljs-title,
    .hljs-symbol,
    .hljs-bullet,
    .hljs-built_in,
    .hljs-builtin-name {
      color: #f40;
    }

    .hljs-section,
    .hljs-meta {
      color: #642;
    }

    .hljs-class .hljs-title,
    .hljs-type {
      color: #639;
    }

    .hljs-function .hljs-title,
    .hljs-attr,
    .hljs-subst {
      color: #000;
    }

    .hljs-formula {
      background-color: #eee;
      font-style: italic;
    }

    .hljs-addition {
      background-color: #beb;
    }

    .hljs-deletion {
      background-color: #fbb;
    }

    .hljs-selector-id,
    .hljs-selector-class {
      color: #964;
    }

    .hljs-doctag,
    .hljs-strong {
      font-weight: bold;
    }

    .hljs-emphasis {
      font-style: italic;
    }
    // 代码高亮结束
    view {
      word-break: hyphenate;
    }
    .inline {
      display: inline;
      margin: 0;
      padding: 0;
    }
    div {
      margin: 0;
      padding: 0;
    }
    h1 {
      color: #666;
      font-size: 2em;
      margin: 0.67em 0;
      text-align: left;
    }
    h2 {
      font-size: 1.5em;
      margin: 0.83em 0;
    }
    h3 {
      font-size: 1.17em;
      margin: 1em 0;
    }
    h4 {
      margin: 1.33em 0;
    }
    h5 {
      font-size: 0.83em;
      margin: 1.67em 0;
    }
    h6 {
      font-size: 0.67em;
      margin: 2.33em 0;
    }
    p {
      margin: 1em;
    }
    pre {
      overflow: auto;
      background: #f5f5f5;
      padding: 16upx;
      white-space: pre;
      margin: 1em;
    }
    code {
      display: inline;
      background: #f5f5f5;
    }
    big {
      font-size: 1.17em;
    }
    sub {
      vertical-align: sub;
    }
    sup {
      vertical-align: super;
    }
    a {
      color: deepskyblue;
    }
    video {
      text-align: center;
      margin: 22upx 0;
    }
    .video-video {
      width: 100%;
    }
    img {
      display: inline-block;
      max-width: 100%;
      overflow: hidden;
    }
    blockquote {
      margin: 10upx 0;
      padding: 22upx 0upx 22upx 22upx;
      font-family: Courier, Calibri, '宋体';
      background: #f5f5f5;
      border-left: 6upx solid #dbdbdb;
      p {
        margin: 0;
        padding-right: 10upx;
      }
    }
    ol {
      list-style-type: disc;
      list-style-type: decimal;
    }
    u {
      text-decoration: underline;
    }
    .hide {
      display: none;
    }
    del {
      display: inline;
    }
    figure {
      overflow: hidden;
    }
    table {
      width: 100%;
    }
    tr {
      width: 100%;
      display: flex;
      border-right: 2upx solid #e0e0e0;
      border-bottom: 2upx solid #e0e0e0;
    }
    td {
      &:last {
        border-top: 2upx solid #e0e0e0;
      }
    }
    th {
      background: #f0f0f0;
      border-top: 2upx solid #e0e0e0;
    }
  }
}
.parse /deep/ h1,
.parse /deep/ h2,
.parse /deep/ h3,
.parse /deep/ h4,
.parse /deep/ h5,
.parse /deep/ h6,
.parse /deep/ b,
.parse /deep/ strong {
  font-weight: bolder;
}
.parse /deep/ i,
.parse /deep/ cite,
.parse /deep/ em,
.parse /deep/ var,
.parse /deep/ address {
  font-style: italic;
}
.parse /deep/ pre,
.parse /deep/ tt,
.parse /deep/ code,
.parse /deep/ kbd,
.parse /deep/ samp {
  font-family: monospace;
}
.parse /deep/ small,
.parse /deep/ sub,
.parse /deep/ sup {
  font-size: 0.83em;
}
.parse /deep/ s,
.parse /deep/ strike,
.parse /deep/ del {
  text-decoration: line-through;
}
.parse /deep/ strong,
.parse /deep/ s {
  display: inline;
}
.parse /deep/ ul,
.parse /deep/ ol {
  display: block;
  margin: 1em 0;
  padding-left: 33upx;
}
.parse /deep/ ol > weixin-parse-template,
.parse /deep/ ul > weixin-parse-template {
  display: list-item;
  align-items: baseline;
  text-align: match-parent;
}
.parse /deep/ ol > li,
.parse /deep/ ul > li {
  display: list-item;
  align-items: baseline;
  text-align: match-parent;
}
.parse /deep/ ul ul,
.parse /deep/ ol ul {
  list-style-type: circle;
}
.parse /deep/ ol ol ul,
.parse /deep/ ol ul ul,
.parse /deep/ ul ol ul,
.parse /deep/ ul ul ul {
  list-style-type: square;
}
.parse /deep/ thead,
.parse /deep/ tfoot,
.parse /deep/ tr {
  display: flex;
  flex-direction: row;
}
.parse /deep/ th,
.parse /deep/ td {
  display: flex;
  overflow: auto;
  flex: 1;
  padding: 11upx;
  border-left: 2upx solid #e0e0e0;
}
.loading {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading_wrap {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  .image {
    width: 100px;
    height: 100px;
  }
  text {
    font-size: 16px;
    text-align: center;
  }
}
</style>
