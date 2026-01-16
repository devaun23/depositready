"use client";

import { useQuiz } from "../QuizContext";
import { DateDropdowns } from "@/components/ui/DateDropdowns";

export function MoveOutStep() {
  const { data, updateData } = useQuiz();

  return (
    <div className="max-w-sm mx-auto w-full">
      <DateDropdowns
        value={data.moveOutDate}
        onChange={(date) => updateData("moveOutDate", date)}
        maxDate={new Date()}
        id="quiz-moveout"
      />

      <p className="text-center text-sm text-gray-500 mt-4">
        The day you turned in your keys and ended possession
      </p>
    </div>
  );
}
