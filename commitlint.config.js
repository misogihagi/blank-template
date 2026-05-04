const { gitmojis } = require("gitmojis");
const allGitmojiCodes = [
  ...gitmojis.map((gitmoji) => gitmoji.code),
  ":scroll:", // for ADR
];

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
  "lychee",
  "devcontainers",
];

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:[a-z_]+:) (\(([a-z]+)\))?(.*)$/, // type, scopeは小文字のasciiのみ
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
  extends: [],
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
    "function-rules/subject-case": [
      2,
      "always",
      (parsed) => {
        const { type, scope, footer, header, raw } = parsed;

        // bodyのパースがうまく行かない時がある。その時は\n\n以降をbodyとする。
        const body =
          !parsed.body && parsed.raw.indexOf("\n\n") != -1
            ? parsed.raw.slice(parsed.raw.indexOf("\n\n") + 2)
            : parsed.body;

        // wipが含まれる場合はチェックをスキップ
        if (raw.toLowerCase().includes("wip")) {
          return [true];
        }

        // typeが:scroll:の場合scopeはadr
        if (type == ":scroll:") {
          if (scope == "(adr)") {
            return [true];
          } else {
            return [false, "When type is :scroll:, scope must be adr"];
          }
        }

        // 特殊なType (:tada:, :scroll:) の場合はADR不要
        const bypassTypes = [":tada:", ":scroll:"];
        if (bypassTypes.includes(type)) {
          return [true];
        }

        // 本文(body)またはフッターから #A1234 形式のADR番号を探す
        const adrPattern = /#[A-Z]\d+/;
        const hasAdr =
          adrPattern.test(body || "") || adrPattern.test(footer || "");

        return [
          hasAdr,
          "Please include the ADR number (e.g., #A1234) in the body. However, this excludes :tada:, :scroll:, or WIP commits.",
        ];
      },
    ],
  },
};
