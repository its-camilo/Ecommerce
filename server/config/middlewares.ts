export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      headers: "*",
      origin: [
        "https://organic-xylophone-w4x4p9v7q7xhgj9r-8081.app.github.dev",
        "https://organic-xylophone-w4x4p9v7q7xhgj9r-3000.app.github.dev",
        /https:\/\/.*\.app\.github\.dev$/,
        "http://localhost:3000",
        "http://localhost:8081",
      ],
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

