const allScopes = [
  "adr",
  "gitignore",
  "devbox",
  "lefthook",
  "jstools",
  "cspell",
  "commitlint",
  "secretlint",
  "markdownlint",
  "textlint",
  "rulesync",
  "ai",
  "yamllint",
  "checkjsonschema",
  "actionlint",
  "ghalint",
];

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:[a-z_]+:) (\(([a-z]+)\))?(.*)$/, // type, scopeは小文字のasciiのみ
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
  extends: ["gitmoji"],
  plugins: ["commitlint-plugin-function-rules"],
  rules: {
    "type-empty": [0, "never"], // typeはemojiと重複するため
    "type-enum": [0, "never"],
    "function-rules/scope-enum": [
      2,
      "always",
      (parsed) => {
        if (allScopes.some((scope) => parsed.scope === "(" + scope + ")")) {
          return [true];
        }

        return [false, `scope must be one of ${allScopes.join(", ")}`];
      },
    ],
  },
};
