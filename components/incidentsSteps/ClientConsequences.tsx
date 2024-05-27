import React from "react";
import InputField from "../FormFields/InputField";
import Select from "../FormFields/Select";
import {
  CONSULTATION_NEEDED_OPTIONS,
  INJURY_OPTIONS,
  PSYCHOLOGICAL_DAMAGE_OPTIONS,
} from "@/consts";
import * as Yup from "yup";
import Panel from "../Panel";

export const ClientConsequencesShema = {
  physical_injury_desc: Yup.string().required("shouldnt be empty "),
  physical_injury: Yup.string().required("shouldnt be empty"),
  psychological_damage: Yup.string().required("shouldnt be empty"),
  psychological_damage_desc: Yup.string().required("shouldnt be empty"),
  needed_consultation: Yup.string().required("shouldnt be empty"),
};

export default function ClientConsequences({ handleChange, values, handleBlur, touched, errors }) {
  return (
    <Panel title={"4. Gevolgen"}>
      <div className="mb-4.5 mt-4.5 flex flex-col gap-6 px-6.5">
        <label className="font-bold">Gevolgen cliënt</label>
        <Select
          label={"Lichamelijjk letsel"}
          name="physical_injury"
          id="physical_injury"
          value={values.physical_injury}
          className="w-full"
          required={true}
          options={INJURY_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.physical_injury}
        />
        <InputField
          className={"w-full"}
          id={"physical_injury_desc"}
          required={true}
          type={"text"}
          value={values.physical_injury_desc}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.physical_injury_desc}
        />
        <Select
          label={"Psychische schade"}
          name="psychological_damage"
          id="psychological_damage"
          value={values.psychological_damage}
          className="w-full"
          required={true}
          options={PSYCHOLOGICAL_DAMAGE_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.psychological_damage}
        />
        <InputField
          className={"w-full"}
          id={"psychological_damage_desc"}
          required={true}
          type={"text"}
          value={values.psychological_damage_desc}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.psychological_damage_desc}
        />
        <Select
          label={"Consult nodig"}
          name="needed_consultation"
          id="needed_consultation"
          value={values.needed_consultation}
          className="w-full"
          required={true}
          options={CONSULTATION_NEEDED_OPTIONS}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.needed_consultation}
        />
      </div>
    </Panel>
  );
}
