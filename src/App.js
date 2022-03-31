import Button from "./components/ui/buttons/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Button
      icon={faArrowRight}
      label="Hola mundo!"
      size="lg"
      title="Hola desde el hover"
      type="primary"
    />
  );
}

export default App;
