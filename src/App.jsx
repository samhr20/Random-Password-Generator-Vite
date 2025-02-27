import React, { useCallback, useEffect, useRef, useState } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [copysuccess, setCopysuccess] = useState(false)
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numbersAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_-=+/*';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numbersAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numbersAllowed, charAllowed, generatePassword]);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
    .then(() => {
      setCopysuccess(true);
      setTimeout(() => {
        setCopysuccess(false)

        }, 2000);
      })
      .catch(() => {
        alert('Failed to Copy Password')
      })

  };

  const getPasswordStrength = () => {
    if (length >= 12 && numbersAllowed && charAllowed) {
      return 'Strong'
    }
    if (length >= 8 && (numbersAllowed || charAllowed)) {
      return 'Medium'
    }
    return 'Weak'
  }

  return (
    <div className='bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen w-screen p-10 text-white flex items-center justify-center'>
      <div className='bg-white/20 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-[600px]'>
        <h1 className='text-center font-semibold text-2xl'>Generate Your Random Password</h1>
        <div className='mt-5.5 flex justify-between items-center gap-3.5'>
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className='border border-white py-2 px-3 rounded-full w-full font-bold text-yellow-300 bg-transparent'
          />
          <button
            onClick={copyToClipboard}
            className='bg-blue-500 py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors'
          >
            Copy
          </button>
        </div>

        {copysuccess && (
          <div className='bg-green-500/90 mt-6 p-3 rounded-lg text-center font-bold' >
            Password copied to clipboard!
          </div>
        )}

        <div className='mt-6 mb-8'>
          <div className='flex justify-between items-center px-2' >
            <span className='font-bold'>Password Strength</span>
            <span className={`font-bold ${getPasswordStrength() === 'Weak' ? 'text-red-500' : getPasswordStrength() === 'Medium' ? 'text-yellow-300' : 'text-green-500'}`}>{getPasswordStrength()}</span>
          </div>
          <div className='h-5 bg-white/50 rounded-full my-5'>
            <div className={` h-5 rounded-full ${getPasswordStrength() === 'Weak' ? 'bg-red-400 w-1/3' : getPasswordStrength() === 'Medium' ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-full'} transition-all`}>

            </div>
          </div>
        </div>



        <div className='space-y-6'>
          <div className='flex items-center justify-between gap-4 flex-wrap'>
            <label className='font-bold'>Length: {length}</label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer flex-1 accent-blue-500'
            />
          </div>

          <div className='flex flex-col gap-4'>
            <label className='flex items-center  justify-between gap-3'>
              <span className='font-semibold'>Include Numbers</span>
              <input
                type="checkbox"
                checked={numbersAllowed}
                onChange={() => setNumbersAllowed((prev) => !prev)}
                className='w-5 h-5 cursor-pointer accent-blue-500'
              />
            </label>
            <label className='flex items-center justify-between gap-3'>
              <span className='font-semibold'>Include Special Characters</span>
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className='w-5 h-5 cursor-pointer accent-blue-500'
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;