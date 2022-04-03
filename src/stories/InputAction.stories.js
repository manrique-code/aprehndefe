import InputAction from "../components/ui/inputs/inputAction/InputAction";

export default {
  title: "Components/UI/Input Action",
  component: InputAction,
};

const InputActionTemplate = (args) => <InputAction {...args} />;

export const InputActionInterface = InputActionTemplate.bind({});
InputActionInterface.args = {
  buttonLabel: "Copiar",
  placeHolder: "Ejemplo de texto",
  size: "md",
  label: "¡Hola mundo!",
  titleLabel: "¡Hola desde el hover del botón!",
  styles: {},
};
