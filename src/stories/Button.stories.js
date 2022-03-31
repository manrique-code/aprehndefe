import Button from "../components/ui/buttons/Button";

export default {
  title: "Button",
  component: Button,
};

const ButtonTemplate = (args) => <Button {...args} />;

export const ButtonInterface = ButtonTemplate.bind({});
ButtonInterface.args = {
  label: "Hola mundo!",
  icon: null,
  title: "Hola desde el hover del botón!",
  size: "md",
  type: "primary",
};
