const helpers = {
  outputPassword(p) {
    const lenEnds = 5;

    return p.substr(0, lenEnds) + '...' + p.substr(p.length - lenEnds);
  },
  getLinkAvatar(user) {
    return user.avatar
      ? '/images/avatars/' + user.avatar
      : '/images/no-avatar.png';
  },
};

export default helpers;
