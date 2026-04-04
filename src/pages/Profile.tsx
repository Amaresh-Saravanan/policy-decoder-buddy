import { User, Shield, Globe, Bell, LogOut, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockPolicies, mockSavingsPools } from "@/data/mockData";

const Profile = () => {
  const totalSaved = mockSavingsPools.reduce((a, p) => a + p.totalSaved, 0);

  const settingsItems = [
    { icon: Globe, label: "Language", value: "English", action: true },
    { icon: Bell, label: "Notifications", value: "On", action: true },
    { icon: Shield, label: "KYC Status", value: "Verified ✓", action: false },
  ];

  return (
    <div className="min-h-screen pb-24 px-5 pt-12 animate-fade-in">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Priya Sharma</h1>
          <p className="text-sm text-muted-foreground">+91 98765 43210</p>
          <Badge variant="outline" className="mt-1 text-success border-success/30 bg-success/10 text-xs">
            KYC Verified
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-primary">{mockPolicies.length}</p>
          <p className="text-xs text-muted-foreground">Policies</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-savings">₹{(totalSaved / 1000).toFixed(1)}k</p>
          <p className="text-xs text-muted-foreground">Saved</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-warning">14</p>
          <p className="text-xs text-muted-foreground">Best Streak</p>
        </Card>
      </div>

      {/* Settings */}
      <h2 className="font-bold mb-3">Settings</h2>
      <Card className="divide-y divide-border">
        {settingsItems.map(({ icon: Icon, label, value, action }) => (
          <div key={label} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{value}</span>
              {action && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          </div>
        ))}
      </Card>

      {/* My Policies */}
      <h2 className="font-bold mt-6 mb-3">My Policies</h2>
      <div className="space-y-2">
        {mockPolicies.map((p) => (
          <Card key={p.id} className="p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.insurer} · Expires {p.expiresAt}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
        ))}
      </div>

      {/* Logout */}
      <button className="flex items-center gap-2 text-danger text-sm font-medium mt-8 mx-auto">
        <LogOut className="h-4 w-4" /> Log out
      </button>
    </div>
  );
};

export default Profile;
