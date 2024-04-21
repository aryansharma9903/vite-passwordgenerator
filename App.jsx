import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
//useRef hooks
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str+="0123456789"
    }
    if (charAllowed) {
      str+="!@#$%^&*?~"
    }
    for (let i = 1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    } 
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, password])
  //here setpassword is given as dependency rather than password, or else we will stuck in infinte loop
    //useCallback react hook lets you cache a function definiton in between renders
    //mtlb the function definition will be stored in cache and will be used for subsequent renders
    //IMP!!! const cachedFn = useCallback(fn(this can be a callback funciton), dependencies(can be an array of variables))
  
//passwordGenerator(), we cannot call this function directly, we can call this either by creating a button and 
//using onclick operation to call this function
//but we need to generate the password values every time the page refreshes
//so we will do this by using use effect hook
const copyPassToClipboard = useCallback(() => {
  window.navigator.clipboard.writeText(password)
  //we can do this directly without using the useRef hooks
  //but to optimise the user experience and highlight the text when it is copied,
  //this useRef hooks is essential
  passwordRef.current?.select()
  //using this the text will be selected when the button is clicked,
  //thats why we passed the refernce to the current password
}, [password])

useEffect(()=>{
  passwordGenerator()
}, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className='rounded w-full max-w-md h-full mx-auto px-4 py-8 my-6 top-3 bg-gray-800 text-orange-500'>
        <h1 className='text-4xl text-center text-cyan-50'> password generator</h1><br />
          <div className='flex shadow rounded-lg mb-4 overflow-hidden'>
            <input 
              type="text" 
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              ref={passwordRef}
            />
            <button onClick={copyPassToClipboard}
            className='px-3 outline-2 bg-orange-500 text-white'>copy</button>
          </div>
          <div className='flex'>
            <div className='flex items-center gap-x-1'>
              <input 
              type="range" 
              min={6}
              max={100} 
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length} </label>
            </div>

            <div className='flex px-3'>
              <input
              type="checkbox" 
              defaultChecked={numberAllowed}
              onChange={() => {setNumberAllowed((prev) => !prev)}}
              />
              <label className='px-1'>Numbers</label>
            </div>

            <div className='flex'>
              <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {setCharAllowed((prev)=> !prev)}}
              />
              <label className='px-1'>characters</label>
            </div>
          </div>
      </div>
    </>
  ) 
}
export default App
