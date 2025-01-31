import { argv } from "node:process";
// Import your tools here:
import contentTemplateTool from "./ContentTemplate/tool.js";

async function run(args: string[]): Promise<void> {
  args = args.slice(2);

  const flags = new Set<string>();
  const parameters = new Set<string>();

  for (const arg of args) {
    if (arg.startsWith("-")) {
      flags.add(arg);
    } else {
      parameters.add(arg);
    }
  }

  const write = flags.has("-w") || flags.has("--write");

  let all = false;
  if (parameters.size == 0) {
    all = true;
  }

  switch (all) {
    case true:
      // Add your tool functions here:
      console.log(await contentTemplateTool(write, 5, 3));
      break;

    case false:
      for (const parameter of parameters) {
        switch (parameter) {
          // Add your tool functions in a new switch case here:
          case "ContentTemplate":
            console.log(await contentTemplateTool(write, 5, 7));
            break;
          default:
            console.log(`No tools to run for parameter ${parameter}`);
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
