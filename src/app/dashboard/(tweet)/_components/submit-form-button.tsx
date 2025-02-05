import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { useScheduleForm } from "./schedule-form";

const SubmitFormButton = () => {
  const { form, onSubmit } = useScheduleForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <Button type="submit">保存</Button>
    </>
  );
};

export default SubmitFormButton;
