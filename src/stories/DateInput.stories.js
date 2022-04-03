import Date from "../components/ui/inputs/date/Date";

export default {
  title: "Components/UI/Date Input",
  component: Date,
};

const DateTemplate = (args) => <Date {...args} />;

export const DateInterface = DateTemplate.bind({});
DateInterface.args = {
  type: "MONTH",
  size: "md",
};
