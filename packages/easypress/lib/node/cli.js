"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/node/cli.ts
var cli_exports = {};
__export(cli_exports, {
  cli: () => cli
});
module.exports = __toCommonJS(cli_exports);

// src/node/consts.ts
var import_path = __toESM(require("path"));
var ROOT_PATH = import_path.default.join(__dirname, "..", "..");
var SRC_PATH = import_path.default.join(ROOT_PATH, "./src");
var RUNTIME_PATH = import_path.default.join(SRC_PATH, "./runtime");
var CLIENT_ENTRY_PATH = import_path.default.join(
  RUNTIME_PATH,
  "./client/client-entry.tsx"
);
var SERVER_ENTRY_PATH = import_path.default.join(
  RUNTIME_PATH,
  "./server/server-entry.tsx"
);
var HTML_PATH = import_path.default.join(ROOT_PATH, "./index.html");

// src/node/build.ts
var import_fs_extra = __toESM(require("fs-extra"));
var import_path2 = __toESM(require("path"));
var import_vite = require("vite");
async function buildRuntime({ root = process.cwd() }) {
  await Promise.all([viteBuild({ root }), viteBuild({ root, isServer: true })]);
  await renderHtml({ root });
}
function viteBuild({ root = process.cwd(), isServer = false }) {
  return (0, import_vite.build)({
    mode: "production",
    root,
    build: {
      ssr: isServer,
      outDir: isServer ? "server" : "client",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          entryFileNames: isServer ? "server-entry.js" : "client-entry.js",
          format: isServer ? "cjs" : "es"
        }
      }
    }
  });
}
async function renderHtml({ root = process.cwd() }) {
  const serverEntryPath = import_path2.default.join(root, "./server", "./server-entry.js");
  const clientEntryPath = "./client-entry.js";
  const { render } = await import(serverEntryPath);
  const rendered = render();
  const template = await import_fs_extra.default.readFile(HTML_PATH, "utf-8");
  const html = template.replace("<!--app-html-->", rendered).replace(
    "</body>",
    `
    <script type="module" src="${clientEntryPath}"></script>
    

    </body>
    `
  );
  await import_fs_extra.default.ensureDir(import_path2.default.join(root, "client"));
  await import_fs_extra.default.writeFile(import_path2.default.join(root, "client/index.html"), html);
  await import_fs_extra.default.remove(import_path2.default.join(root, "server"));
}

// src/node/plugins/vitePluginServeHtml.ts
var import_fs_extra2 = __toESM(require("fs-extra"));
function vitePluginServeHtml({
  templatePath,
  entry
}) {
  return {
    name: "vitePluginServeHtml",
    // https://cn.vitejs.dev/guide/api-plugin.html#configureserver
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.endsWith(".html") && req.url !== "/") {
            return next();
          }
          try {
            const template = await import_fs_extra2.default.readFile(templatePath, "utf-8");
            const viteHtml = await server.transformIndexHtml?.(
              req.url,
              template,
              req.originalUrl
            );
            const html = viteHtml.replace(
              "</body>",
              `
              <script type="module" src="${entry}"></script>
              

              </body>
              `
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            console.error(e);
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/server.ts
var import_plugin_react = __toESM(require("@vitejs/plugin-react"));
async function createRuntimeDevServer({ root = process.cwd() }) {
  const { createServer } = await import("vite");
  return createServer({
    root,
    server: {
      host: true
      // 开启局域网与公网ip,
    },
    plugins: [
      (0, import_plugin_react.default)(),
      vitePluginServeHtml({
        templatePath: HTML_PATH,
        // /@fs/是针对root之外的，当作为npm包时在nodemodules中属于root内，不需要使用 https://cn.vitejs.dev/config/server-options.html#server-fs-allow
        entry: CLIENT_ENTRY_PATH
      })
    ]
  });
}

// src/node/cli.ts
var import_commander = require("commander");
var import_fs_extra3 = __toESM(require("fs-extra"));
var import_path3 = __toESM(require("path"));
var cli = import_commander.program;
var { version } = import_fs_extra3.default.readJSONSync(import_path3.default.join(ROOT_PATH, "./package.json"));
cli.name("easypress").version(version);
cli.command("dev", { isDefault: true }).argument("[root]", "dev server root dir", process.cwd()).description("dev server").option("-p,--port <value>", "dev server port").action(async (root, { port }) => {
  const absRoot = import_path3.default.resolve(root);
  const server = await createRuntimeDevServer({ root: absRoot });
  await server.listen(port);
  server.printUrls();
});
cli.command("build").argument("[root]", "build root dir", process.cwd()).description("build").action(async (root) => {
  try {
    const absRoot = import_path3.default.resolve(root);
    await buildRuntime({ root: absRoot });
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cli
});
