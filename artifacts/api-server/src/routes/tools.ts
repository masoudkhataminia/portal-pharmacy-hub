import { Router, type IRouter } from "express";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
import { CreateToolBody, UpdateToolBody, DeleteToolParams, UpdateToolParams } from "@workspace/api-zod";

const router: IRouter = Router();

const DATA_FILE = join(__dirname, "../data/tools.json");

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
};

function readTools(): Tool[] {
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as Tool[];
  } catch {
    return [];
  }
}

function writeTools(tools: Tool[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(tools, null, 2), "utf-8");
}

function formatError(err: { errors?: Array<{ message: string }> }): string {
  return err.errors?.map((e) => e.message).join(", ") ?? "Validation error";
}

router.get("/tools", (_req, res) => {
  res.json(readTools());
});

router.post("/tools", (req, res) => {
  const parsed = CreateToolBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: formatError(parsed.error) });
    return;
  }
  const tools = readTools();
  const newTool: Tool = {
    id: randomUUID(),
    ...parsed.data,
  };
  tools.push(newTool);
  writeTools(tools);
  res.status(201).json(newTool);
});

router.put("/tools/:id", (req, res) => {
  const paramsParsed = UpdateToolParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: formatError(paramsParsed.error) });
    return;
  }
  const bodyParsed = UpdateToolBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: formatError(bodyParsed.error) });
    return;
  }
  const tools = readTools();
  const idx = tools.findIndex((t) => t.id === paramsParsed.data.id);
  if (idx === -1) {
    res.status(404).json({ error: "Tool not found" });
    return;
  }
  tools[idx] = { ...tools[idx], ...bodyParsed.data };
  writeTools(tools);
  res.json(tools[idx]);
});

router.delete("/tools/:id", (req, res) => {
  const parsed = DeleteToolParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: formatError(parsed.error) });
    return;
  }
  const tools = readTools();
  const idx = tools.findIndex((t) => t.id === parsed.data.id);
  if (idx === -1) {
    res.status(404).json({ error: "Tool not found" });
    return;
  }
  tools.splice(idx, 1);
  writeTools(tools);
  res.status(204).send();
});

export default router;
