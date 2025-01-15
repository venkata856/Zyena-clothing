/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";

import {
  Body,
  DirectoryItemContainer,
  BackgroundImage,
} from "./directory-item.styles";
const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();
  const { imageUrl, title, route } = category;

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={() => onNavigateHandler()}>
      <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
