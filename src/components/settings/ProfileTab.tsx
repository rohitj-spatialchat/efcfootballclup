import { useState, useRef } from "react";
import { Camera, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfileTab() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("Community Admin");
  const [subtitle, setSubtitle] = useState("beSocial at EFC");
  const [userId, setUserId] = useState("communityadmin");
  const [bio, setBio] = useState(
    "Hi #Members! Your community Admin this side. I love curating this community with a passion of connection and growth. Join hands with me on this exciting journey ahead. Write to me at community@efc.com"
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Profile</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage how you appear across the community.
        </p>
      </div>

      {/* Avatar */}
      <div className="rounded-lg border border-border bg-muted/30 p-6 flex flex-col items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-border bg-card flex items-center justify-center group"
        >
          {avatar ? (
            <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <Camera className="h-8 w-8 text-muted-foreground" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="text-sm font-medium text-primary hover:underline"
        >
          Set Profile Picture
        </button>
      </div>

      {/* Fields */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Subtitle <span className="text-xs text-muted-foreground font-normal">(Max char 60)</span>
          </label>
          <input
            type="text"
            value={subtitle}
            maxLength={60}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            User Id
            <CheckCircle2 className="h-4 w-4 text-green-600 fill-green-600/15" />
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value.toLowerCase().replace(/\s+/g, ""))}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Short Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={8}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => toast.success("Profile saved")}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
