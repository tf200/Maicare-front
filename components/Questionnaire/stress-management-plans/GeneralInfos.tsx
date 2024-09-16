import IconButton from "@/components/buttons/IconButton";
import InputField from "@/components/FormFields/InputField";
import Select from "@/components/FormFields/Select";
import DeleteIcon from "@/components/icons/DeleteIcon";
import Panel from "@/components/Panel";
import { Plus } from "lucide-react";
import React from "react";
import * as Yup from "yup";

export const GeneralInfosInitialValue = {
  // 1 - step
  increased_tension_situation: [],
  increased_tension_symptoms: [],
  visible_symptoms_to_others: [],
  stress_world_reactions: [],
  // 2 - step
  short_term_solutions: [],
  long_term_solutions: [],
  // 3 - step
  support_team_inquiries: [],
  satisfaction_level: true,
  support_contacts: [],
  support_inquiries2: [
    { question: "Rustig blijft", helped: true },
    { question: "Mij vragen stelt", helped: true },
    { question: "Over mijn spanning wil praten", helped: true },
    { question: "Met oplossingen komt", helped: true },
    { question: "Mij afleidt, door……………………", helped: true },
    { question: "Hulp inschakelt, zoals…………….", helped: true },
    { question: "Iets anders…………………………. ", helped: true },
    { question: "Iets anders…………………………. ", helped: true },
  ],
  // 4 - step
  stress_mountain_position: "",
  level_of_satisfaction: { response: "", description: "" },
  additional_needs: { response: "", description: "" },
  // 5 - step
  plans: [],
};

export const GeneralInfosShema = {
  increased_tension_situation: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  increased_tension_symptoms: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  visible_symptoms_to_others: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  stress_world_reactions: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  short_term_solutions: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  long_term_solutions: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  support_team_inquiries: Yup.array().of(Yup.string()).required("moet dit veld invullen"),
  level_of_satisfaction: Yup.object().shape({
    response: Yup.string().required("Veld moet ingevuld worden"),
    description: Yup.string().required("Veld moet ingevuld worden"),
  }),
  additional_needs: Yup.object().shape({
    response: Yup.string().required("Veld moet ingevuld worden"),
    description: Yup.string().required("Veld moet ingevuld worden"),
  }),
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
  short_term_solutions: {
    description: "Korte termijn (quick fix) oplossingen (kruis aan)",
    suggestions: [
      "Even weglopen, alleen zijn: ik ga dan naar………………………………………………………………",
      "Aantal keer heel diep ademhalen…………………………………………………………………………",
      "Naar iemand toegaan, zoals naar…………………………………………………………………………",
      "Iets tekenen, zoals waardoor ik spanning heb……………………………...of…………………………",
      "Lezen in……………………………………………………………………………………………………",
      "Muziek luisteren, naar………………..………………………………………………………………",
      "Iets vasthouden in mijn handen, zoals……………………………………………………………………",
      "(met de hond) Wandelen……………………………………………………………………………………",
      "Een brief schrijven over wat je voelt of noteren in mijn notitie-app..…………………………………",
      "Helpende gedachten opzeggen, zoals ………………………………………………………………",
      "Een plens koud water in mijn gezicht gooien……………………………………………………………",
      "Terugtellen van 5, 4, 3, 2, 1, en mijzelf de vraag stellen: hoe zou ik mij voelen als (…) niet gebeurt? ",
    ],
  },
  long_term_solutions: {
    description: "Lange termijn oplossingen (kruis aan)",
    suggestions: [
      "Praten over wat mij dwars zit (het moment mag ik zelf bepalen)……………………………………",
      "Mijn trigger (dat is……………………………….) kan ik verminderen door………………………………",
      "Genoeg oplaadmomenten in mijn weekprogramma inbouwen. Hier laad ik van op(bijvoorbeeld sporten, afspreken met vrienden, op tijd naar bed gaan, gezond eten, iets met dieren of in de natuur):…...…………..……………………",
    ],
  },
  support_team_inquiries: {
    description: "Hierbij heb ik hulp nodig van een ander (kruis aan)",
    suggestions: [
      "Iemand die mij herinnert aan dit plan………………………………………………………………………",
      "Iemand die mij wil knuffelen/het gevoel geeft dat ik er mag zijn……………………………………",
      "Iemand die helpende gedachten tegen mij kan vertellen……………………………………………",
      "Iemand waarmee ik kan praten. De ander kan dan dit terugzeggen……………………………",
      "Iemand die mij kan afleiden door leuke dingen te gaan doen, namelijk…………………………",
      "Mij de ruimte geeft om mij terug te trekken (ik kom zelf weer naar de ander als ik rustig ben)",
    ],
  },
  support_contacts: {
    description: "Deze mensen in mijn omgeving zijn goed bereikbaar en behulpzaam",
  },
};

const MOUNTAIN_POSITION = [
  { label: "Positie 1", value: "positie 1" },
  { label: "Positie 2", value: "positie 2" },
  { label: "Positie 3", value: "positie 3" },
];

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

  // Function to handle table changes

  const handleAddRow = () => {
    setFieldValue("support_contacts", [
      ...values.support_contacts,
      { name: "", place: "", phone: "", get_in_touch: "", date: "" },
    ]);
  };

  const handleAddPlanTableRow = () => {
    setFieldValue("plans", [
      ...values.plans,
      { date: "", helped: "", not_helped: "", next_time: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const newValues = values.support_contacts.filter((_, i) => i !== index);
    setFieldValue("support_contacts", newValues);
  };

  const handleRemovePlanTableRow = (index) => {
    const newValues = values.plans.filter((_, i) => i !== index);
    setFieldValue("plans", newValues);
  }

  const handleFieldChange = (field, index, newValue) => {
    const newContacts = values.support_contacts.map((contact, i) =>
      i === index ? { ...contact, [field]: newValue } : contact
    );
    setFieldValue("support_contacts", newContacts);
  };

  const handlePlanTableFieldChange = (field, index, newValue) => {
    const newContacts = values.plans.map((contact, i) =>
      i === index ? { ...contact, [field]: newValue } : contact
    );
    setFieldValue("plans", newContacts);
  };

  // other
  const handleInquiryFieldChange = (fieldName, index, value) => {
    const updatedInquiries = values.support_inquiries2;
    if (fieldName === "question") {
      updatedInquiries[index].question = value;
    } else if (fieldName === "helped") {
      // Update the helped boolean value
      updatedInquiries[index].helped = value;
    }

    setFieldValue("support_inquiries2", updatedInquiries);
  };

  const handleSatisfactionFieldChange = (field, newValue) => {
    setFieldValue(`level_of_satisfaction.${field}`, newValue);
  };
  const handleAdditionalNeedsFieldChange = (field, newValue) => {
    setFieldValue(`additional_needs.${field}`, newValue);
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
              {values[field]?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <InputField
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
                    {extraData[field].suggestions?.map((suggestion, index: number) => (
                      <option key={index} value={suggestion} />
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
      <Panel title={"Stap 2 - spanning laten zakken"}>
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          {/* Dynamically Add/Delete Inputs for Each Array Field */}
          {["short_term_solutions", "long_term_solutions"].map((field) => (
            <div key={field} className="flex flex-col gap-4">
              <label className="font-semibold">{extraData[field].description}</label>
              {values[field]?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <InputField
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
                    {extraData[field].suggestions?.map((suggestion, index: number) => (
                      <option key={index} value={suggestion} />
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
      <Panel title={"Stap 3 - Support team"} className="col-span-2">
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          {/* Dynamically Add/Delete Inputs for Each Array Field */}
          {["support_team_inquiries"].map((field) => (
            <div key={field} className="flex flex-col gap-4">
              <label className="font-semibold">{extraData[field].description}</label>
              {values[field]?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <InputField
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
                    {extraData[field].suggestions?.map((suggestion, index: number) => (
                      <option key={index} value={suggestion} />
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

          {/* Table */}
          <label className="font-semibold">{extraData.support_contacts.description}</label>
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Naam</th>
                <th className="px-6 py-3 text-left font-semibold">Plaats</th>
                <th className="px-6 py-3 text-left font-semibold">Telefoon</th>
                <th className="px-6 py-3 text-left font-semibold">Ik neem contact op</th>
                <th className="px-6 py-3 text-left font-semibold">Datum / Besproken</th>
                <th className="px-6 py-3 text-center font-semibold">Acties</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {values.support_contacts?.map((contact, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={contact.name}
                      onChange={(e) => handleFieldChange("name", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.support_contacts?.[index]?.name &&
                        errors.support_contacts?.[index]?.name
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={contact.place}
                      onChange={(e) => handleFieldChange("place", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.support_contacts?.[index]?.place &&
                        errors.support_contacts?.[index]?.place
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={contact.phone}
                      onChange={(e) => handleFieldChange("phone", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.support_contacts?.[index]?.phone &&
                        errors.support_contacts?.[index]?.phone
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={contact.get_in_touch}
                      onChange={(e) => handleFieldChange("get_in_touch", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.support_contacts?.[index]?.get_in_touch &&
                        errors.support_contacts?.[index]?.get_in_touch
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="date"
                      className="w-full"
                      value={contact.date}
                      onChange={(e) => handleFieldChange("date", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.support_contacts?.[index]?.date &&
                        errors.support_contacts?.[index]?.date
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <IconButton className="bg-red-600" onClick={() => handleRemoveRow(index)}>
                      <DeleteIcon className="w-5 h-5" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add New Row Button */}
          <button
            type="button"
            onClick={handleAddRow}
            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded flex gap-2 justify-center hover:bg-blue-500 w-full"
          >
            <Plus /> Nieuwe rij
          </button>

          {/* other  */}
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Als de ander…</th>
                <th className="px-6 py-3 text-center font-semibold">Dit helpt wel</th>
                <th className="px-6 py-3 text-center font-semibold">Dit helpt niet</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {values.support_inquiries2?.map((inquiry, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={inquiry.question}
                      onChange={(e) => handleInquiryFieldChange("question", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.support_inquiries2?.[index]?.question &&
                        errors.support_inquiries2?.[index]?.question
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <InputField
                      type="checkbox"
                      className="w-full"
                      checked={inquiry.helped}
                      onChange={(e) => handleInquiryFieldChange("helped", index, e.target.checked)}
                      onBlur={handleBlur}
                      error={
                        touched.support_inquiries2?.[index]?.helped &&
                        errors.support_inquiries2?.[index]?.helped
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <InputField
                      type="checkbox"
                      className="w-full"
                      checked={!inquiry.helped} // Assuming the opposite value is `false`
                      onChange={(e) => handleInquiryFieldChange("helped", index, !e.target.checked)}
                      onBlur={handleBlur}
                      error={
                        touched.support_inquiries2?.[index]?.helped &&
                        errors.support_inquiries2?.[index]?.helped
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel title={"Stap 4 - Tot jezelf komen"} className="col-span-2">
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          {/* select position */}
          <Select
            label={"Waar op de spanningsberg zou jij je kunnen bevinden na het uitvoeren van dit"}
            name="stress_mountain_position"
            options={MOUNTAIN_POSITION}
            value={values.stress_mountain_position}
            onChange={handleChange}
          />
          <label className="font-semibold">Ben je daar tevreden mee?</label>

          <div className="mt-4">
            {/* Boolean Selector */}
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="level_of_satisfaction.response"
                  value="true"
                  checked={values.level_of_satisfaction.response === true}
                  onChange={(e) => handleSatisfactionFieldChange("response", true)}
                  onBlur={handleBlur}
                  className="form-radio"
                />
                <span className="ml-2">Ja</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="level_of_satisfaction.response"
                  value="false"
                  checked={values.level_of_satisfaction.response === false}
                  onChange={(e) => handleSatisfactionFieldChange("response", false)}
                  onBlur={handleBlur}
                  className="form-radio"
                />
                <span className="ml-2">nee</span>
              </label>
            </div>

            {/* Description Field */}
            <InputField
              type="text"
              name="level_of_satisfaction.description"
              className="w-full"
              placeholder="Please describe why"
              value={values.level_of_satisfaction.description}
              onChange={(e) => handleSatisfactionFieldChange("description", e.target.value)}
              onBlur={handleBlur}
              error={
                touched.level_of_satisfaction?.description &&
                errors.level_of_satisfaction?.description
              }
            />
          </div>

          <label className="font-semibold">
            Heb je nog iets ander nodig (om dit plan te gebruiken)?
          </label>

          <div className="mt-4">
            {/* Boolean Selector */}
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="additional_needs.response"
                  value="true"
                  checked={values.additional_needs.response === true}
                  onChange={(e) => handleAdditionalNeedsFieldChange("response", true)}
                  onBlur={handleBlur}
                  className="form-radio"
                />
                <span className="ml-2">Ja</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="additional_needs.response"
                  value="false"
                  checked={values.additional_needs.response === false}
                  onChange={(e) => handleAdditionalNeedsFieldChange("response", false)}
                  onBlur={handleBlur}
                  className="form-radio"
                />
                <span className="ml-2">nee</span>
              </label>
            </div>

            {/* Description Field */}
            <InputField
              type="text"
              name="additional_needs.description"
              className="w-full"
              placeholder="Please describe why"
              value={values.additional_needs.description}
              onChange={(e) => handleAdditionalNeedsFieldChange("description", e.target.value)}
              onBlur={handleBlur}
              error={touched.additional_needs?.description && errors.additional_needs?.description}
            />
          </div>
        </div>
      </Panel>
      <Panel title={"Stap 5 - Gebruiken"} className="col-span-2">
        <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
          {/* Table */}
          <label className="font-semibold">
            Deze stap vul je in nadat je het plan gebruikt hebt.
          </label>
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">
                  Ik heb dit plan gebruikt op (datum)
                </th>
                <th className="px-6 py-3 text-left font-semibold">Dit hielp wel</th>
                <th className="px-6 py-3 text-left font-semibold">Dit hielp niet</th>
                <th className="px-6 py-3 text-left font-semibold">Dit ga ik een volgende keer
                anders doen</th>
                <th className="px-6 py-3 text-center font-semibold">Acties</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {values.plans?.map((plan, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <InputField
                      type="date"
                      className="w-full"
                      value={plan.date}
                      onChange={(e) => handlePlanTableFieldChange("date", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.plans?.[index]?.name &&
                        errors.plans?.[index]?.name
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={plan.helped}
                      onChange={(e) => handlePlanTableFieldChange("helped", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.plans?.[index]?.place &&
                        errors.plans?.[index]?.place
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={plan.not_helped}
                      onChange={(e) => handlePlanTableFieldChange("not_helped", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.plans?.[index]?.phone &&
                        errors.plans?.[index]?.phone
                      }
                    />
                  </td>
                  <td className="px-6 py-4">
                    <InputField
                      type="text"
                      className="w-full"
                      value={plan.next_time}
                      onChange={(e) => handlePlanTableFieldChange("next_time", index, e.target.value)}
                      onBlur={handleBlur}
                      error={
                        touched.plans?.[index]?.get_in_touch &&
                        errors.plans?.[index]?.get_in_touch
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <IconButton className="bg-red-600" onClick={() => handleRemovePlanTableRow(index)}>
                      <DeleteIcon className="w-5 h-5" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add New Row Button */}
          <button
            type="button"
            onClick={handleAddPlanTableRow}
            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded flex gap-2 justify-center hover:bg-blue-500 w-full"
          >
            <Plus /> Nieuwe rij
          </button>
        </div>
      </Panel>
    </>
  );
}
