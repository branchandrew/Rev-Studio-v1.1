import type { Metadata } from "next"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form examples built with React Hook Form and Zod.",
}

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: "I own a computer.",
  urls: [{ value: "https://shadcn.com" }, { value: "http://twitter.com/shadcn" }],
}

export default function SettingsProfilePage() {
  return (
    <>
      <DashboardShell>
        <DashboardHeader heading="Profile" text="Manage your profile settings and preferences." />
        <div className="grid gap-10">
          <ProfileForm />
        </div>
      </DashboardShell>
    </>
  )
}

function ProfileForm() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
      </div>
      <div className="grid gap-5">
        <div className="grid gap-2.5">
          <label
            htmlFor="username"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Username
          </label>
          <Input id="username" placeholder="shadcn" className="w-full" />
          <p className="text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a pseudonym.
          </p>
        </div>
        <div className="grid gap-2.5">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input id="email" placeholder="m@example.com" type="email" className="w-full" />
          <p className="text-sm text-muted-foreground">We will use this email to contact you about your account.</p>
        </div>
        <div className="grid gap-2.5">
          <label
            htmlFor="bio"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Bio
          </label>
          <Textarea
            id="bio"
            placeholder="Tell us a little bit about yourself"
            className="min-h-[120px] w-full"
            defaultValue="I own a computer."
          />
          <p className="text-sm text-muted-foreground">
            You can <span>@mention</span> other users and organizations.
          </p>
        </div>
        <Button>Update profile</Button>
      </div>
    </div>
  )
}
