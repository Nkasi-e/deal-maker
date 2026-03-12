import { DashboardPage } from "@/components/layout";
import { OpportunitiesGrid } from "./OpportunitiesGrid";
import { MOCK_OPPORTUNITIES } from "@/data/mock";

export default function OpportunitiesListPage() {
  return (
    <DashboardPage
      title="Opportunities"
      description="All detected and active deal opportunities"
    >
      <OpportunitiesGrid opportunities={MOCK_OPPORTUNITIES} />
    </DashboardPage>
  );
}
