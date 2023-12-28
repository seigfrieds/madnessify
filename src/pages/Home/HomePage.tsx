import React from "react";
import BracketParameterForm from "./components/BracketParameterForm/BracketParameterForm";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSubmit } from "./HomePage.logic";

export default function HomePage(): React.JSX.Element {
  const { spotifyToken } = useLocation().state;
  const navigate = useNavigate();

  return <BracketParameterForm handleSubmit={(e) => handleSubmit(e, spotifyToken, navigate)} />;
}
