'use client';

//import { breakpoints as bp } from '../utils/layout';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  /* border: 1px solid red; */
  display: flex;
`;

export const UserInfo = styled.div`
  width: 300px;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

export const RecentSearchesSection = styled.div`
  width: 100%;
  height: 200px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const RecentActivitySection = styled.div`
  width: 100%;
  height: 200px;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const ActivitiesContainer = styled.div`
  /* border: 1px solid orange; */
  display: flex;
  border-radius: 10px;
  padding: 5px 0;
`;

export const Button = styled.button`
  background-color: #b8c1ec;
  border-radius: 10px;
  padding: 5px;
  margin-right: 10px;
  width: 80px;
  border: none;
`;

export const RecentSearchContainer = styled.div`
  border: 1px solid #d3d3d3;
  margin-right: 10px;
  width: 100%;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
