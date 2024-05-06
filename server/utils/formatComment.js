const moment = require("moment");

const formatComment = (user, comment) => {
  return {
    user,
    comment,
    time: moment().format("h:mm a"),
  };
};

module.exports = {
  formatComment,
};
