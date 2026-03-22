import { BreadcrumbNav } from "@/components/organisms/BreadcrumbNav";
import DashboardTemplate from "@/components/templates/dashboard";

export default function DashboardPage() {
  return (
    <>
      <BreadcrumbNav
        homeHref={
          process?.env?.NEXT_PUBLIC_CENTRAL_BASE_URL ||
          "https://dge-central-base.vercel.app"
        }
        items={[{ title: "Dashboard" }]}
      />
      <div className="flex-1 p-6 w-full">
        <div className="mx-auto w-full">
          <DashboardTemplate />
        </div>
      </div>
    </>
  );
}
