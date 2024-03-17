'use client';
import React, { FC, useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import {
  FormViewerContainer,
  ProfileBuilderContainer,
  ResumeFormContainer,
  ResumeTemplateContainer,
} from '../../../page.styles';
import PageHeader from '@/components/common/page-header/PageHeader';
import ResumeForm from '@/components/profileBuilderForms/profile-form/ResumeForm';
import {
  Resume,
  initialResume,
} from '@/types/profile';
import DefaultTemplate from '@/components/templates/defaultTemplate/DefaultTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ProfileBuilderPage: FC = () => {
  const params = useParams() as { id: string };
  const [resumeInfo, setResumeInfo] = useState(initialResume());

  const handleStoredResumeUpdate = useCallback(async () => {
    const response = await fetch(`/api/cv/${params.id}`);
    if (response.status !== 200) {
      return;
    }
    const responseJson = await response.json();
    const resumeProfile: Resume | undefined = responseJson.body.profile;

    if (!resumeProfile) {
      return;
    }

    setResumeInfo(resumeProfile);
  }, [params.id]);

  useEffect(() => {
    handleStoredResumeUpdate();
  }, [handleStoredResumeUpdate]);

  const captureToCanvas = async () => {
    const element = document.getElementById('default-template');

    if (!element) {
      console.error("Element with id 'default-template' not found");
      return null;
    }

    const canvas = await html2canvas(element);
    return canvas;
  };

  const convertCanvasToPDF = async (canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      console.error('Canvas is null');
      return null;
    }
    const pdf = new jsPDF();
    try {
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
      console.error('Error adding image to PDF:', error);
      return null;
    }
  };

  const downloadPDF = (pdf: any) => {
    if (pdf) {
      pdf.save('document.pdf');
    }
  };

  const handleDownloadPDF = async () => {
    const canvas = await captureToCanvas();
    const pdf = await convertCanvasToPDF(canvas);
    downloadPDF(pdf);
  };

  return (
    <ProfileBuilderContainer>
      <div>
        <title>Profile Builder Page</title>
      </div>
      <PageHeader handleDownloadPDF={handleDownloadPDF} />
      <FormViewerContainer>
        <ResumeFormContainer>
          <ResumeForm
            resumeId={params.id}
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
            refreshStoredResume={handleStoredResumeUpdate}
          />
        </ResumeFormContainer>
        <ResumeTemplateContainer>
          {/* <DefaultTemplatePDF resumeInfo={resumeInfo} /> */}
          <DefaultTemplate id="default-template" resumeInfo={resumeInfo} />
        </ResumeTemplateContainer>
      </FormViewerContainer>
    </ProfileBuilderContainer>
  );
};

export default ProfileBuilderPage;
