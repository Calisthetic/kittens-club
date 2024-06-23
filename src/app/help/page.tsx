export default async function Page() {
  const questions:{question:string,answer:string|React.ReactNode}[] = [
    {
      question: "What is the goal of this project?",
      answer: "Introducing a platform where users can share photos of cats"
    },
    {
      question: "What are the project costs?",
      answer: "The cost of this project can only be estimated by the time spent"
    },
    {
      question: "How long has this project been in development?",
      answer: "Development began in June 2024"
    },
    {
      question: "What are your plans for further development of the project?",
      answer: "Expansion of current functionality"
    },
    {
      question: "Do you need partners or employees?",
      answer: "We will welcome all your ideas and suggestions. For developers who want to change something, we are waiting for your pull requests"
    },
    {
      question: "How can I contact you?",
      answer: (<span>Send me a message in telegram: <a href="https://t.me/calisthetic" className="underline">Calisthetic</a></span>)
    }
  ]

  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center">
      <div className="max-w-3xl w-full gap-y-2 flex flex-col py-8 px-2">
        <p className=" text-center text-2xl font-semibold mb-2">FAQ</p>
        {questions.map((item, index) => (
          <div key={index} className="w-full rounded-md flex overflow-hidden">
            <div className="w-[4px] bg-icon"></div>
            <div className="w-[calc(100%-4px)]">
              <button className="peer group w-full cursor-pointer focus:cursor-default flex justify-between items-center px-2 sm:px-4 py-2">
                <span className="text-left text-base sm:text-lg font-semibold mr-1">{item.question}</span>
                <div>
                  <svg className="w-4 h-4 transition-transform group-focus:-scale-y-100 fill-none" aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                    <path strokeLinecap="round" 
                    strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </div>
              </button>
              <div className="grid grid-rows-[0fr] peer-focus:grid-rows-[1fr] peer-focus:pb-2 
              focus-within:grid-rows-[1fr] focus-within:pb-2 hover:grid-rows-[1fr] hover:pb-2" 
              style={{
                transitionDuration: "0.25s",
                transitionProperty: "grid-template-rows"
              }}>
                <div className="ml-2 overflow-hidden text-base">- {item.answer}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}