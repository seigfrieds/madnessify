import React from "react";
import BracketParameterForm from "./components/BracketParameterForm/BracketParameterForm";
import { useBracketParameterForm } from "./hooks/useBracketParameterForm";

export default function HomePage(): React.JSX.Element {
  const [handleSubmit] = useBracketParameterForm();

  return <BracketParameterForm handleSubmit={handleSubmit} />;
}
