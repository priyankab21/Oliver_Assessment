import React, { useState, useEffect } from 'react';
import './App.css';

function Section({ styles, children }) {
  return (
    <div style={styles} className="section">
      {children}
    </div>
  );
}

function Button({ text, styles }) {
  return (
    <button style={styles} className="button">
      {text}
    </button>
  );
}

function App() {
  const [sections, setSections] = useState([]);
  const [nestedCounter, setNestedCounter] = useState(0);
  const [selectedSectionStyles, setSelectedSectionStyles] = useState({
    width: '200px',
    height: '100px',
    display: 'block',
    position: 'relative',
    color: '#000000',
    backgroundColor: 'orange',
    padding: '10px',
    margin: '10px',
  });

  const [selectedComponent, setSelectedComponent] = useState('section');
  const [buttonText, setButtonText] = useState('Custom Button');

  const addComponent = (parentIndex) => {
    if (selectedComponent === 'section') {
      addSection(parentIndex);
    } else if (selectedComponent === 'button') {
      addButton(parentIndex);
    }
  };

  const addButton = (parentIndex) => {
    const updatedSections = [...sections];
    let newButton = {
      text: buttonText,
      styles: {... selectedSectionStyles},
      type: 'button',
    };
    if (parentIndex === undefined) {
      console.log(sections, parentIndex, 'updatedParent')
      if (sections.length === 1) {
        newButton.styles.bottom = '100px';
        newButton.styles.marginLeft = '30px';
      } else if(sections.length === 2) {
        newButton.styles.bottom = '200px';
        newButton.styles.marginLeft = '60px';
      } else if(sections.length === 3) {
        newButton.styles.bottom = '300px';
        newButton.styles.marginLeft = '90px';
      } else if(sections.length === 4) {
        newButton.styles.bottom = '400px';
        newButton.styles.marginLeft = '120px';
      }
      setSections([...sections, newButton]);
    } else {
        updatedSections[parentIndex].children.push(newButton);
        setSections(updatedSections);
    }
  };

  const addSection = (parentIndex) => {
    if (sections.length < 5) {
      let newSection = { styles: { ...selectedSectionStyles }, children: [] };
      if (parentIndex === undefined) {
        setSections([...sections, newSection]);
      } else {
        const updatedSections = [...sections];
        const updatedParent = { ...updatedSections[parentIndex] };
        if (updatedParent.children.length === 1) {
          newSection.styles.bottom = '100px';
          newSection.styles.marginLeft = '30px';
        } else if(updatedParent.children.length === 2) {
          newSection.styles.bottom = '200px';
          newSection.styles.marginLeft = '60px';
        } else if(updatedParent.children.length === 3) {
          newSection.styles.bottom = '300px';
          newSection.styles.marginLeft = '90px';
        } else if(updatedParent.children.length === 4) {
          newSection.styles.bottom = '400px';
          newSection.styles.marginLeft = '120px';
        }
        if (updatedParent.children.length < 4) {
          updatedParent.children = [...updatedParent.children, newSection];
          updatedSections[parentIndex] = updatedParent;
          setSections(updatedSections);
        }
      }
    }
  };

  const handleStyleChange = (property, value) => {
    setSelectedSectionStyles({
      ...selectedSectionStyles,
      [property]: value,
    });
  };

  const renderComponents = (componentData, parentIndex) => {
    if (!componentData) {
      return null;
    }

    return componentData.map((component, index) => {
      if (component.type === 'button') {
        return (
          <Button key={index} text={component.text} styles={component.styles} />
        );
      } else {
        return (
          <Section key={index} styles={component.styles}>
            {parentIndex === undefined && ( // Display "Add Nested Component" only for parents
              <button onClick={() => addComponent(index)}>Add Nested Component</button>
            )}
            {renderComponents(component.children, index)}
          </Section>
        );
      }
    });
  };

  useEffect(() => {
    // Added an initial section when the component mounts
    const initialSection = { styles: selectedSectionStyles, children: [] };
    setSections([initialSection]);
  }, []);

  return (
    <div>
      <h1 style={{color: "red"}}>Custom Layout Builder</h1>
      <div className="container">
        <div>
          <label>Width:</label>
          <input
            type="text"
            value={selectedSectionStyles.width}
            onChange={(e) => handleStyleChange('width', e.target.value)}
          />
        </div>
        
        <div>
          <label>Height:</label>
          <input
            type="text"
            value={selectedSectionStyles.height}
            onChange={(e) => handleStyleChange('height', e.target.value)}
          />
        </div>
        <div>
          <label>Display:</label>
          <input
            type="text"
            value={selectedSectionStyles.display}
            onChange={(e) => handleStyleChange('display', e.target.value)}
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={selectedSectionStyles.position}
            onChange={(e) => handleStyleChange('position', e.target.value)}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="color"
            value={selectedSectionStyles.color}
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>
        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={selectedSectionStyles.backgroundColor}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          />
        </div>
        <div>
          <label>Padding:</label>
          <input
            type="text"
            value={selectedSectionStyles.padding}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
          />
        </div>
        <div>
          <label>Margin:</label>
          <input
            type="text"
            value={selectedSectionStyles.margin}
            onChange={(e) => handleStyleChange('margin', e.target.value)}
          />
        </div>
        <div>
          <label>Add Component:</label>
          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
          >
            <option value="section">Section</option>
            <option value="button">Button</option>
          </select>
          {selectedComponent === 'button' && (
            <div>
              <label>Button Text:</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={() => addComponent()}>Add Component</button>
        {renderComponents(sections)}
      </div>
    </div>
  );
}

export default App;
