import { Card, CardContent } from "@/components/ui/card";
import { Wallet } from "lucide-react";

export default function BalanceCard({balance}:{balance:number}){



return (
  <Card className="bg-linear-to-br from-primary/10 to-primary/5">
    <CardContent className="p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-bold">{balance}</p>
            <p className="text-xl text-muted-foreground">tokens</p>
          </div>
        </div>
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="w-10 h-10 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

}