import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import PropTypes from "prop-types";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[5rem] py-3 ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        <HeartIcon product={product} />

        <div className="p-4 ">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

SmallProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default SmallProduct;
