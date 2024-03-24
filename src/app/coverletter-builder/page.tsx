'use client';
import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FormViewerContainer,
  ProfileBuilderContainer,
  ResumeFormContainer,
  ResumeTemplateContainer,
} from '../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import {
  BasicInfoType,
  EducationType,
  LanguageType,
  ProfessionalExperienceType,
  Resume,
  SkillType,
} from '@/types/profile';
import CoverLetterForm from '@/components/coverLettersForm/CoverLetterForm';
import CoverLetterTemplate from '@/components/templates/coverletterTemplate/CoverLetterTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams } from 'next/navigation';

const CoverLetterBuilderPage: FC = () => {
  const params = useParams() as { id: string };

  const initialBasicInfo: BasicInfoType = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    linkedin: '',
    additionalLinks: [],
  };

  const initialProfessionalExperience: ProfessionalExperienceType[] = [
    {
      id: '',
      jobTitle: '',
      company: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      jobDetails: '',
    },
  ];

  const initialEducation: EducationType[] = [
    {
      id: '',
      school: '',
      course: '',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      description: '',
    },
  ];

  const initialSkills: SkillType[] = [
    {
      id: '',
      name: '',
    },
  ];

  const initialLanguages: LanguageType[] = [
    {
      id: '',
      name: '',
    },
  ];

  const initialState: Resume = {
    id: '',
    basic: initialBasicInfo,
    professional: {
      summary: '',
      currentRole: '',
      work: initialProfessionalExperience,
    },
    educational: initialEducation,
    skills: initialSkills,
    languages: initialLanguages,
  };

  const [resumeInfo, setResumeInfo] = useState(initialState);

  const handleStoredResumeUpdate = async () => {
    const response = await fetch('/api/cv');
    if (response.status !== 200) {
      return;
    }
    const responseJson = await response.json();
    const resumeProfile: Resume | undefined = responseJson.body.profile;

    if (!resumeProfile) {
      return;
    }

    setResumeInfo(resumeProfile);
  };

  useEffect(() => {
    handleStoredResumeUpdate();
  }, []);

  const captureToCanvas = async () => {
    try {
      const element = document.getElementById('coverletter-template');

      if (!element) {
        console.error("Element with id 'coverletter-template' not found");
        return null;
      }

      const canvas = await html2canvas(element);
      return canvas;
    } catch (error) {
      console.error('Error capturing canvas:', error);
      return null;
    }
  };

  const convertCanvasToPDF = async (canvas: HTMLCanvasElement | null) => {
    try {
      if (!canvas) {
        console.error('Canvas is null');
        return null;
      }

      const pdf = new jsPDF();
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
      );
      return pdf;
    } catch (error) {
      console.error('Error converting canvas to PDF:', error);
      return null;
    }
  };

  const downloadPDF = (pdf: any) => {
    try {
      if (pdf) {
        pdf.save('document.pdf');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const canvas = await captureToCanvas();
      const pdf = await convertCanvasToPDF(canvas);
      downloadPDF(pdf);
    } catch (error) {
      console.error('Error handling download PDF:', error);
    }
  };

  return (
    <ProfileBuilderContainer>
      <div>
        <title>Cover Letter Builder Page</title>
      </div>
      <PageHeader id={params.id} handleDownloadPDF={handleDownloadPDF} />
      <FormViewerContainer>
        <ResumeFormContainer>
          <CoverLetterForm
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
          />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          {/* <CoverLetterTemplate id="coverletter-template" /> */}
          <CoverLetterTemplate />
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ProfileBuilderContainer>
  );
};

export default CoverLetterBuilderPage;
