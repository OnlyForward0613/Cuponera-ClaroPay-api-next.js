
const Button = ({ text, onClick, type }) => {
  return (
    <button className="flex items-center justify-center w-full rounded-lg bg-[#DCA927] h-16 text-white text-lg font-semibold" type={type} onClick={onClick}>{text}</button>
  )
}

export default Button
