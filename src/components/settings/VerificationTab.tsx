import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export default function VerificationTab() {
  const [email] = useState("dummy@efc.in");
  const [emailVerified] = useState(true);
  const [countryCode, setCountryCode] = useState("+44");
  const [mobile, setMobile] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const requestOtp = () => {
    if (!mobile.trim()) {
      toast.error("Please enter a mobile number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to your mobile");
  };

  const verifyOtp = () => {
    if (otp.length < 4) {
      toast.error("Enter the OTP");
      return;
    }
    setMobileVerified(true);
    setOtpSent(false);
    toast.success("Mobile verified");
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
        <ShieldCheck className="h-5 w-5 text-primary" />
        <h2 className="text-base font-semibold text-foreground">Account Verification</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Label>Email</Label>
          <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
            <span className="text-sm text-foreground">{email}</span>
            <span className={`text-xs font-medium ${emailVerified ? "text-green-600" : "text-destructive"}`}>
              {emailVerified ? "Verified" : "Unverified"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mobile</Label>
          <div className="flex items-center gap-2">
            <Input
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-20"
              disabled={mobileVerified}
            />
            <div className="relative flex-1">
              <Input
                placeholder="Enter Mobile No."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={mobileVerified}
              />
              <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${mobileVerified ? "text-green-600" : "text-destructive"}`}>
                {mobileVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          {otpSent && !mobileVerified && (
            <div className="flex items-center gap-2 pt-2">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-40"
              />
              <Button onClick={verifyOtp} size="sm">Verify</Button>
            </div>
          )}

          {!mobileVerified && !otpSent && (
            <Button onClick={requestOtp} variant="secondary" size="sm" className="mt-2">
              Request OTP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
