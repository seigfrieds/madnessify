import React from "react";
import BracketParameterForm from "./components/BracketParameterForm/BracketParameterForm";
import { useBracketParameterForm } from "./hooks/useBracketParameterForm";
import { useLocation } from "react-router-dom";

export default function HomePage(): React.JSX.Element {
  const { state } = useLocation();
  const { spotifyToken } = state;
  const [handleSubmit] = useBracketParameterForm(spotifyToken);

  return <BracketParameterForm handleSubmit={handleSubmit} />;
}
