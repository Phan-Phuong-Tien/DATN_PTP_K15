const users = [];

const userJoin = (sId, user, post) => {
  const newUser = { sId, user, post };
  const index = users.findIndex(
    (user) => user.post === post && user.sId === sId
  );
  if (index !== -1) return users[index];
  users.push(newUser);
  console.log(newUser);
  return newUser;
};

const getCurrentUser = (sId) => {
  return users.filter((user) => user.sId === sId);
};

const removeUser = (sId) => {
  const userIdx = users.findIndex((user) => user.sId == sId);

  if (userIdx !== -1) {
    return users.splice(userIdx, 1)[0];
  }
};

module.exports = {
  userJoin,
  getCurrentUser,
  removeUser,
};
