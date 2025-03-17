"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useSignIn } from "../mutations";

type Props = object;

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm: FC<Props> = () => {
  const { isPending, mutate: signInInUser } = useSignIn();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function signIn(values: z.infer<typeof formSchema>) {
    signInInUser(values);
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
        Sign In
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signIn)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="user@email.com"
                    {...field}
                    className="border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
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
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                    className="border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full mt-5">
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg transition"
              isLoading={isPending}
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-teal-600 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
};

export default LoginForm;
