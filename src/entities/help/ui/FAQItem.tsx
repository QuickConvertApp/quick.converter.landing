import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../model/types';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  faq: FAQ;
  index?: number;
}

export const FAQItem: React.FC<FAQItemProps> = ({ faq, index = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`border-b border-gray-200 py-4 ${isOpen ? 'bg-blue-50/30 -mx-4 px-4 rounded-lg' : ''}`}
    >
      <button
        onClick={toggleOpen}
        className="flex w-full justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 rounded-md"
        aria-expanded={isOpen}
      >
        <h3 className={`text-base font-medium ${isOpen ? 'text-blue-600' : 'text-gray-900'}`}>
          {faq.question}
        </h3>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`ml-6 flex-shrink-0 rounded-full p-1.5 ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              
              {/* Example - add helpful/not helpful buttons for feedback */}
              <div className="flex items-center space-x-4 mt-4 text-sm">
                <span className="text-gray-500">Was this helpful?</span>
                <button className="text-gray-500 hover:text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                  </svg>
                  Yes
                </button>
                <button className="text-gray-500 hover:text-red-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                    <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.483-1.612 1.068-.31.532-.795.923-1.372 1.140a5.009 5.009 0 01-2.805.59c-.432-.143-.853-.386-1.011-.814-.16-.432-.248-.9-.248-1.388z" />
                  </svg>
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 