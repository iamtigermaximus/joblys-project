import { ProfessionalExperienceType } from '@/types/profile';
import { FC } from 'react';
import {
  Company,
  DateContainer,
  DateSeparator,
  Dates,
  Description,
  DetailsContentContainer,
  EmploymentDetail,
  EmploymentDetailsContainer,
  JobTitle,
  Month,
  Year,
} from '../DefaultTemplate.styles';

export const EmploymentInfoComponent: FC<{
  employmentInfo: ProfessionalExperienceType[];
}> = ({ employmentInfo }) => (
  <DetailsContentContainer>
    {employmentInfo.map(info => (
      <div key={info.id}>
        <EmploymentDetailsContainer>
          <EmploymentDetail>
            <JobTitle>{info.jobTitle}</JobTitle>
            <Company>{info.company}</Company>
          </EmploymentDetail>
          {info.jobTitle && (
            <DateContainer>
              <Dates>
                <Month>
                  {info.startDate.month &&
                  !isNaN(parseInt(info.startDate.month)) ? (
                    <>
                      {new Date(
                        2022,
                        parseInt(info.startDate.month) - 1,
                      ).toLocaleString('default', {
                        month: 'short',
                      })}
                    </>
                  ) : (
                    <>Jan</>
                  )}
                </Month>
                <Year>{info.startDate.year || new Date().getFullYear()}</Year>
              </Dates>
              <DateSeparator> - </DateSeparator>
              <Dates>
                <Month>
                  {typeof info.endDate === 'string' ||
                  (typeof info.endDate === 'object' && 'month' in info.endDate)
                    ? typeof info.endDate === 'string'
                      ? info.endDate === 'Present'
                        ? 'Present'
                        : 'Present'
                      : new Date(
                          2022,
                          parseInt(info.endDate.month) - 1,
                        ).toLocaleString('default', {
                          month: 'short',
                        })
                    : 'Jan'}
                </Month>
                <Year>
                  {typeof info.endDate === 'string' ||
                  (typeof info.endDate === 'object' && 'year' in info.endDate)
                    ? typeof info.endDate === 'string'
                      ? info.endDate === 'Present'
                        ? ''
                        : ''
                      : info.endDate.year
                    : ''}
                </Year>
              </Dates>
            </DateContainer>
          )}
        </EmploymentDetailsContainer>

        <Description>{info.jobDetails}</Description>
      </div>
    ))}
  </DetailsContentContainer>
);
