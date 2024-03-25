import { EducationType } from '@/types/profile';
import { FC } from 'react';
import {
  DetailsContentContainer,
  EducationDetailContainer,
  EducationDetail,
  Course,
  School,
  DateContainer,
  Dates,
  Month,
  Year,
  DateSeparator,
  Description,
} from '../DefaultTemplate.styles';

export const EducationInfoComponent: FC<{ educationInfo: EducationType[] }> = ({
  educationInfo,
}) => (
  <DetailsContentContainer>
    {educationInfo &&
      educationInfo?.length > 0 &&
      educationInfo.map((info, index) => (
        <div key={info.id}>
          <EducationDetailContainer>
            <EducationDetail>
              <Course>{info.course}</Course>
              <School>{info.school}</School>
            </EducationDetail>
            {info.school && (
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
                    {info.endDate.month &&
                    !isNaN(parseInt(info.endDate.month)) ? (
                      <>
                        {new Date(
                          2022,
                          parseInt(info.endDate.month) - 1,
                        ).toLocaleString('default', {
                          month: 'short',
                        })}
                      </>
                    ) : (
                      <>Jan</>
                    )}
                  </Month>
                  <Year>{info.endDate.year || new Date().getFullYear()}</Year>
                </Dates>
              </DateContainer>
            )}
          </EducationDetailContainer>
          <Description>{info.description}</Description>
        </div>
      ))}
  </DetailsContentContainer>
);
