---
name: Artifact workflow port registration
description: createArtifact assigns arbitrary high ports that fail the workflow health checker unless registered in .replit
---

# Artifact port registration fix

## The rule
After `createArtifact` succeeds, the assigned port (e.g. 21501, 22117) must be added to `.replit`'s `[[ports]]` table before the workflow health checker will pass. Without this, the workflow always fails with `DIDNT_OPEN_A_PORT` even though Vite starts fine.

**Why:** The workflow health checker only detects ports registered in `.replit`. Ports 8080 and 8081 were already there (api-server and mockup-sandbox). Any new artifact port must also be added.

**How to apply:** After every `createArtifact` call, immediately:
1. Write a `.replit.edit` temp file with the new `[[ports]]` entry appended.
2. Call `verifyAndReplaceDotReplit({ tempFilePath: "/abs/path/.replit.edit", dotReplitPath: "/abs/path/.replit" })`.
3. Then restart the workflow — it will pass.

`verifyAndReplaceDotReplit` is available in the code_execution sandbox.
