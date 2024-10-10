import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Link } from '@/types/profile';
import {
  AddMoreLink,
  AddMoreLinkContainer,
  LinksFieldContainer,
  Question,
  QuestionContainer,
  TextInput,
  TextInputContainer,
  TextInputItem,
  TrashIcon,
} from './LinksField.styles';

interface Links {
  linkedin: string;
  additionalLinks: string[];
}

interface LinksFieldProps {
  value: Link[];
  onChange: (value: Link[]) => void;
}

const LinksField: React.FC<LinksFieldProps> = ({ value, onChange }) => {
  const [links, setLinks] = useState<Link[]>(() => {
    return value.length > 0 ? value : [{ id: uuidv4(), url: '' }];
  });
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
          <Question>5.Provide your links:</Question>
        </QuestionContainer>
        {links.map(link => (
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
