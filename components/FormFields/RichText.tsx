"use client";

import React, { FunctionComponent } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useField } from "formik";

const RichText: FunctionComponent<{
  name: string;
  label: string;
  className?: string;
}> = (props) => {
  const [fieldProps, meta, helpers] = useField<EditorState>({
    name: props.name,
  });
  return (
    <div className={props.className}>
      <span className="block mb-2.5 text-c_black dark:text-white">{props.label}</span>
      <Editor
        wrapperClassName={
          "rounded border-[1.5px] border-stroke bg-white py-3 px-5 font-medium outline-none transition focus-within:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        }
        toolbar={{
          options: ["inline", "blockType", "list", "textAlign"],
        }}
        editorState={fieldProps.value}
        onEditorStateChange={helpers.setValue}
      />
    </div>
  );
};

export default RichText;
