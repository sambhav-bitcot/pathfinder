import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizeNumber } from "@/lib/utils";

interface Props {
  setSignupToken:(value:string)=>void;
  signupToken:string;
}


export default function SignupTokenSection({setSignupToken,signupToken}:Props) {
      const handleSignupToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = normalizeNumber(e.target.value);
        if (value !== null) setSignupToken(value);
      };
    
  return (
    <Card className="p-5">
      <CardHeader className="p-0 font-semibold">Signup Tokens</CardHeader>

      <div className="space-y-2">
        <Label>Set default tokens</Label>
        <Input
          value={signupToken}
          onChange={handleSignupToken}
          placeholder="e.g. 1000"
        />
        <p className="text-xs text-muted-foreground">
          These bonus tokens will be credited to the student's wallet when a new
          user is registered.
        </p>
      </div>
    </Card>
  );
}
