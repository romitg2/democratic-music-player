

type CompletedProps = {
  completed: number
}

const Completed: React.FC<CompletedProps> = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-green-500"></div>
      <p className="text-green-500">Congratulations! You have completed the authentication process.</p>
    </div>
  )
}

export default Completed
