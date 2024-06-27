import { Loader2 } from "lucide-react";
import { Alert, AlertContent, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { TNoteFormData, noteFormDataSchema } from "@/schema/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNote } from "@/api/queries/notes";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

export default function CreateNoteForm({
  toggleDialog,
}: {
  toggleDialog: () => void;
}) {
  const form = useForm<TNoteFormData>({
    resolver: zodResolver(noteFormDataSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { mutateAsync: createNote, isPending, error } = useCreateNote();

  const { toast } = useToast();

  async function onSubmit(values: TNoteFormData) {
    try {
      await createNote(values);

      form.reset();
      form.clearErrors();

      toggleDialog();

      toast({
        title: "Yay!",
        description: "Note created successfully.",
      });
    } catch (error) {
      toast({
        title: "Oh no!",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <Alert variant="destructive">
          <AlertContent>
            <AlertDescription>
              <ul className="list-inside list-disc">
                {error.message ? (
                  <li>{error.message}</li>
                ) : (
                  Object.values(error).map((err, i) => <li key={i}>{err}</li>)
                )}
              </ul>
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for the note"
                      className="text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1">
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the content of the note"
                      className="text-foreground min-h-32 max-h-44"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Create note
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
