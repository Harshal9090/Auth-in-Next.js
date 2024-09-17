import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming it's in this location
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import{ useState } from "react";
import { TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";
import { set } from "react-hook-form";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
};
export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
    .catch(() => {
      setError("Invalid email or password");
    })
    .finally(() => {setPending(false);
    })
  };

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value)
    .finally(() => {setPending(false);
    })
  };
  return (
    <Card className="w-full h-full p-8">
        <CardHeader className="px-0 pt-0">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email and password to continue</CardDescription>
        </CardHeader>
        {!!error && <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
        <TriangleAlert className="size-4" />
        <p>{error}</p>
        </div>}
        <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={onPasswordSignIn} className="space-y-2.5">
          <Input value={email} disabled={false} placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required /> 
          <Input value={password} disabled={false} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required /> 
          <Button type="submit" className="w-full" size="lg" disabled={pending}>Continue</Button> 
            </form>
            <Separator />
            <div className="flex flex-col gap-y-2.5">
            <Button
            disabled={pending}
            size="lg"
            onClick={() => onProviderSignIn("google")}
            className="w-full relative"
            variant="outline">
              <FcGoogle className="absolute top-2.5 left-4 size-5" />
              Continue with Google
            </Button>
            <Button
            disabled={pending}
            size="lg"
            onClick={() => onProviderSignIn("github")}
            className="w-full relative"
            variant="outline">
              <FaGithub className="absolute top-2.5 left-4 size-5" />
              Continue with Github
            </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account? <span onClick={() => setState('signUp')} className="text-sky-700 hover:underline cursor-pointer">Sign Up</span> 
            </p>
        </CardContent>
    </Card>
  );
};