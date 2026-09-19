import type { PluginClientContext } from "@getpaseo/plugin/client";
import { CREW_PANEL_ID, registerCrewHeaderButtons } from "./client/header-button";
import { AgentCrew } from "./client/main";

export default function contribute(client: PluginClientContext) {
  const removePanel = client.addWorkspacePanel({
    id: CREW_PANEL_ID,
    title: "Agent Crew",
    icon: "Network",
    context: "workspace",
    locations: ["explorer"],
    Component: AgentCrew,
  });
  const removeCommand = client.addCommandCenterItem({
    id: "open-crew",
    title: "Open Agent Crew",
    icon: "Network",
    keywords: ["agents", "subagents", "orchestration", "delegation", "workers", "workspace"],
    context: "workspace",
    onSelect({ openPanel }) {
      openPanel(CREW_PANEL_ID, { location: "explorer" });
    },
  });
  const removeHeaderButtons = registerCrewHeaderButtons(client);
  return () => {
    removeHeaderButtons();
    removeCommand();
    removePanel();
  };
}
