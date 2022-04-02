import Text from "../components/ui/inputs/text/Text";

export default {
  title: "Text Input",
  component: Text,
};

const TextTemplate = (args) => <Text {...args} />;

export const TextInterface = TextTemplate.bind({});
TextInterface.args = {
  anchoCompleto: false,
  errorMessage: "Usuario incorrecto",
  id: "txtInputCorreo",
  placeholder: "ejemplo@mail.com",
  label: "Correo electrónico",
  name: "txtInput",
  maxLength: 18,
  obligatorio: false,
  type: "text",
};
