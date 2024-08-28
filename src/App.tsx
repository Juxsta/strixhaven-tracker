import React from 'react';
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

  return (
    <Flowbite theme={{ mode: 'dark' }}>

      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-extrabold font-cinzel text-center mb-8 text-purple-800 dark:text-purple-400">
          Strixhaven Memories
        </h1>

        <Relationships />
        <ReportCards />
        <Extracurriculars />
        <Job />

        <div className="flex justify-center space-x-4 mb-8 mt-8">
          <DarkThemeToggle />

          <Button color="success" onClick={exportData}>
            Export Data
          </Button>
          <Button color="info" onClick={() => importData()}>
            Import Data
          </Button>
        </div>
      </div>

    </Flowbite>
  );
};

export default App;