import { EnvChecker } from "@/components/env-checker"

export default function EnvCheckPage() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Environment Variable Check</h1>
      <EnvChecker />
    </div>
  )
}
