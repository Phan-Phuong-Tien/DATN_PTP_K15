export default function verifyFriend(listFriend, user) {
  const checkList = listFriend.filter((friend) => friend._id === user._id)[0];
  if (statusFriend(checkList?.isConfirmed) < 3) {
    return {
      ...user,
      status: statusFriend(checkList?.isConfirmed),
      isSender: checkList?.isSender,
    };
  }
  return {
    ...user,
    status: 3,
  };
}

function statusFriend(isConfirmed) {
  switch (isConfirmed) {
    case true:
      return 1;

    case false:
      return 2;

    default:
      return 3;
  }
}
