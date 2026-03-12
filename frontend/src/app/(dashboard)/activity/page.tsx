import { DashboardPage } from "@/components/layout";
import { ActivityFeed } from "./ActivityFeed";
import { MOCK_ACTIVITY } from "@/data/mock";

export default function AgentActivityPage() {
  return (
    <DashboardPage
      title="Agent activity"
      description="Real-time feed of agent actions: opportunities, messages, offers, and closed deals"
    >
      <ActivityFeed items={MOCK_ACTIVITY} />
    </DashboardPage>
  );
}
