import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Settings, Globe, Lock, Mail, CreditCard, Bell, Users, Calendar,
  Video, Shield, Palette, Link, Clock, CheckCircle, AlertTriangle,
  Upload, Eye, EyeOff, Copy, ExternalLink, Trash2, Plus,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

type SettingsTab = "general" | "registration" | "notifications" | "access" | "branding" | "integrations";

const settingsTabs: { id: SettingsTab; label: string; icon: typeof Settings }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "registration", label: "Registration", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "access", label: "Access & Privacy", icon: Lock },
  { id: "branding", label: "Branding", icon: Palette },
  { id: "integrations", label: "Integrations", icon: Link },
];

export default function EventSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const { toast } = useToast();

  // General settings state
  const [general, setGeneral] = useState({
    defaultTimezone: "Europe/London (GMT)",
    defaultDuration: "60",
    defaultType: "Webinar",
    autoRecording: true,
    allowWaitlist: true,
    requireApproval: false,
    showAttendeeCount: true,
    enableQnA: true,
    enablePolls: true,
    enableChat: true,
    maxCapacity: "500",
    bufferTime: "15",
  });

  // Registration settings state
  const [registration, setRegistration] = useState({
    requireEmail: true,
    requireName: true,
    requireOrganization: true,
    requireRole: false,
    requirePhone: false,
    allowGuestRegistration: false,
    sendConfirmationEmail: true,
    sendReminderEmail: true,
    reminderTiming: "24",
    collectDietaryPreferences: false,
    enableTicketing: true,
    enableDiscountCodes: true,
    customFields: [
      { name: "Football Team", required: true },
      { name: "Years of Experience", required: false },
    ],
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNewRegistration: true,
    emailCancellation: true,
    emailEventReminder: true,
    emailPostEventSurvey: true,
    emailWeeklyDigest: true,
    pushLiveAlert: true,
    pushChatMention: true,
    pushQnAQuestion: false,
    notifyOrganizers: true,
    notifySpeakers: true,
    digestFrequency: "Weekly",
    reminderSchedule: ["24h", "1h"],
  });

  // Access settings state
  const [access, setAccess] = useState({
    defaultVisibility: "Public",
    requireLogin: true,
    allowRecordingDownload: false,
    enablePasscode: false,
    passcode: "",
    restrictByRegion: false,
    allowedRegions: [] as string[],
    enableWatermark: true,
    moderateChat: true,
    allowAnonymousQuestions: true,
    autoMuteAttendees: true,
    enableWaitingRoom: false,
  });

  // Branding state
  const [branding, setBranding] = useState({
    primaryColor: "#3B82F6",
    accentColor: "#8B5CF6",
    showLogo: true,
    customBanner: false,
    bannerUrl: "",
    emailTemplate: "default",
    customFooterText: "Powered by EFC MPU Community",
    showSocialLinks: true,
    registrationPageStyle: "modern",
  });

  // Integration state
  const [integrations, setIntegrations] = useState({
    googleCalendar: true,
    outlookCalendar: false,
    zoom: true,
    teams: false,
    slack: false,
    stripe: true,
    mailchimp: false,
    hubspot: false,
    googleAnalytics: true,
    webhookUrl: "",
    apiEnabled: false,
  });

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your event settings have been updated successfully." });
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Event Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure defaults and preferences for all events</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <CheckCircle className="h-4 w-4" /> Save Changes
        </button>
      </motion.div>

      {/* Layout: Sidebar tabs + Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <motion.div variants={item} className="w-52 shrink-0 space-y-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors text-left",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* GENERAL */}
          {activeTab === "general" && (
            <>
              <SettingsCard title="Event Defaults" description="Set default values for new events">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldGroup label="Default Timezone">
                    <select
                      value={general.defaultTimezone}
                      onChange={(e) => setGeneral({ ...general, defaultTimezone: e.target.value })}
                      className="settings-select"
                    >
                      <option>Europe/London (GMT)</option>
                      <option>Europe/Berlin (CET)</option>
                      <option>Europe/Paris (CET)</option>
                      <option>Europe/Madrid (CET)</option>
                      <option>America/New_York (EST)</option>
                    </select>
                  </FieldGroup>
                  <FieldGroup label="Default Duration (minutes)">
                    <input
                      type="number"
                      value={general.defaultDuration}
                      onChange={(e) => setGeneral({ ...general, defaultDuration: e.target.value })}
                      className="settings-input"
                    />
                  </FieldGroup>
                  <FieldGroup label="Default Event Type">
                    <select
                      value={general.defaultType}
                      onChange={(e) => setGeneral({ ...general, defaultType: e.target.value })}
                      className="settings-select"
                    >
                      <option>Webinar</option>
                      <option>Conference</option>
                      <option>Workshop</option>
                      <option>Meeting</option>
                    </select>
                  </FieldGroup>
                  <FieldGroup label="Buffer Between Events (min)">
                    <input
                      type="number"
                      value={general.bufferTime}
                      onChange={(e) => setGeneral({ ...general, bufferTime: e.target.value })}
                      className="settings-input"
                    />
                  </FieldGroup>
                  <FieldGroup label="Max Default Capacity">
                    <input
                      type="number"
                      value={general.maxCapacity}
                      onChange={(e) => setGeneral({ ...general, maxCapacity: e.target.value })}
                      className="settings-input"
                    />
                  </FieldGroup>
                </div>
              </SettingsCard>

              <SettingsCard title="Event Features" description="Enable or disable features for all events">
                <div className="space-y-0">
                  <ToggleRow label="Auto-record sessions" description="Automatically record all live sessions" checked={general.autoRecording} onChange={(v) => setGeneral({ ...general, autoRecording: v })} />
                  <ToggleRow label="Enable waitlist" description="Allow users to join a waitlist when events are full" checked={general.allowWaitlist} onChange={(v) => setGeneral({ ...general, allowWaitlist: v })} />
                  <ToggleRow label="Require manual approval" description="Manually approve each registration before confirming" checked={general.requireApproval} onChange={(v) => setGeneral({ ...general, requireApproval: v })} />
                  <ToggleRow label="Show attendee count" description="Display the number of registered attendees publicly" checked={general.showAttendeeCount} onChange={(v) => setGeneral({ ...general, showAttendeeCount: v })} />
                  <ToggleRow label="Enable Q&A" description="Allow attendees to ask questions during events" checked={general.enableQnA} onChange={(v) => setGeneral({ ...general, enableQnA: v })} />
                  <ToggleRow label="Enable live polls" description="Allow organizers to create real-time polls" checked={general.enablePolls} onChange={(v) => setGeneral({ ...general, enablePolls: v })} />
                  <ToggleRow label="Enable live chat" description="Allow attendees to chat during events" checked={general.enableChat} onChange={(v) => setGeneral({ ...general, enableChat: v })} />
                </div>
              </SettingsCard>
            </>
          )}

          {/* REGISTRATION */}
          {activeTab === "registration" && (
            <>
              <SettingsCard title="Required Fields" description="Configure which fields are required during registration">
                <div className="space-y-0">
                  <ToggleRow label="Email address" description="Always required for communication" checked={registration.requireEmail} onChange={(v) => setRegistration({ ...registration, requireEmail: v })} disabled />
                  <ToggleRow label="Full name" description="Attendee's first and last name" checked={registration.requireName} onChange={(v) => setRegistration({ ...registration, requireName: v })} />
                  <ToggleRow label="Organization / Club" description="Football club or organization affiliation" checked={registration.requireOrganization} onChange={(v) => setRegistration({ ...registration, requireOrganization: v })} />
                  <ToggleRow label="Job role / Title" description="Professional role or position" checked={registration.requireRole} onChange={(v) => setRegistration({ ...registration, requireRole: v })} />
                  <ToggleRow label="Phone number" description="Contact phone number" checked={registration.requirePhone} onChange={(v) => setRegistration({ ...registration, requirePhone: v })} />
                  <ToggleRow label="Dietary preferences" description="For in-person events with catering" checked={registration.collectDietaryPreferences} onChange={(v) => setRegistration({ ...registration, collectDietaryPreferences: v })} />
                </div>
              </SettingsCard>

              <SettingsCard title="Custom Registration Fields" description="Add custom fields to your registration forms">
                <div className="space-y-3">
                  {registration.customFields.map((field, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) => {
                          const updated = [...registration.customFields];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setRegistration({ ...registration, customFields: updated });
                        }}
                        className="settings-input flex-1"
                      />
                      <label className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => {
                            const updated = [...registration.customFields];
                            updated[idx] = { ...updated[idx], required: e.target.checked };
                            setRegistration({ ...registration, customFields: updated });
                          }}
                          className="rounded border-border"
                        />
                        Required
                      </label>
                      <button
                        onClick={() => {
                          const updated = registration.customFields.filter((_, i) => i !== idx);
                          setRegistration({ ...registration, customFields: updated });
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setRegistration({ ...registration, customFields: [...registration.customFields, { name: "", required: false }] })}
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Custom Field
                  </button>
                </div>
              </SettingsCard>

              <SettingsCard title="Registration Options" description="Control registration behavior and ticketing">
                <div className="space-y-0">
                  <ToggleRow label="Allow guest registration" description="Let unregistered users sign up for events" checked={registration.allowGuestRegistration} onChange={(v) => setRegistration({ ...registration, allowGuestRegistration: v })} />
                  <ToggleRow label="Send confirmation email" description="Automatically send email upon successful registration" checked={registration.sendConfirmationEmail} onChange={(v) => setRegistration({ ...registration, sendConfirmationEmail: v })} />
                  <ToggleRow label="Send reminder emails" description="Send automated reminders before events" checked={registration.sendReminderEmail} onChange={(v) => setRegistration({ ...registration, sendReminderEmail: v })} />
                  <ToggleRow label="Enable ticketing" description="Offer paid tickets and different ticket tiers" checked={registration.enableTicketing} onChange={(v) => setRegistration({ ...registration, enableTicketing: v })} />
                  <ToggleRow label="Enable discount codes" description="Allow promotional codes for discounted tickets" checked={registration.enableDiscountCodes} onChange={(v) => setRegistration({ ...registration, enableDiscountCodes: v })} />
                </div>
              </SettingsCard>

              {registration.sendReminderEmail && (
                <SettingsCard title="Reminder Timing" description="When to send event reminders">
                  <FieldGroup label="Hours before event">
                    <select
                      value={registration.reminderTiming}
                      onChange={(e) => setRegistration({ ...registration, reminderTiming: e.target.value })}
                      className="settings-select"
                    >
                      <option value="1">1 hour before</option>
                      <option value="2">2 hours before</option>
                      <option value="24">24 hours before</option>
                      <option value="48">48 hours before</option>
                      <option value="72">72 hours before</option>
                    </select>
                  </FieldGroup>
                </SettingsCard>
              )}
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <>
              <SettingsCard title="Email Notifications" description="Configure which emails are sent automatically">
                <div className="space-y-0">
                  <ToggleRow label="New registration" description="Email admins when someone registers" checked={notifications.emailNewRegistration} onChange={(v) => setNotifications({ ...notifications, emailNewRegistration: v })} />
                  <ToggleRow label="Cancellation" description="Email admins when someone cancels" checked={notifications.emailCancellation} onChange={(v) => setNotifications({ ...notifications, emailCancellation: v })} />
                  <ToggleRow label="Event reminder" description="Send attendees a reminder before events" checked={notifications.emailEventReminder} onChange={(v) => setNotifications({ ...notifications, emailEventReminder: v })} />
                  <ToggleRow label="Post-event survey" description="Send feedback survey after events end" checked={notifications.emailPostEventSurvey} onChange={(v) => setNotifications({ ...notifications, emailPostEventSurvey: v })} />
                  <ToggleRow label="Weekly digest" description="Send organizers a weekly event summary" checked={notifications.emailWeeklyDigest} onChange={(v) => setNotifications({ ...notifications, emailWeeklyDigest: v })} />
                </div>
              </SettingsCard>

              <SettingsCard title="Push Notifications" description="Real-time alerts during live events">
                <div className="space-y-0">
                  <ToggleRow label="Event going live" description="Notify when an event starts streaming" checked={notifications.pushLiveAlert} onChange={(v) => setNotifications({ ...notifications, pushLiveAlert: v })} />
                  <ToggleRow label="Chat mentions" description="Notify when mentioned in event chat" checked={notifications.pushChatMention} onChange={(v) => setNotifications({ ...notifications, pushChatMention: v })} />
                  <ToggleRow label="Q&A questions" description="Notify speakers of new questions" checked={notifications.pushQnAQuestion} onChange={(v) => setNotifications({ ...notifications, pushQnAQuestion: v })} />
                </div>
              </SettingsCard>

              <SettingsCard title="Recipient Settings" description="Who receives event notifications">
                <div className="space-y-0">
                  <ToggleRow label="Notify organizers" description="Send notifications to event organizers" checked={notifications.notifyOrganizers} onChange={(v) => setNotifications({ ...notifications, notifyOrganizers: v })} />
                  <ToggleRow label="Notify speakers" description="Send notifications to event speakers" checked={notifications.notifySpeakers} onChange={(v) => setNotifications({ ...notifications, notifySpeakers: v })} />
                </div>
                <div className="mt-4">
                  <FieldGroup label="Digest frequency">
                    <select
                      value={notifications.digestFrequency}
                      onChange={(e) => setNotifications({ ...notifications, digestFrequency: e.target.value })}
                      className="settings-select"
                    >
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                    </select>
                  </FieldGroup>
                </div>
              </SettingsCard>
            </>
          )}

          {/* ACCESS & PRIVACY */}
          {activeTab === "access" && (
            <>
              <SettingsCard title="Visibility & Access" description="Control who can see and join your events">
                <FieldGroup label="Default event visibility">
                  <select
                    value={access.defaultVisibility}
                    onChange={(e) => setAccess({ ...access, defaultVisibility: e.target.value })}
                    className="settings-select"
                  >
                    <option>Public</option>
                    <option>Members Only</option>
                    <option>Invite Only</option>
                    <option>Private</option>
                  </select>
                </FieldGroup>
                <div className="mt-4 space-y-0">
                  <ToggleRow label="Require login to register" description="Users must be logged in to register for events" checked={access.requireLogin} onChange={(v) => setAccess({ ...access, requireLogin: v })} />
                  <ToggleRow label="Enable event passcode" description="Require a passcode to access certain events" checked={access.enablePasscode} onChange={(v) => setAccess({ ...access, enablePasscode: v })} />
                  <ToggleRow label="Enable waiting room" description="Hold attendees in a waiting room before admitting" checked={access.enableWaitingRoom} onChange={(v) => setAccess({ ...access, enableWaitingRoom: v })} />
                </div>
                {access.enablePasscode && (
                  <div className="mt-4">
                    <FieldGroup label="Default passcode">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={access.passcode}
                          onChange={(e) => setAccess({ ...access, passcode: e.target.value })}
                          placeholder="Enter passcode"
                          className="settings-input flex-1"
                        />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(access.passcode);
                            toast({ title: "Copied", description: "Passcode copied to clipboard" });
                          }}
                          className="px-3 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </FieldGroup>
                  </div>
                )}
              </SettingsCard>

              <SettingsCard title="Content Protection" description="Protect your event content and recordings">
                <div className="space-y-0">
                  <ToggleRow label="Allow recording downloads" description="Let attendees download event recordings" checked={access.allowRecordingDownload} onChange={(v) => setAccess({ ...access, allowRecordingDownload: v })} />
                  <ToggleRow label="Enable watermark on recordings" description="Add a watermark to all recorded content" checked={access.enableWatermark} onChange={(v) => setAccess({ ...access, enableWatermark: v })} />
                </div>
              </SettingsCard>

              <SettingsCard title="Moderation" description="Control attendee behavior during events">
                <div className="space-y-0">
                  <ToggleRow label="Moderate chat messages" description="Review messages before they appear in chat" checked={access.moderateChat} onChange={(v) => setAccess({ ...access, moderateChat: v })} />
                  <ToggleRow label="Allow anonymous questions" description="Let attendees ask questions without showing their name" checked={access.allowAnonymousQuestions} onChange={(v) => setAccess({ ...access, allowAnonymousQuestions: v })} />
                  <ToggleRow label="Auto-mute attendees on join" description="Mute all attendees when they join the event" checked={access.autoMuteAttendees} onChange={(v) => setAccess({ ...access, autoMuteAttendees: v })} />
                </div>
              </SettingsCard>
            </>
          )}

          {/* BRANDING */}
          {activeTab === "branding" && (
            <>
              <SettingsCard title="Brand Colors" description="Customize the look of your event pages">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldGroup label="Primary Color">
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="h-10 w-14 rounded-md border border-border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={branding.primaryColor}
                        onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                        className="settings-input flex-1"
                      />
                    </div>
                  </FieldGroup>
                  <FieldGroup label="Accent Color">
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={branding.accentColor}
                        onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                        className="h-10 w-14 rounded-md border border-border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={branding.accentColor}
                        onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                        className="settings-input flex-1"
                      />
                    </div>
                  </FieldGroup>
                </div>
              </SettingsCard>

              <SettingsCard title="Event Page Style" description="Configure the appearance of event landing pages">
                <FieldGroup label="Registration page style">
                  <select
                    value={branding.registrationPageStyle}
                    onChange={(e) => setBranding({ ...branding, registrationPageStyle: e.target.value })}
                    className="settings-select"
                  >
                    <option value="modern">Modern (Card Layout)</option>
                    <option value="classic">Classic (Full Width)</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </FieldGroup>
                <div className="mt-4 space-y-0">
                  <ToggleRow label="Show organization logo" description="Display your logo on event pages" checked={branding.showLogo} onChange={(v) => setBranding({ ...branding, showLogo: v })} />
                  <ToggleRow label="Custom banner image" description="Use a custom banner on event pages" checked={branding.customBanner} onChange={(v) => setBranding({ ...branding, customBanner: v })} />
                  <ToggleRow label="Show social media links" description="Display social links on event pages" checked={branding.showSocialLinks} onChange={(v) => setBranding({ ...branding, showSocialLinks: v })} />
                </div>
                {branding.customBanner && (
                  <div className="mt-4">
                    <FieldGroup label="Banner image URL">
                      <input
                        type="text"
                        value={branding.bannerUrl}
                        onChange={(e) => setBranding({ ...branding, bannerUrl: e.target.value })}
                        placeholder="https://example.com/banner.jpg"
                        className="settings-input"
                      />
                    </FieldGroup>
                  </div>
                )}
              </SettingsCard>

              <SettingsCard title="Email Template" description="Customize the email look for event communications">
                <FieldGroup label="Email template">
                  <select
                    value={branding.emailTemplate}
                    onChange={(e) => setBranding({ ...branding, emailTemplate: e.target.value })}
                    className="settings-select"
                  >
                    <option value="default">Default Template</option>
                    <option value="branded">Branded Template</option>
                    <option value="minimal">Minimal Template</option>
                  </select>
                </FieldGroup>
                <div className="mt-4">
                  <FieldGroup label="Footer text">
                    <input
                      type="text"
                      value={branding.customFooterText}
                      onChange={(e) => setBranding({ ...branding, customFooterText: e.target.value })}
                      className="settings-input"
                    />
                  </FieldGroup>
                </div>
              </SettingsCard>
            </>
          )}

          {/* INTEGRATIONS */}
          {activeTab === "integrations" && (
            <>
              <SettingsCard title="Calendar Integrations" description="Sync events with external calendars">
                <div className="space-y-0">
                  <IntegrationRow name="Google Calendar" description="Sync events with Google Calendar" connected={integrations.googleCalendar} onChange={(v) => setIntegrations({ ...integrations, googleCalendar: v })} icon="📅" />
                  <IntegrationRow name="Outlook Calendar" description="Sync events with Microsoft Outlook" connected={integrations.outlookCalendar} onChange={(v) => setIntegrations({ ...integrations, outlookCalendar: v })} icon="📆" />
                </div>
              </SettingsCard>

              <SettingsCard title="Video Conferencing" description="Connect your video platform for live events">
                <div className="space-y-0">
                  <IntegrationRow name="Zoom" description="Host events via Zoom meetings & webinars" connected={integrations.zoom} onChange={(v) => setIntegrations({ ...integrations, zoom: v })} icon="🎥" />
                  <IntegrationRow name="Microsoft Teams" description="Host events via Teams meetings" connected={integrations.teams} onChange={(v) => setIntegrations({ ...integrations, teams: v })} icon="💬" />
                </div>
              </SettingsCard>

              <SettingsCard title="Communication" description="Connect messaging and email marketing tools">
                <div className="space-y-0">
                  <IntegrationRow name="Slack" description="Send event notifications to Slack channels" connected={integrations.slack} onChange={(v) => setIntegrations({ ...integrations, slack: v })} icon="💡" />
                  <IntegrationRow name="Mailchimp" description="Sync attendee lists with Mailchimp" connected={integrations.mailchimp} onChange={(v) => setIntegrations({ ...integrations, mailchimp: v })} icon="📧" />
                  <IntegrationRow name="HubSpot" description="Sync contacts and event data with HubSpot CRM" connected={integrations.hubspot} onChange={(v) => setIntegrations({ ...integrations, hubspot: v })} icon="🔄" />
                </div>
              </SettingsCard>

              <SettingsCard title="Payments & Analytics" description="Connect payment processors and tracking">
                <div className="space-y-0">
                  <IntegrationRow name="Stripe" description="Process ticket payments via Stripe" connected={integrations.stripe} onChange={(v) => setIntegrations({ ...integrations, stripe: v })} icon="💳" />
                  <IntegrationRow name="Google Analytics" description="Track event page visits and conversions" connected={integrations.googleAnalytics} onChange={(v) => setIntegrations({ ...integrations, googleAnalytics: v })} icon="📊" />
                </div>
              </SettingsCard>

              <SettingsCard title="Developer" description="API access and webhooks">
                <ToggleRow label="Enable API access" description="Allow external apps to access event data via API" checked={integrations.apiEnabled} onChange={(v) => setIntegrations({ ...integrations, apiEnabled: v })} />
                {integrations.apiEnabled && (
                  <div className="mt-4">
                    <FieldGroup label="Webhook URL">
                      <input
                        type="text"
                        value={integrations.webhookUrl}
                        onChange={(e) => setIntegrations({ ...integrations, webhookUrl: e.target.value })}
                        placeholder="https://your-domain.com/webhook"
                        className="settings-input"
                      />
                    </FieldGroup>
                  </div>
                )}
              </SettingsCard>
            </>
          )}

          {/* Save button at bottom */}
          <motion.div variants={item} className="flex items-center justify-between pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Changes will apply to all future events. Existing events are not affected.
            </p>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Reusable sub-components ---

function SettingsCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-0.5 mb-5">{description}</p>
      {children}
    </motion.div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange, disabled }: {
  label: string; description: string; checked: boolean; onChange: (val: boolean) => void; disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
    </div>
  );
}

function IntegrationRow({ name, description, connected, onChange, icon }: {
  name: string; description: string; connected: boolean; onChange: (val: boolean) => void; icon: string;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={cn("text-xs font-medium", connected ? "text-emerald-600" : "text-muted-foreground")}>
          {connected ? "Connected" : "Disconnected"}
        </span>
        <Switch checked={connected} onCheckedChange={onChange} />
      </div>
    </div>
  );
}
