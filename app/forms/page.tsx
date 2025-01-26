import { Form } from "./ui/Form";

export default function FormPage() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen"
      data-testid="container-form-page"
    >
      <Form />
    </main>
  );
}
