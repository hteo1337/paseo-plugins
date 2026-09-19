import type { PluginClientContext } from "@getpaseo/plugin/client";
import { expect, test, vi } from "vitest";

vi.mock("../client/main", () => ({ AgentCrew: () => null }));

test("contribute() registers panel, command and header buttons, and cleans all three up", async () => {
  const { default: contribute } = await import("../index.client");
  const removePanel = vi.fn();
  const removeCommand = vi.fn();
  const unsubscribe = vi.fn();
  const client = {
    addWorkspacePanel: vi.fn(() => removePanel),
    addCommandCenterItem: vi.fn(() => removeCommand),
    addHeaderButton: vi.fn(),
    paseo: {
      workspaces: {
        list: vi.fn(async () => ({ entries: [], pageInfo: { hasMore: false } })),
        subscribe: vi.fn(() => unsubscribe),
      },
    },
  } as unknown as PluginClientContext;

  const cleanup = contribute(client);
  expect(client.addWorkspacePanel).toHaveBeenCalledWith(expect.objectContaining({ id: "crew" }));
  cleanup();
  expect(removePanel).toHaveBeenCalledTimes(1);
  expect(removeCommand).toHaveBeenCalledTimes(1);
  expect(unsubscribe).toHaveBeenCalledTimes(1);
});
