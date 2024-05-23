import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@/types/profile';
import { breakpoints as bp } from '@/utils/layout';

interface Links {
  linkedin: string;
  additionalLinks: string[];
}

const LinksFieldContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;

  @media (min-width: ${bp.md}) {
    width: 400px;
  }
`;

const QuestionContainer = styled.div`
  padding: 20px 10px;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }
`;

const TextInputContainer = styled.div`
  width: 100%;
`;

const TextInputItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

export const TrashIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
`;

interface LinksFieldProps {
  value: Link[];
  onChange: (value: Link[]) => void;
}

const LinksField: React.FC<LinksFieldProps> = ({ value, onChange }) => {
  const [links, setLinks] = useState<Link[]>(value);

  const handleLinkChange = (id: string, newValue: string) => {
    const updatedLinks = links.map(link => {
      if (link.id === id) {
        return { ...link, url: newValue };
      }
      return link;
    });
    setLinks(updatedLinks);
    onChange(updatedLinks);
  };

  const handleAddLink = () => {
    const newLink: Link = { id: uuidv4(), url: '' };
    const newLinks = [...links, newLink];
    setLinks(newLinks);
    onChange(newLinks);
  };

  const handleRemoveLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    onChange(updatedLinks);
  };

  // useEffect(() => {
  //   onChange(links);
  // }, [links, onChange]);

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
        {value.map(link => (
          <TextInputContainer key={link.id}>
            <TextInputItem>
              <TextInput
                type="text"
                placeholder="Link"
                value={link.url}
                onChange={e => handleLinkChange(link.id, e.target.value)}
              />
              <TrashIcon onClick={() => handleRemoveLink(link.id)}>
                <FaTrash />
              </TrashIcon>
            </TextInputItem>
          </TextInputContainer>
        ))}
        <AddMoreLinkContainer>
          <AddMoreLink onClick={handleAddLink}>Add Additional Link</AddMoreLink>
        </AddMoreLinkContainer>
      </motion.div>
    </LinksFieldContainer>
  );
};

export default LinksField;
