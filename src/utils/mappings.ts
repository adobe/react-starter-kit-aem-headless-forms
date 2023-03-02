import { mappings } from "@aemforms/af-react-components";
import Button from "../components/button";
import CheckBoxGroup from "../components/checkboxgroup";
import DropDown from "../components/dropdown";
import Panel from "../components/panel";
import RadioGroup from "../components/radiobutton";
import TextInput from "../components/textinput";
import NumberInput from "../components/numberinput";

const customMappings: any = {
  ...mappings,
  "text-input": TextInput,
  "number-input": NumberInput,
  "radio-group" : RadioGroup,
  "button": Button,
  "panel": Panel,
  "drop-down": DropDown,
  "checkbox-group": CheckBoxGroup
};

export default customMappings;