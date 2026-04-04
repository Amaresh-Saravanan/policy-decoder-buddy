import { useState } from "react";
import { Upload, FileText, CheckCircle, Loader2, Camera } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const steps = ["Extracting text", "Reading clauses", "Scoring risks", "Generating report"];

const UploadPolicy = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [done, setDone] = useState(false);

  const handleFile = (f: File) => {
    setFile(f);
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= steps.length) {
        clearInterval(interval);
        setDone(true);
        setAnalyzing(false);
        setTimeout(() => navigate("/policy/1/report"), 800);
      } else {
        setCurrentStep(step);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-24 px-5 pt-12 animate-fade-in">
      <h1 className="text-2xl font-bold">Upload Policy</h1>
      <p className="text-sm text-muted-foreground mt-1">We'll scan it, simplify it, and flag anything suspicious.</p>

      {/* Drop Zone */}
      <Card
        className={`mt-6 p-8 border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors ${
          file ? "border-success bg-success/5" : "border-border hover:border-primary/50"
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
        }}
      >
        {file ? (
          <>
            <FileText className="h-12 w-12 text-success mb-3" />
            <p className="font-semibold text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024).toFixed(0)} KB</p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="font-semibold text-sm">Drag & drop your policy PDF</p>
            <p className="text-xs text-muted-foreground mt-1">or tap below to browse</p>
          </>
        )}
      </Card>

      {!file && (
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Upload className="h-4 w-4 mr-2" /> Browse Files
          </Button>
          <Button variant="outline" className="flex-1">
            <Camera className="h-4 w-4 mr-2" /> Take Photo
          </Button>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
        </div>
      )}

      {/* Analysis Progress */}
      {(analyzing || done) && (
        <Card className="mt-6 p-5 animate-slide-up">
          <p className="font-semibold text-sm mb-4">Analyzing your policy...</p>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                {i < currentStep || done ? (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                ) : i === currentStep && analyzing ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-border flex-shrink-0" />
                )}
                <span className={`text-sm ${i <= currentStep || done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <Progress value={done ? 100 : ((currentStep + 1) / steps.length) * 100} className="mt-4" />
        </Card>
      )}

      {file && !analyzing && !done && (
        <Button className="w-full mt-6 gradient-primary text-primary-foreground h-12 text-base font-semibold" onClick={startAnalysis}>
          Analyze This Policy
        </Button>
      )}
    </div>
  );
};

export default UploadPolicy;
