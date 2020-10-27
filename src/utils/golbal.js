import { Message } from "element-ui";

export default {
  install(Vue, options) {
    Vue.prototype.Msg_Success = function(content) {
      Message.success({
        message: content,
        type: "success",
        duration: 1000,
        customClass: "my_message"
      });
    };
    Vue.prototype.Msg_Error = function(content) {
      Message.error({
        message: content,
        type: "error",
        duration: 1000,
        customClass: "my_message"
      });
    };
  }
};
