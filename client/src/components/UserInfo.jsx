const UserInfo = ({ user }) => {
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "NA";

  return <span>{initials}</span>;
};

export default UserInfo;
