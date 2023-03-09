import {
  collection,
  config,
  fields,
  LocalConfig,
  GitHubConfig,
} from "@keystatic/core";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
        },
      };

export default config({
  storage,
  collections: {
    posts: collection({
      label: "Experiments",
      path: "/*/",
      slugField: "slug",
      schema: {
        title: fields.text({ label: "Title" }),
        slug: fields.text({
          label: "Slug",
          validation: { length: { min: 4 } },
        }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),
  },
});
