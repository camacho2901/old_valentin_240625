
import React, { useState } from 'react';

interface PdfSliderProps {
  pages: string[];
}

const ArrowLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);

const ArrowRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

const PdfSlider: React.FC<PdfSliderProps> = ({ pages }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  if (!pages || pages.length === 0) {
    return (
        <div className="relative w-full max-w-lg h-full bg-yellow-600/80 rounded-lg shadow-2xl flex items-center justify-center p-4 text-white">
            <p>No hay páginas de catálogo para mostrar.</p>
        </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg h-full rounded-lg shadow-2xl flex items-center justify-center bg-black/30">
        <img 
            src={pages[currentPage]} 
            alt={`Página del catálogo ${currentPage + 1}`} 
            className="max-w-full max-h-full object-contain rounded-lg"
        />
        {pages.length > 1 && (
            <>
                <button 
                    onClick={goToPrevious} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors ml-2 z-10"
                    aria-label="Página anterior"
                >
                    <ArrowLeftIcon className="w-8 h-8" />
                </button>
                <button 
                    onClick={goToNext} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors mr-2 z-10"
                    aria-label="Siguiente página"
                >
                    <ArrowRightIcon className="w-8 h-8" />
                </button>
            </>
        )}
    </div>
  );
};

export default PdfSlider;
