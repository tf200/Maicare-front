"use client";
import Panel from "@/components/Panel";
import QuestionnaireDownloadButton from "@/components/QuestionnaireDownloadButton";
import IconButton from "@/components/buttons/IconButton";
import LinkButton from "@/components/buttons/LinkButton";
import { useMaturityMatrixList } from "@/utils/domains";
import Link from "next/link";
import DropDownPrintButton from "@/components/maturity_matrix/DropDownPrintButton";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import ReactTooltip, { Tooltip } from "react-tooltip";
import MultiMaturityMatrixPrintButton from "@/components/maturity_matrix/MultiMaturityMatrixPrintButton";

export default function MaturityMatrixPage({ params: { clientId } }) {
  const { data: maturity_matrix_list, isLoading } = useMaturityMatrixList(clientId);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (maturity_matrix_list) {
      setItems(maturity_matrix_list.map((matrix) => ({ ...matrix, checked: false })));
    }
  }, [maturity_matrix_list]);

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, checked };
        }
        return item;
      })
    );
  };

  return (
    <Panel
      title="Zelfduurzaamheidsmatrixlijst"
      sideActions={
        <div className="flex gap-2">
          <MultiMaturityMatrixPrintButton
            questIds={items.filter((item) => item.checked).map((item) => item.id)}
          />
          <LinkButton
            text="Nieuwe Zelfduurzaamheidsmatrix creëren"
            href={"./maturity-matrix/add"}
            className="ml-auto"
          />
        </div>
      }
    >
      <div className="p-5">
        {isLoading ? (
          "Loading..."
        ) : (
          <table className="table-auto w-full text-left border-spacing-2">
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
              {items.map((matrix) => (
                <tr
                  key={matrix.id}
                  className={
                    matrix.checked ? "bg-gray-2 dark:bg-white/20 rounded-md overflow-hidden " : ""
                  }
                >
                  <td className="py-5 flex justify-start items-center gap-2">
                    <input
                      type="checkbox"
                      checked={matrix?.checked || false}
                      onChange={(e) => handleCheckboxChange(matrix.id, e.target.checked)}
                      className="ml-4 h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-black/20 dark:border-gray outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                    />
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
                    <DropDownPrintButton questId={+matrix.id} />
                    <Link href={`./maturity-matrix/${matrix.id}/edit`}>
                      <IconButton className="bg-blue-700">
                        <Pencil className="w-5 h-5" />
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
