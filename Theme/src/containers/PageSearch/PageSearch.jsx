import React, {useState} from "react";
import ModalCategories from "./ModalCategories";
import { DEMO_CATEGORIES, DEMO_TAGS } from "../../data/taxonomies";
import ModalTags from "./ModalTags";
import Nav from "../../components/Nav/Nav";
import NavItem from "../../components/NavItem/NavItem";
import ArchiveFilterListBox from "../../components/ArchiveFilterListBox/ArchiveFilterListBox";
import Input from "../../components/Input/Input";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "../../components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "../../components/NcImage/NcImage";
import NcLink from "../../components/NcLink/NcLink";
import { gql, useQuery } from '@apollo/client';
import { useSearchkitVariables, useSearchkit, withSearchkit, withSearchkitRouting } from '@searchkit/client'
//import SectionSliderNewAuthors from "../../components/SectionSliderNewAthors/SectionSliderNewAuthors";
// import { DEMO_AUTHORS } from "../../data/authors";
// import ButtonSecondary from "../../components/Button/ButtonSecondary";
// import SectionGridCategoryBox from "../../components/SectionGridCategoryBox/SectionGridCategoryBox";
// import BackgroundSection from "../../components/BackgroundSection/BackgroundSection";
import Card11 from "../../components/Card11/Card11";
import ButtonCircle from "../../components/Button/ButtonCircle";
import CardCategory2 from "../../components/CardCategory2/CardCategory2";
import Tag from "../../components/Tag/Tag";
import CardAuthorBox2 from "../../components/CardAuthorBox2/CardAuthorBox2";
import AutoCompleteSearch from "./autoCompleteSearch";
import "./autoCompleteSearch.css"
import Pagination from "../../components/Pagination/Pagination";




export const PageSearchProps = {
  className: String
}

const query = gql`
query resultSet($query: String, $filters: [SKFiltersSet], $page: SKPageInput, $sortBy: String) {
  results(query: $query, filters: $filters) {
    summary {
      total
      appliedFilters {
        id
        identifier
        display
        label
        ... on DateRangeSelectedFilter {
          dateMin
          dateMax
          __typename
        }

        ... on ValueSelectedFilter {
          value
          __typename
        }
        __typename
      }
      sortOptions {
        id
        label
        __typename
      }
      query
      __typename
    }
    hits(page: $page, sortBy: $sortBy) {
      page {
        total
        totalPages
        pageNumber
        from
        size
        __typename
      }
      sortedBy

      items {
        ... on ResultHit {
          id
          fields {
  article_length
  category
  authors
  date_download
  language
  image_url
  source_domain
  facebook_shares
  twitter_shares
  maintext
  source_domain
  title
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    facets {
      identifier
      type
      label
      display
      entries {
        label
        count
        __typename
      }
      __typename
    }
    __typename
  }
}
`

// const posts = DEMO_POSTS.filter((_, i) => i < 12);
// const cats = DEMO_CATEGORIES.filter((_, i) => i < 15);
// const tags = DEMO_CATEGORIES.filter((_, i) => i < 32);
// const authors = DEMO_AUTHORS.filter((_, i) => i < 12);



///////////////////////////////////////////////////////Sorting



//////////////////////////////////////////////
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];

const TABS = ["Articles", "Categories", "Tags", "Authors"];

//const posts = DEMO_POSTS.filter((_, i) => i < 16);

const PageSearch = ({ className = "" }) => {

  ////////////////////////////////graph ql work////////////////////////////

  const variables = useSearchkitVariables()
  const { data, error ,loading } = useQuery(query, { variables })

  if(error){console.log("An error Occured" + error)}
     
  if(loading){console.log("Data is loading")}

  if(!loading){console.log(data.results.hits.items[0].fields.twitter_shares)}


  console.log(data)

// const dataSet = data.results.hits.items 
  /////////////////////////////////////////////////////////////////////




  ////////////////////////////////////////////////creating a render function /////////////////////////


  // const renderCard=(item ,index)=>{
  //   return(
  //     console.log(item.fie)
  //     //<Card11 key={item.id} post={item} />
  //   )
  // }

  let s = "Technology";

  // Tag and category have same data type - we will use one demo data


  
 
  return (
    <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
      <Helmet>
        <title>Nc || Search Page Template</title>
      </Helmet>
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
      {/* <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-5 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
        </div>
        {/* CONTENT */}
        {/* <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center"> */}
              
              <AutoCompleteSearch/>
              
              {/* <h2 className="text-2xl sm:text-4xl font-semibold">{s}</h2>
              <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                We found{" "}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  1135
                </strong>{" "}
                results for{" "}
                <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                  {s}
                </strong>
              </span>
              <form
                className="relative w-full mt-8 sm:mt-11 text-left"
                method="post"
              >
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">Search all icons</span>
                  <Input
                    id="search-input"
                    type="search"
                    placeholder="Type and press enter"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    defaultValue={s}
                  />
                  <ButtonCircle
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    type="submit"
                  >
                    <i className="las la-arrow-right text-xl"></i>
                  </ButtonCircle>
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                      ></path>
                    </svg>
                  </span>
                </label>
              </form> */}
              {/* <div className="w-full text-sm text-left mt-4 text-neutral-500 dark:text-neutral-300">
                <div className="inline-block"> */}
                <div className="margin">
                  <span className="mr-2.5">Related:</span>
                  <NcLink className="mr-2.5 inline-block font-normal" to="/#">
                    Design
                  </NcLink>
                  <NcLink className="mr-2.5 inline-block font-normal" to="/#">
                    Photo
                  </NcLink>
                  <NcLink className="mr-2.5 inline-block font-normal" to="/#">
                    Vector
                  </NcLink>
                  <NcLink className="mr-2.5 inline-block font-normal" to="/#">
                    Frontend
                  </NcLink>
                {/* </div>
              </div> */}
              </div></div>
            {/* </header>
          // </div>
        </div> */}
      {/* </div> */}
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
         

       {/* Here i applied Models */}

          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">

              <ModalCategories categories={DEMO_CATEGORIES} />

              <ModalTags tags={DEMO_TAGS} />
           
            </div>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          

               {/* passing our data in Card11 through map */}

          {!loading ? 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">

              {data.results? data.results.hits.items.map((value , index) => {
        
                  return(
                  
         
                      <Card11 key={index} post={value.fields} cardvalue={value} />
                  
                 )
                }
          

              ) : <h1>Error in Debugging</h1>}
              
            </div>
          : <h1>Loading</h1>}

<div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Show more</button>
          </div>
</main>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageSearch;

