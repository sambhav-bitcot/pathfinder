"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, FileText, X } from "lucide-react";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Resources } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/ui/page-header";

/*    Resource Type Options
 */
const resourceType = [
  { value: "essay writing", title: "Essay Writing" },
  { value: "test prep", title: "Test Prep" },
  { value: "financial aid", title: "Financial Aid" },
  { value: "admissions", title: "Admissions" },
];

/*    Accepted File Formats
 */
const fileFormat = [
  ".pdf",
  ".doc",
  ".docx",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; //10mb

const CreateResource = () => {
  const router = useRouter();

  /*      Default Form State
   */
  const defaultForm: Resources & { file?: File | null } = {
    title: "",
    category: "",
    type: "",
    description: "",
    file: null,
  };

  const [form, setForm] = useState(defaultForm);
  const [, forceUpdate] = useState(0);

  /*      Validator Setup
   */
  const validator = useRef(
    new SimpleReactValidator({
      className: "text-red-500 text-sm",
      autoForceUpdate: {
        forceUpdate: () => forceUpdate((prev) => prev + 1),
      },
      validators: {
        file_valid: {
          message:
            "The :attribute must be a PDF or DOC/DOCX file and less than 10MB.",
          rule: (value: File | null) => {
            if (!value) return false;

            const allowedTypes = [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];

            const maxSize = MAX_FILE_SIZE; // 10MB

            return allowedTypes.includes(value.type) && value.size <= maxSize;
          },
        },
      },
    })
  );

  /*Refs*/
  const fileRef = useRef<HTMLInputElement | null>(null);

  /*input Handlers*/
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, file }));
    validator.current.showMessageFor("file");
  };

  //remove file from state
  const removeFile = () => {
    setForm((prev) => ({ ...prev, file: null }));
    if (fileRef.current) fileRef.current.value = "";
  };

  /* Submit Handler*/
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.current.allValid()) {
      console.log("Form Submitted:", form);
    } else {
      console.log("Form Submitted:", form);

      validator.current.showMessages();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <PageHeader
              title={"Add Resource"}
              desc={"Create a new educational resource"}
            />

            <Button onClick={() => router.back()}>
              <ArrowLeft />
              Back
            </Button>
          </div>

          <Card className="p-5">
            <div>
              <CardHeader className="p-0">Resource Details</CardHeader>
              <CardDescription className="p-0">
                Fill in the information to create a new resource
              </CardDescription>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-5 mt-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="space-y-2">
                <Label>Title*</Label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="Enter resource title"
                />
                {validator.current.message(
                  "title",
                  form.title,
                  "required|min:3"
                )}
              </div>

              {/* Resource Type */}
              <div className="space-y-2">
                <Label>Resource Type*</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceType.map((res, idx) => (
                      <SelectItem key={res.value} value={res.value}>
                        {res.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validator.current.message("type", form.type, "required")}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description*</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Enter resource description"
                />
                {validator.current.message(
                  "description",
                  form.description,
                  "required|min:10"
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>File Attachment*</Label>

                {/* File Preview */}
                {form.file && (
                  <Card className="flex flex-row items-center justify-between  p-3 ">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="text-sm">
                        <p className="font-medium">{form.file.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {(form.file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </Card>
                )}

                <Button
                  type="button"
                  variant="outline"
                  className="w-full hover:text-white"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload /> <span>Upload File</span>
                </Button>
                {validator.current.message(
                  "file",
                  form.file,
                  "required|file_valid"
                )}

                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>

                <Input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept={fileFormat.join(",")}
                  onChange={handleFileChange}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Resource</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateResource;
