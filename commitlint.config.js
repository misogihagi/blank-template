module.exports = {
  extends: ["gitmoji"],
  rules: {
    "type-empty": [0, "never"], // typeはemojiと重複するため
    "scope-enum": [
      2,
      "always",
      [
        "adr",
        "gitignore",
        "devbox",
        "lefthook",
        "jstools",
        "cspell",
        "commitlint",
        "secretlint",
      ],
    ],
  },
};
