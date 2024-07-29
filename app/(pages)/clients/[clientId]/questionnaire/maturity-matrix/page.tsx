"use client";
import Icon from "@/components/Icon";
import Panel from "@/components/Panel";
import QuestionnaireDownloadButton from "@/components/QuestionnaireDownloadButton";
import IconButton from "@/components/buttons/IconButton";
import LinkButton from "@/components/buttons/LinkButton";
import { useMaturityMatrixList } from "@/utils/domains";
import Link from "next/link";

export default function MaturityMatrixPage({ params: { clientId } }) {
  const { data: maturity_matrix_list, isLoading } = useMaturityMatrixList(clientId);

  return (
    <Panel
      title="Zelfduurzaamheidsmatrixlijst"
      sideActions={
        <LinkButton
          text="Nieuwe Zelfduurzaamheidsmatrix creëren"
          href={"./maturity-matrix/add"}
          className="ml-auto"
        />
      }
    >
      <div className="p-5">
        {isLoading ? (
          "Loading..."
        ) : (
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Start datum</th>
                <th>Eind datum</th>
                {/* <th>Goedgekeurd</th> */}
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {maturity_matrix_list.map((matrix) => (
                <tr key={matrix.id}>
                  <td className="py-5">
                    <Link href={`./maturity-matrix/${matrix.id}/edit`}>
                      <b>Zelfduurzaamheidsmatrix (#{matrix.id})</b>
                    </Link>
                  </td>
                  <td>{matrix.start_date}</td>
                  <td>{matrix.end_date}</td>
                  {/* <td>{matrix.is_approved ? "Ja" : "Nee"}</td> */}
                  <td
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <QuestionnaireDownloadButton type="maturity_matrix" questId={+matrix.id} />
                    <Link href={`./maturity-matrix/${matrix.id}/edit`}>
                      <IconButton>
                        <Icon name="pencil" className="!w-5 !h-5" />
                      </IconButton>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Panel>
  );
}
