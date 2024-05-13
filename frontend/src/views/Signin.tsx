import { FunctionComponent } from "react";
import LightLogo from "@/assets/images/light-logo.svg";

// Zod + React Hook Form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Shadcn-ui components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "This is not a valid email." }),
  password: z
    .string()
    .min(6, { message: "The password must be at least 6 characters long." }),
});

interface ISigninProps {}

const Signin: FunctionComponent<ISigninProps> = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="px-5 py-9 flex flex-col space-y-8  max-w-full w-[438px] h-[534px] border shadow-inner">
        <header>
          <img
            src={LightLogo}
            alt="Logo b2bit"
            className="mx-auto max-w-[295px] w-full "
          />
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-input"
                      placeholder="E-mail..."
                      {...field}
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-input"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-app-primary hover:bg-app-primary/90"
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
// #444444
