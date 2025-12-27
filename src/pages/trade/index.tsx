"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "../../components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../../components/ui/input-group";
import { api } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  booktitle: z
    .string()
    .min(2, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  publisherName: z
    .string()
    .min(2, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  genre: z.string().min(5, "").max(100, ""),
  condition: z.string().min(5, "").max(100, ""),
  price: z.string().min(5, "").max(100, ""),
  description: z
    .string()
    .min(5, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export default function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      booktitle: "",
      description: "",
      genre: "adventure",
      price: "",
      publisherName: "",
    },
  });

  const { mutate, status: poststatus } = api.books.postbook.useMutation();

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("something happenign", data);
    mutate({
      bookname: data.booktitle,
      synopsis: data.description,
      genre: data.genre,
      authorname: data.publisherName,
      price: Number(data.price),
      pages: 100,
    });
  }

  return (
    <div className="mx-auto  flex w-[80%] justify-center  px-5">
      <form
        id="form-rhf-demo"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          void form.handleSubmit(onSubmit)(e); // Call React Hook Form submit handler
        }}
        className="w-2/3 rounded-md  p-5"
      >
        <div>
          <h1 className="text-2xl font-bold">Sell Your Book</h1>
          <p className="mt-3 text-sm">
            Turn you old books into cash. Add details below and publish
            instantly
          </p>
        </div>

        <FieldGroup className="">
          <div className="mt-5 flex gap-5 rounded-lg border border-gray-900 p-5 shadow-purple-900">
            <div className="grow">
              <div className="flex items-center justify-between gap-3 ">
                <div className="grow">
                  <div className="mb-3">Upload Book cover</div>
                  <div className="rounded-lg border border-gray-900  p-4">
                    Click to upload
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-5">
                <Controller
                  name="booktitle"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Book Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Login button not working on mobile"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="publisherName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Publisher Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Login button not working on mobile"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="condition"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Condition
                      </FieldLabel>

                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="Brand New">Brand New</SelectItem>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Very Good">Very Good</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Acceptable">Acceptable</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Description
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="write your thoughts"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>
            <div className="flex w-3/12 flex-col justify-between">
              <div className="h-32 w-full rounded-lg bg-gray-400"></div>
              <Controller
                name="genre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Genre</FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        <SelectItem value="Adventrue">Adventrue</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Price</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="$500"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field orientation="horizontal">
                <Button type="button" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="form-rhf-demo"
                  className="bg-blue-700"
                >
                  Submit
                </Button>
              </Field>
            </div>
          </div>
        </FieldGroup>
      </form>

      <div className="w-1/3 border border-gray-900 p-5 shadow-md shadow-purple-800">
        <div>Preview</div>
      </div>
    </div>
  );
}
