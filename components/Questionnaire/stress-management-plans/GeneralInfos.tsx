import IconButton from "@/components/buttons/IconButton";
import InputField from "@/components/FormFields/InputField";
import DeleteIcon from "@/components/icons/DeleteIcon";
import Panel from "@/components/Panel";
import { Plus } from "lucide-react";
import React from "react";
import * as Yup from "yup";

export const GeneralInfosInitialValue = {
  increased_tension_situation: [],
  increased_tension_symptoms: [],
  visible_symptoms_to_others: [],
  stress_world_reactions: [],
};

export const GeneralInfosShema = {
  increased_tension_situation: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  increased_tension_symptoms: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  visible_symptoms_to_others: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  stress_world_reactions: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
};

const extraData = {
  increased_tension_situation: {
    description: "In deze situatie neemt mijn spanning toe (kruis aan)",
    suggestions: [
      "Als ik (ineens) alleen ben",
      "Als er teveel mensen om mij heen zijn",
      "Als er iets onvoorspelbaars gebeurt",
      "Als ik faal",
      "Als ik iets moet doen dat ik niet wil",
      "Als mensen om mij heen gestresst zijn",
      "Als ik iets oneerlijk vind",
      "Als ik het gevoel heb dat ik teveel moet",
    ],
  },
  increased_tension_symptoms: {
    description: "Hieraan merk ik dat mijn spanning toeneemt (kruis aan)",
    suggestions: [
      "Mijn ademhaling gaat omhoog",
      "Ik span (on)bewust mijn spieren aan",
      "Ik krijg tranen in mijn ogen",
      "Ik voel hoofdpijn",
      "Ik word misselijk",
      "Ik word duizelig",
      "Ik sluit mij (on)bewust af van mijn omgeving",
      "Ik kan niet meer nadenken (vol hoofd)",
    ],
  },
  visible_symptoms_to_others: {
    description: "Zo ziet mijn stresswereld eruit (kruis aan)",
    suggestions: ["Ik ga verstoppen", "Ik ga vluchten", "Ik verstar", "Ik ga vechten"],
  },
  stress_world_reactions: {
    description: "Dit merken anderen aan mij (vul in)",
  },
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
  const handleAddField = (field) => {
    setFieldValue(field, [...values[field], ""]);
  };

  // Function to handle removing an input by index
  const handleRemoveField = (field, index) => {
    const newValues = values[field].filter((_, i) => i !== index);
    setFieldValue(field, newValues);
  };

  return (
    <>
      <Panel title={"Stap 1 - spanning herkennen"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          {/* Dynamically Add/Delete Inputs for Each Array Field */}
          {[
            "increased_tension_situation",
            "increased_tension_symptoms",
            "visible_symptoms_to_others",
            "stress_world_reactions",
          ].map((field) => (
            <div key={field} className="flex flex-col gap-4">
              <label className="font-semibold">{extraData[field].description}</label>
              {values[field].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <InputField
                    id={`${field}_${index}`}
                    list={`${field}_${index}`}
                    type="text"
                    className="w-full"
                    value={item}
                    onChange={(e) =>
                      setFieldValue(
                        field,
                        values[field].map((val, i) => (i === index ? e.target.value : val))
                      )
                    }
                    onBlur={handleBlur}
                    error={touched[field] && errors[field]}
                  />
                  <datalist id={`${field}_${index}`}>
                    {extraData[field].suggestions?.map((suggestion) => (
                      <option key={suggestion} value={suggestion} />
                    ))}
                  </datalist>
                  <IconButton
                    className="bg-red-600"
                    onClick={() => handleRemoveField(field, index)}
                  >
                    <DeleteIcon className="w-5 h-5" />
                  </IconButton>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(field)}
                className="px-4 py-2 bg-blue-400 text-white rounded flex gap-2 justify-center hover:bg-blue-500 "
              >
                <Plus /> Nieuwe
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
