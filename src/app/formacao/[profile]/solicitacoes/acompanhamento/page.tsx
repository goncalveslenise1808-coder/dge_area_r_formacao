import { EquivalenciaAcompanhamentoTemplate } from "@/components/templates/equivalencia/acompanhamento";
import { BreadcrumbNav } from "@/components/organisms/BreadcrumbNav";
export default async function EquivalenciaAcompanhamentoPage() {

  return (
    <>
      <BreadcrumbNav
        homeHref={
          process?.env?.NEXT_PUBLIC_CENTRAL_BASE_URL ||
          "https://dge-central-base.vercel.app"
        }
        items={[{ title: "Acompanhamento" }]}
      />
      <div className="flex-1 p-6 w-full">
        <div className="mx-auto w-full">
          <EquivalenciaAcompanhamentoTemplate/>
        </div>
      </div>
    </>
  );
}
