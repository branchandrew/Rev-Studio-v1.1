import type React from "react"

export interface SourceReference {
  document: string
  paragraph: string
  wordCount: number
}

export interface SourceDocument {
  document: string
  paragraph: string
  content: React.ReactNode
}

// Add this helper function at the top of the file, after the imports
function createLineElement(lineNumber: number, time: string, content: string, isQA = false) {
  return (
    <div key={lineNumber} data-line={lineNumber} data-time={time} className={isQA ? "qa-content" : ""}>
      <span className="text-gray-500 mr-2">{time}</span>
      <span className="text-gray-500 mr-2">{lineNumber}</span>
      <span>{content}</span>
    </div>
  )
}

// Updated source documents with line numbers and timestamps
const sourceDocuments: SourceDocument[] = [
  {
    document: "Case file 1",
    paragraph: "1",
    content: (
      <div>
        <h2>Case file 1</h2>
        <div className="font-mono text-sm whitespace-pre-wrap">
          {`Case Title: Doe v. Acme Corporation
Case Number: 2023-CV-000123
Jurisdiction: Superior Court of [State] – Civil Division
Filing Date: January 10, 2023
Status: Active – Pending Trial
Case Type: Civil – Breach of Contract

**Parties Involved**

**Plaintiff: John Doe**
A private individual and former client of the defendant corporation. Plaintiff is alleging financial and reputational damages due to non-fulfillment of contractual obligations.

**Defendant: Acme Corporation**
A registered business entity in the State of [State], providing services in the area of technology consulting. The defendant is accused of breaching terms outlined in a signed service agreement.

**Case Overview**
The plaintiff, Mr. John Doe, entered into a service contract with Acme Corporation on or about August 15, 2022. The contract outlined a set of deliverables related to software development and technical support. According to the plaintiff, Acme Corporation failed to deliver the agreed-upon services within the contractual timeframe, resulting in direct financial losses and operational setbacks.

The plaintiff claims that despite multiple requests for status updates and resolution, Acme Corporation did not fulfill the terms or offer remediation. A notice of breach was issued by the plaintiff on November 30, 2022, with no formal response or corrective action from the defendant.

As a result, Mr. Doe has initiated legal proceedings, seeking compensatory damages, reimbursement of legal costs, and any other relief deemed appropriate by the court.

**Key Allegations**
• Failure to deliver services as specified in Sections 2.1 through 2.3 of the service agreement
• Lack of communication and refusal to provide a project status update despite written requests
• Breach of implied covenant of good faith and fair dealing
• Financial harm caused by reliance on undelivered services

**Defendant's Response**
In the initial response dated February 5, 2023, Acme Corporation denied all allegations and asserted that the delays were caused by external factors beyond their control, including force majeure conditions and lack of timely input from the plaintiff. The defendant further contends that the contract included provisions for deadline flexibility and that their actions do not constitute a breach under the agreed terms.

A motion to dismiss was filed by the defendant on March 2, 2023, which was subsequently denied by the court on April 4, 2023.

**Evidence and Exhibits**
• Exhibit A: Signed Service Agreement (dated August 15, 2022)
• Exhibit B: Email correspondence between parties from September to November 2022
• Exhibit C: Financial statements showing project-related losses
• Exhibit D: Plaintiff's breach notice and delivery records

**Upcoming Dates**
• Discovery Deadline: June 30, 2025
• Pre-Trial Conference: July 15, 2025
• Trial Date: Tentatively scheduled for September 8, 2025

**Notes**
This case is currently in the discovery phase. Both parties are exchanging documents and preparing expert witness reports. Mediation was attempted on May 10, 2025, but no settlement was reached.`}
        </div>
      </div>
    ),
  },
  {
    document: "Legal Notes",
    paragraph: "1",
    content: (
      <div>
        <h2>Legal Notes</h2>
        <div className="font-mono text-sm whitespace-pre-wrap">
          {`CASE FILE: Jane Smith vs. Northview Services LLC
Case #: 2024-CIV-00458
Filed: March 12, 2024
Court: State District Court – Civil Division
Type: Employment Dispute – Wrongful Termination
Status: Active / Discovery Phase

**PARTIES**

**Plaintiff: Jane Smith**
• Former employee (Project Manager)
• Claims she was fired unfairly
• Says termination was retaliation for internal complaint

**Defendant: Northview Services LLC**
• Mid-size logistics firm
• Claims termination was due to performance issues
• Denies any retaliation

**PLAINTIFF ALLEGATIONS**
• Terminated without proper warning or documentation
• Filed an internal ethics complaint 3 weeks before termination
• Believes termination was direct result of complaint
• No prior performance warnings on record
• Requests reinstatement or damages for lost wages + emotional distress

**DEFENDANT RESPONSE**
• Says termination followed internal review process
• Provided performance improvement plan in Jan 2024 (Plaintiff disputes this)
• Denies knowledge of any ethics complaint affecting decision
• Claims project delays and missed deadlines under plaintiff's management

**KEY EVENTS**
• Jan 15, 2024 – Alleged PIP delivered (Plaintiff says she never received)
• Feb 19, 2024 – Plaintiff submits complaint to HR about team lead behavior
• Mar 8, 2024 – Plaintiff terminated
• Mar 12, 2024 – Case filed

**DOCUMENTS & EVIDENCE**
• HR file (incomplete – missing signed PIP form)
• Internal complaint email (timestamped Feb 19)
• Slack messages between plaintiff + team
• Termination letter (Mar 8)
• Payroll history
• Performance reviews from 2023

**DISCOVERY STATUS**
• Plaintiff submitted initial disclosures – May 1, 2025
• Defendant missed initial deadline, requested extension
• Subpoena for internal HR communications in progress
• Scheduling protective order for internal docs review

**HEARINGS & DEADLINES**
• Discovery ends: August 15, 2025
• Mediation scheduled: August 28, 2025
• Trial readiness hearing: October 3, 2025
• Trial (tentative): November 10, 2025

**NOTES**
• Mediation might resolve early – both sides expressed openness
• No settlement offers exchanged yet
• Judge flagged lack of HR documentation as a concern
• Plaintiff's attorney may push for summary judgment
• Need to clarify chain of command re: complaint handling`}
        </div>
      </div>
    ),
  },
  {
    document: "Legal transcription",
    paragraph: "1",
    content: (
      <div>
        <h2>Legal transcription</h2>
        <div className="font-mono text-sm whitespace-pre-wrap">
          {`IN THE DISTRICT COURT OF [STATE]
Case No. 2023-CV-000789
Jane Doe, Plaintiff
v.
XYZ Industries, Defendant

DEPOSITION OF: John A. Witness
DATE: October 12, 2024
LOCATION: Virtual (Zoom)
REPORTED BY: Sarah Transcript, Certified Court Reporter #12345

[Begin Transcript]

**COURT REPORTER (SARAH TRANSCRIPT):**
We are now on the record. Today is Thursday, October 12, 2024. The time is 10:03 a.m. This is the deposition of John A. Witness, taken in the matter of Jane Doe versus XYZ Industries, case number 2023-CV-000789, filed in the District Court of [State]. This deposition is being conducted via Zoom. Will counsel please state their appearances for the record?

**MS. SMITH (Plaintiff's Counsel):**
Amanda Smith for the plaintiff, Jane Doe.

**MR. CLARK (Defense Counsel):**
Benjamin Clark on behalf of the defendant, XYZ Industries.

**COURT REPORTER:**
Mr. Witness, please raise your right hand.

[Witness sworn in]

**DIRECT EXAMINATION BY MS. SMITH**

**MS. SMITH:**
Q: Please state your full legal name for the record.
**MR. WITNESS:**
A: John Alexander Witness.

**MS. SMITH:**
Q: Mr. Witness, where are you currently employed?
**MR. WITNESS:**
A: XYZ Industries.

**MS. SMITH:**
Q: What is your current title there?
**MR. WITNESS:**
A: I'm the Senior Operations Manager.

**MS. SMITH:**
Q: How long have you held that position?
**MR. WITNESS:**
A: Since August 2018.

**MS. SMITH:**
Q: Did you supervise the plaintiff, Jane Doe?
**MR. WITNESS:**
A: Yes. She reported directly to me for about 14 months, starting in early 2023.

**MS. SMITH:**
Q: Can you describe her performance during that time?
**MR. WITNESS:**
A: Initially it was acceptable. Over time, there were increasing issues—missed deadlines, failure to follow process, and a few complaints from other staff about her tone in communications.

**MS. SMITH:**
Q: Did you document these issues?
**MR. WITNESS:**
A: Yes. I documented performance issues in weekly reports and submitted them to HR.

**MS. SMITH:**
Q: Were those concerns ever formally shared with Ms. Doe?
**MR. WITNESS:**
A: They were. We met several times. She was placed on a 30-day Performance Improvement Plan in April 2024.

**MS. SMITH:**
Q: Did she sign the PIP?
**MR. WITNESS:**
A: Yes, she did, but she also included a comment that she disagreed with the assessment.

**CROSS-EXAMINATION BY MR. CLARK**

**MR. CLARK:**
Q: Mr. Witness, in your professional opinion, was the termination justified?
**MR. WITNESS:**
A: Yes. She did not meet the goals outlined in the PIP, and the issues persisted despite intervention.

**MR. CLARK:**
Q: Was HR involved throughout the process?
**MR. WITNESS:**
A: Yes. They were present in every meeting regarding performance discussions.

**MR. CLARK:**
Q: Did Jane Doe ever file a formal internal complaint before her termination?
**MR. WITNESS:**
A: Not with me, no. I wasn't aware of any complaint until after her employment ended.

**MR. CLARK:**
Q: Were any accommodations ever requested by the plaintiff related to mental health, disability, or other personal needs?
**MR. WITNESS:**
A: No. Nothing was brought to my attention officially.

**REDIRECT EXAMINATION BY MS. SMITH**

**MS. SMITH:**
Q: You mentioned you weren't aware of her internal complaint. Are you aware now that she filed a report with HR on February 19, 2024, regarding workplace harassment?
**MR. WITNESS:**
A: I became aware of that after the case was filed. I didn't see the complaint before her termination.

**MS. SMITH:**
Q: Do you believe that complaint was considered before the termination decision?
**MR. WITNESS:**
A: I can't say. I wasn't informed of it at the time, so I don't know if HR factored it in.

**MS. SMITH:**
Q: Would knowledge of that complaint have changed the process?
**MR. WITNESS:**
A: Possibly. It might have led us to pause or investigate further before moving ahead with the termination.

[OFF THE RECORD – 10:52 a.m. to 11:02 a.m.]

**MS. SMITH:**
Q: Just one final question. Was there any alternative to termination discussed, such as reassignment or mediation?
**MR. WITNESS:**
A: Not formally. We didn't believe reassignment would resolve the underlying issues.

**MS. SMITH:**
I have no further questions.

**MR. CLARK:**
No further questions.

**COURT REPORTER:**
This concludes the deposition of John A. Witness. The time is 11:12 a.m. We are now off the record.`}
        </div>
      </div>
    ),
  },
  {
    document: "Case document",
    paragraph: "1",
    content: (
      <div>
        <h2>Case document</h2>
        <div className="font-mono text-sm whitespace-pre-wrap">
          {`CASE FILE: ROBERT JONES v. EVERGROW TECHNOLOGIES INC.
Case Number: 2024-CV-003176
Court: Superior Court of [State], Civil Division
Filing Date: March 5, 2024
Status: Active – Pre-Trial Stage
Case Type: Civil – Product Liability / Negligence

**I. OVERVIEW**
This case involves a civil lawsuit filed by Robert Jones, the plaintiff, against Evergrow Technologies Inc., the defendant, for alleged injuries sustained from the use of a defective consumer device manufactured by the company. The plaintiff is seeking damages for medical expenses, lost wages, pain and suffering, and other compensatory claims related to an incident that occurred on February 3, 2024.

According to the complaint, Mr. Jones purchased a home smart gardening device, the EverGrow AutoPlanter 2.0, from an authorized retailer. Within two weeks of setup and use, the device reportedly overheated and caused a minor electrical fire, resulting in injury to the plaintiff and damage to his kitchen area.

Evergrow Technologies disputes the allegations, claiming that the device was modified beyond its intended use, voiding any warranty or liability. The case is in the early discovery phase and has not yet proceeded to trial.

**II. PARTIES**
**Plaintiff:** Robert Jones, a 38-year-old homeowner residing in [City], [State].
**Defendant:** Evergrow Technologies Inc., a manufacturer of smart home gardening products headquartered in [State].

**III. PLAINTIFF'S CLAIMS**

**Product Defect – Design and/or Manufacturing:**
Plaintiff alleges that the AutoPlanter 2.0 was defectively designed or assembled, resulting in an unreasonably dangerous product under normal use conditions.

**Failure to Warn:**
Plaintiff claims that the defendant failed to provide adequate safety warnings or instructions about overheating risk or safe placement of the device indoors.

**Negligence:**
Plaintiff alleges negligence in the development, testing, and quality assurance processes of the product, leading directly to the hazardous malfunction.

**Breach of Implied Warranty:**
Plaintiff asserts that the product was unfit for its intended use and breached the implied warranty of merchantability.

**Damages Sought:**
• Medical expenses ($8,432.70 to date)
• Estimated property repair costs ($12,500)
• Lost wages (14 missed workdays, estimated at $3,000)
• General damages for pain, emotional distress, and loss of enjoyment of home

**IV. DEFENSE POSITION**
Evergrow Technologies filed an answer on March 28, 2024, denying all substantive allegations. The defense argues:
• The product was altered post-purchase by the plaintiff, including improper wiring and placement near a stove.
• User modifications voided all warranties and shifted liability to the user.
• Independent product testing has shown no known overheating risks under standard conditions.
• Any damages were caused by misuse or unrelated electrical issues in the plaintiff's residence.

The defense has requested a jury trial and filed a motion to compel discovery on April 18, 2024.

**V. PROCEDURAL HISTORY**
• March 5, 2024 – Complaint filed
• March 11, 2024 – Summons served on Evergrow Technologies' registered agent
• March 28, 2024 – Defendant files answer and initial affirmative defenses
• April 10, 2024 – Preliminary case management conference held
• April 18, 2024 – Motion to compel filed by defense regarding plaintiff's maintenance records and device photographs
• April 25, 2024 – Plaintiff files initial disclosures
• May 9, 2024 – Protective order granted limiting release of proprietary design documents during discovery

**VI. EVIDENCE FILED TO DATE**

**Plaintiff's Exhibits:**
• Copy of purchase receipt
• Medical reports and ER visit summary
• Photographs of damage (kitchen and hand burn)
• Model user manual with highlighted lack of warning on heat risk

**Defendant's Exhibits:**
• Internal QA certification log for batch 1127
• Video demonstration of normal-use operating temperature
• Statement of customer service rep alleging post-sale modification reports from plaintiff

**Witnesses Identified:**
• Dr. Elaine Tan (Plaintiff's primary care provider)
• Michael Richards (Evergrow safety engineer)
• Sam Vickers (neighbor who witnessed incident aftermath)

**VII. UPCOMING DEADLINES**
• Discovery cutoff: August 30, 2025
• Expert witness designation: July 5, 2025
• Settlement conference: August 15, 2025
• Trial readiness conference: September 19, 2025
• Trial date (tentative): October 13, 2025

**VIII. ADDITIONAL NOTES**
• Both parties have expressed potential interest in mediation but have not scheduled a session yet.
• Plaintiff's counsel has raised the possibility of requesting a spoliation instruction based on a missing device component during inspection.
• Defendant has initiated third-party testing of a retained sample of the product batch for comparative safety analysis.
• Public relations concerns noted on the defense side due to previous unrelated recall of an older EverGrow device model (1.0) in 2022.`}
        </div>
      </div>
    ),
  },
]

// Update the getSourceDocument function to better handle citation formats
// Find the getSourceDocument function and enhance it to handle more citation formats

// Function to get a source document by document name and paragraph
export function getSourceDocument(documentName: string, paragraph: string): SourceDocument | undefined {
  console.log(`Looking for document: "${documentName}", paragraph: "${paragraph}"`)

  // Try exact match first
  let doc = sourceDocuments.find((doc) => doc.document === documentName && doc.paragraph === paragraph)

  // If not found, try case-insensitive match
  if (!doc) {
    doc = sourceDocuments.find(
      (doc) => doc.document.toLowerCase() === documentName.toLowerCase() && doc.paragraph === paragraph,
    )
  }

  // If still not found, try matching Trump deposition references
  if (
    !doc &&
    documentName.includes("Trump") &&
    (documentName.includes("Depo") || documentName.includes("deposition"))
  ) {
    doc = sourceDocuments.find((doc) => doc.document === "Donald J. Trump, Sr. Deposition")
  }

  // If still not found, try just matching the document name
  if (!doc) {
    doc = sourceDocuments.find(
      (doc) => doc.document === documentName || doc.document.toLowerCase() === documentName.toLowerCase(),
    )
  }

  console.log(`Document found: ${!!doc}`)
  return doc
}

// Function to get a source document by document name only (returns first paragraph)
export function getSourceDocumentByName(documentName: string): SourceDocument | undefined {
  console.log(`Looking for document by name only: "${documentName}"`)
  const doc = sourceDocuments.find(
    (doc) => doc.document === documentName || doc.document.toLowerCase() === documentName.toLowerCase(),
  )
  console.log(`Document found by name: ${!!doc}`)
  return doc
}
