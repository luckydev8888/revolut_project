import { useContext } from "react";
import { CardContext } from "../contexts/CardContext";

const useCard = () => useContext(CardContext);

export default useCard;
