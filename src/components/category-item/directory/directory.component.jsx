/* eslint-disable react/prop-types */
import CategoryItem from "../category-item.component";
import "./directory.styles.css";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Directory;
