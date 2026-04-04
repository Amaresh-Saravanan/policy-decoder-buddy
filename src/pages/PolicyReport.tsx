import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle, XCircle, ChevronRight, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RiskBadge from "@/components/RiskBadge";
import { mockPolicies, mockRedFlags } from "@/data/mockData";

const PolicyReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const policy = mockPolicies.find((p) => p.id === id) || mockPolicies[0];
  const flags = mockRedFlags.filter((f) => f.policyId === policy.id);

  const riskScore = policy.risk === "high" ? 72 : policy.risk === "medium" ? 45 : 15;
  const riskColor = policy.risk === "high" ? "text-danger" : policy.risk === "medium" ? "text-warning" : "text-success";
  const riskGradient = policy.risk === "high" ? "gradient-danger" : policy.risk === "medium" ? "gradient-warning" : "gradient-accent";

  return (
    <div className="min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className={`${riskGradient} px-5 pt-10 pb-8 rounded-b-3xl`}>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-primary-foreground/10">
            <ArrowLeft className="h-5 w-5 text-primary-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-primary-foreground">{policy.name}</h1>
            <p className="text-xs text-primary-foreground/70">{policy.insurer} · {policy.policyNumber}</p>
          </div>
          <Button size="icon" variant="ghost" className="text-primary-foreground/70">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-5 bg-card/10 backdrop-blur-lg border-primary-foreground/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/60 text-xs">Risk Score</p>
              <p className={`text-4xl font-bold text-primary-foreground`}>{riskScore}/100</p>
            </div>
            <div className="text-right">
              <RiskBadge level={policy.risk} />
              <p className="text-xs text-primary-foreground/60 mt-2">{flags.length} red flag{flags.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-5 -mt-3 space-y-5">
        {/* Summary */}
        <Card className="p-4 animate-slide-up">
          <h2 className="font-semibold text-sm mb-2">Plain-English Summary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{policy.summary}</p>
        </Card>

        {/* Red Flags */}
        {flags.length > 0 && (
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-danger" /> Red Flags
            </h2>
            <div className="space-y-3">
              {flags.map((flag) => (
                <Card
                  key={flag.id}
                  className="p-4 border-danger/20 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/policy/${policy.id}/clause/${flag.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs">{flag.severity === "high" ? "🔴" : "🟡"}</span>
                        <p className="font-semibold text-sm">{flag.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{flag.simplified}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2 mt-1" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Coverage Map */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-semibold text-sm mb-3">Coverage Map</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-3 border-success/20 bg-success/5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <p className="text-xs font-semibold text-success">Covered</p>
              </div>
              <ul className="space-y-1.5">
                {["Hospitalization", "Day care procedures", "Ambulance charges", "Pre/post hospitalization"].map((item) => (
                  <li key={item} className="text-xs text-muted-foreground">✓ {item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-3 border-danger/20 bg-danger/5">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="h-4 w-4 text-danger" />
                <p className="text-xs font-semibold text-danger">Not Covered</p>
              </div>
              <ul className="space-y-1.5">
                {["Mental health", "Cosmetic surgery", "Self-inflicted injury", "Adventure sports"].map((item) => (
                  <li key={item} className="text-xs text-muted-foreground">✗ {item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyReport;
