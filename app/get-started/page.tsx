"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { OptionCard } from "@/components/get-started/option-card"
import { getStartedContent } from "@/lib/content/get-started-content"

export default function GetStartedPage() {
  const [selectedOption, setSelectedOption] = useState<string | undefined>()
  const router = useRouter()
  const content = getStartedContent

  const handleContinue = () => {
    if (selectedOption) {
      // Handle the selected option
      console.log("Selected option:", selectedOption)
      router.push("/new")
    }
  }

  const handleSkip = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen grid grid-cols-12 bg-white">
      <div className="col-span-1"></div>
      <div className="col-span-10 py-6 md:py-10">
        <div className="col-span-8 max-w-3xl min-h-[793px] relative">
          {/* Logo */}
          <div className="mb-12">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M27.0694 23.974H32.5876C32.5618 22.3088 32.0437 20.6884 31.0987 19.3164C30.1536 17.9443 28.8237 16.8818 27.2759 16.2624C25.7281 15.643 24.0316 15.4943 22.3994 15.8349C20.7673 16.1756 19.2723 16.9903 18.1024 18.177C16.9325 19.3636 16.1398 20.8691 15.8239 22.5044C15.508 24.1395 15.683 25.8316 16.327 27.3677C16.9709 28.9039 18.0549 30.2158 19.443 31.1385C20.8311 32.0612 22.4613 32.5536 24.1287 32.5538H45.6962C45.2687 33.6315 44.761 34.6755 44.1763 35.677H24.1287C21.837 35.677 19.5967 34.9983 17.6912 33.7266C15.7858 32.455 14.3006 30.6476 13.4235 28.5329C12.5464 26.4182 12.3169 24.0913 12.7639 21.8464C13.2109 19.6014 14.3143 17.5392 15.9348 15.9206C17.5551 14.302 19.6196 13.1997 21.8673 12.7529C24.1149 12.3062 26.4446 12.5353 28.562 13.411C30.6793 14.2868 32.4891 15.7699 33.7624 17.673C35.0359 19.576 35.7157 21.8135 35.7159 24.1023H41.2249C41.2253 20.7232 40.2221 17.4198 38.3424 14.6102C36.4628 11.8004 33.7911 9.61059 30.6653 8.3176C27.5395 7.02462 24.1 6.68659 20.7818 7.34624C17.4636 8.0059 14.4159 9.63363 12.024 12.0236C9.63209 14.4135 8.00359 17.4581 7.34441 20.7725C6.6852 24.087 7.02497 27.5223 8.32072 30.6438C9.61647 33.7654 11.8099 36.4329 14.6238 38.3092C17.4376 40.1853 20.7454 41.1862 24.1287 41.1847H39.7298C35.6787 44.8778 30.4547 47.0274 24.9747 47.2566C19.4948 47.4854 14.1093 45.7791 9.76358 42.4368C5.41795 39.0946 2.38994 34.3302 1.21124 28.9801C0.0325382 23.63 0.778471 18.0362 3.31807 13.1808C5.85768 8.32527 10.0286 4.51851 15.0986 2.42885C20.1686 0.339164 25.8136 0.100124 31.0424 1.75368C36.2714 3.40725 40.75 6.84772 43.6918 11.4711C46.6339 16.0944 47.8511 21.6051 47.1301 27.0356H24.1287C23.5522 27.0359 22.9884 26.867 22.5071 26.5499C22.026 26.2328 21.6487 25.7814 21.4222 25.252C21.1956 24.7227 21.1298 24.1383 21.2328 23.5719C21.3358 23.0054 21.6033 22.4817 22.0018 22.0656C22.4003 21.6496 22.9124 21.3597 23.4745 21.2319C24.0366 21.1042 24.6239 21.144 25.1635 21.3468C25.7029 21.5495 26.171 21.9062 26.5094 22.3722C26.8478 22.8384 27.0416 23.3936 27.0668 23.9688L27.0694 23.974Z"
                fill="black"
              />
            </svg>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{content.title}</h1>
            <p className="text-xl text-gray-700 mb-1">{content.subtitle}</p>
          </div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 auto-rows-fr">
            {content.options.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onClick={() => setSelectedOption(option.id)}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 absolute bottom-0 left-0">
            <Button variant="link" onClick={handleSkip} className="text-purple-600 font-medium">
              {content.skipButtonText}
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedOption}
              className={`w-[375px] py-2 ${!selectedOption ? "bg-secondary text-secondary-foreground" : ""}`}
            >
              {content.continueButtonText}
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  )
}
