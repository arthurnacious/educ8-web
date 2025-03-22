import { useToast } from "@/hooks/use-toast";
import { api_url } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const signIn = async (credentials: {
    email: string;
    password: string;
  }): Promise<unknown> => {
    const response = await fetch(`${api_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.status === 401) {
      throw new Error("Failed to login");
    }

    if (!response.ok) {
      throw new Error("An error occurred while signing in");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast({
        title: "Success!",
        description: "Welcome back champ",
      });
      // maybe do the things that makes the tings to be done here
    },
    onError: (error) => {
      console.error("Error creating department:", error);
      toast({
        title: "Ohh no!",
        description:
          "the details you have netered does not mach any of our records",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
