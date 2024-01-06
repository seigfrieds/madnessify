import React from "react";
import BracketParameterForm from "./components/BracketParameterForm/BracketParameterForm";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "./HomePage.logic";

export default function HomePage(): React.JSX.Element {
  const navigate = useNavigate();

  return <BracketParameterForm handleSubmit={(e) => handleSubmit(e, navigate)} />;
}
