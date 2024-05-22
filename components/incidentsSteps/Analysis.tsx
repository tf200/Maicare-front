import React from "react";
import Panel from "../Panel";
import CheckBoxInputFieldThin from "../FormFields/CheckBoxInputThin";
import InputField from "../FormFields/InputField";
import Textarea from "../FormFields/Textarea";
import * as Yup from "yup";

export const AnalysisShema = {
  employeeName: Yup.string().required("Selecteer minstens één betrokken kind."),
  textArea2: Yup.string().required("Selecteer minstens één betrokken kind."),
};

export default function Analysis({
  handleChange,
  values,
  handleBlur,
  touched,
  errors,
}) {
  return (
    <Panel title={"3. Mogelijke oorzaak en toelichting"}>
      <div className="mb-4.5 mt-4.5 grid grid-cols-2 gap-6 px-6.5">
        <div className="flex flex-col ">
          <label className="mb-4 block text-black dark:text-white">
            Technisch
          </label>
          <CheckBoxInputFieldThin
            label={"Accomodatie / terrein"}
            className="mb-3"
            name={"checkbox1"}
            id={"checkbox1"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox1 || false}
          />
          <CheckBoxInputFieldThin
            label={"Alarmering"}
            className="mb-3"
            name={"checkbox2"}
            id={"checkbox2"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox2 || false}
          />
          <CheckBoxInputFieldThin
            label={"Apparatuur"}
            className="mb-3"
            name={"checkbox3"}
            id={"checkbox3"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox3 || false}
          />
          <CheckBoxInputFieldThin
            label={"Bediening / onjuist gebruik"}
            className="mb-3"
            name={"checkbox4"}
            id={"checkbox4"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox4 || false}
          />
          <CheckBoxInputFieldThin
            label={"Gebouw-gebonden"}
            className="mb-3"
            name={"checkbox5"}
            id={"checkbox5"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox5 || false}
          />
          <CheckBoxInputFieldThin
            label={"Handleidingen"}
            className="mb-3"
            name={"checkbox6"}
            id={"checkbox6"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox6 || false}
          />
          <CheckBoxInputFieldThin
            label={"Hulpmiddelen"}
            className="mb-3"
            name={"checkbox7"}
            id={"checkbox7"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox7 || false}
          />
          <CheckBoxInputFieldThin
            label={"ICT"}
            className="mb-3"
            name={"checkbox8"}
            id={"checkbox8"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox8 || false}
          />
          <CheckBoxInputFieldThin
            label={"Instructie"}
            className="mb-3"
            name={"checkbox9"}
            id={"checkbox9"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox9 || false}
          />
          <CheckBoxInputFieldThin
            label={"Materiaal defect"}
            className="mb-3"
            name={"checkbox10"}
            id={"checkbox10"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox10 || false}
          />
          <CheckBoxInputFieldThin
            label={"Onderhoud"}
            className="mb-3"
            name={"checkbox11"}
            id={"checkbox11"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox11 || false}
          />
          <CheckBoxInputFieldThin
            label={"Onduidelijke instructie"}
            className="mb-3"
            name={"checkbox12"}
            id={"checkbox12"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox12 || false}
          />
          <CheckBoxInputFieldThin
            label={"Stolen / sleutels"}
            className="mb-3"
            name={"checkbox13"}
            id={"checkbox13"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox13 || false}
          />
        </div>
        <div className="flex flex-col ">
          <label className="mb-4 block text-black dark:text-white">
            Organisatorish
          </label>
          <CheckBoxInputFieldThin
            label={"Budget/management prioriteiten"}
            className="mb-3"
            name={"checkbox1"}
            id={"checkbox1"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox1 || false}
          />
          <CheckBoxInputFieldThin
            label={"Cultuur / werkplek"}
            className="mb-3"
            name={"checkbox2"}
            id={"checkbox2"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox2 || false}
          />
          <CheckBoxInputFieldThin
            label={"Formatie / bezetting"}
            className="mb-3"
            name={"checkbox3"}
            id={"checkbox3"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox3 || false}
          />
          <CheckBoxInputFieldThin
            label={"Kennis / deskundigheid niet aanwezig"}
            className="mb-3"
            name={"checkbox4"}
            id={"checkbox4"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox4 || false}
          />
          <CheckBoxInputFieldThin
            label={"Logistiek"}
            className="mb-3"
            name={"checkbox5"}
            id={"checkbox5"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox5 || false}
          />
          <CheckBoxInputFieldThin
            label={"Onderbewetting / Onvoldoende ingewerkt / begeleid"}
            className="mb-3"
            name={"checkbox6"}
            id={"checkbox6"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox6 || false}
          />
          <CheckBoxInputFieldThin
            label={"Overdracht"}
            className="mb-3"
            name={"checkbox7"}
            id={"checkbox7"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox7 || false}
          />
          <CheckBoxInputFieldThin
            label={"Overleg"}
            className="mb-3"
            name={"checkbox8"}
            id={"checkbox8"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox8 || false}
          />
          <CheckBoxInputFieldThin
            label={"Planning"}
            className="mb-3"
            name={"checkbox9"}
            id={"checkbox9"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox9 || false}
          />
          <CheckBoxInputFieldThin
            label={"Protocol / afspraak niet aanwezig of onduidelijk"}
            className="mb-3"
            name={"checkbox10"}
            id={"checkbox10"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox10 || false}
          />
          <CheckBoxInputFieldThin
            label={"Taken, bevoegdheden en verantwoordelijkheden"}
            className="mb-3"
            name={"checkbox11"}
            id={"checkbox11"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox11 || false}
          />
        </div>
        <div className="flex flex-col ">
          <label className="mb-4 block text-black dark:text-white">
            Mesewerker
          </label>
          <CheckBoxInputFieldThin
            label={"Afgeleid"}
            className="mb-3"
            name={"checkbox1"}
            id={"checkbox1"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox1 || false}
          />
          <CheckBoxInputFieldThin
            label={"Conditie"}
            className="mb-3"
            name={"checkbox2"}
            id={"checkbox2"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox2 || false}
          />
          <CheckBoxInputFieldThin
            label={"Deskundigheid"}
            className="mb-3"
            name={"checkbox3"}
            id={"checkbox3"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox3 || false}
          />
          <CheckBoxInputFieldThin
            label={"Ervaring"}
            className="mb-3"
            name={"checkbox4"}
            id={"checkbox4"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox4 || false}
          />
          <CheckBoxInputFieldThin
            label={"Fysieke belasting"}
            className="mb-3"
            name={"checkbox5"}
            id={"checkbox5"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox5 || false}
          />
          <CheckBoxInputFieldThin
            label={"Bekwaamheid / bevoegdheid"}
            className="mb-3"
            name={"checkbox6"}
            id={"checkbox6"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox6 || false}
          />
          <CheckBoxInputFieldThin
            label={"Ingewerkt zijn"}
            className="mb-3"
            name={"checkbox7"}
            id={"checkbox7"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox7 || false}
          />
          <CheckBoxInputFieldThin
            label={"Oplettendheid / vergissen"}
            className="mb-3"
            name={"checkbox8"}
            id={"checkbox8"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox8 || false}
          />
          <CheckBoxInputFieldThin
            label={"Protocol / instructie niet nageleefd"}
            className="mb-3"
            name={"checkbox9"}
            id={"checkbox9"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox9 || false}
          />
          <CheckBoxInputFieldThin
            label={"Teamsfeer"}
            className="mb-3"
            name={"checkbox10"}
            id={"checkbox10"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox10 || false}
          />
          <CheckBoxInputFieldThin
            label={"Veiligheidsbewustzijn"}
            className="mb-3"
            name={"checkbox11"}
            id={"checkbox11"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox11 || false}
          />
          <CheckBoxInputFieldThin
            label={"Werkdruk"}
            className="mb-3"
            name={"checkbox12"}
            id={"checkbox12"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox12 || false}
          />
          <CheckBoxInputFieldThin
            label={"Zorgvuldigheid"}
            className="mb-3"
            name={"checkbox13"}
            id={"checkbox13"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox13 || false}
          />
          <CheckBoxInputFieldThin
            label={"Invalmedewerker niet goed op de hoogte"}
            className="mb-3"
            name={"checkbox14"}
            id={"checkbox14"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox14 || false}
          />
          <CheckBoxInputFieldThin
            label={"Persoonlijke omstandigheden medewerker"}
            className="mb-3"
            name={"checkbox15"}
            id={"checkbox15"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox15 || false}
          />
        </div>
        <div className="flex flex-col ">
          <label className="mb-4 block text-black dark:text-white">
            Cliënt
          </label>
          <CheckBoxInputFieldThin
            label={"Alcohol en drugs"}
            className="mb-3"
            name={"checkbox1"}
            id={"checkbox1"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox1 || false}
          />
          <CheckBoxInputFieldThin
            label={"Conditie / fysieke toestand"}
            className="mb-3"
            name={"checkbox2"}
            id={"checkbox2"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox2 || false}
          />
          <CheckBoxInputFieldThin
            label={"Culturele achtergrond"}
            className="mb-3"
            name={"checkbox3"}
            id={"checkbox3"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox3 || false}
          />
          <CheckBoxInputFieldThin
            label={"Gedrag van cliënt"}
            className="mb-3"
            name={"checkbox4"}
            id={"checkbox4"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox4 || false}
          />
          <CheckBoxInputFieldThin
            label={"Groepssamenstelling"}
            className="mb-3"
            name={"checkbox5"}
            id={"checkbox5"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox5 || false}
          />
          <CheckBoxInputFieldThin
            label={"Juridische status"}
            className="mb-3"
            name={"checkbox6"}
            id={"checkbox6"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox6 || false}
          />
          <CheckBoxInputFieldThin
            label={"Medicatie"}
            className="mb-3"
            name={"checkbox7"}
            id={"checkbox7"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox7 || false}
          />
          <CheckBoxInputFieldThin
            label={"Onbekende risici?s"}
            className="mb-3"
            name={"checkbox8"}
            id={"checkbox8"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox8 || false}
          />
          <CheckBoxInputFieldThin
            label={"Psychische toestand cliënt"}
            className="mb-3"
            name={"checkbox9"}
            id={"checkbox9"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox9 || false}
          />
          <CheckBoxInputFieldThin
            label={"Therapietrouw / motivatie"}
            className="mb-3"
            name={"checkbox10"}
            id={"checkbox10"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox10 || false}
          />
          <CheckBoxInputFieldThin
            label={"Familie van de cliënt"}
            className="mb-3"
            name={"checkbox11"}
            id={"checkbox11"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox11 || false}
          />
          <CheckBoxInputFieldThin
            label={"Waarden en normen"}
            className="mb-3"
            name={"checkbox12"}
            id={"checkbox12"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox12 || false}
          />
          <CheckBoxInputFieldThin
            label={"Ziektebeeld"}
            className="mb-3"
            name={"checkbox13"}
            id={"checkbox13"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox13 || false}
          />
          <CheckBoxInputFieldThin
            label={"Taalproblematiek"}
            className="mb-3"
            name={"checkbox14"}
            id={"checkbox14"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox14 || false}
          />
          <CheckBoxInputFieldThin
            label={
              "De wijwe waarop de zorg uitgevoerd moet worden is niet haalbaar"
            }
            className="mb-3"
            name={"checkbox13"}
            id={"checkbox13"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox13 || false}
          />
          <CheckBoxInputFieldThin
            label={"Niet opvolgen huisregels"}
            className="mb-3"
            name={"checkbox13"}
            id={"checkbox13"}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultChecked={values.checkbox13 || false}
          />
        </div>

        <InputField
          className={"col-span-2"}
          id={"employeeName"}
          required={true}
          label={"Overig"}
          placeholder=""
          type={"text"}
          value={values.employeeName || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.employeeName && errors.employeeName}
        />
        <Textarea
          className="mb-4 col-span-2"
          rows={2}
          id={"textArea2"}
          required={true}
          label={"Toelichting op de oorzaak/oorzaken"}
          value={values.textArea || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.textArea2 && errors.textArea2}
        />
      </div>
    </Panel>
  );
}
