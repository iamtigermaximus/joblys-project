'use client';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Page, Document, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  document: {
    display: 'flex',
    width: '100%',
  },
  page: {
    flexDirection: 'column',
    display: 'flex',
    padding: '50px',
    width: '100%',
    backgroundColor: 'white',
    color: '#232946',
  },
  paragraph: {
    marginBottom: 10,
    lineHeight: 1.5,
    fontSize: 12,
  },
});

interface CoverLetterTemplateProps {
  content: string;
}

const CoverLetterTemplate: React.FC<CoverLetterTemplateProps> = ({
  content,
}) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    // Reset displayed content when the content prop changes
    setDisplayedContent('');

    // Simulate content generation delay
    setTimeout(() => {
      setDisplayedContent(content);
    }, 1000); // Adjust delay as needed
  }, [content]);

  // Check if content is a string
  if (typeof content !== 'string') {
    console.error('Content is not a string:', content);
    return null; // or return an error message
  }

  // Split the displayed content into paragraphs based on newlines
  const paragraphs = displayedContent
    .split('\n')
    .filter(paragraph => paragraph.trim() !== '');

  return (
    <Document style={styles.document}>
      <Page id="coverletter-template" size="A4" style={styles.page}>
        {paragraphs.map((paragraph, index) => (
          <View key={index} style={styles.paragraph}>
            <Text>{paragraph}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default CoverLetterTemplate;

// 'use client';

// import React from 'react';
// import { StyleSheet, Page, Document, Text, View } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   document: {
//     display: 'flex',
//     width: '100%',
//   },
//   page: {
//     flexDirection: 'column',
//     display: 'flex',
//     padding: 40,
//     width: '100%',
//     backgroundColor: 'white',
//     color: '#232946',
//   },
//   paragraph: {
//     marginBottom: 10,
//     lineHeight: 1.5,
//     fontSize: 12,
//   },
// });

// interface CoverLetterTemplateProps {
//   content: string;
// }

// const CoverLetterTemplate: React.FC<CoverLetterTemplateProps> = ({
//   content,
// }) => {
//   return (
//     <Document style={styles.document}>
//       <Page id="coverletter-template" size="A4" style={styles.page}>
//         <Text>
//           <div dangerouslySetInnerHTML={{ __html: content }} />
//         </Text>
//       </Page>
//     </Document>
//   );
// };

// export default CoverLetterTemplate;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Page, Document, Text, View } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   document: {
//     display: 'flex',
//     width: '100%',
//   },
//   page: {
//     flexDirection: 'column',
//     display: 'flex',
//     padding: '50px',
//     width: '100%',
//     backgroundColor: 'white',
//     color: '#232946',
//   },
//   paragraph: {
//     marginBottom: 10,
//     lineHeight: 1.5,
//     fontSize: 12,
//   },
// });

// const typewriterEffect = (
//   content: string,
//   speed: number,
//   setContent: React.Dispatch<React.SetStateAction<string>>,
// ) => {
//   let index = 0;

//   const type = () => {
//     if (index < content.length) {
//       setContent(prev => prev + content[index]);
//       index++;
//       setTimeout(type, speed);
//     }
//   };

//   type();
// };

// interface CoverLetterTemplateProps {
//   content: string;
// }

// const CoverLetterTemplate: React.FC<CoverLetterTemplateProps> = ({
//   content,
// }) => {
//   const [displayedContent, setDisplayedContent] = useState('');

//   useEffect(() => {
//     // Reset displayed content when the content prop changes
//     setDisplayedContent('');
//     typewriterEffect(content, 10, setDisplayedContent); // Adjust speed as needed
//   }, [content]);

//   // Check if content is a string
//   if (typeof content !== 'string') {
//     console.error('Content is not a string:', content);
//     return null; // or return an error message
//   }

//   // Split the displayed content into paragraphs based on newlines
//   const paragraphs = displayedContent
//     .split('\n')
//     .filter(paragraph => paragraph.trim() !== '');
//   return (
//     <Document style={styles.document}>
//       <Page id="coverletter-template" size="A4" style={styles.page}>
//         {paragraphs.map((paragraph, index) => (
//           <View key={index} style={styles.paragraph}>
//             <Text>{paragraph}</Text>
//           </View>
//         ))}
//       </Page>
//     </Document>
//   );
// };

// export default CoverLetterTemplate;
