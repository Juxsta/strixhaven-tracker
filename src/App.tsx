import React, { useRef } from 'react';
import useStore from './store/useStore';
import Relationships from './components/Relationships';
import ReportCards from './components/ReportCards';
import Extracurriculars from './components/Extracurriculars';
import Job from './components/Job';
import { Flowbite, Button, DarkThemeToggle } from 'flowbite-react';

const App: React.FC = () => {
  const { importData, exportData } = useStore((state) => ({
    importData: state.importData,
    exportData: state.exportData,
  }));
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <Flowbite theme={{ mode: 'dark' }}>
      <div className="p-4" style={{ backgroundImage: `url('/magic-the-gathering-strixhaven-campus-map-artwork.jpg')` }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-center mb-6 sm:mb-8 text-purple-800 dark:text-purple-400">
          Strixhaven Memories
        </h1>

        <Relationships />
        <ReportCards />
        <Extracurriculars />
        <Job />

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 mt-8">
          <DarkThemeToggle />
          <Button color="success" onClick={exportData} className="w-full sm:w-auto">
            Export Data
          </Button>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                if (file) {
                  importData(file);
                }
              }
            }}
            style={{ display: 'none' }}
            ref={fileInput}
          />
          <Button color="info" onClick={() => fileInput.current?.click()} className="w-full sm:w-auto">
            Import Data
          </Button>
        </div>
      </div>
    </Flowbite>
  );
};

export default App;