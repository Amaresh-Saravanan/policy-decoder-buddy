import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, AlertTriangle, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mockRedFlags } from "@/data/mockData";

const ClauseDetail = () => {
  const { clauseId } = useParams();
  const navigate = useNavigate();
  const [showOriginal, setShowOriginal] = useState(false);
  const clause = mockRedFlags.find((f) => f.id === clauseId) || mockRedFlags[0];

  return (
    <div className="min-h-screen pb-24 px-5 pt-10 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold flex-1">{clause.title}</h1>
      </div>

      {/* Simplified Version */}
      <Card className="p-5 border-danger/20 bg-danger/5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-danger" />
          <p className="font-semibold text-sm">What this means for you</p>
        </div>
        <p className="text-sm leading-relaxed">{clause.simplified}</p>
      </Card>

      {/* Original Toggle */}
      <Button
        variant="outline"
        size="sm"
        className="mb-4"
        onClick={() => setShowOriginal(!showOriginal)}
      >
        {showOriginal ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
        {showOriginal ? "Hide original" : "Show original legalese"}
      </Button>

      {showOriginal && (
        <Card className="p-4 mb-4 bg-muted/50 animate-scale-in">
          <p className="text-xs text-muted-foreground italic leading-relaxed font-mono">{clause.original}</p>
        </Card>
      )}

      {/* Impact */}
      <Card className="p-4 mb-4">
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
          <span className="text-danger">💥</span> Why this could hurt you
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{clause.impact}</p>
      </Card>

      {/* Recommended Action */}
      <Card className="p-4 border-primary/20 bg-primary/5">
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" /> Recommended Action
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{clause.action}</p>
      </Card>
    </div>
  );
};

export default ClauseDetail;
