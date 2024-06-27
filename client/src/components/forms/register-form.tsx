import { useRegisterUser } from "@/api/queries/auth";
import { TRegister, registerSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert, AlertContent, AlertDescription } from "../ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Separator } from "../ui/separator";

export default function RegisterForm() {
  const form = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const { mutateAsync: registerUser, isPending, error } = useRegisterUser();

  const navigate = useNavigate();

  const { toast } = useToast();

  async function onSubmit(values: TRegister) {
    try {
      const success = await registerUser(values);

      if (success) {
        form.reset();
        form.clearErrors();

        navigate("/notes");
      }
      toast({
        title: "Yay!",
        description: "Successful registration!",
      });
    } catch (error) {
      toast({
        title: "Oh no!",
        description: "Something went wrong!",
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-500 after:ml-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
