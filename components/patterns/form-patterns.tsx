"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import { CustomTooltip } from "@/components/design-system/custom-tooltip"

export function FormPatterns() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "",
    companyName: "",
    companySize: "",
    industry: "",
    newsletter: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.password) newErrors.password = "Password is required"
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long"
    } else if (step === 2) {
      if (!formData.accountType) newErrors.accountType = "Account type is required"
      if (formData.accountType === "business" && !formData.companyName)
        newErrors.companyName = "Company name is required"
      if (formData.accountType === "business" && !formData.companySize)
        newErrors.companySize = "Company size is required"
      if (formData.accountType === "business" && !formData.industry) newErrors.industry = "Industry is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setIsSubmitted(true)
      }, 1500)
    }
  }

  const handleValidationFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Form submitted successfully!")
    }, 1500)
  }

  const handleConditionalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Form submitted successfully!")
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">Form Patterns</h3>
        <p className="text-muted-foreground">Common form patterns for collecting user input.</p>
      </div>

      <Tabs defaultValue="multi-step" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="multi-step">Multi-Step Form</TabsTrigger>
          <TabsTrigger value="validation">Form Validation</TabsTrigger>
          <TabsTrigger value="conditional">Conditional Fields</TabsTrigger>
        </TabsList>

        <TabsContent value="multi-step">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Step Form</CardTitle>
              <CardDescription>A form broken down into multiple steps for better user experience.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Registration Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for registering. You can now access your account.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setIsSubmitted(false)
                      setStep(1)
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        accountType: "",
                        companyName: "",
                        companySize: "",
                        industry: "",
                        newsletter: false,
                      })
                    }}
                  >
                    Start Over
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-muted"></div>
                      <ol className="relative z-10 flex justify-between">
                        <li className="flex items-center justify-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            1
                          </div>
                        </li>
                        <li className="flex items-center justify-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            2
                          </div>
                        </li>
                        <li className="flex items-center justify-center">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                              step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            3
                          </div>
                        </li>
                      </ol>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>Personal Info</span>
                      <span>Account Details</span>
                      <span>Confirmation</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">
                              First Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className={errors.firstName ? "border-destructive" : ""}
                            />
                            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">
                              Last Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className={errors.lastName ? "border-destructive" : ""}
                            />
                            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">
                            Password <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? "border-destructive" : ""}
                          />
                          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="accountType">
                            Account Type <span className="text-destructive">*</span>
                          </Label>
                          <RadioGroup
                            value={formData.accountType}
                            onValueChange={(value) => handleSelectChange("accountType", value)}
                            className={errors.accountType ? "border border-destructive rounded-md p-4" : ""}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="personal" id="personal" />
                              <Label htmlFor="personal">Personal</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="business" id="business" />
                              <Label htmlFor="business">Business</Label>
                            </div>
                          </RadioGroup>
                          {errors.accountType && <p className="text-xs text-destructive">{errors.accountType}</p>}
                        </div>

                        {formData.accountType === "business" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="companyName">
                                Company Name <span className="text-destructive">*</span>
                              </Label>
                              <Input
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className={errors.companyName ? "border-destructive" : ""}
                              />
                              {errors.companyName && <p className="text-xs text-destructive">{errors.companyName}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="companySize">
                                Company Size <span className="text-destructive">*</span>
                              </Label>
                              <Select
                                value={formData.companySize}
                                onValueChange={(value) => handleSelectChange("companySize", value)}
                              >
                                <SelectTrigger
                                  id="companySize"
                                  className={errors.companySize ? "border-destructive" : ""}
                                >
                                  <SelectValue placeholder="Select company size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-10">1-10 employees</SelectItem>
                                  <SelectItem value="11-50">11-50 employees</SelectItem>
                                  <SelectItem value="51-200">51-200 employees</SelectItem>
                                  <SelectItem value="201-500">201-500 employees</SelectItem>
                                  <SelectItem value="501+">501+ employees</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.companySize && <p className="text-xs text-destructive">{errors.companySize}</p>}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="industry">
                                Industry <span className="text-destructive">*</span>
                              </Label>
                              <Select
                                value={formData.industry}
                                onValueChange={(value) => handleSelectChange("industry", value)}
                              >
                                <SelectTrigger id="industry" className={errors.industry ? "border-destructive" : ""}>
                                  <SelectValue placeholder="Select industry" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="technology">Technology</SelectItem>
                                  <SelectItem value="finance">Finance</SelectItem>
                                  <SelectItem value="healthcare">Healthcare</SelectItem>
                                  <SelectItem value="education">Education</SelectItem>
                                  <SelectItem value="retail">Retail</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.industry && <p className="text-xs text-destructive">{errors.industry}</p>}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Personal Information</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">First Name</p>
                              <p>{formData.firstName}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Last Name</p>
                              <p>{formData.lastName}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-muted-foreground">Email</p>
                              <p>{formData.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <h3 className="mb-2 font-medium">Account Details</h3>
                          <div className="grid gap-2 text-sm">
                            <div>
                              <p className="text-muted-foreground">Account Type</p>
                              <p className="capitalize">{formData.accountType}</p>
                            </div>
                            {formData.accountType === "business" && (
                              <>
                                <div>
                                  <p className="text-muted-foreground">Company Name</p>
                                  <p>{formData.companyName}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Company Size</p>
                                  <p>{formData.companySize} employees</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Industry</p>
                                  <p className="capitalize">{formData.industry}</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) => handleCheckboxChange("newsletter", checked as boolean)}
                          />
                          <Label htmlFor="newsletter">Subscribe to our newsletter</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="terms" required />
                          <Label htmlFor="terms">
                            I agree to the{" "}
                            <CustomTooltip content="View terms of service">
                              <Button variant="link" className="px-0 text-sm">
                                Terms of Service
                              </Button>
                            </CustomTooltip>{" "}
                            and{" "}
                            <CustomTooltip content="View privacy policy">
                              <Button variant="link" className="px-0 text-sm">
                                Privacy Policy
                              </Button>
                            </CustomTooltip>
                          </Label>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </CardContent>
            {!isSubmitted && (
              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                {step < 3 ? (
                  <Button onClick={handleNext}>Next</Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    Complete Registration
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle>Form Validation</CardTitle>
              <CardDescription>A form with client-side validation for better user feedback.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleValidationFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="val-email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="val-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  <p className="text-xs text-muted-foreground">Must be a valid email address.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="val-password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="val-password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    minLength={8}
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters long and include uppercase, lowercase, number, and special character.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="val-confirm-password">
                    Confirm Password <span className="text-destructive">*</span>
                  </Label>
                  <Input id="val-confirm-password" type="password" placeholder="Confirm your password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="val-phone">Phone Number</Label>
                  <Input
                    id="val-phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  />
                  <p className="text-xs text-muted-foreground">Format: 123-456-7890</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="val-age">
                    Age <span className="text-destructive">*</span>
                  </Label>
                  <Input id="val-age" type="number" placeholder="Enter your age" required min={18} max={120} />
                  <p className="text-xs text-muted-foreground">Must be 18 or older.</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="val-terms" required />
                  <Label htmlFor="val-terms">
                    I agree to the{" "}
                    <CustomTooltip content="View terms of service">
                      <Button variant="link" className="px-0 text-sm">
                        Terms of Service
                      </Button>
                    </CustomTooltip>
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conditional">
          <Card>
            <CardHeader>
              <CardTitle>Conditional Form Fields</CardTitle>
              <CardDescription>A form that shows or hides fields based on user input.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleConditionalFormSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-preference">How would you like to be contacted?</Label>
                  <Select defaultValue="email">
                    <SelectTrigger id="contact-preference">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="mail">Mail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2" id="email-field">
                  <Label htmlFor="contact-email">Email Address</Label>
                  <Input id="contact-email" type="email" placeholder="Enter your email" />
                </div>

                <div className="space-y-2" id="phone-field">
                  <Label htmlFor="contact-phone">Phone Number</Label>
                  <Input id="contact-phone" type="tel" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2" id="mail-field">
                  <Label htmlFor="contact-address">Mailing Address</Label>
                  <Textarea id="contact-address" placeholder="Enter your mailing address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-type">What type of feedback do you have?</Label>
                  <Select defaultValue="general">
                    <SelectTrigger id="feedback-type">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Feedback</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2" id="bug-fields">
                  <Label htmlFor="bug-description">Bug Description</Label>
                  <Textarea id="bug-description" placeholder="Describe the bug in detail" />

                  <Label htmlFor="bug-steps">Steps to Reproduce</Label>
                  <Textarea id="bug-steps" placeholder="List the steps to reproduce the bug" />
                </div>

                <div className="space-y-2" id="feature-fields">
                  <Label htmlFor="feature-description">Feature Description</Label>
                  <Textarea id="feature-description" placeholder="Describe the feature you'd like to see" />

                  <Label htmlFor="feature-benefit">How would this benefit you?</Label>
                  <Textarea id="feature-benefit" placeholder="Explain how this feature would benefit users" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-message">Your Message</Label>
                  <Textarea id="feedback-message" placeholder="Enter your feedback" />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
