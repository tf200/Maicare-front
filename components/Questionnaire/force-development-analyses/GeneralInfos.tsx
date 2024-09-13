import IconButton from "@/components/buttons/IconButton";
import DeleteIcon from "@/components/icons/DeleteIcon";
import Panel from "@/components/Panel";
import { Field, FieldArray } from "formik";
import { Plus } from "lucide-react";
import React from "react";
import * as Yup from "yup";

export const GeneralInfosInitialValue = {
  table: [
    { domain_of_strength: "Persoonlijke kwaliteiten", description: "", example_or_comment: "" },
    { domain_of_strength: "Interpersoonlijke vaardigheden", description: "", example_or_comment: "" },
    { domain_of_strength: "Talenten en vaardigheden", description: "", example_or_comment: "" },
    { domain_of_strength: "Levenservaringen", description: "", example_or_comment: "" },
    { domain_of_strength: "Ondersteunend netwerk", description: "", example_or_comment: "" },
    { domain_of_strength: "Coping-strategieën", description: "", example_or_comment: "" },
  ],
};


export const GeneralInfosShema = {
  table: Yup.array().of(
    Yup.object().shape({
      domain_of_strength: Yup.string().required("Verplicht"),
      description: Yup.string().required("Verplicht"),
      example_or_comment: Yup.string().required("Verplicht"),
    })
  ),
};

export default function GeneralInfos({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
  client_id,
  setFieldValue,
}) {
  return (
    <>
      {/* General Information */}
      <Panel title={"De tafel"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          <p>Een krachtenontwikkelingsanalyse (ook wel krachteninventarisatie genoemd) is een instrument dat wordt gebruikt om de sterke punten, hulpbronnen en vaardigheden van een persoon te identificeren. Hier is een format voor een krachteninventarisatie: </p>
          <FieldArray name="table">
            {() => (
              <div>
                <table className="min-w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Sterkste Punt</th>
                      <th className="border px-4 py-2">Beschrijving</th>
                      <th className="border px-4 py-2">Voorbeeld of Opmerking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.table.map((row, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">
                          <span className="font-bold">{row.domain_of_strength}</span>
                        </td>
                        <td className="border px-4 py-2">
                          <Field
                            name={`table[${index}].description`}
                            placeholder="Beschrijving"
                            className="w-full border rounded-md p-2"
                          />
                          {errors.table?.[index]?.description &&
                          touched.table?.[index]?.description ? (
                            <div className="text-red-500 text-sm">
                              {errors.table[index].description}
                            </div>
                          ) : null}
                        </td>
                        <td className="border px-4 py-2">
                          <Field
                            name={`table[${index}].example_or_comment`}
                            placeholder="Voorbeeld of Opmerking"
                            className="w-full border rounded-md p-2"
                          />
                          {errors.table?.[index]?.example_or_comment &&
                          touched.table?.[index]?.example_or_comment ? (
                            <div className="text-red-500 text-sm">
                              {errors.table[index].example_or_comment}
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </FieldArray>
          <p>In dit format kunnen de sterke punten en hulpbronnen van de persoon op verschillende domeinen worden geïdentificeerd en beschreven. Voor elk domein kan de persoonlijke kwaliteit, vaardigheid of hulpbron worden beschreven, en kunnen voorbeelden of opmerkingen worden gegeven om de analyse te ondersteunen. Het doel van een krachteninventarisatie is om de positieve aspecten van de persoon te benadrukken en te gebruiken als basis voor het ontwikkelen van een plan voor groei en verandering. </p>
        </div>
      </Panel>
    </>
  );
}
