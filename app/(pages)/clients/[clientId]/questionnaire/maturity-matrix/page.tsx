import Panel from "@/components/Panel";
import LinkButton from "@/components/buttons/LinkButton";

export default function MaturityMatrixPage({ params: { clientId } }) {
  // const { data, isLoading } = useClientMaturityMatrices(clientId);

  return (
    <Panel
      title="Volwassenheidsmatrices"
      sideActions={
        <LinkButton
          text="Nieuwe volwassenheidsmatrix creëren"
          href={"./maturity-matrix/add"}
          className="ml-auto"
        />
      }
    >
      <div className="p-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia deleniti animi dolor
        recusandae optio enim provident dolores assumenda praesentium vero necessitatibus vel
        similique, perspiciatis voluptas illo aspernatur. Officiis, quidem.
      </div>
    </Panel>
  );
}
