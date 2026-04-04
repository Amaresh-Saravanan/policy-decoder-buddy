import { useNavigate } from "react-router-dom";
import { Upload, PiggyBank, MessageCircle, ChevronRight, Shield, AlertTriangle, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import RiskBadge from "@/components/RiskBadge";
import { mockPolicies, mockSavingsPools } from "@/data/mockData";

const Index = () => {
  const navigate = useNavigate();
  const totalCoverage = mockSavingsPools.reduce((a, p) => a + p.coverage, 0);
  const streak = Math.max(...mockSavingsPools.map((p) => p.streak));

  const quickActions = [
    { icon: Upload, label: "Upload Policy", path: "/upload", gradient: "gradient-primary" },
    { icon: PiggyBank, label: "Add Savings", path: "/savings", gradient: "gradient-savings" },
    { icon: MessageCircle, label: "File Claim", path: "/claim", gradient: "gradient-accent" },
  ];

  return (
    <div className="min-h-screen pb-24 animate-fade-in">
      {/* Hero */}
      <div className="gradient-primary px-5 pt-12 pb-8 rounded-b-3xl">
        <p className="text-primary-foreground/70 text-sm font-medium">Good morning 👋</p>
        <h1 className="text-2xl font-bold text-primary-foreground mt-1">Welcome to InsuraSimple</h1>

        <Card className="mt-5 p-4 bg-card/10 backdrop-blur-lg border-primary-foreground/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/60 text-xs font-medium">Total Coverage Active</p>
              <p className="text-2xl font-bold text-primary-foreground">₹{totalCoverage.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-primary-foreground/10 rounded-full px-3 py-1.5">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-primary-foreground text-sm font-semibold">{streak}-day streak</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-5 -mt-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(({ icon: Icon, label, path, gradient }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`${gradient} rounded-2xl p-4 flex flex-col items-center gap-2 text-primary-foreground shadow-lg active:scale-95 transition-transform`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>

        {/* Smart Nudge */}
        <Card className="p-4 border-warning/30 bg-warning/5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-warning/10">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">3 Red Flags Found</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your Health Shield Plus policy has clauses that could hurt you. Tap to review.
              </p>
            </div>
            <button onClick={() => navigate("/policy/1/report")} className="text-primary">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </Card>

        {/* My Policies */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">My Policies</h2>
            <span className="text-xs text-muted-foreground">{mockPolicies.length} active</span>
          </div>
          <div className="space-y-3">
            {mockPolicies.map((policy) => (
              <Card
                key={policy.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
                onClick={() => navigate(`/policy/${policy.id}/report`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{policy.name}</p>
                      <p className="text-xs text-muted-foreground">{policy.insurer} · {policy.coverage}</p>
                    </div>
                  </div>
                  <RiskBadge level={policy.risk} />
                </div>
                {policy.redFlags > 0 && (
                  <p className="text-xs text-danger mt-2 ml-[52px]">
                    ⚠️ {policy.redFlags} red flag{policy.redFlags > 1 ? "s" : ""} detected
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
