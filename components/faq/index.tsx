"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ{
question:string;
answer:string
}

type FAQProps ={data:FAQ[]};
export default function FAQSection( {data}:FAQProps) {
  const [value, setValue] = useState<string | undefined>("item-1");

  return (
    <div className="min-h-screen ">
      <div className="w-full flex justify-center mt-10">
        <Card className="w-[800px] m-2  p-5 flex flex-col max-h-fit ">
          <CardHeader className=" text-primary text-3xl font-semibold justify-center w-full my-6 ">
            Frequently Asked Questions
          </CardHeader>
          <Accordion
            type="single"
            collapsible
            value={value}
            onValueChange={setValue}
            className="flex flex-col gap-5 w-full"
          >
            {data.map((data, idx) => (
              <AccordionItem value={idx.toString()} key={idx}>
                <AccordionTrigger>{data.question}</AccordionTrigger>
                <AccordionContent>{data.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
}
