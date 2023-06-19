module.exports = {
  extends: "react-app",
  plugins: ["import"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "import/no-cycle": ["error", { ignoreExternal: true }],
        "import/order": [
          "error",
          {
            "newlines-between": "always",
            groups: [["builtin", "external"]],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            pathGroups: [
              {
                pattern: "@src/**",
                group: "index",
              },
              {
                pattern: "@shared/**",
                group: "index",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
          },
        ],
      },
    },
  ],
};
