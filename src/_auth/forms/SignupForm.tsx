
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { signupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/ui/shared/Loader"
import { Link } from "react-router-dom"
import { createUserAccount } from "@/lib/appwrite/api"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"

 
const SignupForm = () => {
  const { toast } = useToast()
  

const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccount();

const { mutateAsync: signInAccount, isLoading: isSigningIn } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
   const newUser = await createUserAccount(values);
   
   if(newUser){
      return  toast({
        title: "Sign up failed. Please try again",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
   }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      return toast({ title: 'Sign in failed. Please try again.' })
    }

  }
  return (
    
     <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create an account</h2>
          <p className="text-light-3 small-medium md:base-regular mt-2"> To use world chat enter your credentials</p>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="enter your name" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="enter your username" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" placeholder="enter your email id" {...field} />
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" placeholder="enter your password" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isCreatingUser ? (
            <div className="flex-center gap-2">
              <Loader />Loading...</div>
          ): "Sign up"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </form>
      </div>
    </Form>
    
  )
}

export default SignupForm
