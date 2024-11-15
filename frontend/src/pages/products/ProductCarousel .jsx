import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCaroucel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block ml-10  ">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[25rem]  lg:w-[20rem] md:w-[15rem] sm:w-[10rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              // description,
              brand,
              createdAt,
              numReviews,
              rating,
              // quantity,
              countInStock,
            }) => (
              <div key={_id} className="">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover "
                />

                <div className="mt-4 flex justify-around ">
                  <div className="one">
                    <h2>{name}</h2>
                    <p> $ {price}</p> <br /> <br />
                  </div>
                  <div className="flex justify-between w-[20rem] mt-3 ml-6 ">
                    <div className="one">
                      <h1 className="flex items-center mb-2">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      <h1 className="flex  items-center mb-2">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2 text-white" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>
                    <div className="ml-6 one">
                      <h1 className="flex items-center mb-2">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        {price}
                      </h1>
                      <h1 className="flex items-center mb-2">
                        <FaBox className="mr-2 text-white" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCaroucel;
