import { useState } from "react";
import { PiggyBank, Plus, Flame, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockSavingsPools } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Savings = () => {
  const [pools, setPools] = useState(mockSavingsPools);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [amount, setAmount] = useState("10");
  const { toast } = useToast();

  const totalCoverage = pools.reduce((a, p) => a + p.coverage, 0);
  const totalSaved = pools.reduce((a, p) => a + p.totalSaved, 0);

  const handleContribute = () => {
    if (!selectedPool) return;
    setPools((prev) =>
      prev.map((p) =>
        p.id === selectedPool
          ? { ...p, totalSaved: p.totalSaved + Number(amount), coverage: p.coverage + Number(amount) * 3 }
          : p
      )
    );
    toast({ title: "✅ Contribution added!", description: `₹${amount} added successfully.` });
    setAddOpen(false);
  };

  return (
    <div className="min-h-screen pb-24 animate-fade-in">
      {/* Hero */}
      <div className="gradient-savings px-5 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-2 mb-1">
          <PiggyBank className="h-5 w-5 text-savings-foreground/70" />
          <p className="text-savings-foreground/70 text-sm font-medium">Micro-Savings</p>
        </div>
        <h1 className="text-2xl font-bold text-savings-foreground">₹{totalCoverage.toLocaleString()}</h1>
        <p className="text-savings-foreground/60 text-xs mt-1">Total coverage from ₹{totalSaved.toLocaleString()} saved</p>

        <div className="flex gap-3 mt-4">
          <Card className="flex-1 p-3 bg-savings-foreground/10 backdrop-blur-lg border-savings-foreground/10">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-savings-foreground text-sm font-semibold">14-day best</span>
            </div>
          </Card>
          <Card className="flex-1 p-3 bg-savings-foreground/10 backdrop-blur-lg border-savings-foreground/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-savings-foreground text-sm font-semibold">3x multiplier</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-5 -mt-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Active Pools</h2>
          <Button size="sm" variant="outline" onClick={() => { setSelectedPool(pools[0]?.id || null); setAddOpen(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        {pools.map((pool) => (
          <Card
            key={pool.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => { setSelectedPool(pool.id); setAddOpen(true); }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pool.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{pool.name}</p>
                  <p className="text-xs text-muted-foreground">₹{pool.dailyAmount}/day · 🔥 {pool.streak} days</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm">₹{pool.coverage.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">coverage</p>
              </div>
            </div>
            <Progress value={(pool.totalSaved / (pool.totalSaved + 5000)) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1.5">₹{pool.totalSaved.toLocaleString()} saved</p>
          </Card>
        ))}

        {/* Browse More Pools */}
        <Card className="p-4 border-dashed border-2 flex items-center justify-center">
          <div className="text-center">
            <p className="font-semibold text-sm">Browse More Pools</p>
            <p className="text-xs text-muted-foreground mt-1">Travel · Flood · Device · Pet</p>
          </div>
        </Card>
      </div>

      {/* Contribute Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Pool</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex gap-2">
              {["10", "25", "50", "100"].map((v) => (
                <Button
                  key={v}
                  variant={amount === v ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(v)}
                  className={amount === v ? "gradient-primary text-primary-foreground" : ""}
                >
                  ₹{v}
                </Button>
              ))}
            </div>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Custom amount" />
            <p className="text-xs text-muted-foreground">This will add ₹{(Number(amount) * 3).toLocaleString()} in coverage</p>
            <Button className="w-full gradient-savings text-savings-foreground h-11 font-semibold" onClick={handleContribute}>
              Pay ₹{amount} via UPI
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Savings;
