import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [scripts, setScripts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScript, setSelectedScript] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const handleSaveScript = () => {
    // Ensure there is a script in the text editor
    if (selectedScript) {
      // Create a new script object with content and folder
      const newScript = {
        content: selectedScript,
        folder: selectedFolder || 'General', // Default folder to 'General' if not specified
      };
      // Add the new script to the list of saved scripts
      setScripts([...scripts, newScript]);
      // Clear the selected script
      setSelectedScript('');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRenameScript = (index, newName) => {
    const updatedScripts = [...scripts];
    updatedScripts[index].content = newName;
    setScripts(updatedScripts);
  };

  const handleDeleteScript = (index) => {
    const updatedScripts = [...scripts];
    updatedScripts.splice(index, 1);
    setScripts(updatedScripts);
    setSelectedScript('');
  };

  const handleScriptClick = (script) => {
    setSelectedScript(script.content);
    setSelectedFolder(script.folder);
  };

  return (
    <div className="App">
      <div className="text-editor">
        {/* Text editor component */}
        <textarea
          placeholder="Write your script here..."
          value={selectedScript} // Set value of textarea to selectedScript
          onChange={(event) => setSelectedScript(event.target.value)}
        ></textarea>
        <button className="save-button" onClick={handleSaveScript}>
          Save
        </button>
      </div>
      <div className="saved-scripts-sidebar">
        {/* Saved scripts sidebar */}
        <input
          type="text"
          placeholder="Search scripts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul>
          {scripts
            .filter((script) =>
              script.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((script, index) => (
              <li key={index} onClick={() => handleScriptClick(script)}>
                {script.content}
                <input
                  type="text"
                  value={script.content}
                  onChange={(event) =>
                    handleRenameScript(index, event.target.value)
                  }
                />
                <button onClick={() => handleDeleteScript(index)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

