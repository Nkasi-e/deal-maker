import { DashboardPage } from "@/components/layout";
import { DashboardContent } from "./DashboardContent";
import { MOCK_OPPORTUNITIES, MOCK_SAVINGS } from "@/data/mock";

export default function DashboardPageRoute() {
  return (
    <DashboardPage
      title="Deal discovery"
      description="Your command center for savings and active negotiations"
    >
      <DashboardContent savings={MOCK_SAVINGS} opportunities={MOCK_OPPORTUNITIES} />
    </DashboardPage>
  );
}
