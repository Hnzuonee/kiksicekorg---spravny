exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    return {
      statusCode: 302,
      headers: {
        Location: "https://onlyfans.com/kristynka.cengerova"
      }
    };
  }

  return {
    statusCode: 405,
    body: "Method Not Allowed"
  };
};
