import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Links {
  linkedin: string;
  additionalLinks: string[];
}

const LinksFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  min-height: 200px;
`;

const QuestionContainer = styled.div`
  width: 100%;
  padding: 20px 10px;
`;
const TextInputContainer = styled.div`
  width: 100%;
`;

const AdditionalTextInputContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  /* margin-bottom: 5px; */
  border: none;
  background-color: #f5f5f5;
  outline: none;
  border-bottom: 0.5px solid gray;

  &:focus {
    border-bottom: 1px solid gray;
  }
`;

const AddMoreLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const AddMoreLink = styled.button`
  padding: 10px;
`;

const LinksField: React.FC = () => {
  const [links, setLinks] = useState<Links>({
    linkedin: '',
    additionalLinks: [],
  });

  const handleLinksChange = (field: string, value: string) => {
    setLinks({ ...links, [field]: value });
  };

  const handleAddLink = () => {
    setLinks({ ...links, additionalLinks: [...links.additionalLinks, ''] });
  };

  const handleAdditionalLinkChange = (index: number, value: string) => {
    const updatedLinks = [...links.additionalLinks];
    updatedLinks[index] = value;
    setLinks({ ...links, additionalLinks: updatedLinks });
  };

  return (
    <LinksFieldContainer>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ y: '50vh' }}
        animate={{ y: 0 }}
        transition={{ stiffness: 150 }}
        style={{ width: '100%' }}
      >
        <QuestionContainer>
          <h4>5.Provide your links:</h4>
        </QuestionContainer>
        <TextInputContainer>
          <TextInput
            type="text"
            placeholder="Type your answer here"
            value={links.linkedin}
            onChange={e => handleLinksChange('linkedin', e.target.value)}
          />
        </TextInputContainer>
        {links.additionalLinks.map((link, index) => (
          <AdditionalTextInputContainer key={index}>
            <TextInput
              type="text"
              placeholder={`Additional Link ${index + 1}`}
              value={link}
              onChange={e => handleAdditionalLinkChange(index, e.target.value)}
            />
          </AdditionalTextInputContainer>
        ))}
        <AddMoreLinkContainer>
          <AddMoreLink onClick={handleAddLink}>Add Additional Link</AddMoreLink>
        </AddMoreLinkContainer>
      </motion.div>
    </LinksFieldContainer>
  );
};

export default LinksField;
