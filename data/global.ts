import { registerChaiGlobalDataProvider } from "@chaibuilder/pages/server";
import { cache } from "react";

const globalDataProvider = cache(async ({ lang }: { lang: string }) => {
  console.log("lang", lang);
  return {
    name: "PGPTA Builder",
    address: "Wigan",
    email: "support@puregymstudent.com",
    social: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/c",
      x: "https://x.com/",
    },
  };
});

registerChaiGlobalDataProvider(globalDataProvider);
