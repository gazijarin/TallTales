const port = 5010;

const prod = {
  env: "production",
  api_host: "https://talltales.herokuapp.com"
};

const dev = {
  env: "development",
  api_host: `http://localhost:${port}`
};

export default prod; // Change to prod for final build
