import { argv } from "node:process";
import contentTemplateTool from "./ContentTemplate/tool.js";

async function run(args: string[]): Promise<void> {
  args = args.slice(2);

  const flags = new Set<string>();
  const options: string[] = [];

  for (const arg of args) {
    if (arg.startsWith("--")) {
      flags.add(arg);
    } else {
      options.push(arg);
    }
  }

  const write = flags.has("--write");
  const all = flags.has("--all");

  if (all) {
    console.log(await contentTemplateTool(write, 5, 3));
  } else {
    for (const opt of options) {
      switch (opt) {
        case "ContentTemplate":
          console.log(await contentTemplateTool(write, 5, 7));
          break;
        default:
          console.log(`No tools to run for ${opt}`);
      }
    }
  }
}

try {
  await run(argv);
  console.log("Finished running all tools.");
  process.exit(0);
} catch (error) {
  console.error("An error occurred while running all tools:", error);
  process.exit(1);
}
