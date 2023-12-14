function setToken(user, statusCode, res) {
  const token = user.getJWTToken();

  console.log(token);
  const option = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    msg: "Login Successfully",
    user,
    token,
  });
}

export default setToken;
