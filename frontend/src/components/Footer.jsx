import React from 'react'
import { ShieldCheckIcon, SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

const Footer = () => {
  return (
    <section className="mt-12 md:mt-16 py-8 shadow-md border-t border-cyan-500/20 flex items-center justify-center bg-gradient-to-r from-[#0a0f1c] to-[#0f172a]">
        <div className="flex flex-wrap items-center justify-center gap-8 px-6 py-4 text-sm bg-[rgba(10,10,10,0.8)] backdrop-blur-lg border-t border-white/10 shadow-lg rounded-lg mx-4">
            <span className="inline-flex items-center gap-2 text-gray-300 px-3 py-2">
                <ShieldCheckIcon className="h-4 w-4 text-green-400" /> 
                Enterprise Security
            </span>
            <span className="inline-flex items-center gap-2 text-gray-300 px-3 py-2">
                <SparklesIcon className="h-4 w-4 text-purple-400" /> 
                Machine Learning
            </span>
            <span className="inline-flex items-center gap-2 text-gray-300 px-3 py-2">
                <CheckCircleIcon className="h-4 w-4 text-blue-400" /> 
                Instant Results
            </span>
        </div>
    </section>
  )
}

export default Footer