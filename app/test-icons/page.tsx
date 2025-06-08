export default function TestIcons() {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-2xl font-bold">Test Icons</h1>

      <div className="flex items-center gap-4">
        <div>
          <p>Regular img tag:</p>
          <img src="/icon/pdf.svg" alt="PDF" width={40} height={40} />
        </div>

        <div>
          <p>With full path:</p>
          <img src={`${process.env.NEXT_PUBLIC_URL || ""}/icon/pdf.svg`} alt="PDF" width={40} height={40} />
        </div>

        <div>
          <p>Inline SVG:</p>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2293_6850)">
              <path
                d="M19.5 2H4.5C3.125 2 2 3.125 2 4.5V19.5C2 20.875 3.125 22 4.5 22H19.5C20.875 22 22 20.875 22 19.5V4.5C22 3.125 20.875 2 19.5 2ZM8.875 11.375C8.875 12.4125 8.0375 13.25 7 13.25H5.75V14.8125C5.75 15.325 5.325 15.75 4.8125 15.75C4.3 15.75 3.875 15.325 3.875 14.8125V9.5C3.875 8.8125 4.4375 8.25 5.125 8.25H7C8.0375 8.25 8.875 9.0875 8.875 10.125V11.375ZM15.125 13.875C15.125 14.9125 14.2875 15.75 13.25 15.75H10.75C10.4 15.75 10.125 15.475 10.125 15.125V8.875C10.125 8.525 10.4 8.25 10.75 8.25H13.25C14.2875 8.25 15.125 9.0875 15.125 10.125V13.875ZM20.125 9.1875C20.125 9.7 19.7 10.125 19.1875 10.125H18.25V11.375H19.1875C19.7 11.375 20.125 11.8 20.125 12.3125C20.125 12.825 19.7 13.25 19.1875 13.25H18.25V14.8125C18.25 15.325 17.825 15.75 17.3125 15.75C16.8 15.75 16.375 15.325 16.375 14.8125V9.5C16.375 8.8125 16.9375 8.25 17.625 8.25H19.1875C19.7 8.25 20.125 8.675 20.125 9.1875ZM5.75 11.375H7V10.125H5.75V11.375ZM12 13.875H13.25V10.125H12V13.875Z"
                fill="#D0362F"
              />
            </g>
            <defs>
              <clipPath id="clip0_2293_6850">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
