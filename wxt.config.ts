import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  autoIcons: {
    baseIconPath: "./assets/icon.png",
    sizes: [16, 24, 32, 48, 64, 96, 128, 256],
    grayscaleOnDevelopment: false,
  },
  manifest: {
    permissions: ["storage"],
  },
});
