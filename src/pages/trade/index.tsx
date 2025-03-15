import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DragAndDrop from "~/components/DragAndDrop";
import LoadingUi from "~/components/loadingui";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import Signin from "../signin";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  authorname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  synopsis: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Genre: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Trade() {
  const { mutate, status: poststatus } = api.books.postbook.useMutation();
  const { data: session, status } = useSession();
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  const publish = (values: z.infer<typeof formSchema>) => {
    mutate({
      bookname: "",
      synopsis: values.synopsis,
      genre: values.Genre,
      pages: 100,
      authorname: values.authorname,
      price: values.price,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bookname: "",
      synopsis: "",
      authorname: "",
      Genre: "",
    },
  });

  useEffect(() => {
    if (poststatus == "success") {
      enqueueSnackbar("Your book is out for sale", { variant: "success" });
    }
  }, [poststatus]);

  const GenreFields = ["Fanstasy", "Horror", "Sci-Fi", "Mythology", "Romance"];
  return (
    <div className="relative min-h-[80vh]">
      {status == "loading" ? (
        <LoadingUi />
      ) : (
        <>
          {!session ? (
            <Signin />
          ) : (
            <div className="flex justify-center gap-10 px-40 ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(publish)}
                  className="grid grow grid-cols-2 gap-x-3 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username." {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display user name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="authorname"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Authorname</FormLabel>
                        <FormControl>
                          <Input placeholder="authorname." {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="username."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Price of the book you want to publish.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white">
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Genre of the book you want to publish.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="synopsis"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Synopsis</FormLabel>
                        <FormControl>
                          <Textarea />
                        </FormControl>
                        <FormDescription>synopsis of book</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Publish</Button>
                </form>
              </Form>
              <div className="hidden h-full w-1/2 md:block">
                <div className="mx-auto mt-10 h-full w-full">
                  <DragAndDrop />
                </div>
                {/* <Image src="shelves.svg" alt="failed to load" width={150} height={150} className="h-96 w-96 flex-shrink-0" /> */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
