import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

const TokenSelect = ({
  title,
  token,
  tokens,
  select
}) => {
  const menuRef = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuRef])

  const handleSelect = (token) => {
    select(token)
    setShow(false)
  }

  return (
    <div ref={menuRef} className="flex flex-col w-full relative">
      <span className="text-sm font-bold">{title}</span>
      <div className="flex items-center justify-between bg-gray-light shadow rounded-lg py-2 px-4 bg-[#e5e7eb]" onClick={() => setShow(!show)}>
        <div className="mb-2 cursor-pointer flex-1">
          <span className="text-sm text-gray-dark">Currency</span>
          {token &&
            <div className="flex items-center space-x-1">
              <img src={token.logoURI} className="w-6 h-6 rounded-full" alt={token.name} />
              <span>{token.name}</span>
            </div>
          }
        </div>
        <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5 text-gray-dark cursor-pointer" />
      </div>

      {show && tokens &&
        <div className="absolute rounded bg-gray-main py-1 top-24 w-full z-10 bg-[#dadada]">
          {Object.keys(tokens).map((token, idx) => (
            <div
              className="flex py-1 px-4 items-center cursor-pointer rounded hover:bg-gray-200"
              key={idx}
              onClick={() => handleSelect(tokens[token])}
            >
              <img src={tokens[token].logoURI} className="w-6 h-6 rounded-full" alt={tokens[token].name} />
              <span className="mx-2">{tokens[token].name}</span>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default TokenSelect