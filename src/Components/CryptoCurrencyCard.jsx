import React, { useEffect } from "react";
import useCryptoCurrency from "../hooks/useCryptoCurrency";
import { useContext, createContext, useState } from "react";
import { UserContext } from "../Pages/SkeletonPage";
import axios from "axios";
import SingleCryptoCard from "./Portfolio/SingleCryptoCard";
import useCoinsOnce from "../hooks/useCoinsOnce";

const CryptoCurrencyCard = ({
  searchedCoin,
  submitedSearch,
  setSubmitedSearch,
}) => {
  let { data, isLoading, error } = useCryptoCurrency();

  let { data: data2, isLoading: isLoading2, error: error2 } = useCoinsOnce();

  console.log("Data", data);
  console.log("Data2", data2);

  const { user, setUser } = useContext(UserContext);

  const [userInput, setUserInput] = useState({});

  const handleClick = () => {
    console.log("Test");
    setSubmitedSearch(!submitedSearch);
  };

  const handleSubmit = async (event, element) => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const value = input.value;
    const response = await axios.patch(
      `http://localhost:5000/api/addWatchList/${user._id}`,
      {
        $addToSet: {
          watchList: {
            coin: element.id,
            amount: value,
            ticker: String(element.symbol),
            image: element.image,
          },
        },
      }
    );
    const response2 = await axios.patch(
      `http://localhost:5000/api/addTransaction/${user._id}`,
      {
        $addToSet: {
          transactions: {
            coin: element.id,
            amount: value,
            ticker: String(element.symbol),
            image: element.image,
            transactionType: "buy",
          },
        },
      }
    );
    const newUser = response2.data;

    setUser(newUser);
    setUserInput("");
  };

  return (
    <div>
      <div>
        {submitedSearch ? (
          <div className="border-2">
            <SingleCryptoCard
              searchedCoin={searchedCoin}
              submitedSearch={submitedSearch}
              coinsList={data2}
            ></SingleCryptoCard>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-4 lg:p-3 lg:w-[1500px]">
            {data?.map((element, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-700 ring ring-sky-300 w-auto rounded-xs cursor-pointer hover:scale-102 transition-all duration-250 ease-in-out"
              >
                <div className="flex flex-row gap-2 items-center ml-3 mt-3">
                  <img
                    src={element.image}
                    alt={element.name}
                    className="w-13 h-13 rounded-full mb-30 mt-2 lg:mt-0"
                  ></img>
                  <div className="flex flex-col">
                    <h1 className="lg:text-2xl text-xl text-gray-100 font-semibold text-left">
                      {element.name}
                    </h1>
                    <h1 className="text-lg text-gray-300 font-normal text-left">
                      {element.symbol.toUpperCase()}
                    </h1>
                    <div className="mt-5">
                      <div className="w-fit ml-[320px] -mb-[67px] flex flex-col items-center">
                        <form
                          onSubmit={(event) => handleSubmit(event, element)}
                        >
                          <button
                            type="submit"
                            className="text-md text-gray-100 bg-slate-900/20 w-fit px-4 py-1 rounded-xs cursor-pointer mb-2 hover:bg-slate-900/40 transition-all duration-300"
                          >
                            Add
                          </button>
                          <div className="max-w-[75px mx-auto relative z-10">
                            <input
                              id={`myInput-${index}`}
                              type="number"
                              step="any"
                              placeholder="Amount"
                              value={userInput[element.name] || ""}
                              onChange={(event) =>
                                setUserInput({
                                  ...userInput,
                                  [element.name]: event.target.value,
                                })
                              }
                              className="text-white w-[75px] rounded-xs px-2 outline-none border-b"
                            ></input>
                          </div>
                        </form>
                      </div>
                      <div className="flex flex-row items-center mb-5 mt-10 -translate-x-9">
                        <h1 className="lg:text-base text-sm font-normal text-gray-300">
                          Price:{" "}
                        </h1>
                        <h1 className="text-left text-lg font-semibold text-gray-100 bg-blue-500/20 rounded-xs px-1 ml-2">
                          $
                          {Number(
                            element.current_price?.toFixed(2)
                          ).toLocaleString()}
                        </h1>
                        <h1 className="lg:text-base text-sm font-normal text-gray-300 ml-3">
                          24H:{" "}
                        </h1>
                        <h1
                          className={`text-left text-md ml-2 mt-0.5 px-1 rounded-xs font-semibold ${
                            element.price_change_percentage_24h > 0
                              ? "text-green-300 bg-green-500/30"
                              : "text-red-300 bg-red-500/30"
                          }`}
                        >
                          {`${
                            element.price_change_percentage_24h > 0 ? "+" : ""
                          }${element.price_change_percentage_24h?.toFixed(2)}`}
                          %
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center m-5 mt-20 mb-20">
        <h2 className="font-roboto font-normal w-fit pl-9">
          CryptoScope © 2025. All rights reserved
        </h2>
      </div>
    </div>
  );
};

export default CryptoCurrencyCard;
