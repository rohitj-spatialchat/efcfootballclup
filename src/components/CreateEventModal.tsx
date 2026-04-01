import { useState } from "react";
import { X, Upload, MapPin, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export interface NewEventData {
  id: string;
  title: string;
  date: string;
  time: string;
  timezone: string;
  thumbnail: string;
  organizer: string;
  organizerAvatar: string;
  attendees: number;
  type: "webinar" | "match" | "training" | "social";
  month: string;
  year: string;
}

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated: (event: NewEventData) => void;
}

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function formatDate(dateStr: string): { formatted: string; month: string; year: string } {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = months[d.getMonth()];
  const year = String(d.getFullYear());
  return { formatted: `${day} ${month}, ${year}`, month, year };
}

function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function CreateEventModal({ open, onOpenChange, onEventCreated }: CreateEventModalProps) {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toDate, setToDate] = useState("");
  const [toTime, setToTime] = useState("");
  const [repeats, setRepeats] = useState("none");
  const [videoCall, setVideoCall] = useState(false);
  const [webinarLink, setWebinarLink] = useState(false);
  const [customLink, setCustomLink] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [eventType, setEventType] = useState<"public" | "private">("public");
  const [venue, setVenue] = useState("");

  const handleCreate = () => {
    if (!eventName.trim()) {
      toast.error("Please enter an event name");
      return;
    }
    if (!fromDate || !fromTime) {
      toast.error("Please set the start date and time");
      return;
    }

    const { formatted, month, year } = formatDate(fromDate);
    const newEvent: NewEventData = {
      id: `custom-${Date.now()}`,
      title: eventName,
      date: formatted,
      time: formatTime(fromTime),
      timezone: "Europe/London (GMT)",
      thumbnail: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=300&h=180&fit=crop",
      organizer: "Community Admin",
      organizerAvatar: "",
      attendees: 0,
      type: webinarLink ? "webinar" : videoCall ? "training" : "social",
      month,
      year,
    };

    onEventCreated(newEvent);
    toast.success("Event created successfully!");
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setEventName("");
    setDescription("");
    setFromDate("");
    setFromTime("");
    setToDate("");
    setToTime("");
    setRepeats("none");
    setVideoCall(false);
    setWebinarLink(false);
    setCustomLink(false);
    setCustomUrl("");
    setEventType("public");
    setVenue("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-lg font-bold text-foreground">Create Event</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Cover Image Upload */}
          <div className="relative w-full h-40 bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 transition-colors group">
            <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <p className="text-sm font-medium text-foreground">Upload cover picture</p>
            <p className="text-xs text-muted-foreground">16:9 Aspect ratio (recommended)</p>
            <button className="absolute bottom-2 right-3 flex items-center gap-1 text-xs text-primary font-medium hover:underline">
              <Search className="h-3 w-3" /> Search image
            </button>
          </div>

          {/* Event Name */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">
              Event name <span className="text-destructive">*</span>
            </Label>
            <Input
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="bg-background"
            />
          </div>

          {/* Host Name */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">Host name</Label>
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">CA</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">Community Admin</span>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">Description</Label>
            <Textarea
              placeholder="Write here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background min-h-[100px] resize-none"
            />
          </div>

          {/* When & Where */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">When & where</Label>
            <div className="rounded-lg border border-border p-4 space-y-4 bg-background">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-primary">
                    From <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="bg-background text-xs flex-1"
                    />
                    <Input
                      type="time"
                      step="60"
                      value={fromTime}
                      onChange={(e) => setFromTime(e.target.value)}
                      className="bg-background text-xs w-24"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-primary">
                    To <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="bg-background text-xs flex-1"
                    />
                    <Input
                      type="time"
                      step="60"
                      value={toTime}
                      onChange={(e) => setToTime(e.target.value)}
                      className="bg-background text-xs w-24"
                    />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Current timezone: Europe/London (can be updated from community settings)
              </p>

              {/* Repeats */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-foreground">Repeats</Label>
                <Select value={repeats} onValueChange={setRepeats}>
                  <SelectTrigger className="w-48 bg-background text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Does not repeat</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Online Event */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Online event</Label>
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="videoCall"
                  checked={videoCall}
                  onCheckedChange={(v) => setVideoCall(!!v)}
                />
                <Label htmlFor="videoCall" className="text-sm text-foreground cursor-pointer">
                  Add Video Call link
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="webinarLink"
                  checked={webinarLink}
                  onCheckedChange={(v) => setWebinarLink(!!v)}
                />
                <Label htmlFor="webinarLink" className="text-sm text-foreground cursor-pointer">
                  Add Webinar link
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="customLink"
                  checked={customLink}
                  onCheckedChange={(v) => setCustomLink(!!v)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="customLink" className="text-sm text-foreground cursor-pointer">
                  Add Custom Link
                </Label>
              </div>
            </div>
            {customLink && (
              <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background">
                <div className="h-8 w-8 rounded bg-destructive/10 flex items-center justify-center shrink-0">
                  <span className="text-destructive text-xs">🔗</span>
                </div>
                <Input
                  placeholder="https://"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm px-0"
                />
              </div>
            )}
          </div>

          {/* Event Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground">Event Type</Label>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="public"
                  checked={eventType === "public"}
                  onCheckedChange={() => setEventType("public")}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="public" className="text-sm font-medium text-primary cursor-pointer">
                  Public
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="private"
                  checked={eventType === "private"}
                  onCheckedChange={() => setEventType("private")}
                />
                <Label htmlFor="private" className="text-sm text-foreground cursor-pointer">
                  Private
                </Label>
              </div>
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground">Venue</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter address"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => { onOpenChange(false); resetForm(); }}
              className="px-6"
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} className="px-8">
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
